<template>
  <div class="">
    <mt-header title="商户信息">
      <router-link :to="$store.state.backPath" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" v-if="data.customEntity.crmState !== 4&&!$route.query.approval" @click="$router.push({path: '/completeInfo/' + id})"><span class="rightbtn">修改</span></mt-button>
    </mt-header>
    <businessInfo v-model="selected" :data="data" class="ml" v-if="!loading"></businessInfo>
  </div>
</template>

<script>
import businessInfo from './businessInfo'
export default {
  name: '',
  components: {
    businessInfo
  },
  beforeRouteEnter (to, from, next){
    next(vm => {
      if(from.name==='completeInfo') {
        vm.backPath = {path: '/detailEnter/'+vm.id}
      }else {
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
  props: {
    id: String
  },
  created () {
    this.axios.getCustom(this.form).then(({ data }) => {
      if (data.success) {
        data.data.customEntity?this.$set(this.data, 'customEntity', data.data.customEntity):''
        data.data.customShopEntity?this.$set(this.data, 'customShopEntity', data.data.customShopEntity):''
        data.data.customFinanceEntity?this.$set(this.data, 'customFinanceEntity', data.data.customFinanceEntity):''
        data.data.customLicenseEntity?this.$set(this.data, 'customLicenseEntity', data.data.customLicenseEntity):''
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
      selected: '',
      loading: true,
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
      form: {
        customId: this.id,
        from: 'bdcrm',
        token: this.$store.state.token,
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
