import axios from 'axios'

export const httpClient = axios.create({
    timeout:0
})

const getClientToken = () => localStorage.getItem('inge_access_token');

const authInteceptor = (config) => {
    config.headers['access-token'] = getClientToken()
    return config
}

httpClient.interceptors.request.use(authInteceptor)