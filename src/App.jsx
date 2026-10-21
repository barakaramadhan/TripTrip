import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'

// Halaman auth dimuat saat dibutuhkan saja, jadi landing page lebih ringan
// dan tidak ikut memuat Supabase.
const AuthLayout = lazy(() => import('./components/auth/AuthLayout'))
const SignIn = lazy(() => import('./pages/SignIn'))
const SignUp = lazy(() => import('./pages/SignUp'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-dvh bg-backgroundIvory" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Sign In & Sign Up berbagi satu layout, jadi sisi kiri tidak di-reload saat pindah halaman */}
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
