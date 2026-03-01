import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost/api',
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config

        if (original.url === '/login' || original.url === '/register' || original.url === '/token/refresh') {
            return Promise.reject(error)
        }

        if (error.response?.status === 401 && !original._retry) {
            original._retry = true

            const refreshToken = localStorage.getItem('refresh_token')
            if (!refreshToken) {
                localStorage.clear()
                window.location.href = '/login'
                return Promise.reject(error)
            }

            try {
                const { data } = await axios.post('http://localhost/api/token/refresh', {
                    refresh_token: refreshToken,
                })

                localStorage.setItem('token', data.token)
                localStorage.setItem('refresh_token', data.refresh_token)

                original.headers.Authorization = `Bearer ${data.token}`
                return api(original)
            } catch {
                localStorage.clear()
                window.location.href = '/login'
            }
        }

        return Promise.reject(error)
    }
)

export default api