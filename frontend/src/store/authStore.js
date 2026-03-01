import { create } from 'zustand'

const useAuthStore = create((set) => ({
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refresh_token'),
    user: JSON.parse(localStorage.getItem('user')),

    login: (token, refreshToken, user) => {
        localStorage.setItem('token', token)
        localStorage.setItem('refresh_token', refreshToken)
        localStorage.setItem('user', JSON.stringify(user))
        set({ token, refreshToken, user })
    },

    logout: () => {
        localStorage.clear()
        set({ token: null, refreshToken: null, user: null })
    },
}))

export default useAuthStore