import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import useAuthStore from './store/authStore'
import ProtectedRoute from './components/ProtectedRoute'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-2xl mb-4">Admin Dashboard</p>
              <button
                onClick={() => { useAuthStore.getState().logout(); window.location.href = '/login' }}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </ProtectedRoute>
      } />

      <Route path="/professor/dashboard" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-2xl mb-4">Professor Dashboard</p>
              <button
                onClick={() => { useAuthStore.getState().logout(); window.location.href = '/login' }}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </ProtectedRoute>
      } />

      <Route path="/student/dashboard" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-2xl mb-4">Student Dashboard</p>
              <button
                onClick={() => { useAuthStore.getState().logout(); window.location.href = '/login' }}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </ProtectedRoute>
      } />
      </Routes>
    </BrowserRouter>
  )
}

export default App