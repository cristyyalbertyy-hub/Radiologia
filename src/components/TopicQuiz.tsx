import { useEffect, useMemo, useState } from 'react'
import type { QuizQuestion } from '../data/topics'
import type { CsvQuestion } from '../utils/csvQuestions'
import { loadCsvQuestions } from '../utils/csvQuestions'
import './TopicQuiz.css'

interface TopicQuizProps {
  intro: string
  questions: QuizQuestion[]
  csvUrl?: string
  storageKey?: string
}

export function TopicQuiz({ intro, questions, csvUrl, storageKey }: TopicQuizProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    questions.map(() => null),
  )
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [csvQuestions, setCsvQuestions] = useState<CsvQuestion[]>([])
  const [resumeIndex, setResumeIndex] = useState<number | null>(null)
  const [resumeReady, setResumeReady] = useState(false)

  useEffect(() => {
    let isMounted = true
    async function loadCsv() {
      if (!csvUrl) {
        setCsvQuestions([])
        return
      }
      const parsed = await loadCsvQuestions(csvUrl)
      if (isMounted) {
        setCsvQuestions(parsed)
        setCurrentQuestion(0)
        setShowResult(false)
      }
    }
    void loadCsv()
    return () => {
      isMounted = false
    }
  }, [csvUrl])

  const usingCsv = csvQuestions.length > 0
  const totalQuestions = usingCsv ? csvQuestions.length : questions.length
  const currentCsv = usingCsv ? csvQuestions[currentQuestion] : null
  const persistKey = useMemo(
    () => storageKey ?? `quiz-progress:${csvUrl ?? intro}`,
    [storageKey, csvUrl, intro],
  )

  useEffect(() => {
    if (totalQuestions <= 0) return
    const raw = localStorage.getItem(persistKey)
    if (!raw) {
      setResumeIndex(null)
      setResumeReady(true)
      return
    }
    const saved = Number.parseInt(raw, 10)
    if (Number.isFinite(saved) && saved > 0 && saved < totalQuestions) {
      setCurrentQuestion(saved)
      setResumeIndex(saved)
    } else {
      setResumeIndex(null)
    }
    setResumeReady(true)
  }, [persistKey, totalQuestions])

  useEffect(() => {
    if (!resumeReady || resumeIndex !== null || totalQuestions <= 0) return
    localStorage.setItem(persistKey, String(currentQuestion))
  }, [currentQuestion, persistKey, resumeIndex, resumeReady, totalQuestions])

  const score = useMemo(() => {
    let n = 0
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) n += 1
    })
    return n
  }, [answers, questions])

  const allAnswered = answers.every((a) => a !== null)
  const question = questions[currentQuestion]
  const isFirst = currentQuestion === 0
  const isLast = currentQuestion === totalQuestions - 1

  function selectOption(qIndex: number, optionIndex: number) {
    setShowResult(false)
    setAnswers((prev) => {
      const next = [...prev]
      next[qIndex] = optionIndex
      return next
    })
  }

  return (
    <section className="quiz" aria-labelledby="quiz-heading">
      <h2 id="quiz-heading" className="quiz__title">
        Questionário
      </h2>
      <p className="quiz__intro">{intro}</p>
      <p className="quiz__progress">
        Pergunta {currentQuestion + 1} de {totalQuestions}
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
                setCurrentQuestion(resumeIndex)
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
                setCurrentQuestion(0)
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
          {usingCsv ? (
            <>
              <p className="quiz__question">
                <span className="quiz__num">{currentQuestion + 1}.</span>{' '}
                {currentCsv?.prompt}
              </p>
              {showResult && (
                <p className="quiz__csv-answer">
                  <strong>Resultado:</strong> {currentCsv?.answer}
                </p>
              )}
            </>
          ) : (
            <>
              <p className="quiz__question">
                <span className="quiz__num">{currentQuestion + 1}.</span>{' '}
                {question.question}
              </p>
              <ul className="quiz__options">
                {question.options.map((opt, oi) => {
                  const selected = answers[currentQuestion] === oi
                  const wrong = showResult && selected && oi !== question.correctIndex
                  const right = showResult && oi === question.correctIndex
                  return (
                    <li key={oi}>
                      <button
                        type="button"
                        className={`quiz__opt ${selected ? 'quiz__opt--selected' : ''} ${wrong ? 'quiz__opt--wrong' : ''} ${right ? 'quiz__opt--right' : ''}`}
                        onClick={() => selectOption(currentQuestion, oi)}
                      >
                        {opt}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </li>
      </ol>
      <div className="quiz__actions">
        <button
          type="button"
          className="quiz__submit"
          disabled={!usingCsv && !allAnswered}
          onClick={() => setShowResult(true)}
        >
          Ver resultado
        </button>
        {showResult && !usingCsv && (
          <p className="quiz__result" role="status">
            Resultado: <strong>{score}</strong> de {questions.length} corretas.
          </p>
        )}
      </div>
      <div className="quiz__nav">
        {!isFirst && (
          <button
            type="button"
            className="quiz__nav-btn"
            onClick={() => {
              setShowResult(false)
              setCurrentQuestion((prev) => prev - 1)
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
              setCurrentQuestion((prev) => prev + 1)
            }}
            aria-label="Pergunta seguinte"
          >
            →
          </button>
        )}
      </div>
    </section>
  )
}
