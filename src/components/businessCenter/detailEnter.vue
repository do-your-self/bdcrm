<template>
  <div class="" v-if="!loading">
    <mt-header title="商户详情">
      <router-link to="/businessCenter" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="data">
      <div class="title">
        {{data.customName}}<span v-if="data.busLineName">新</span><span v-if="data.categoryName">健</span>
      </div>
      <div class="container">
        <span>风评等级：{{data.grade}}</span>&nbsp;&nbsp;&nbsp;<span v-if="data.totalQuota">授信额度：{{util.fmoney(data.totalQuota, 2)}}万</span>
      </div>
      <span class="tag" :class="crmState[data.crmState].class">{{crmState[data.crmState].text}}</span>
    </div>
    <card type="busDetail" v-bind:data="{
      tag: date.split('-')[1] + '月',
      gmvCount: data.gmvCount,
      finCount: data.finCount,
      orderCount: data.orderCount
    }"></card>
    <!-- <div class="pull" @click="$router.push({path: '/busPull/' + id})">
      <mt-cell title="拉新用户数" :value="util.fmoney(data.recommendCount)+'人'" ></mt-cell>
      <mt-cell title="认证用户数" :value="util.fmoney(data.authCount)+'人'"></mt-cell>
    </div> -->
    <mt-field class="ms" :readonly=true :disableClear=true label="客户经理" v-model="data.userFullName">
      <span v-if="$store.state.user.roleLevel===2" @click="$router.push({name: 'mngChange', query: {id: id, name: data.userFullName}})">变更>></span>
    </mt-field>
    <mt-field :readonly=true :disableClear=true label="门店联系人" v-model="data.storePerson"></mt-field>
    <mt-field :readonly=true :disableClear=true label="联系电话" placeholder="" v-model="data.storeMobile">
    </mt-field>
    <mt-field :readonly=true :disableClear=true label="签约日期" v-model="data.contractSignTime"></mt-field>
    <mt-field :readonly=true :disableClear=true label="我方签约人" v-model="data.userFullName"></mt-field>
    <mt-field :readonly=true :disableClear=true label="门店地址" v-model="data.storeAddress"></mt-field>
    <mt-cell title="商户信息" is-link class="ml" @click.native="$router.push({path: '/busInfo/' + id})"></mt-cell>
    <mt-cell title="合同信息" is-link @click.native="$router.push({name: 'contractInfo', query:{
          id:id,canEdit: data.crmState==4?false:true}})"></mt-cell>
    <mt-cell title="商户订单" is-link @click.native="$router.push({name: 'order', query:{id: id}})"></mt-cell>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    'id': String
  },
  created () {
    let d = new Date()
    let date = d.getFullYear() + '-' + (d.getMonth() + 1)
    this.date = date
    this.axios.getBus({customId: this.id, followMonth: date, from: 'bdcrm', token: this.$store.state.token}).then(({ data }) => {
      if (data.success) {
        this.$set(this, 'data', data.data)
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
      data: {},
      date: '',
      crmState: {
        '2': {
          text: '入驻审批',
          class: 'await'
        },
        '3': {
          text: '入驻中',
          class: 'success'
        },
        '4': {
          text: '修改审批',
          class: 'await'
        },
        '5': {
          text: '冻结中',
          class: 'error'
        }
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.data {
  position: relative;
  padding: 10px;
  font-size: $font-middle;
  .title {
    span {
      margin-left: 5px;
      padding: 2px 5px;
      background: $color-primary;
      color: $white;
      border-radius: 3px;
      font-size: 12px;
    }
  }
  .tag {
    font-size: $font-small;
    position: absolute;
    top: 10px;
    right: 0;
    width: 50px;
    padding: 2px 5px;
    text-align: center;
    color: $white;
  }
  .success {
    background: #6c9;
  }
  .await {
    background: #ffcc33;
  }
  .error {
    background: #868686;
  }
}
.container {
  padding-top: 10px;
  display: flex;
  color: #999;
  font-size: $font-small;
}
</style>
