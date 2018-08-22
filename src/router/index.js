import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component (resolve) {
        require(['@/components/login'], resolve)
      }
    },
    {
      path: '/authentication',
      name: 'authentication',
      component (resolve) {
        require(['@/components/user/authentication'], resolve)
      }
    },
    {
      path: '/setPwd/:id',
      name: 'setPwd',
      component (resolve) {
        require(['@/components/user/setPwd'], resolve)
      },
      props: true
    },
    {
      path: '/home',
      name: 'home',
      component (resolve) {
        require(['@/components/home'], resolve)
      }
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component (resolve) {
        require(['@/components/user/userCenter'], resolve)
      }
    },
    {
      path: '/rePwd',
      name: 'rePwd',
      component (resolve) {
        require(['@/components/user/rePwd'], resolve)
      }
    },
    {
      path: '/historyData',
      name: 'historyData',
      component (resolve) {
        require(['@/components/historyData'], resolve)
      }
    },
    // {
    //   path: '/dataDetail',
    //   name: 'dataDetail',
    //   component (resolve) {
    //     require(['@/components/historyData/dataDetail'], resolve)
    //   }
    // },
    {
      path: '/countList',
      name: 'countList',
      component (resolve) {
        require(['@/components/businessCenter/countList'], resolve)
      }
    },
    {
      path: '/approvalCenter',
      name: 'approvalCenter',
      component (resolve) {
        require(['@/components/approvalCenter'], resolve)
      }
    },
    {
      path: '/approvalDetail/:id',
      name: 'approvalDetail',
      component (resolve) {
        require(['@/components/approvalCenter/approvalDetail'], resolve)
      },
      props: true
    },
    {
      path: '/approval',
      name: 'approval',
      component (resolve) {
        require(['@/components/approvalCenter/approval'], resolve)
      }
    },
    // {
    //   path: '/authPull',
    //   name: 'authPull',
    //   component (resolve) {
    //     require(['@/components/authPull/index'], resolve)
    //   }
    // },
    // {
    //   path: '/busPull/:id',
    //   name: 'busPull',
    //   component (resolve) {
    //     require(['@/components/businessCenter/businessPull'], resolve)
    //   },
    //   props: true
    // },
    // {
    //   path: '/pullDetail',
    //   name: 'pullDetail',
    //   component (resolve) {
    //     require(['@/components/authPull/pullDetail'], resolve)
    //   }
    // },
    {
      path: '/createBusiness',
      name: 'createBusiness',
      component (resolve) {
        require(['@/components/businessCenter/createBusiness'], resolve)
      }
    },
    {
      path: '/completeInfo/:id',
      name: 'completeInfo',
      component (resolve) {
        require(['@/components/businessCenter/completeInfo'], resolve)
      },
      props: true
    },
    {
      path: '/visitRecord',
      name: 'visitRecord',
      component (resolve) {
        require(['@/components/visitRecord/index.vue'], resolve)
      }
    },
    {
      path: '/visitDetail/:id',
      name: 'visitDetail',
      component (resolve) {
        require(['@/components/visitRecord/visitDetail'], resolve)
      },
      props: true
    },
    {
      path: '/createVisit/:id',
      name: 'createVisit',
      component (resolve) {
        require(['@/components/visitRecord/createVisit'], resolve)
      },
      props: true
    },
    {
      path: '/order',
      name: 'order',
      component (resolve) {
        require(['@/components/order'], resolve)
      }
    },
    {
      path: '/orderDetail/:id',
      name: '/orderDetail',
      component (resolve) {
        require(['@/components/order/orderDetail'], resolve)
      },
      props: true
    },
    {
      path: '/account/:id',
      name: '/account',
      component (resolve) {
        require(['@/components/order/account'], resolve)
      },
      props: true
    },
    {
      path: '/businessCenter',
      name: 'businessCenter',
      component (resolve) {
        require(['@/components/businessCenter'], resolve)
      }
    },
    {
      path: '/busInfo/:id',
      name: 'busInfo',
      component (resolve) {
        require(['@/components/businessCenter/busInfo'], resolve)
      },
      props: true
    },
    {
      path: '/contract',
      name: 'contract',
      component (resolve) {
        require(['@/components/businessCenter/contract'], resolve)
      }
    },
    {
      path: '/contractInfo',
      name: 'contractInfo',
      component (resolve) {
        require(['@/components/businessCenter/contractInfo'], resolve)
      }
    },
    {
      path: '/detailEnter/:id',
      name: 'detailEnter',
      component (resolve) {
        require(['@/components/businessCenter/detailEnter'], resolve)
      },
      props: true
    },
    {
      path: '/detailNotEnter/:id',
      name: 'detailNotEnter',
      component (resolve) {
        require(['@/components/businessCenter/detailNotEnter'], resolve)
      },
      props: true
    },
    {
      path: '/mngChange',
      name: 'mngChange',
      component (resolve) {
        require(['@/components/businessCenter/mngChange'], resolve)
      }
    },
    {
      path: '/filter',
      name: 'filter',
      component (resolve) {
        require(['@/components/common/filter'], resolve)
      }
    }
  ]
})
