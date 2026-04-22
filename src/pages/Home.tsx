import { Link } from 'react-router-dom'
import { TOPIC_ORDER, TOPICS } from '../data/topics'
import './Home.css'

export function Home() {
  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">Tecnicas de Diagnostico Vet</h1>
        <p className="home__subtitle">
          Escolha uma especialidade para aceder a vídeo, podcast, infografia e
          questionário.
        </p>
      </header>
      <nav className="home__nav" aria-label="Especialidades">
        {TOPIC_ORDER.map((id) => (
          <Link key={id} className="home__btn" to={`/topico/${id}`}>
            {TOPICS[id].label}
          </Link>
        ))}
        <Link className="home__btn" to="/exercicios/aleatorio">
          Exercicios aleatorios
        </Link>
        <Link className="home__btn" to="/exercicios/sequencial">
          Exercicios sequenciais
        </Link>
      </nav>
    </div>
  )
}
