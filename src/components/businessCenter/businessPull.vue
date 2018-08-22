<template>
  <div class="" v-if="!loading">
    <mt-header title="商户用户认证拉新">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">拉新人数</mt-tab-item>
      <mt-tab-item id="2">认证人数</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" v-if="selected === '1'">
        <pullup @request="request" :allLoaded="allLoaded">
          <cardpull type="custom" v-for="(item, index) in items" :key="index" v-bind:data="item"></cardpull>
        </pullup>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <pullup @request="request" :allLoaded="allLoaded2" v-if="selected === '2'">
          <cardpull :isReg=true type="custom" v-for="(item, index) in items2" :key="index" v-bind:data="item"></cardpull>
        </pullup>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    id: String
  },
  created () {
    this.getData()
  },
  data () {
    return {
      form: {
        customId: this.id,	
        flag: 1,
        from: 'bdcrm',
        token: this.$store.state.token
      },
      loading: true,
      selected: '1',
      allLoaded: false,
      allLoaded2: false,
      items: [],
      items2: [],
      pageIndex: '',
      pageIndex2: '',
      pageCount: '',
      pageCount2: '',
      flag: false
    }
  },
  methods: {
    getData () {
      this.axios.customCountList(this.form).then(({ data }) => {
        if (data.success) {
          if (this.selected === '1') {
            this.pageIndex = data.data.pageIndex
            this.pageCount = data.data.pageCount
            data.data.pageCount === data.data.pageIndex|| data.data.rowsCount==0 ? this.allLoaded = true: ''
            this.$set(this, 'items', this.items.concat(this.util.sortDate(data.data.list, 'month')))
          } else if (this.selected === '2') {
            this.pageIndex2 = data.data.pageIndex
            this.pageCount2 = data.data.pageCount
            data.data.pageCount === data.data.pageIndex|| data.data.rowsCount==0 ? this.allLoaded2 = true: ''
            this.$set(this, 'items2', this.items2.concat(this.util.sortDate(data.data.list, 'month')))
          }
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
    request () {
      if (this.selected === '1') {
        if (this.pageIndex === this.pageCount) {
          this.allLoaded = true
        } else {
          this.form.page = ++this.pageIndex
          this.getData()
        }
      } else if (this.selected === '2') {
        if (this.pageIndex2 === this.pageCount2) {
          this.allLoaded2 = true
        } else {
          this.form.page = ++this.pageIndex2
          this.getData()
        }
      }
    }
  },
  watch: {
    selected: function (val, oldVal) {
      // 这里就可以通过 val 的值变更来确定
      this.form.flag = val
      if (val === '2' && !this.flag) {
        this.flag = true
        this.getData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
