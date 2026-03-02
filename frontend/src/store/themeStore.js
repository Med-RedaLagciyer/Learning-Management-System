import { create } from 'zustand'

const useThemeStore = create((set) => ({
    theme: localStorage.getItem('theme') || 'dark',

    toggleTheme: () => {
        set((state) => {
            const newTheme = state.theme === 'dark' ? 'light' : 'dark'
            localStorage.setItem('theme', newTheme)
            document.documentElement.setAttribute('data-theme', newTheme)
            return { theme: newTheme }
        })
    },

    initTheme: () => {
        const theme = localStorage.getItem('theme') || 'dark'
        document.documentElement.setAttribute('data-theme', theme)
    },
}))

export default useThemeStore