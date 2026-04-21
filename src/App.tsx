import { useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { ExercisesPage } from './pages/ExercisesPage'
import { Home } from './pages/Home'
import { LoginPage } from './pages/LoginPage'
import { RadiologyModulePage } from './pages/RadiologyModulePage'
import { RadiologyPage } from './pages/RadiologyPage'
import { TopicPage } from './pages/TopicPage'

const SESSION_KEY = 'vet2_auth'

function ProtectedLayout({ isAuthenticated }: { isAuthenticated: boolean }) {
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY)
    setIsAuthenticated(session === '1')
  }, [])

  function handleLogin(email: string, password: string) {
    const validEmail = import.meta.env.VITE_LOGIN_EMAIL ?? 'admin@studio9.pt'
    const validPassword = import.meta.env.VITE_LOGIN_PASSWORD ?? '123456'
    const secondaryEmailAnyPassword = import.meta.env.VITE_LOGIN_EMAIL_2 ?? ''

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPrimary = validEmail.trim().toLowerCase()
    const normalizedSecondary = secondaryEmailAnyPassword.trim().toLowerCase()

    const okPrimary = normalizedEmail === normalizedPrimary && password === validPassword
    const okSecondary = normalizedSecondary !== '' && normalizedEmail === normalizedSecondary
    const ok = okPrimary || okSecondary
    if (ok) {
      localStorage.setItem(SESSION_KEY, '1')
      setIsAuthenticated(true)
      navigate('/', { replace: true })
    }
    return ok
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="app-brand">
          <img className="app-brand__logo" src="/Studio9.jpeg" alt="Studio 9" />
        </div>
        {isAuthenticated && (
          <button type="button" className="app-topbar__logout" onClick={handleLogout}>
            Sair
          </button>
        )}
      </header>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route element={<ProtectedLayout isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Home />} />
          <Route path="/topico/radiologia" element={<RadiologyPage />} />
          <Route path="/topico/radiologia/:moduleId" element={<RadiologyModulePage />} />
          <Route path="/topico/:topicId" element={<TopicPage />} />
          <Route path="/exercicios/:mode" element={<ExercisesPage />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />}
        />
      </Routes>
    </div>
  )
}
