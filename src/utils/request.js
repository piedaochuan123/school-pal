import axios from 'axios'
import qs from 'qs'

const request = axios.create({
    baseURL:'http://119.23.217.238/dist/saleApi/',
    timeout:2000
})

request.interceptors.request.use(config => {
    if(config.method == 'post'){
        config.data = qs.stringify(config.data)
    }
    return config
},error=>{
    console.log('来自请求拦截器的错误，错误原因：' + error)
})

export default request