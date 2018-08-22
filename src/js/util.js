export default {
  /**
   * 格式化金额，按千位逗号分割
   * @param {*} s 需要格式化的金额数值 number
   * @param {*} n 控制小数的位数 number 默认为0
   */
  fmoney (s, n) {
    n = n || 0
    n = n >= 0 && n <= 20 ? n : 2
    s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
    var l = s.split('.')[0].split('').reverse()
    let r = s.split('.')[1]
    let t = ''
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
    }
    if (n) {
      return t.split('').reverse().join('') + '.' + r
    } else {
      return t.split('').reverse().join('')
    }
  },
  /**
   * 将json转换成form-data格式
   * @param {*} obj 传入的json对象
   * @param {*} form
   * @param {*} namespace
   */
  toFormData (obj, form, namespace) {
    const fd = form || new FormData()
    let formKey
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        let key = Array.isArray(obj) ? '[]' : `[${property}]`
        if (namespace) {
          formKey = namespace + key
        } else {
          formKey = property
        }
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.toFormData(obj[property], fd, formKey)
        } else {
          fd.append(formKey, obj[property])
        }
      }
    }
    return fd
  },
  /**
   * 日期排序
   * @param {*} arr 要排序的数组
   * @param {*} date 进行排序的字段
   * @param {*} flag 顺序或倒序 默认倒序
   */
  sortDate (arr, date, flag) {
    arr.sort(function (a, b) {
      if (flag) {
        return b[date] < a[date] ? 1 : -1
      } else {
        return b[date] < a[date] ? -1 : 1
      }
    })
    return arr
  },
  /**
   * 获取地址
   * @param {*} province 省
   * @param {*} city 市
   * @param {*} area 区
   */
  getAddr (province, city, area) {
    var str = ''
    province ? str += province.split('@')[0] : ''
    province && city ? str += '/' : ''
    city ? str += city.split('@')[0] : ''
    city && area ? str += '/' : ''
    area ? str += area.split('@')[0] : ''
    return str
  },
  regExp (reg, val, msg, title) {
    var flag = true
    var message = ''
    if (val === '') {
      msg = title + "不能为空"
      flag = false
      return {flag, message}
    } else if (!reg.test(val)) {
      flag = false
      return {flag, msg}
    } else {
      flag = true
      return {flag}
    }
  } 
}
