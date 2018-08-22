// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './css/index.scss'
import App from './App'
import router from './router'
import exif from 'exif-js' // 用于获取拍摄图片的基本信息（例如：拍摄方向）
import axios from './axios.js'
import store from './store'
import util from './js/util'
import card from './components/common/card'
import cardapproval from './components/common/cardapproval'
import cardbus from './components/common/cardbus'
import cardorder from './components/common/cardorder'
import cardpull from './components/common/cardpull'
import cardvisit from './components/common/cardvisit'
import pullup from './components/common/pullup'
import selectList from './components/common/selectList'
Vue.component('card', card)
Vue.component('cardapproval', cardapproval)
Vue.component('cardbus', cardbus)
Vue.component('cardorder', cardorder)
Vue.component('cardpull', cardpull)
Vue.component('cardvisit', cardvisit)
Vue.component('pullup', pullup)
Vue.component('selectList', selectList)
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.prototype.axios = axios
Vue.prototype.util = util
Vue.prototype.EXIF = exif
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
