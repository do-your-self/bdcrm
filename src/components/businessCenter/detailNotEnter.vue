<template>
  <div class="">
    <mt-header title="商户详情">
      <router-link to="/businessCenter" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="busInfo" v-if="!loading">
      <div class="title">
        {{data.customEntity.customName}}
      </div>
      <div class="reject">
        {{data.customEntity.dismissal}}
      </div>
      <span class="tag" v-if="crmState[data.customEntity.crmState]" :class="crmState[data.customEntity.crmState].class">{{crmState[data.customEntity.crmState].text}}</span>
    </div>
    <mt-cell title="录入拜访" is-link class="ms" @click.native="$router.push({path: '/createVisit/' + id, query: {shopName:data.customEntity.customName}})"></mt-cell>
    <mt-cell title="查看拜访记录" @click.native="$router.push({name: 'visitRecord', query: {id}})"></mt-cell>
    <mt-cell title="去签约" is-link @click.native="data.customEntity.crmState!==2?$router.push({path: '/contract', query:{
          legalCard: data.customLicenseEntity.legalPersonCode,
          legalPerson: data.customLicenseEntity.legalPerson,
          customFullName: data.customEntity.customFullName,
          customName: data.customEntity.customName,
          id:id}}):$router.push({name: 'contractInfo', query:{id:id,canEdit: false,selected: selected}})"></mt-cell>
    <businessInfo v-model="selected" :data="data" class="ml" v-if="!loading"></businessInfo>
    <div class="btnl" v-if="data.customEntity.crmState!==2">
      <mt-button size="large" type="primary" @click="$router.push({path: '/completeInfo/'+id, query:{id:id,selected: selected}})">编辑商户信息</mt-button>
    </div>
  </div>
</template>

<script>
import businessInfo from './businessInfo.vue'
export default {
  name: '',
  props: {
    id: String
  },
  components: {
    businessInfo
  },
  created () {
    this.axios.getCustom(this.form).then(({ data }) => {
      if (data.success) {
        data.data.customEntity?this.data.customEntity = data.data.customEntity:''
        data.data.customFinanceEntity?this.data.customFinanceEntity = data.data.customFinanceEntity:''
        data.data.customLicenseEntity?this.data.customLicenseEntity = data.data.customLicenseEntity:''
        data.data.customShopEntity?this.data.customShopEntity = data.data.customShopEntity:''
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
      selected: '1',
      loading: true,
      form: {
        customId: this.id,
        from: 'bdcrm',
        token: this.$store.state.token,
      },
      data: {
        customEntity: {
          busLineId: "",
          busLineName: "",
          categoryId: "",
          categoryName: "",
          customFullName: "",
          customId: "",
          customName: "",
          linkMobile: "",
          linkPerson: "",
          linkPosition: "",
          storeAddress: "",
          storeArea: "",
          storeCity: "",
          storeProvicne: "",
          userFullName: "",
          userId: ""
        },
        customFinanceEntity: {
          accountName: "",
          bankCard: "",
          bankCity: "",
          bankProvince: "",
          branchBankId: "",
          branchBankName: "",
          cardholder: "",
          cardholderPhone: "",
          cardholderTel: "",
          customId: "",
          id: "",
          isCompany: 1,
          reservePersonCode: "",
          reservePhone: ""
        },
        customLicenseEntity: {
          businessCode: "",
          businessModel: "",
          chargePerson: "",
          chargePersonCode: "",
          chargePersonPhone: "",
          customId: "",
          legalPerson: "",
          legalPersonCode: "",
          licenseId: "",
          registAddress: "",
          registArea: "",
          registCapital: "",
          registCity: "",
          registDate: "",
          registProvince: "",
          shopCount: "",
          validityDate: ""
        },
        customShopEntity: {
          busspace: "",
          cooperateLevel: "",
          cox: "",
          coy: "",
          customId: "",
          endTime: "",
          isSole: "",
          monthTurnover: "",
          ownership: "",
          remarks: "",
          shopId: "",
          startTime: "",
          storeAddress: "",
          storeArea: "",
          storeCity: "",
          storeMobile: "",
          storePerson: "",
          storePosition: "",
          storeProvicne: "",
          storeShortName: "",
          storeType: "",
          totalPerson: ""
        }
      },
      crmState: {
        '0': {
          text: '未签约',
          class: 'no'
        },
        '1': {
          text: '签约中',
          class: 'await'
        },
        '2': {
          text: '入驻审批',
          class: 'success'
        },
        '-1': {
          text: '失败',
          class: 'error'
        },
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.busInfo {
  position: relative;
  padding: 10px;
  font-size: $font-middle;
  .reject {
    padding-top: 10px;
    color: #999;
    font-size: $font-small;
  }
  .tag {
    position: absolute;
    top: 10px;
    right: 0;
    width: 50px;
    padding: 2px 5px;
    text-align: center;
    color: $white;
  }
  .no {
    background: $font-color-primary;
  }
  .await {
    background: #fc3;
  }
  .success {
    background: #6c3;
  }
  .error {
    background: red;
  }
}
</style>
