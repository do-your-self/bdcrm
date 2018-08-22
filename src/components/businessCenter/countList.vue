<template>
  <div class="">
    <mt-header title="历史统计数据">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <pullup @request="request" :allLoaded="allLoaded">
      <card type="busDetail" v-for="(item, index) in items" :key="index" v-bind:data="item"></card>
    </pullup>
  </div>
</template>

<script>
export default {
  name: '',
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
          this.pageCount = data.data.pageCount
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
