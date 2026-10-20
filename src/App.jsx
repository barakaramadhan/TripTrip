import { Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Sign In & Sign Up berbagi satu layout, jadi sisi kiri tidak di-reload saat pindah halaman */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  )
}

export default App
