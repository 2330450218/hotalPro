import axios from 'axios'
import { DOMIAN_URL} from '@/store/mutation-types'

/**
 *
 *
 * @type {*|string}
 */
let apiBaseUrl = DOMIAN_URL
console.log('apiBaseUrl= ', apiBaseUrl)
// 创建 axios 实例
const service = axios.create({
  baseURL: apiBaseUrl, // 服务器地址,可以写死
  timeout: 0 // 请求超时时间
})

export {service as axios }
