import axios from 'axios'
import store from './store'
import router from './router'

// 设置全局axios默认值
function toFormData (obj, form, namespace) {
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
}
function setDataType (opts) {
  var str = '';
  for (var i in opts) {
    if (opts[i].constructor === Array) {
      for (var j = 0; j < opts[i].length; j++) {
        if (opts[i][j].constructor === Object) {
          for (var s in opts[i][j]) {
            str += i + '[' + j + ']' + '.' + s + '=' + opts[i][j][s] + '&';
          }
        } else {
          str += i + '=' + opts[i].join(',') + '&';
          break;
        }
      }
    } else if (opts[i].constructor === Object) {
      for (var s in opts[i]) {
        str += i + '.' + s + '=' + opts[i][s] + '&';
      }
    } else {
      str += i + '=' + opts[i] + '&';
    }
  }
  return str.substring(0, str.length - 1);
}
// axios.defaults.baseURL = process
// axios.defaults.baseURL = 'https://bdcrm-h5-api.juzifenqi.com'
axios.defaults.baseURL = 'https://bdcrm-h5-api.juzifenqi.com'
// 创建一个axios实例
const instance = axios.create()
instance.interceptors.request.use = axios.interceptors.request.use
// request拦截器
console.log(process)
console.log(process.env)
instance.interceptors.request.use(
  config => {
    // 请求数据格式转换
    config.transformRequest = [function (data) {
      if (data) {
        if (data.blob) {
          config.headers = {'Content-Type': 'multipart/form-data'}
          delete data.blob
          let fd = toFormData(data)
          return fd
        } else {
          return setDataType(data)
        }
      }
    }]
    return config
  }
)
// respone拦截器
instance.interceptors.response.use(
  response => {
    // 登录失效跳转登录页
    if (!response.data.success && response.data.errorCode === 'S_ERR:100023' || response.data.errorCode === '30001') {
      router.push({path: '/login'})
    }else{
      return response
    }
  },
  error => { // 默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      router.push({path: '/login'})
      // switch (error.response.status) {
      //   case 401:
      //     store.dispatch('UserLogout') // 可能是token过期，清除它
      //     router.replace({ // 跳转到登录页面
      //       path: 'login',
      //       query: {redirect: router.currentRoute.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      //     })
      // }
    }
    return error.response
  }
)

export default {
  // 用户相关api
  login (data) {
    return instance.post('/dologin', data)
  },
  logout (data) {
    return instance.post('/user/logout', data)
  },
  sendSmsCode (data) {
    return instance.post('/sms/sendSmsCode', data)
  },
  setPwd (data) {
    return instance.post('/user/setpassword', data)
  },
  regToken (data) {
    return instance.post('/wechat/invalidToBuskenEffective', data)
  },
  rePwd (data) {
    return instance.post('/user/alterpassword', data)
  },
  userIndex (data) {
    return instance.post('/user/index', data)
  },
  // 客户相关api
  changeSignPut (data) {
    return instance.post('/change/sign/put', data)
  },
  changePut (data) {
    return instance.post('/change/put', data)
  },
  changeSignPush (data) {
    return instance.post('/change/sign/push', data)
  },
  createCustom (data) {
    return instance.post('/custom/post', data)
  },
  putCustom (data) {
    return instance.post('/custom/put', data)
  },
  customList (data) {
    return instance.post('/custom/list', data)
  },
  getCustom (data) {
    return instance.post('/custom/get', data)
  },
  getChange (data) {
    return instance.post('/change/get', data)
  },
  insuranceList (data) {
    return instance.post('/custom/insurance/list', data)
  },
  createVisit (data) {
    return instance.post('/custom/visit/add', data)
  },
  visitList (data) {
    return instance.post('/custom/visit/list', data)
  },
  visitDetail (data) {
    return instance.post('/custom/visit/detail', data)
  },
  // 商户相关API
  busList (data) {
    return instance.post('/business/list', data)
  },
  busChannelList (data) {
    return instance.post('/custom/sign/getBussinessChannelList', data)
  },
  busEditPush (data) {
    return instance.post('/business/editpush', data)
  },
  getBus (data) {
    return instance.post('/business/get', data)
  },
  upload (data) {
    return instance.post('/custom/sign/upload', data)
  },
  customPut (data) {
    return instance.post('/custom/sign/put', data)
  },
  delPhoto (data) {
    return instance.post('/custom/sign/deletePhoto', data)
  },
  busPush (data) {
    return instance.post('/business/push', data)
  },
  customPush (data) {
    return instance.post('/custom/sign/push', data)
  },
  customGet (data) {
    return instance.post('/custom/sign/get', data)
  },
  // 拜访相关
  addVisit (data) {
    return instance.post('/custom/visit/add', data)
  },
  // visitList (data) {
  //   return instance.post('/custom/visit/list', data)
  // },
  // 历史数据相关
  countList (data) {
    return instance.post('/data/count/list', data)
  },
  countDetail (data) {
    return instance.post('/data/count/detail', data)
  },
  customCountList (data) {
    return instance.post('/data/count/custom/list', data)
  },
  userCountList (data) {
    return instance.post('/data/count/user/list', data)
  },
  userCountDetail (data) {
    return instance.post('/data/count/user/detail', data)
  },
  // 订单相关
  orderList (data) {
    return instance.post('/business/order/list', data)
  },
  getOrder (data) {
    return instance.post('/business/order/get', data)
  },
  repayList (data) {
    return instance.post('/business/order/repay/list', data)
  },
  // 审批相关
  approveList (data) {
    return instance.post('/approve/list', data)
  },
  approveDetail (data) {
    return instance.post('/approve/get', data)
  },
  approveCustomDetail (data) {
    return instance.post('/custom/user/get', data)
  },
  approveReject (data) {
    return instance.post('/approve/reject', data)
  },
  approval (data) {
    return instance.post('/approve/approval', data)
  },
  customSelect (data) {
    return instance.post('/custom/user/select', data)
  },
  changeCustom (data) {
    return instance.post('/custom/user/change', data)
  },
  customApproval (data) {
    return instance.post('/custom/user/approval', data)
  },
  customReject (data) {
    return instance.post('/custom/user/reject', data)
  }
}
