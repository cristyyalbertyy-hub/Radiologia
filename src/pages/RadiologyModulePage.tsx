import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TopicQuiz } from '../components/TopicQuiz'
import { getRadiologyModule } from '../data/topics'
import './TopicPage.css'

type RadiographySection =
  | 'infografia'
  | 'video'
  | 'podcast'
  | 'questionario-medio'
  | 'questionario-dificil'

export function RadiologyModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const module = moduleId ? getRadiologyModule(moduleId) : undefined
  const hasStructuredContent =
    module?.id === 'radiografia' || module?.id === 'modalidades-avancadas-imagem'
  const [activeSection, setActiveSection] = useState<RadiographySection>('infografia')

  useEffect(() => {
    setActiveSection('infografia')
  }, [moduleId])

  const actions = useMemo(
    () => [
      { id: 'infografia' as const, label: 'Infografia' },
      { id: 'video' as const, label: 'Video' },
      { id: 'podcast' as const, label: 'Podcast' },
    ],
    [],
  )

  if (!module) {
    return (
      <div className="topic topic--missing">
        <p>Modulo de radiologia nao encontrado.</p>
        <Link to="/topico/radiologia"><span className="back-arrow" aria-hidden="true">⬅</span> Voltar a Radiologia</Link>
      </div>
    )
  }

  return (
    <article className="topic" key={moduleId ?? 'radiologia-module'}>
      <header className="topic__head">
        <Link className="topic__back" to="/topico/radiologia"><span className="back-arrow" aria-hidden="true">⬅</span> Voltar a Radiologia
        </Link>
        <h1 className="topic__title">{module.title}</h1>
      </header>

      {hasStructuredContent && (
        <nav className="topic__menu" aria-label="Conteudos de radiografia">
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              className={`topic__menu-btn ${activeSection === action.id ? 'topic__menu-btn--active' : ''}`}
              onClick={() => setActiveSection(action.id)}
            >
              <span>{action.label}</span>
            </button>
          ))}
          <div className="topic__menu-quiz-split" role="group" aria-label="Tipos de questionario">
            <button
              type="button"
              className={`topic__menu-btn topic__menu-btn--small ${activeSection === 'questionario-medio' ? 'topic__menu-btn--active' : ''}`}
              onClick={() => setActiveSection('questionario-medio')}
            >
              Questionario medio
            </button>
            <button
              type="button"
              className={`topic__menu-btn topic__menu-btn--small ${activeSection === 'questionario-dificil' ? 'topic__menu-btn--active' : ''}`}
              onClick={() => setActiveSection('questionario-dificil')}
            >
              Questionario dificil
            </button>
          </div>
        </nav>
      )}

      <div className="topic__sections">
        {(!hasStructuredContent || activeSection === 'video') && (
          <section className="topic__block" aria-labelledby="sec-video">
            {!hasStructuredContent && (
              <h2 id="sec-video" className="topic__h2">
                Video
              </h2>
            )}
            <p className="topic__cap">{module.videoCaption}</p>
            <video className="topic__media topic__video" controls preload="metadata" playsInline>
              <source src={module.videoUrl} type="video/mp4" />
              O seu navegador nao suporta video HTML5.
            </video>
          </section>
        )}

        {hasStructuredContent && activeSection === 'podcast' && module.podcastUrl && (
          <section className="topic__block" aria-labelledby="sec-podcast">
            <p className="topic__cap">{module.podcastCaption}</p>
            <audio className="topic__media" controls preload="metadata" src={module.podcastUrl}>
              O seu navegador nao suporta audio HTML5.
            </audio>
          </section>
        )}

        {hasStructuredContent && activeSection === 'infografia' && (
          <section className="topic__block" aria-labelledby="sec-info">
            <p className="topic__cap">{module.infographicCaption}</p>
            <figure className="topic__fig">
              <img
                className="topic__img"
                src={module.infographicSrc}
                alt=""
                loading="lazy"
                width={900}
                height={506}
              />
            </figure>
          </section>
        )}

        {hasStructuredContent &&
          (activeSection === 'questionario-medio' ||
            activeSection === 'questionario-dificil') && (
          <TopicQuiz
            intro={module.quizIntro}
            questions={module.quiz}
            csvUrl={
              activeSection === 'questionario-medio'
                ? module.quizEasyFileUrl
                : module.quizHardFileUrl
            }
          />
        )}
      </div>
    </article>
  )
}

