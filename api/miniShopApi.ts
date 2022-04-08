import axios from 'axios'


const miniShopApi = axios.create({
    baseURL:'/api'
})

export default miniShopApi