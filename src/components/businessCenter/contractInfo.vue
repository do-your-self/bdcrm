<template>
  <div class="">
    <mt-header title="商户签约">
      <router-link :to="$store.state.backPath" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button v-if="$route.query.canEdit&&$route.query.canEdit!='false'" slot="right" @click.native="$router.push({name: 'contract', query:{
          legalCard: data.legalCard,
          legalPerson: data.legalPerson,
          customFullName: data.customFullName,
          customName: data.customName,
          id:$route.query.id,
          selected:selected}})"><span class="rightbtn">编辑</span></mt-button>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">合同信息</mt-tab-item>
      <mt-tab-item id="2">合同附件</mt-tab-item>
      <mt-tab-item id="3">执照附件</mt-tab-item>
      <mt-tab-item id="4">门店照片</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" class="ml">
        <mt-field :readonly=true :disableClear=true label="商户门店简称" v-model="data.customName"></mt-field>
        <mt-field :readonly=true :disableClear=true label="营业执照名称" v-model="data.customFullName" class="ms"></mt-field>
        <mt-field :readonly=true :disableClear=true label="法定代表人" v-model="data.legalPerson"></mt-field>
        <mt-field :readonly=true :disableClear=true label="法定代表人证件号码" v-model="data.legalCard"></mt-field>
        <mt-field :readonly=true :disableClear=true label="合作模式" :value="data.contractType==='1'?'线上':data.contractType==='2'?'线下':''"></mt-field>
        <mt-field :readonly=true :disableClear=true label="合同开始日期" v-model="data.contractStartTime"></mt-field>
        <mt-field :readonly=true :disableClear=true label="合同结束日期" v-model="data.contractEndTime"></mt-field>
        <mt-field :readonly=true :disableClear=true label="备注说明" type="textarea" rows="4" v-model="data.contractDesc"></mt-field>
      </mt-tab-container-item>
      <mt-tab-container-item class="ms" v-for="(value, index) in tabMap" :id="String(index+2)" :key="index">
        <div class="flexImg" v-if="value">
          <img-upload  v-for="(v, i) in value.tabImg" :id="$route.query.id" :tab="value.tabKey" :name="v.key" :key="i" 
            class="yourBoxCss"
            :title="v.name+((v.length==='0')?'(选传)':v.length==='10'?'(最多10张)':v.length==='5'?'(5张)':'')" 
            :canEdit="false"
            :imgData="v.imgData"
            src="">
          </img-upload>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import imgUpload from '@/components/common/imgUpload' 
export default {
  name: '',
  components:{
    imgUpload
  },
  beforeRouteEnter (to, from, next){
    next(vm => {
      if(from.name==='contract') {
        vm.backPath = {path: '/detailEnter/'+to.query.id}
      }else{
        vm.backPath = {path: from.path}
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
    this.axios.customGet(this.form).then(({ data }) => {
      if (data.success) {
        var tabList=[]
        for (let [key, value ] of Object.entries(data.data.tabMap)) {
          var tabImg = []
          for (let [k, v ] of Object.entries(value)) {
            var imgData = {}
            if(v.length){
              let urls = v[0].split('&')
              for (let i=0;i<urls.length;i++){
                imgData[i+1]=urls[i]
              }
            }
            tabImg.push({
              index: Number(k.split('@')[0].split('_')[1]),
              key: k.split('@')[0],
              name: k.split('@')[1].split('&')[0],
              length: k.split('@')[1].split('&')[1],
              imgData: imgData
            })
          }
          tabList.push({
            index: Number(key.split('@')[0].split('_')[1]),
            tabKey: key.split('@')[0],
            tabName: key.split('@')[1],
            tabImg: this.util.sortDate(tabImg,'index',true),
          })
        }
        this.$set(this, 'tabMap', this.util.sortDate(tabList,'index',true))
        data.data.customContract?this.$set(this, 'data', data.data.customContract):''
        // this.$store.dispatch({
        //   type: 'User',
        //   user: {
        //     followMonth: data.data.followMonth,
        //     ...data.data.user
        //   }
        // })
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
      backPath: {},
      form: {
        customId: this.$route.query.id,
        from: 'bdcrm',
        token: this.$store.state.token,
        versionId: this.$store.state.versionId
      },
      data: {
        customFullName: '',
        customName: '',
        contractSignTime: '',
        contractEndTime: '',
        contractStartTime: '',
        contractType: '',
        customId: this.$route.query.id,
        legalCard: '',
        legalPerson: '',
        contractDesc: ''
      },
      tabMap: [],
      allLoaded: false,
      selected: '1'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.flexImg {
  padding: 0 30px;
  background: $white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.yourBoxCss{ display: inline-block;width: auto;min-width: 80% ;height: auto;padding-top: 10px;}
</style>
