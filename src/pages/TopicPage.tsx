import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TopicQuiz } from '../components/TopicQuiz'
import { getTopic } from '../data/topics'
import './TopicPage.css'

type UltraSection = 'infografia' | 'video' | 'podcast' | 'questionario'

export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const topic = topicId ? getTopic(topicId) : undefined
  const hasTabbedContent =
    topic?.id === 'ultrassonografia' || topic?.id === 'eletrocardiografia'
  const showAudio = topic?.id === 'radiologia'
  const [ultraSection, setUltraSection] = useState<UltraSection>('infografia')

  const ultraActions = useMemo(
    () => [
      { id: 'infografia' as const, icon: '', label: 'Infografia' },
      { id: 'video' as const, icon: '', label: 'Video' },
      { id: 'podcast' as const, icon: '', label: 'Podcast' },
      { id: 'questionario' as const, icon: '', label: 'Questionario' },
    ],
    [],
  )

  if (!topic) {
    return (
      <div className="topic topic--missing">
        <p>Topico nao encontrado.</p>
        <Link to="/"><span className="back-arrow" aria-hidden="true">⬅</span> Voltar ao inicio</Link>
      </div>
    )
  }

  return (
    <article className="topic">
      <header className="topic__head">
        <Link className="topic__back" to="/"><span className="back-arrow" aria-hidden="true">⬅</span> Voltar ao inicio
        </Link>
        <h1 className="topic__title">{topic.title}</h1>
      </header>

      {hasTabbedContent && (
        <nav className="topic__menu" aria-label="Conteudos do topico">
          {ultraActions.map((action) => (
            <button
              key={action.id}
              type="button"
              className={`topic__menu-btn ${ultraSection === action.id ? 'topic__menu-btn--active' : ''}`}
              onClick={() => setUltraSection(action.id)}
            >
              <span aria-hidden>{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </nav>
      )}

      <div className="topic__sections">
        {showAudio && (
          <section className="topic__block" aria-labelledby="sec-audio">
            <h2 id="sec-audio" className="topic__h2">
              Audio
            </h2>
            <p className="topic__cap">{topic.audioCaption}</p>
            <audio className="topic__media" controls preload="metadata" src={topic.audioUrl}>
              O seu navegador nao suporta audio HTML5.
            </audio>
          </section>
        )}

        {(!hasTabbedContent || ultraSection === 'video') && (
          <section className="topic__block" aria-labelledby="sec-video">
            {!hasTabbedContent && (
              <h2 id="sec-video" className="topic__h2">
                Video
              </h2>
            )}
            <p className="topic__cap">{topic.videoCaption}</p>
            <video className="topic__media topic__video" controls preload="metadata" playsInline>
              <source src={topic.videoUrl} type="video/mp4" />
              O seu navegador nao suporta video HTML5.
            </video>
            {topic.extraVideos?.map((video, index) => (
              <div key={video.url} className="topic__extra-video">
                <p className="topic__cap">{video.caption || `Video ${index + 2}`}</p>
                <video className="topic__media topic__video" controls preload="metadata" playsInline>
                  <source src={video.url} type="video/mp4" />
                  O seu navegador nao suporta video HTML5.
                </video>
              </div>
            ))}
          </section>
        )}

        {(!hasTabbedContent || ultraSection === 'podcast') && (
          <section className="topic__block" aria-labelledby="sec-podcast">
            <h2 id="sec-podcast" className="topic__h2">
              Podcast
            </h2>
            <p className="topic__cap">{topic.podcastCaption}</p>
            <audio className="topic__media" controls preload="metadata" src={topic.podcastUrl}>
              O seu navegador nao suporta audio HTML5.
            </audio>
          </section>
        )}

        {(!hasTabbedContent || ultraSection === 'infografia') && (
          <section className="topic__block" aria-labelledby="sec-info">
            <h2 id="sec-info" className="topic__h2">
              Infografia
            </h2>
            <p className="topic__cap">{topic.infographicCaption}</p>
            <figure className="topic__fig">
              <img
                className="topic__img"
                src={topic.infographicSrc}
                alt=""
                loading="lazy"
                width={900}
                height={506}
              />
            </figure>
          </section>
        )}

        {(!hasTabbedContent || ultraSection === 'questionario') && (
          <TopicQuiz
            intro={topic.quizIntro}
            questions={topic.quiz}
            csvUrl={topic.quizFileUrl}
          />
        )}
      </div>
    </article>
  )
}

