import axios from 'axios'
import qs from 'qs'

const request = axios.create({
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
})

request.interceptors.request.use(config => {
    if (config.method == 'post') {
        qs.stringify(config.data)
    }
    return config
}, error => console.log(error))

request.interceptors.response.use(config => {
    qs.parse(config.data)
    return config
}, error => console.log(error))

export const login = data => request.post('/api/user/login', data)

export const removeApi = data => request.post('/api/user/remove', data)

export const add = data => request.post('/api/user/add', data)

export const render = data => request.post('/api/user/render', data)

export const edit = data => request.post('/api/user/edit', data)