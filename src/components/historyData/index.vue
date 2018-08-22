<template>
  <div class="">
    <mt-header title="历史统计数据">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right">
        <span class="rightbtn" @click="$router.push({path: '/filter'})">筛选</span>
      </mt-button>
    </mt-header>
    <pullup @request="request" :allLoaded="allLoaded">
      <!-- <card type="list" v-for="(item, index) in items" :key="index" v-bind:data="item" @click.native="$store.state.user.roleLevel !== 1?$router.push({name: 'dataDetail', query: {     
        busLineId: form.busLineId,
        cityId: form.cityId,
        startTime: item.startTime,
        endTime: item.endTime
      }}):''"></card> -->
      <card type="list" v-for="(item, index) in items" :key="index" v-bind:data="item"></card>
    </pullup>
  </div>
</template>

<script>
export default {
  name: '',
  beforeRouteEnter (to, from, next){
    next(vm => {
      if(from.path === '/filter'){
        let {busLineId, startTime, endTime, storeCity} = vm.$store.state.filter
        if (vm.$store.state.user.roleLevel !== 1) {
          Object.assign(vm.form, {
            cityId: storeCity,
            busLineId,
            endTime,
            startTime
            
          })
        } else {
          Object.assign(vm.form, {
            busLineId,
            endTime,
            startTime
          })
        }
      }
    });
  },
  created () {
    this.getData()
  },
  data () {
    return {
      form: {
        busLineId: '',
        cityId: '',
        endTime: '',
        from: 'bdcrm',
        startTime: '',
        token: this.$store.state.token
      },
      allLoaded: false,
      pageIndex: '',
      pageCount: '',
      items: []
    }
  },
  methods: {
    getData (item) {
      this.axios.countList(this.form).then(({ data }) => {
        if (data.success) {
          this.pageIndex = data.data.pageIndex
          this.pageCount = data.data.pageIndex
          data.data.pageCount === data.data.pageIndex|| data.data.rowsCount==0 ? this.allLoaded = true: ''
          this.$set(this, 'items', this.items.concat(this.util.sortDate(data.data.list, 'startTime')))
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
