<template>
  <div class="">
    <mt-header title="账单">
      <router-link slot="left" to="">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <div v-for="(item, index) in items" :key="index" v-bind:data="item">
      <div class="container">
        <div class="item">{{item.period}}期</div>
        <div class="item">¥{{util.fmoney(item.repayMoney, 2)}}（含服务费{{util.fmoney(item.serviceCharge, 2)}}）</div>
      </div>
      <div class="container">
        <div class="item">还款日{{item.repayDay}}</div>
        <div class="item"><span>{{item.state}}</span></div>
      </div>
    </div>
    <!-- <div class="container">
      <div class="item">1/21期</div>
      <div class="item">¥174.17（含服务费¥7.50</div>
    </div>
    <div class="container">
      <div class="item">还款日2017-11-08</div>
      <div class="item"><span>已还清</span></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    id: String
  },
  created () {
    this.axios.repayList(this.form).then(({ data }) => {
      console.log(data)
      if (data.success) {
        this.$set(this, 'items', data.data.list)
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
      form: {
        from: 'bdcrm',
        orderId: this.id,
        token: this.$store.state.token
      },
      items: []
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: $white;
  display: flex;
  font-size: $font-small;
  color: $color-primary;
  padding: 0 10px;
  .item {
    flex: 1;
    padding-top: 5px;
    line-height: 21px;
  }
  .item:first-child {
    text-align: left;
  }
  .item:last-child {
    text-align: right;
  }
}
</style>
