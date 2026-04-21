import { Link } from 'react-router-dom'
import { RADIOLOGY_MODULE_ORDER, RADIOLOGY_MODULES } from '../data/topics'
import './RadiologyPage.css'

export function RadiologyPage() {
  return (
    <article className="radiology">
      <header className="radiology__head">
        <Link className="radiology__back" to="/"><span className="back-arrow" aria-hidden="true">⬅</span> Voltar ao inicio
        </Link>
        <h1 className="radiology__title">Radiologia</h1>
        <p className="radiology__subtitle">
          Selecione uma opcao para continuar.
        </p>
      </header>

      <nav className="radiology__nav" aria-label="Modulos de Radiologia">
        {RADIOLOGY_MODULE_ORDER.map((moduleId) => (
          <Link key={moduleId} className="radiology__btn" to={`/topico/radiologia/${moduleId}`}>
            <span className="radiology__btn-title">{RADIOLOGY_MODULES[moduleId].title}</span>
            {moduleId === 'modalidades-avancadas-imagem' && (
              <span className="radiology__btn-subtitle">
                -Tomografia Computorizada, -Ressonancia Magnetica, -Centigrafia
                nuclear, -PET
              </span>
            )}
          </Link>
        ))}
      </nav>
    </article>
  )
}

