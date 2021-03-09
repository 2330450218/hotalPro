import api from './index'
import { axios } from '@/utils/request'

/**
 * @param parameter
 * @returns {*}
 */
// 接口范例
export function login(parameter) {
  return axios({
    url: '/api/gcjs/login/login',
    method: 'post',
    data: parameter
  })
}

export function phoneLogin(parameter) {
  return axios({
    url: '/sys/phoneLogin',
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha(parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo() {
  return axios({
    url: '/api/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout(logoutToken) {
  return axios({
    url: '/api/gcjs/login/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Access-Token': logoutToken
    }
  })
}

/**
 * 第三方登录
 * @param token
 * @returns {*}
 */
export function thirdLogin(token) {
  return axios({
    url: `/thirdLogin/getLoginUser/${token}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}