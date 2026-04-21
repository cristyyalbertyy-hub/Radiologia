import { useState } from 'react'
import type { FormEvent } from 'react'
import './LoginPage.css'

interface LoginPageProps {
  onLogin: (email: string, password: string) => boolean
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const ok = onLogin(email.trim(), password)
    if (!ok) {
      setError('Email ou password invalidos.')
      return
    }
    setError('')
  }

  return (
    <main className="login">
      <form className="login__card" onSubmit={submitForm}>
        <h1 className="login__title">Entrar</h1>
        <p className="login__subtitle">Use o seu email e password para continuar.</p>

        <label className="login__label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="login__input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label className="login__label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="login__input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="login__error">{error}</p>}

        <button type="submit" className="login__button">
          Iniciar sessao
        </button>
      </form>
    </main>
  )
}
