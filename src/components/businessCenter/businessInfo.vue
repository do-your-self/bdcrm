<template>
  <div class="">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">基本信息</mt-tab-item>
      <mt-tab-item id="2">商户信息</mt-tab-item>
      <mt-tab-item id="3">门店信息</mt-tab-item>
      <mt-tab-item id="4">财务信息</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" class="ml">
      <mt-tab-container-item id="1">
        <mt-field :readonly=true :disableClear=true label="商户门店简称" v-model="data.customEntity.customName"></mt-field>
        <mt-field :readonly=true :disableClear=true label="营业执照名称" v-model="data.customEntity.customFullName"></mt-field>
        <mt-field :readonly=true :disableClear=true label="商户业务线" v-model="data.customEntity.busLineName"></mt-field>
        <mt-field :readonly=true :disableClear=true label="商户品类" v-model="data.customEntity.categoryName"></mt-field>
        <mt-field :readonly=true :disableClear=true label="经营地址" v-model="storeAddress"></mt-field>
        <mt-field :readonly=true :disableClear=true label="业务联系人" v-model="data.customEntity.linkPerson" class="ms"></mt-field>
        <mt-field :readonly=true :disableClear=true label="联系人手机" v-model="data.customEntity.linkMobile"></mt-field>
        <mt-field :readonly=true :disableClear=true label="职务" v-model="data.customEntity.linkPosition"></mt-field>
      </mt-tab-container-item>
      <mt-tab-container-item id="2" v-if="data.customLicenseEntity">
        <mt-field :readonly=true :disableClear=true label="营业模式" :value="data.customLicenseEntity.businessModel===1?'自营':data.customLicenseEntity.businessModel===2?'加盟':''"></mt-field>
        <mt-field :readonly=true :disableClear=true label="营业执照号" v-model="data.customLicenseEntity.businessCode"></mt-field>
        <mt-field :readonly=true :disableClear=true label="营业执照注册地址" v-model="registAddress"></mt-field>
        <mt-field :readonly=true :disableClear=true label="营业执照注册详细地址" v-model="data.customLicenseEntity.registAddress"></mt-field>
        <mt-field :readonly=true :disableClear=true label="注册资金(万元)" :value="data.customLicenseEntity.registCapital?data.customLicenseEntity.registCapital:''"></mt-field>
        <mt-field :readonly=true :disableClear=true label="成立日期" v-model="data.customLicenseEntity.registDate"></mt-field>
        <mt-field :readonly=true :disableClear=true label="营业期限至" :value="data.customLicenseEntity.validityDate==='2099-12-31'?'长期':data.customLicenseEntity.validityDate"></mt-field>
        <mt-field :readonly=true :disableClear=true label="门店数量" :value="data.customLicenseEntity.shopCount?data.customLicenseEntity.shopCount:''"></mt-field>
        <mt-field :readonly=true :disableClear=true label="法定代表人" v-model="data.customLicenseEntity.legalPerson" class="ms"></mt-field>
        <mt-field :readonly=true :disableClear=true label="法定代表人证件号码" v-model="data.customLicenseEntity.legalPersonCode"></mt-field>
        <mt-field :readonly=true :disableClear=true label="实际负责人" v-model="data.customLicenseEntity.chargePerson" class="ms"></mt-field>
        <mt-field :readonly=true :disableClear=true label="实际负责人证件号码" v-model="data.customLicenseEntity.chargePersonCode"></mt-field>
        <mt-field :readonly=true :disableClear=true label="实际负责人手机号码" v-model="data.customLicenseEntity.chargePersonPhone"></mt-field>
      </mt-tab-container-item>
      <mt-tab-container-item id="3" v-if="data.customShopEntity">
        <mt-field :readonly=true :disableClear=true label="门店类型" :value="data.customShopEntity.storeType===1?'pop商户':data.customShopEntity.storeType===2?'线下商户':''"></mt-field>
        <mt-field :readonly=true :disableClear=true label="门店简称" v-model="data.customShopEntity.storeShortName"></mt-field>
        <mt-field :readonly=true :disableClear=true label="是否独家合作" :value="data.customShopEntity.isSole===1?'是':data.customShopEntity.isSole===0?'否':''"></mt-field>
        <mt-field :readonly=true :disableClear=true label="配合力度" :value="data.customShopEntity.cooperateLevel===1?'有兜底':data.customShopEntity.cooperateLevel===0?'无兜底':''"></mt-field>
        <mt-field :readonly=true :disableClear=true label="月营业额（万元）" :value="data.customShopEntity.monthTurnover?data.customShopEntity.monthTurnover:''"></mt-field>
        <mt-field :readonly=true :disableClear=true label="门店介绍" v-model="data.customShopEntity.remarks"></mt-field>
        <mt-field :readonly=true :disableClear=true label="门店联系人" v-model="data.customShopEntity.storePerson" class="ms"></mt-field>
        <mt-field :readonly=true :disableClear=true label="门店联系人手机号码" v-model="data.customShopEntity.storeMobile"></mt-field>
        <mt-field :readonly=true :disableClear=true label="门店联系人职务" v-model="data.customShopEntity.storePosition"></mt-field>
        <mt-field :readonly=true :disableClear=true label="营业开始时间" v-model="data.customShopEntity.startTime" class="ms"></mt-field>
        <mt-field :readonly=true :disableClear=true label="营业结束时间" v-model="data.customShopEntity.endTime"></mt-field>
        <mt-field :readonly=true :disableClear=true label="员工人数" :value="data.customShopEntity.totalPerson?data.customShopEntity.totalPerson:''"></mt-field>
        <mt-field :readonly=true :disableClear=true label="经营面积（㎡）" :value="data.customShopEntity.busspace?data.customShopEntity.busspace:''"></mt-field>
        <mt-field :readonly=true :disableClear=true label="门店实际经营地址" v-model="shopAddress"></mt-field>
        <mt-field :readonly=true :disableClear=true label="门店实际经营详细地址" v-model="data.customShopEntity.storeAddress"></mt-field>
        <mt-field :readonly=true :disableClear=true label="经营场所物业所有权" :value="data.customShopEntity.ownership==1?'自有':data.customShopEntity.ownership==2?'租赁':data.customShopEntity.ownership==3?'其它':''"></mt-field>
        <mt-field :readonly=true :disableClear=true label="经纬度 X" v-model="data.customShopEntity.cox"></mt-field>
        <mt-field :readonly=true :disableClear=true label="经纬度 Y" v-model="data.customShopEntity.coy"></mt-field>
      </mt-tab-container-item>
      <mt-tab-container-item id="4" v-if="data.customFinanceEntity">
        <mt-field :readonly=true :disableClear=true label="收款账号" v-model="data.customFinanceEntity.bankCard"></mt-field>
        <mt-field :readonly=true :disableClear=true label="账号开户行" v-model="data.customFinanceEntity.branchBankName"></mt-field>
        <mt-field :readonly=true :disableClear=true label="开户行支行" v-model="data.customFinanceEntity.bankCity"></mt-field>
        <mt-field :readonly=true :disableClear=true label="是否对公账户" :value="data.customFinanceEntity.isCompany===0?'否':'是'"></mt-field>
        <mt-field :readonly=true :disableClear=true label="联行号" v-if="data.customFinanceEntity.isCompany" v-model="data.customFinanceEntity.bankProvince"></mt-field>
        <mt-field :readonly=true :disableClear=true :label="data.customFinanceEntity.isCompany?'账户名称（持有账号主体名）':'账户名称（持卡人名称）'" v-model="data.customFinanceEntity.accountName"></mt-field>
        <mt-field :readonly=true :disableClear=true label="预留手机号" v-if="!data.customFinanceEntity.isCompany" v-model="data.customFinanceEntity.reservePersonCode"></mt-field>
        <mt-field :readonly=true :disableClear=true label="身份证号" v-if="!data.customFinanceEntity.isCompany" v-model="data.customFinanceEntity.reservePhone"></mt-field>
        <mt-field :readonly=true :disableClear=true label="财务联系人" v-model="data.customFinanceEntity.cardholder" class="ms"></mt-field>
        <mt-field :readonly=true :disableClear=true label="财务联系人手机号码" v-model="data.customFinanceEntity.cardholderPhone"></mt-field>
        <mt-field :readonly=true :disableClear=true label="财务联系人固定电话" v-model="data.customFinanceEntity.cardholderTel"></mt-field>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    data: Object
  },
  data () {
    return {
      selected: '1',
      isEdit: false
    }
  },
  watch: {
    selected: function (val, oldVal) {
      // 这里就可以通过 val 的值变更来确定
      this.$emit('input', this.selected)
    }
  },
  computed: {
    storeAddress () {
      return this.util.getAddr(this.data.customEntity.storeProvicne, this.data.customEntity.storeCity, this.data.customEntity.storeArea)
    },
    registAddress () {
      return this.util.getAddr(this.data.customLicenseEntity.registProvince, this.data.customLicenseEntity.registCity, this.data.customLicenseEntity.registArea)
    },
    shopAddress () {
      return this.util.getAddr(this.data.customShopEntity.storeProvicne, this.data.customShopEntity.storeCity, this.data.customShopEntity.storeArea)
    }
  },
  methods: {
    submit() {
      this.$router.push({
        path: "/detailNotEnter/" + this.$store.state.baseInfo.form.customId
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
