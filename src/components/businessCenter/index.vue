<template>
  <div class="" v-if="!loading">
    <mt-header title="商户管理">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="search" slot="right" @click="popupVisible = true"></mt-button>
    </mt-header>        
    <mt-popup v-model="popupVisible" position="right" class="search">
      <mt-search v-model="form.customName" :show="true" @keyup.enter.native="search" :result="searchItems">
        <div class="filterCon ms">
          <div class="item" ref="button">
            <span>业务线</span>
            <span>▼</span>
            <select class="form-control" v-model="form.busLineId" @change="search">
              <option v-for="(item, index) in options1" :key="index" :value="item.code" v-text="item.name"></option>
            </select>
          </div>
          <div class="item" ref="button2">
            <span>商户状态</span>
            <span>▼</span>
            <select class="form-control" v-model="form.crmState" @change="search">
              <option v-for="(item, index) in options2" :key="index" :value="item.code" v-text="item.name"></option>
            </select>
          </div>
        </div>
        <pullup @request="request" :allLoaded="allLoaded4" v-if="!loading &&popupVisible">
          <cardbus v-for="(item, index) in searchItems" :key="index" v-bind:data="item" @click.native="getDetail(item.crmState, item.customId, item.versionId)"></cardbus>
        </pullup>
        <!-- <cardbus v-for="(item, index) in searchItems" :key="index" v-bind:data="item" @click.native="getDetail(item.crmState, item.customId)"></cardbus> -->
        <div class="error" v-if="searchItems.length === 0">
          <!-- <p>没有查询结果</p> -->
          <mt-button type="primary" size="small" @click.native="popupVisible = false">返回</mt-button>
        </div>
      </mt-search>
    </mt-popup>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">入驻商户</mt-tab-item>
      <mt-tab-item id="2">未入驻商户</mt-tab-item>
      <mt-tab-item id="3">到期商户</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <pullup @request="request" :allLoaded="allLoaded" v-if="!loading && selected === '1'&&!popupVisible">
          <cardbus v-for="(item, index) in items" :key="index" v-bind:data="item" @click.native="getDetail(item.crmState, item.customId, item.versionId)"></cardbus>
        </pullup>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <pullup @request="request" :allLoaded="allLoaded2" v-if="selected === '2'&&!popupVisible">
          <cardbus v-for="(item, index) in items2" :key="index" v-bind:data="item" @click.native="getDetail(item.crmState, item.customId, item.versionId)"></cardbus>
        </pullup>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <pullup @request="request" :allLoaded="allLoaded3" v-if="selected === '3'&&!popupVisible">
          <cardbus v-for="(item, index) in items3" :key="index" v-bind:data="item" @click.native="getDetail(item.crmState, item.customId, item.versionId)"></cardbus>
        </pullup>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: 'businessCenter',
  created () {
    this.getData()
  },
  data () {
    return {
      options1: [{'name': '全部', 'code': ''}, {'name': '商城', 'code': '1'}, {'name': '新零售', 'code': '2'}],
      options2: [{'name': '全部', 'code': ''},{'name': ' 未签约', 'code': 0}, {'name': '签约中', 'code': 1}, {'name': '入驻审批', 'code': 2}, {'name': '入驻中', 'code': 3},
      {'name': '修改审批', 'code': 4}, {'name': '冻结中', 'code': 5}, {'name': '过期', 'code': 6}, {'name': '失败', 'code': -1}],
      form: {
        busLineld: 'shangcheng',
        crmState: '',
        crmStateList: [3, 4, 5],
        customName: '',
        from: 'bdcrm',
        page: 1,
        rows: 10,
        token: this.$store.state.token
      },
      popupVisible: false,
      searchItems: [],
      loading: true,
      selected: '1',
      allLoaded: false,
      allLoaded2: false,
      allLoaded3: false,
      allLoaded4: false,
      items: [],
      items2: [],
      items3: [],
      pageIndex: '',
      pageIndex2: '',
      pageIndex3: '',
      pageIndex4: '',
      pageCount: '',
      pageCount2: '',
      pageCount3: '',
      pageCount4: '',
      flag: false,
      flag2: false
    }
  },
  methods: {
    sortState (arr, sort, sort2, flag) {
      arr.sort(function (a, b) {
        var a1,b1
        switch(String(a[sort])) {
          case '2':
            a1 = 1
            break;
          case '-1':
            a1 = 2
            break;
          case '1':
            a1 = 3
            break;
          case '0':
            a1 = 4
            break;
          case '4':
            a1 = 5
            break;
          case '3':
            a1 = 6
            break;
          case '5':
            a1 = 7
            break;
        }
        switch(String(b[sort])) {
          case '2':
            b1 = 1
            break;
          case '-1':
            b1 = 2
            break;
          case '1':
            b1 = 3
            break;
          case '0':
            b1 = 4
            break;
          case '4':
            b1 = 5
            break;
          case '3':
            b1 = 6
            break;
          case '5':
            b1 = 7
            break;
        }
        if (a1<b1) {
          return -1
        } else if (a1>b1) {
          return 1
        } else {
          return flag?(b[sort2] < a[sort2] ? 1 : -1):(b[sort2] < a[sort2] ? -1 : 1)
        }
      })
      return arr
    },
    search () {
      let form = Object.assign(this.form, {
        crmStateList:[-1, 0, 1, 2, 3, 4, 5, 6],
        rows: '',
        page: ''
      })
      this.axios.customList(form).then(({ data }) => {
        if (data.success) {
          this.$set(this, 'searchItems', data.data.list)
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
    getCusData () {
      this.axios.customList(this.form).then(({ data }) => {
        if (data.success) {
          this.pageIndex2 = data.data.pageIndex
          this.pageCount2 = data.data.pageCount
          data.data.pageCount === data.data.pageIndex|| data.data.rowsCount==0 ? this.allLoaded2 = true: ''
          this.$set(this, 'items2', this.items2.concat(this.sortState(data.data.list, 'crmState', 'createDate')))
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
    getData () {
      this.axios.busList(this.form).then(({ data }) => {
        if (data.success) {
          if (this.selected === '1' && !this.popupVisible) {
            this.pageIndex = data.data.pageIndex
            this.pageCount = data.data.pageIndex
            data.data.pageCount === data.data.pageIndex|| data.data.rowsCount==0 ? this.allLoaded = true: ''
            this.$set(this, 'items', this.items.concat(this.sortState(data.data.list, 'crmState', 'createDate', true)))
          } else if (this.selected === '2' && !this.popupVisible) {
            this.pageIndex2 = data.data.pageIndex
            this.pageCount2 = data.data.pageCount
            data.data.pageCount === data.data.pageIndex|| data.data.rowsCount==0 ? this.allLoaded2 = true: ''
            this.$set(this, 'items2', this.items2.concat(this.sortState(data.data.list, 'crmState', 'createDate', false)))
          } else if (this.selected === '3' && !this.popupVisible) {
            this.pageIndex3 = data.data.pageIndex
            this.pageCount3 = data.data.pageCount
            data.data.pageCount === data.data.pageIndex|| data.data.rowsCount==0 ? this.allLoaded3 = true: ''
            this.$set(this, 'items3', this.items3.concat(this.util.sortDate(data.data.list, 'contractEndTime')))
          } else if (this.popupVisible) {
            this.pageIndex4 = data.data.pageIndex
            this.pageCount4 = data.data.pageCount
            data.data.pageCount === data.data.pageIndex|| data.data.rowsCount==0 ? this.allLoaded4 = true: ''
            this.$set(this, 'items3', this.searchItems.concat(this.util.sortDate(data.data.list, 'contractEndTime')))
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
    getDetail (state, id, versionId) {
      versionId?this.$store.dispatch({type: 'VersionId', versionId: versionId }):''
      if ([-1, 0, 1, 2].indexOf(state) !== -1) {
        if (this.$store.state.user.roleLevel===1) {
          this.$router.push({path: '/detailNotEnter/' + id})
        }
      } else if ([3, 4, 5, 6].indexOf(state) !== -1) {
        this.$router.push({path: '/detailEnter/' + id})
      }
    },
    request () {
      if (this.selected === '1' && !this.popupVisible) {
        if (this.pageIndex === this.pageCount) {
          this.allLoaded = true
        } else {
          this.form.page = ++this.pageIndex
          this.getData()
        }
      } else if (this.selected === '2' && !this.popupVisible) {
        if (this.pageIndex2 === this.pageCount2) {
          this.allLoaded2 = true
        } else {
          this.form.page = ++this.pageIndex2
          this.getCusData()
        }
      } else if (this.selected === '3' && !this.popupVisible) {
        if (this.pageIndex3 === this.pageCount3) {
          this.allLoaded3 = true
        } else {
          this.form.page = ++this.pageIndex3
          this.getData()
        }
      } else if (this.popupVisible) {
        if (this.pageIndex4 === this.pageCount4) {
          this.allLoaded4 = true
        } else {
          this.form.page = ++this.pageIndex4
          this.getData()
        }
      }
    }
  },
  watch: {
    selected: function (val, oldVal) {
      // 这里就可以通过 val 的值变更来确定
      if (val === '1') {
        this.form.crmState = ''
        this.form.crmStateList = [3, 4, 5]
      } else if (val === '2' && !this.flag) {
        this.form.crmState = ''
        this.flag = true
        this.form.crmStateList = [-1, 0, 1, 2]
        this.getCusData()
      } else if (val === '3' && !this.flag2) {
        this.flag2 = true
        this.form.crmStateList = [6]
        this.form.crmState = '6'
        this.getData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  background: #fff;
  text-align: center;
}
</style>
