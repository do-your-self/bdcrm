<template>
  <div class="">
    <mt-header title="商户签约">
      <router-link :to="$store.state.backPath" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" @click="sendSubmit"><span class="rightbtn">提交审核</span></mt-button>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">合同信息</mt-tab-item>
      <mt-tab-item id="2">合同附件</mt-tab-item>
      <mt-tab-item id="3">执照附件</mt-tab-item>
      <mt-tab-item id="4">门店照片</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" class="ms" v-if="!isAppr">
        <mt-field :readonly=true :disableClear=true label="商户门店简称" placeholder="请输入商户门店简称" v-model="subForm.customContractEntity.customName"></mt-field>
        <mt-field :readonly=true :disableClear=true label="营业执照名称" placeholder="请输入商户名称" v-model="subForm.customContractEntity.customFullName" class="ms"></mt-field>
        <mt-field :readonly=true :disableClear=true label="法定代表人" placeholder="请输入" v-model="subForm.customContractEntity.legalPerson"></mt-field>
        <mt-field :readonly=true :disableClear=true label="法定代表人证件号码" placeholder="请输入" v-model="subForm.customContractEntity.legalCard"></mt-field>
        <selectList title="合作模式" :val="subForm.customContractEntity.contractType==='1'?'线上':subForm.customContractEntity.contractType==='2'?'线下':''" :slotsAll="slots" type="all" v-model="subForm.customContractEntity.contractType"></selectList>
        <selectList title="合同开始日期" :val="subForm.customContractEntity.contractStartTime" type="date" v-model="subForm.customContractEntity.contractStartTime"></selectList>
        <selectList title="合同结束日期" type="date" :val="subForm.customContractEntity.contractEndTime" v-model="subForm.customContractEntity.contractEndTime"></selectList>
        <mt-field label="备注说明" :attr="{maxlength: 50}" placeholder="请填写50字以内，可不填" type="textarea" rows="4" v-model="subForm.customContractEntity.contractDesc"></mt-field>
      </mt-tab-container-item>
      <mt-tab-container-item id="1" class="ml" v-if="isAppr">
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
            :canEdit="isAppr&&value.tabName=='合同附件'?false:true" 
            :imgData="v.imgData"
            @uploadImg='uploadImg'
            :src="imgSrc" 
            :multiple="v.length==='1'||v.length==='0'?false:true"
            :maxlength="v.length==='10'||v.length==='5'?Number(v.length):1"
            :clear="clearImgData"
            :change="upDateImg"
            v-model="subForm.customPictureEntityList[v.index-1].filePath">
          </img-upload>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="btnl">
      <mt-button size="large" type="primary" @click="submit">保存</mt-button>
    </div>
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
      vm.backPath = {path: from.path,query:from.query}
      to.query.selected?vm.selected=to.query.selected:''
      if(from.name=='contractInfo'){
        vm.isAppr = true
      }
      if(from.name=='detailNotEnter'){
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
        var imgList=[]
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
            imgList[Number(k.split('@')[0].split('_')[1])-1]={
              categoryCode: k.split('@')[0],
              customId: this.$route.query.id,
              filePath: v[0]?v[0].split('&').join('%26'):'',
              tabCode: key.split('@')[0]
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
        this.$set(this.subForm, 'customPictureEntityList', imgList)
        this.$set(this, 'tabMap', this.util.sortDate(tabList,'index',true))
        this.$set(this, 'data', data.data.customContract)
        data.data.customContract?this.$set(this.subForm, 'customContractEntity', data.data.customContract):''
        this.subForm.customContractEntity.legalCard = this.$route.query.legalCard,
        this.subForm.customContractEntity.legalPerson = this.$route.query.legalPerson,
        
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
  computed: {
    preImages() {
      return this.images.map(v=>{return v.src});
    }
  },
  data () {
    return {
      backPath: {},
      isAppr: false,
      canEdit: true,
      multiple: true,
      imgSrc: '',
      imgMax: 6,
      clearImgData : true,
      upDateImg: false,
      slots: [{"code": 1, "name": '线上'}, {"code": 2, "name": '线下'}],
      form: {
        customId: this.$route.query.id,
        from: 'bdcrm',
        token: this.$store.state.token,
        versionId: this.$store.state.versionId
      },
      subForm: {
        customContractEntity: {
          customFullName: this.$route.query.customFullName,
          customName: this.$route.query.customName,
          contractSignTime: '',
          contractEndTime: '',
          contractStartTime: '',
          contractType: '',
          customId: this.$route.query.id,
          legalCard: this.$route.query.legalCard,
          legalPerson: this.$route.query.legalPerson,
          contractDesc: ''
        },
        customPictureEntityList: [],
        from: 'bdcrm',
        token: this.$store.state.token
      },
      data: {},
      tabMap: [],
      allLoaded: false,
      selected: '1',
      loading: true
    }
  },
  methods: {
    uploadImg (e) {
      if(e.target.files[0]) {
        this.axios.upload({'imageFile': e.target.files[0], blob: true, from: 'bdcrm', token: this.$store.state.token}).then(({ data }) => {
        if (data.success) {
            this.isImg = true
            this.img = data.data
            this.$emit('input', {
              categoryCode: this.name,
              customId: this.id,
              filePath: data.data,
              tabCode: this.tab
            })
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
      }
    },
    submit (toast) {
      let sendUrl=''
      this.isAppr?sendUrl='changeSignPut':sendUrl='customPut'
      this.axios[sendUrl](this.subForm).then(({ data }) => {
        if (data.success&&!(toast=='no')) {
          this.$toast({
            message: '保存成功,未提审数据不做变动',
            position: 'model',
            duration: 3000
          })
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
    sendSubmit () {
      this.submit('no')
      let sendUrl=''
      this.isAppr?sendUrl='changeSignPush':sendUrl='customPush'
      this.axios[sendUrl]({customId: this.$route.query.id, from: 'bdcrm', token: this.$store.state.token}).then(({ data }) => {
        if (data.success) {
          this.$toast({
            message: '提交成功',
            position: 'model',
            duration: 3000
          })
          this.$router.go(-1)
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
    }
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
