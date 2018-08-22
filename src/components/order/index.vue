<template>
  <div class="">
    <mt-header title="商户订单">
      <router-link slot="left" to="">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
      <mt-button slot="right">
        <span class="rightbtn" @click="$router.push({name: 'filter', query: {order:'order'}})">筛选</span>
      </mt-button>
    </mt-header>
    <div class="filterCon">
      <div class="item" ref="button">
        <span>业务线</span>
        <span>▼</span>
        <select class="form-control" v-model="form.busLineId" v-on:change="search">
          <option v-for="(item, index) in options1" :key="index" :value="item.code" v-text="item.name"></option>
        </select>
      </div>
      <div class="item" ref="button2">
        <span>商户状态</span>
        <span>▼</span>
        <select class="form-control" v-model="form.crmState" v-on:change="search">
          <option v-for="(item, index) in options2" :key="index" :value="item.code" v-text="item.name"></option>
        </select>
      </div>
    </div>
    <pullup @request="request" :allLoaded="allLoaded">
      <cardorder type="" v-for="(item, index) in items" :key="index" v-bind:data="item" @click.native="$router.push({path: '/orderDetail/' + item.orderId})"></cardorder>
    </pullup>
  </div>
</template>
<script>
export default {
  name: '',
  beforeRouteEnter (to, from, next){
    next(vm => {
      if(from.path === '/filter'){
        vm.$store.state.selected === '2'? vm.flag = true : ''
        let {endTime, startTime, orderId, shopName} = vm.$store.state.filter
        Object.assign(vm.form, {
          orderId,
          endTime,
          shopName,
          startTime
        })
      }
      if (vm.$route.query.id) {
        vm.form.customId = vm.$route.query.id
      }
    })
  },
  created () {
    this.getData()
  },
  data () {
    return {
      form: {
        busLineId: '',
        crmState: '',
        customId: '',
        endTime: '',
        from: 'bdcrm',
        orderId: '',
        page: 1,
        rows: 10,
        startTime: '',
        token: this.$store.state.token
      },
      items: [],
      allLoaded: false,
      pageIndex: '',
      pageCount: '',
      options1: [{'name': '全部', 'code': ''}, {'name': '商城', 'code': '1'}, {'name': '新零售', 'code': '2'}],
      options2: [{'name': '全部', 'code': ''},{'name': ' 未签约', 'code': 0}, {'name': '签约中', 'code': 1}, {'name': '入驻审批', 'code': 2}, {'name': '入驻中', 'code': 3},
      {'name': '审批中', 'code': 4}, {'name': '冻结中', 'code': 5}, {'name': '过期', 'code': 6}, {'name': '失败', 'code': -1}]
    }
  },
  watch: {
  },
  methods: {
    search () {
      this.items = []
      this.getData()
    },
    getData () {
      this.axios.orderList(this.form).then(({ data }) => {
        if (data.success) {
          this.pageIndex = data.data.pageIndex
          this.pageCount = data.data.pageCount
          data.data.pageCount === data.data.pageIndex|| data.data.rowsCount==0 ? this.allLoaded = true: ''
          this.$set(this, 'items', this.items.concat(this.util.sortDate(data.data.list, 'orderState')))
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
    request () {
      if (this.pageIndex === this.pageCount) {
        this.allLoaded = true
      } else {
        this.form.page = ++this.pageIndex
        this.getData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
