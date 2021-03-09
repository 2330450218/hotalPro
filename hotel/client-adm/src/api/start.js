import Vue from 'vue'
import {
  axios
} from '@/utils/request'
import store from '../store'
import {
  PATH_MAPPING_URL,
  SYS_CODE,
  CONTROL_CENTER_API_LIST_PATH,
  DOMIAN_URL,
  CONTROL_SERVE_URL,
  UNITE_FLAG,
  ACCESS_TOKEN,
  LOGIN_ON,
  whiteList,
  LOGIN_URL
} from '@/store/mutation-types'

/**
 * 本地登录
 * 
 * @param  callback
 */
const initNoBody = callback => {
  // 系统跳转过来，带有一次性票据 登录校验
  let OncePick = getUrlParam('onceToken')
  console.log(OncePick)
  if (OncePick) {
    store.dispatch('LoginByOncePick', OncePick).then(res => {
      if (res.success) {
        window.location.href = window._CONFIG['loginOn']
      }
    })
  } else if (Vue.ls.get(ACCESS_TOKEN)) { // 已进登录的用户
    callback()
  } else { // 未登录用户
    // window.location.href = 'http://119.3.186.122:8390/user/redirect/systemUrl?LOGIN_TYPE=wt&SON_TARGET_URL=' + LOGIN_ON + '&SON_CONSUME_URL=' + LOGIN_ON
  }
}

const init = callback => {
  /**
   * 控制中心初始化
   * 获取路径映射关系
   */
  let url = UNITE_FLAG ? DOMIAN_URL : CONTROL_SERVE_URL
  let path = CONTROL_CENTER_API_LIST_PATH
  axios({
    url: url + path + '?sysCode=' + SYS_CODE,
    method: 'get',
    async: false,
    data: null
  }).then(res => {
    console.log("当前环境变量参数为：" + process.env.NODE_ENV_NAME);
    console.log("当前环境系统标题为：" + process.env.VUE_APP_TITLE);
    console.log('查询了控制中心接口映射')
    if (res.success) {
      let pathMapping = res.result
      pathMapping = pathMapping.map(result => {
        let hasRegex = /{[a-zA-Z0-9_$]+}/
        let isRegex = /^{[a-zA-Z0-9_$]+}$/
        //如果这个请求路径是带参路径，
        if (hasRegex.test(result.originUrl)) {
          //regex字符串
          let regexStr = ''
          //源路径分隔“/”构成的下标
          let array = result.originUrl.split('/')
          // 是参数的下标集合
          let paramIndexs = []
          //获取regex构造字符串
          for (let i = 1; i < array.length; i++) {
            regexStr += '/'
            if (array[i] && isRegex.test(array[i])) {
              paramIndexs.push(i)
              regexStr += '[a-zA-Z0-9_$]+'
            } else if (array[i]) {
              regexStr += array[i]
            }
          }
          result.regexStr = regexStr
          if (regexStr.indexOf('randomImage') >= 0) {
            console.log(regexStr)
          }
          result.paramIndexs = paramIndexs
        } else {
          if (result.originUrl.indexOf('*') == -1) {
            result.regexStr = result.originUrl
          }
        }
        return result
      })
      Vue.ls.set(PATH_MAPPING_URL, pathMapping)
      callback()
    } else {
      console.error('该系统未在控制中心上线')
    }
  })
}

function getUrlParam (paraName) {
  let url = document.location.toString()
  let arrObj = url.split('?')
  if (arrObj.length > 1) {
    let arrPara = arrObj[1].split('&')
    let arr
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] == paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}

const START = {
  init: init,
  initNoBody: initNoBody
}

export default START