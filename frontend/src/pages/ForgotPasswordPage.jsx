import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            await api.post('/forgot-password', { email })
            setSuccess(true)
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
                    <span className="text-5xl">📧</span>
                    <h2 className="text-xl font-semibold text-white mt-4 mb-2">Check your email</h2>
                    <p className="text-slate-400 text-sm mb-6">If this email exists you will receive a reset link shortly.</p>
                    <Link to="/login" className="w-full block bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg py-2.5 text-sm transition-colors text-center">
                    Back to Login
                    </Link>
                </div>
            </div>
        </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white tracking-tight">LMS</h1>
                    <p className="text-slate-400 mt-2 text-sm">Reset your password</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    <h2 className="text-xl font-semibold text-white mb-2">Forgot your password?</h2>
                    <p className="text-slate-400 text-sm mb-6">Enter your email and we'll send you a reset link.</p>

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

                        <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg py-2.5 text-sm transition-colors"
                        >
                        {loading ? 'Sending...' : 'Send reset link'}
                        </button>
                    </form>

                    <p className="text-center text-slate-500 text-sm mt-6">
                        Remember your password?{' '}
                        <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}