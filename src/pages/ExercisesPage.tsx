import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import type { CsvQuestion } from '../utils/csvQuestions'
import { loadMergedExerciseQuestions } from '../utils/csvQuestions'
import '../components/TopicQuiz.css'
import './ExercisesPage.css'

function pickRandomIndex(length: number, avoid?: number): number {
  if (length <= 0) return 0
  if (length === 1) return 0
  let next = Math.floor(Math.random() * length)
  let guard = 0
  while (next === avoid && guard < 20) {
    next = Math.floor(Math.random() * length)
    guard += 1
  }
  return next
}

export function ExercisesPage() {
  const { mode } = useParams<{ mode: string }>()
  const isAleatorio = mode === 'aleatorio'
  const isSequencial = mode === 'sequencial'
  const validMode = isAleatorio || isSequencial

  const [items, setItems] = useState<CsvQuestion[]>([])
  const [loadError, setLoadError] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [resumeIndex, setResumeIndex] = useState<number | null>(null)

  const persistKey = useMemo(() => `exercises-progress:${mode ?? ''}`, [mode])

  useEffect(() => {
    if (mode !== 'aleatorio' && mode !== 'sequencial') return
    let alive = true
    async function load() {
      const merged = await loadMergedExerciseQuestions()
      if (!alive) return
      if (merged.length === 0) {
        setLoadError(true)
        setItems([])
        return
      }
      setLoadError(false)
      setItems(merged)
      if (mode === 'aleatorio') {
        setCurrentIndex(pickRandomIndex(merged.length))
      } else {
        setCurrentIndex(0)
      }
      const raw = localStorage.getItem(persistKey)
      const saved = raw ? Number.parseInt(raw, 10) : NaN
      if (Number.isFinite(saved) && saved > 0 && saved < merged.length) {
        setCurrentIndex(saved)
        setResumeIndex(saved)
      } else {
        setResumeIndex(null)
      }
      setShowResult(false)
    }
    void load()
    return () => {
      alive = false
    }
  }, [mode, persistKey])

  useEffect(() => {
    if (items.length <= 0 || resumeIndex !== null) return
    localStorage.setItem(persistKey, String(currentIndex))
  }, [currentIndex, items.length, resumeIndex, persistKey])

  const total = items.length
  const current = items[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex >= total - 1

  const title = useMemo(() => {
    if (isAleatorio) return 'Exercicios aleatorios'
    return 'Exercicios sequenciais'
  }, [isAleatorio])

  if (!validMode) {
    return <Navigate to="/" replace />
  }

  function nextRandom() {
    setShowResult(false)
    setCurrentIndex((prev) => pickRandomIndex(total, prev))
  }

  return (
    <main className="exercises">
      <header className="exercises__head">
        <Link className="exercises__back" to="/"><span className="back-arrow" aria-hidden="true">⬅</span> Voltar ao inicio
        </Link>
        <h1 className="exercises__title">{title}</h1>
      </header>

      {loadError && (
        <p className="exercises__error" role="alert">
          Nao foi possivel carregar os ficheiros de exercicios. Confirme Exercicios1.csv,
          Exercicios2.csv e Exercicios3.csv na pasta public.
        </p>
      )}

      {!loadError && total > 0 && current && (
        <section className="quiz exercises__quiz" aria-labelledby="ex-heading">
          <h2 id="ex-heading" className="quiz__title">
            Exercicio
          </h2>
          <p className="quiz__progress">
            {isSequencial
              ? `Pergunta ${currentIndex + 1} de ${total}`
              : `Pergunta ${currentIndex + 1} de ${total} (ordem aleatoria)`}
          </p>
          {resumeIndex !== null && (
            <div className="quiz__resume-box">
              <p className="quiz__resume-text">
                Encontrado progresso guardado na pergunta {resumeIndex + 1}.
              </p>
              <div className="quiz__resume-actions">
                <button
                  type="button"
                  className="quiz__submit"
                  onClick={() => {
                    setCurrentIndex(resumeIndex)
                    setShowResult(false)
                    setResumeIndex(null)
                  }}
                >
                  Continuar de onde parei
                </button>
                <button
                  type="button"
                  className="quiz__resume-reset"
                  onClick={() => {
                    localStorage.removeItem(persistKey)
                    if (isAleatorio) {
                      setCurrentIndex(pickRandomIndex(total))
                    } else {
                      setCurrentIndex(0)
                    }
                    setShowResult(false)
                    setResumeIndex(null)
                  }}
                >
                  Recomecar do inicio
                </button>
              </div>
            </div>
          )}
          <ol className="quiz__list">
            <li className="quiz__item">
              <p className="quiz__question">
                <span className="quiz__num">{currentIndex + 1}.</span> {current.prompt}
              </p>
              {showResult && (
                <p className="quiz__csv-answer">
                  <strong>Resultado:</strong> {current.answer}
                </p>
              )}
            </li>
          </ol>

          <div className="quiz__actions">
            <button type="button" className="quiz__submit" onClick={() => setShowResult(true)}>
              Ver resultado
            </button>
            {isAleatorio && (
              <button type="button" className="exercises__secondary" onClick={nextRandom}>
                Outra pergunta aleatoria
              </button>
            )}
          </div>

          {isSequencial && (
            <div className="quiz__nav">
              {!isFirst && (
                <button
                  type="button"
                  className="quiz__nav-btn"
                  onClick={() => {
                    setShowResult(false)
                    setCurrentIndex((i) => i - 1)
                  }}
                  aria-label="Pergunta anterior"
                >
                  ←
                </button>
              )}
              {!isLast && (
                <button
                  type="button"
                  className="quiz__nav-btn"
                  onClick={() => {
                    setShowResult(false)
                    setCurrentIndex((i) => i + 1)
                  }}
                  aria-label="Pergunta seguinte"
                >
                  →
                </button>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  )
}

