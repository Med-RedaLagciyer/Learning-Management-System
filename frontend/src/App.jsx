import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import useAuthStore from './store/authStore'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white mb-4">You are logged in!</p>
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