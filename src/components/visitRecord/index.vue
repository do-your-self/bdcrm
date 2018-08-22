<template>
  <div class="" v-if="!loading">
    <mt-header title="拜访记录">
      <router-link :to="$store.state.backPath" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right">
        <span class="rightbtn" @click="$router.push({path: '/filter'})">筛选</span>
      </mt-button>
    </mt-header>
    <pullup @request="request" :allLoaded="allLoaded">
      <div v-for="(v, i) in util.sortDate(Object.keys(items))" :key="i">
        <div class="head">
          {{v}}
        </div>
        <cardvisit type='list' v-for="(item, index) in items[v]" :key="index" v-bind:data="item" @click.native="$router.push({path: `/visitDetail/${item.visitId}`})"></cardvisit>
      </div>

    </pullup>
  </div>
</template>

<script>
export default {
  name: '',
  beforeRouteEnter (to, from, next){
    next(vm => {
      if(from.name==='createVisit'||from.name==='detailNotEnter'){
        vm.backPath = 'detailNotEnter/'+to.query.id
      }
      if(from.path === '/filter'){
        let {busLineId, startTime, endTime, shopName, storeCity} = vm.$store.state.filter
        if (vm.$store.state.user.roleLevel !== 1) {
          Object.assign(vm.form, {
            busLineId,
            endTime,
            shopName,
            startTime,
            storeCity
          })
        } else {
          Object.assign(vm.form, {
            busLineId,
            endTime,
            shopName,
            startTime,
            storeCity
          })
        }
      }
      if (to.query.id) {
        vm.form.customId = to.query.id
      }
      if (from.path != '/'){
        vm.$store.dispatch({
          type: "BackPath",
          payload: vm.backPath
        });
      }
    });
  },
  created () {
    this.getData()
  },
  data () {
    return {
      backPath: '/home',
      form: {
        busLineId: '',
        customId: '',
        endTime: '',
        from: 'bdcrm',
        page: 1,
        rows: 10,
        shopName: '',
        startTime: '',
        storeCity: '',
        token: this.$store.state.token,
        userName: '',
        userId: this.$store.state.user.userId
      },
      allLoaded: false,
      items: {},
      pageIndex: '',
      pageCount: '',
      loading: true
    }
  },
  methods: {
    getData () {
      this.axios.visitList(this.form).then(({ data }) => {
        if (data.success) {
          data.data.rowsCount===0?this.allLoaded = true: ''
          this.pageIndex = data.data.pageIndex
          this.pageCount = data.data.pageCount
          data.data.pageCount === data.data.pageIndex|| data.data.rowsCount==0? this.allLoaded = true: ''
          this.$set(this, 'items', Object.assign(this.items, data.data.list))
          this.loading=false
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
.head {
  font-size: $font-middle;
  color: $color-primary;
  font-weight: 700;
  padding: 10px 10px 0;
}
.mint-button-text {
  display: inline-block;
  height: 35px;
  line-height: 35px;
}
.size {
  font-size: 20px;
  padding: 0 10px 0 15px;
  position: relative;
  top: 3px;
}
</style>
