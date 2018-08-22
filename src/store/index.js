import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
Vue.use(Vuex)
// 初始化时用sessionStore.getItem(''),这样子刷新页面就无需重新登录
let data = {}
if (sessionStorage.getItem('login')) {
  let login = JSON.parse(sessionStorage.getItem('login'))
  let user = JSON.parse(sessionStorage.getItem('user'))
  let filter = JSON.parse(sessionStorage.getItem('filter'))
  let versionId = JSON.parse(sessionStorage.getItem('versionId'))
  let backPath = JSON.parse(sessionStorage.getItem('backPath'))
  data = {
    filter: filter,
    user: user,
    selected: '',
    versionId: versionId,
    backPath: backPath,
    ...login
  }
} else {
  data = {
    token: '',
    versionId: '',
    selected: '',
    baseInfo: {},
    filter: {},
    user: {},
    backPath: {}
  }
}
const state = data
export default new Vuex.Store({
  state,
  mutations,
  actions
})
