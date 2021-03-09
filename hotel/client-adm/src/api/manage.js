import Vue from 'vue'
import { axios } from '@/utils/request'

const api = {
  user: '/api/user',
  role: '/api/role',
  service: '/api/service',
  permission: '/api/permission',
  permissionNoPager: '/api/permission/no-pager'
}
export default api
// post 与get请求封装
//post
export function postAction(url,parameter) {
  return axios({
    url: url,
    method:'post' ,
    headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
    },
    data: parameter
  })
}
//get
export function getAction(url,parameter) {
  return axios({
    url: url,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest'
    },
    params: parameter
  })
}
