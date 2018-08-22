<template>
  <div class="" v-if="!loading">
    <mt-field v-if="$route.query.order" label="商户门店名称" placeholder="请输入商户名称" v-model="form.shopName"></mt-field>
    <mt-field v-if="$route.query.order" label="订单号" placeholder="请输入订单号" v-model="form.orderId"></mt-field>
    <selectList title="开始时间" type="date" v-model="form.startTime"></selectList>
    <selectList title="结束时间" type="date" v-model="form.endTime"></selectList>
    <selectList title="业务线" type="line" v-on:select="getValue" v-if="!$route.query.order"></selectList>
    <selectList title="城市" type="city" v-on:select="getValue" v-if="!$route.query.order&&$store.state.user.roleLevel !== 1"></selectList>
    <div class="btnCon">
      <mt-button size="small" type="default" class="btn" @click="$router.go(-1)">取消</mt-button>
      <mt-button size="small" type="primary" class="btn btnR" @click="submit">确定</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  created () {
    this.$store.dispatch({
      type: 'Filter',
      form: this.form
    })
    this.loading = false
  },
  data () {
    return {
      loading: true,
      form: {
        busLineId: '',
        endTime: '',
        shopName: '',
        startTime: '',
        storeCity: '',
        orderId: ''
      }
    }
  },
  methods: {
    getValue (values, type) {
      switch (type) {
        case 'line':
          this.form.busLineId = values[0].code
          break;
        case 'city':
          this.form.storeCity = values[0].name + '@' + values[0].code
          break;
      }
    },
    getEndVal (value) {
      this.form.endTime = value
    },
    openPicker (picker, flag) {
      this.flag = flag
      this.$refs[picker].open()
    },
    handleChange (value) {
      let d = new Date(value)
      let resDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      if (this.flag === 'start') {
        this.start = resDate
      } else {
        this.end = resDate
      }
    },
    submit () {
      this.$store.dispatch({
        type: 'Filter',
        form: this.form
      })
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
