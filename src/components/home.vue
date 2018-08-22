<template>
  <div class=""  v-if="!loading">
    <mt-header title="BD_CRM系统">
    </mt-header>
    <div class="card-title" @click="$router.push({path: '/userCenter'})">
      {{indexInfo.user.userName}} ({{indexInfo.user.roleName}})
    </div>
    <card type="detail" @click.native="$router.push({path: '/historyData'})" v-bind:data="{
      tag: indexInfo.followMonth.split('-')[1] + '月',
      gmvCount: indexInfo.gmvCount,
      orderCount: indexInfo.shopCount,
      visitCount: indexInfo.visitCount
    }"></card>
    <!-- <div class="pull" @click="$router.push({path: '/authPull'})">
      <mt-cell title="拉新用户数" :value="util.fmoney(indexInfo.recommendCount) + '人'" ></mt-cell>
      <mt-cell title="认证用户数" :value="util.fmoney(indexInfo.authCount) + '人'"></mt-cell>
    </div> -->
    <mt-cell title="创建商户" is-link to="/createBusiness" v-if="indexInfo.user.roleLevel === 1"></mt-cell>
    <mt-cell title="商户管理" is-link to="/businessCenter">
      <span v-if="indexInfo.expireCustomCount">{{indexInfo.expireCustomCount}}家</span>
      <span v-if="indexInfo.expireCustomCount" style="color: red">即将到期</span>
    </mt-cell>
    <mt-cell title="商户订单" is-link to="/order">
      <span v-if="indexInfo.orderCount">共{{indexInfo.orderCount}}单</span>
    </mt-cell>
    <mt-cell title="拜访记录" is-link to="/visitRecord">
    </mt-cell>
    <mt-cell title="审批管理" is-link to="/approvalCenter">
      <div v-if="indexInfo.approvalCount">{{indexInfo.approvalCount}}条<span style="color: red">审批中</span></div>
    </mt-cell>
    <div class="btnl">
      <mt-button size="large" type="primary" @click="logout">退出系统</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  beforeCreate () {
    let d = new Date()
    let date = d.getFullYear() + '-' + (d.getMonth() + 1)
    // 请求首页数据
    this.axios.userIndex({followMonth: date, from: 'bdcrm', token: this.$store.state.token}).then(({ data }) => {
      if (data.success) {
        this.$set(this, 'indexInfo', data.data)
        this.$store.dispatch({
          type: 'User',
          user: {
            followMonth: data.data.followMonth,
            ...data.data.user
          }
        })
        this.loading = false
      }
      if (!data.success) {
        this.$toast({
          message: data.msg,
          position: 'model',
          duration: 3000
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  data () {
    return {
      loading: true,
      indexInfo: {}
    }
  },
  methods: {
    logout () {
      this.axios.logout({from: 'bdcrm', token: this.$store.state.token}).then(({ data }) => {
        if (data.success) {
          this.$store.commit({
            type: 'LOGOUT'
          })
          this.$toast({
            message: '登出成功',
            position: 'model',
            duration: 3000
          })
          this.$router.push({
            path: '/login'
          })
        }
        if (!data.success) {
          this.$toast({
            message: data.msg,
            position: 'model',
            duration: 3000
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
