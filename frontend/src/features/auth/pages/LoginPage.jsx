import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import api, { decodeToken } from '../../../services/api'
import useAuthStore from '../../../store/authStore'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const login = useAuthStore((state) => state.login)
    const navigate = useNavigate()

    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)

    if (token) {
        const roles = user?.roles || []
    if (roles.includes('ROLE_SUPER_ADMIN') || roles.includes('ROLE_ADMIN')) {
        return <Navigate to="/admin/dashboard" replace />
    } else if (roles.includes('ROLE_PROFESSOR')) {
        return <Navigate to="/professor/dashboard" replace />
    } else {
        return <Navigate to="/student/dashboard" replace />
    }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const { data } = await api.post('/login', { email, password })
            const decoded = decodeToken(data.token)
            const roles = decoded?.roles || []

            login(data.token, data.refresh_token, { email, roles })

            if (roles.includes('ROLE_SUPER_ADMIN') || roles.includes('ROLE_ADMIN')) {
                navigate('/admin/dashboard')
            } else if (roles.includes('ROLE_PROFESSOR')) {
                navigate('/professor/dashboard')
            } else {
                navigate('/student/dashboard')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">

            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-white tracking-tight">RIWAQ</h1>
                <p className="text-slate-400 mt-2 text-sm">Learning Management System</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-xl font-semibold text-white mb-6">Sign in to your account</h2>

                {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3 mb-6">
                    {error}
                </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Email</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="you@example.com"
                    required
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-sm text-slate-400">Password</label>
                    <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                        Forgot password?
                    </Link>
                    </div>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="••••••••"
                    required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg py-2.5 text-sm transition-colors mt-2"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
                </form>

                <p className="text-center text-slate-500 text-sm mt-6">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Register
                </Link>
                </p>
            </div>

            </div>
        </div>
        )
}