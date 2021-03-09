

/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 校验数据是否缺失
 */
export function isDataIntegrity(...data){
  for(let i in data){
    if(type(data[i]) === 'object'){// 对象 数组
      if (Object.keys(data[i]).length === 0) {
        return false
      }
    }else if(data[i]==='' || data[i] === null || data[i] === undefined){
      return false
    }
  }
  return true
}
/**
 * 身份证号
 * @param {*} s
 */
export function isIdNumber(s) {
  return /^\d{15}|\d{18}$/.test(s)
}
/**
 * 小数点位数
 * @param {*} s
 */
export function radixNumber(s) {
  return /^(0[1-9][0-9]*)+(.[0-9]{1,5})?$/.test(s)
}
