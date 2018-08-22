<template>
  <div class="" v-if="!loading">
    <mt-header title="审批管理">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-navbar v-model="selected" v-show="$store.state.user.roleLevel === 2 || $store.state.user.roleLevel === 3">
      <mt-tab-item id="1">我审批的</mt-tab-item>
      <mt-tab-item id="2">我发起的</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" class="ms" v-if="selected === '1'">
        <pullup @request="request" :allLoaded="allLoaded">
          <cardapproval v-for="(item, index) in items" :key="index" v-bind:data="item" @click.native="$router.push({'path': '/approvalDetail/' + item.id,query:{type:item.type}})"></cardapproval>
        </pullup>
      </mt-tab-container-item>
      <mt-tab-container-item id="2" class="ms">
        <pullup @request="request" :allLoaded="allLoaded2" v-if="selected === '2'">
          <cardapproval v-for="(item, index) in items2" :key="index" v-bind:data="item" @click.native="$router.push({'path': '/approvalDetail/' + item.id,query:{type:item.type}})"></cardapproval>
        </pullup>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: '',
  created () {
    if (this.$store.state.user.roleLevel === 1) {
      this.form.approveType = 2
    }
    this.getData()
  },
  data () {
    return {
      form: {
        approveType: '1',
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
      this.axios.approveList(this.form).then(({ data }) => {
        if (data.success) {
          if (this.selected === '1') {
            this.pageIndex = data.data.pageIndex
            this.pageCount = data.data.pageIndex
            data.data.pageCount === data.data.pageIndex|| data.data.rowsCount==0 ? this.allLoaded = true: ''
            this.$set(this, 'items', this.items.concat(this.util.sortDate(data.data.list, 'createDate')))
          } else {
            this.pageIndex2 = data.data.pageIndex
            this.pageCount2 = data.data.pageCount
            data.data.pageCount === data.data.pageIndex|| data.data.rowsCount==0 ? this.allLoaded2 = true: ''
            this.$set(this, 'items2', this.items2.concat(this.util.sortDate(data.data.list, 'createDate')))
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
      } else {
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
      this.form.approveType = val
      if (val === '2' && !this.flag) {
        this.flag = true
        this.getData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid $color-primary;
  }
</style>
