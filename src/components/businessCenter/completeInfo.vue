<template>
  <div class="" v-if="!loading">
    <mt-header title="完善商户资料">
      <router-link :to="$store.state.backPath" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">基本信息</mt-tab-item>
      <mt-tab-item id="2">商户信息</mt-tab-item>
      <mt-tab-item id="3">门店信息</mt-tab-item>
      <mt-tab-item id="4">财务信息</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" class="ml">
      <mt-tab-container-item id="1">
        <mt-field v-if="state" label="客户经理人" placeholder="请输入客户经理人" v-model="form.custom.userFullName" :readonly=true :disableClear=true></mt-field>
        <mt-field v-if="state !=3" label="营业执照名称" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :attr="{maxlength: 30}" placeholder="请输入商户名称" v-model="form.custom.customFullName" class="ms"></mt-field>
        <mt-field v-if="state !=3" label="商户门店简称" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :attr="{maxlength: 15}" placeholder="请输入商户门店简称" v-model="form.custom.customName"></mt-field>
        <selectList v-if="state !=3" title="业务线" type="line" :val="form.custom.busLineName" v-on:select="getValue" class="ms"></selectList>
        <selectList v-if="state !=3" title="商户品类" type="category" :val="form.custom.categoryName" v-on:select="getValue"></selectList>
        <selectList v-if="state !=3" title="经营地区" type="city" :val="storeAddress" v-on:select="selectStoreCity"></selectList>
        <mt-field v-if="state !=3" label="详细地址" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :attr="{maxlength: 50}" placeholder="请输入详细地址" type="textarea" rows="2" v-model="form.custom.storeAddress"></mt-field>
        <mt-field v-if="state ==3" :readonly=true :disableClear=true label="营业执照名称" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :attr="{maxlength: 30}" placeholder="请输入商户名称" v-model="form.custom.customFullName" class="ms"></mt-field>
        <mt-field v-if="state ==3" :readonly=true :disableClear=true label="商户门店简称" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :attr="{maxlength: 15}" placeholder="请输入商户门店简称" v-model="form.custom.customName"></mt-field>
        <mt-field v-if="state ==3" :readonly=true :disableClear=true label="业务线" v-model="form.custom.busLineName"></mt-field>
        <mt-field v-if="state ==3" :readonly=true :disableClear=true label="商户品类" v-model="form.custom.categoryName"></mt-field>
        <mt-field v-if="state ==3" :readonly=true :disableClear=true label="经营地区" v-model="storeAddress"></mt-field>
        <mt-field v-if="state ==3" :readonly=true :disableClear=true label="详细地址" type="textarea" rows="2" v-model="form.custom.storeAddress"></mt-field>
        <mt-field label="业务联系人" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :attr="{maxlength: 10}" placeholder="请输入业务联系人姓名" v-model="form.custom.linkPerson" class="ms"></mt-field>
        <mt-field label="联系人手机" type="tel" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :attr="{maxlength: 11}" placeholder="请输入" v-model="form.custom.linkMobile"></mt-field>
        <mt-field label="职务" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :attr="{maxlength: 20}" placeholder="请输入" v-model="form.custom.linkPosition"></mt-field>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <selectList title="营业模式" :val="form.license.businessModel===1?'自营':form.license.businessModel===2?'加盟':''" type="busModel" v-model="form.license.businessModel"></selectList>
        <mt-field label="营业执照号" :attr="{maxlength: 18}" placeholder="请输入" v-model="form.license.businessCode"></mt-field>
        <selectList title="营业执照注册地址" type="city" :val="registAddress" v-on:select="selectRegistCity"></selectList>
        <mt-field label="营业执照注册(详细地址)" placeholder="请输入" v-model="form.license.registAddress"></mt-field>
        <mt-field label="注册资金(万元)" type="number" placeholder="请输入" v-model="form.license.registCapital"></mt-field>
        <selectList title="成立日期" :val="form.license.registDate" type="date" v-model="form.license.registDate"></selectList>
        <selectList title="营业期限至" type="dateLong" :val="form.license.validityDate==='2099-12-31'?'长期':form.license.validityDate" v-model="form.license.validityDate"></selectList>
        <mt-field label="门店数量" type="number" placeholder="请输入" v-model="form.license.shopCount" class="ms"></mt-field>
        <mt-field label="法定代表人" placeholder="请输入" v-model="form.license.legalPerson"></mt-field>
        <mt-field label="法定代表人证件号码" type="tel" :attr="{maxlength: 18}" placeholder="请输入" v-model="form.license.legalPersonCode"></mt-field>
        <mt-field label="实际负责人" placeholder="选填" v-model="form.chargePerson" class="ms"></mt-field>
        <mt-field label="实际负责人证件号码" type="tel" :attr="{maxlength: 18}" placeholder="选填" v-model="form.license.chargePersonCode"></mt-field>
        <mt-field label="实际负责人手机号码" type="tel" :attr="{maxlength: 11}" placeholder="选填" v-model="form.license.chargePersonPhone"></mt-field>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <selectList title="门店类型" :val="form.shop.storeType===1?'pop商户':form.shop.storeType===2?'线下商户':''" type="storeType" v-model="form.shop.storeType"></selectList>
        <mt-field label="门店简称" placeholder="请输入" v-model="form.shop.storeShortName"></mt-field>
        <selectList title="是否独家合作" :val="form.shop.isSole===1?'是':form.shop.isSole===0?'否':''" type="isSole" v-model="form.shop.isSole"></selectList>
        <selectList title="配合力度" :val="form.shop.cooperateLevel===1?'有兜底':form.shop.cooperateLevel===0?'无兜底':''" type="cprtLevel" v-model="form.shop.cooperateLevel"></selectList>
        <mt-field label="月营业额（万元）" placeholder="请输入" :value="form.shop.monthTurnover?form.shop.monthTurnover:''" v-model="form.shop.monthTurnover"></mt-field>
        <mt-field label="门店介绍" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :attr="{maxlength: 100}" placeholder="请输入" type="textarea" rows="2" v-model="form.shop.remarks"></mt-field>
        <mt-field label="门店联系人" placeholder="请输入" v-model="form.shop.storePerson" class="ms"></mt-field>
        <mt-field label="门店联系人手机号码" type="tel" :attr="{maxlength: 11}" placeholder="请输入" v-model="form.shop.storeMobile"></mt-field>
        <mt-field label="门店联系人职务" placeholder="请输入" v-model="form.shop.storePosition"></mt-field>
        <selectList title="营业开始时间" :val="form.shop.startTime" type="time" v-model="form.shop.startTime"></selectList>
        <selectList title="营业结束时间" :val="form.shop.endTime" type="time" v-model="form.shop.endTime"></selectList>
        <mt-field label="员工人数" placeholder="请输入" v-model="form.shop.totalPerson"></mt-field>
        <mt-field label="经营面积（㎡）" placeholder="请输入" v-model="form.shop.busspace"></mt-field>
        <selectList title="门店实际经营地址" type="city" :val="shopAddress" v-on:select="selectShopCity"></selectList>
        <mt-field label="门店实际经营详细地址" :attr="{maxlength: 50}" placeholder="请输入详细地址" type="textarea" rows="2" v-model="form.shop.storeAddress"></mt-field>
        <selectList title="经营场所物业所有权"  :val="form.shop.ownership==='1'?'自有':form.shop.ownership==='2'?'租赁':form.shop.ownership==='3'?'其它':''" type="ownership" v-model="form.shop.ownership"></selectList>
        <mt-field label="经纬度 X" placeholder="请输入" v-model="form.shop.cox">
          <mt-button size="small" @click.native="getLocation('cox')">自动获取</mt-button>
        </mt-field>
        <mt-field label="经纬度 Y" placeholder="请输入" v-model="form.shop.coy">
          <mt-button size="small" @click.native="getLocation('coy')">自动获取</mt-button>
        </mt-field>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <mt-field label="收款账号" placeholder="请输入" type="tel" v-model="form.finance.bankCard" :attr="{maxlength: 32}"></mt-field>
        <mt-cell title="账号开户行" is-link :value="form.finance.branchBankName" @click.native="popupVisible = !popupVisible">{{form.finance.branchBankName}}</mt-cell>
        <mt-field label="开户行支行" placeholder="请输入" v-model="form.finance.bankCity" :attr="{maxlength: 30}"></mt-field>
        <selectList title="是否对公账户" type="isSole" :val="form.finance.isCompany===0?'否':'是'" v-model="form.finance.isCompany"></selectList>
        <mt-field label="联行号" v-if="form.finance.isCompany" placeholder="请输入" v-model="form.finance.bankProvince"></mt-field>
        <mt-field :label="form.finance.isCompany?'账户（持有账号主体名）':'账户名称（持卡人名称）'" placeholder="请输入" v-model="form.finance.accountName"></mt-field>
        <mt-field label="预留手机号" type="tel" :attr="{maxlength: 11}" v-if="!form.finance.isCompany" placeholder="请输入" v-model="form.finance.reservePhone"></mt-field>
        <mt-field label="身份证号" type="tel" :attr="{maxlength: 18}" v-if="!form.finance.isCompany" placeholder="请输入" v-model="form.finance.reservePersonCode"></mt-field>
        <mt-field label="财务联系人" placeholder="选填" v-model="form.finance.cardholder" class="ms"></mt-field>
        <mt-field label="财务联系人手机号码" type="tel" :attr="{maxlength: 11}" placeholder="选填" v-model="form.finance.cardholderPhone"></mt-field>
        <mt-field label="财务联系人固定电话" type="tel" placeholder="选填" v-model="form.finance.cardholderTel"></mt-field>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="btnl">
      <mt-button size="large" type="primary" @click.native="submit">保存</mt-button>
    </div>
    <mt-popup v-model="popupVisible" position="right" class="search">
      <mt-search v-model="form.finance.branchBankName" :show="true" :result="filterResult">
        <mt-cell v-for="item in filterResult" :title="item.name" :key="item.code" @click.native="getBank(item)"></mt-cell>
        <div class="error" v-if="filterResult.length === 0">
          <p>没有查询结果</p>
          <mt-button size="small" @click.native="popupVisible = false;form.finance.branchBankName=''">返回</mt-button>
        </div>
      </mt-search>
    </mt-popup>
    <div id="container" style="display:none"></div>
  </div>
</template>

<script>
function SDKLocationInformation() {
  this.ROOT = window;
  this.locationOpts = {
    state: true,
    province: "",
    city: "",
    area: "",
    address: "",
    adCode: "",
    lng: 0,
    lat: 0
  };
}
SDKLocationInformation.prototype = {
  isRequestAnimationFrame: function() {
    var _this = this;
    var lastTime = 0;
    var vendors = ["webkit", "moz", "ms"];
    for (
      var x = 0;
      x < vendors.length && !_this.ROOT.requestAnimationFrame;
      ++x
    ) {
      _this.ROOT.requestAnimationFrame =
        _this.ROOT[vendors[x] + "RequestAnimationFrame"];
      _this.ROOT.cancelAnimationFrame =
        _this.ROOT[vendors[x] + "CancelAnimationFrame"] ||
        _this.ROOT[vendors[x] + "CancelRequestAnimationFrame"];
    }
    if (!_this.ROOT.requestAnimationFrame) {
      _this.ROOT.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
        var id = _this.ROOT.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!_this.ROOT.cancelAnimationFrame) {
      _this.ROOT.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  },
  loadLocationPage: function(callback) {
    var _this = this;
    var geolocation = null;
    try {
      _this.ROOT.map = new AMap.Map("", {
        resizeEnable: true
      });

      _this.ROOT.map.plugin("AMap.Geolocation", function() {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: true,
          buttonPosition: "RB"
        });

        _this.ROOT.map.addControl(geolocation);

        geolocation.getCurrentPosition();

        AMap.event.addListener(geolocation, "complete", function(data) {
          if (data) {
            _this.locationOpts.province = data.addressComponent.province || "";
            _this.locationOpts.city =
              data.addressComponent.city || data.addressComponent.province;
            _this.locationOpts.area = data.addressComponent.district || "";
            _this.locationOpts.address = data.formattedAddress || "";
            _this.locationOpts.adCode = data.addressComponent.adcode || "";
            _this.locationOpts.lng = data.position.getLng() || "";
            _this.locationOpts.lat = data.position.getLat() || "";
            typeof callback == "function" && callback.call(this);
            return;
          }
        });

        AMap.event.addListener(geolocation, "error", function() {
          typeof callback == "function" && callback.call(this);
          _this.locationOpts.state = false;
          return;
        });
      });
    } catch (e) {}
  }
};
import Bank from "../../js/bank";
export default {
  name: "",
  beforeRouteEnter (to, from, next){
    next(vm => {
      to.query.selected?vm.selected=to.query.selected:''
      vm.backPath = {path: from.path}
      if(from.name==='createBusiness'){
        vm.backPath = {path: '/detailNotEnter/'+vm.id}
      }
      if(from.name==='busInfo'){
        vm.sendUrl = 'changePut'
      }
      if (from.path != '/'){
        vm.$store.dispatch({
          type: "BackPath",
          payload: vm.backPath
        });
      }
    });
  },
  created() {
    this.axios
      .getCustom({
        customId: this.id,
        from: "bdcrm",
        token: this.$store.state.token
      })
      .then(({ data }) => {
        if (data.success) {
          this.state = data.data.customEntity.crmState;
          this.form.finance.customId = data.data.customEntity.customId;
          this.form.license.customId = data.data.customEntity.customId;
          this.form.shop.customId = data.data.customEntity.customId;
          if (data.data.customEntity) {
            let {
              busLineId = "",
              busLineName = "",
              categoryId = "",
              categoryName = "",
              customFullName = "",
              customId = "",
              customName = "",
              linkMobile = "",
              linkPerson = "",
              linkPosition = "",
              storeAddress = "",
              storeArea = "",
              storeCity = "",
              storeProvicne = "",
              userFullName = "",
              userId = ""
            } = data.data.customEntity;
            this.$set(this.form, "custom", {
              busLineId,
              busLineName,
              categoryId,
              categoryName,
              customFullName,
              customId,
              customName,
              linkMobile,
              linkPerson,
              linkPosition,
              storeAddress,
              storeArea,
              storeCity,
              storeProvicne,
              userFullName,
              userId
            });
          }
          if (data.data.customShopEntity) {
            let {
              busspace = "",
              cooperateLevel = "",
              cox = "",
              coy = "",
              customId = "",
              endTime = "",
              isSole = "",
              monthTurnover = "",
              ownership = "",
              remarks = "",
              shopId = "",
              startTime = "",
              storeAddress = "",
              storeArea = "",
              storeCity = "",
              storeMobile = "",
              storePerson = "",
              storePosition = "",
              storeProvicne = "",
              storeShortName = "",
              storeType = "",
              totalPerson = ""
            } = data.data.customShopEntity;
            totalPerson === 0 ? (totalPerson = ""): "";
            busspace === 0 ? (busspace = ""): "";
            this.$set(this.form, "shop", {
              busspace,
              cooperateLevel,
              cox,
              coy,
              customId,
              endTime,
              isSole,
              monthTurnover,
              ownership,
              remarks,
              shopId,
              startTime,
              storeAddress,
              storeArea,
              storeCity,
              storeMobile,
              storePerson,
              storePosition,
              storeProvicne,
              storeShortName,
              storeType,
              totalPerson
            });
          }
          if (data.data.customFinanceEntity) {
            let {
              accountName = "",
              bankCard = "",
              bankCity = "",
              bankProvince = "",
              branchBankId = "",
              branchBankName = "",
              cardholder = "",
              cardholderPhone = "",
              cardholderTel = "",
              customId = "",
              id = "",
              isCompany = 1,
              reservePersonCode = "",
              reservePhone = ""
            } = data.data.customFinanceEntity;
            isCompany === 0 ? "" : (isCompany = "1");
            this.$set(this.form, "finance", {
              accountName,
              bankCard,
              bankCity,
              bankProvince,
              branchBankName,
              cardholder,
              cardholderPhone,
              cardholderTel,
              customId,
              id,
              isCompany,
              reservePersonCode,
              reservePhone
            });
          }
          if (data.data.customLicenseEntity) {
            let {
              businessCode = "",
              businessModel = "",
              chargePerson = "",
              chargePersonCode = "",
              chargePersonPhone = "",
              customId = "",
              legalPerson = "",
              legalPersonCode = "",
              licenseId = "",
              registAddress = "",
              registArea = "",
              registCapital = "",
              registCity = "",
              registDate = "",
              registProvince = "",
              shopCount = "",
              validityDate = ""
            } = data.data.customLicenseEntity;
            registCapital === 0 ? (registCapital = ""): "";
            shopCount === 0 ? (shopCount = ""): "";
            this.$set(this.form, "license", {
              businessCode,
              businessModel,
              chargePerson,
              chargePersonCode,
              chargePersonPhone,
              customId,
              legalPerson,
              legalPersonCode,
              licenseId,
              registAddress,
              registArea,
              registCapital,
              registCity,
              registDate,
              registProvince,
              shopCount,
              validityDate
            });
          }
          this.loading = false;
        }
        if (!data.success) {
          this.$toast({
            message: data.msg,
            position: "model",
            duration: 3000
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  props: {
    id: String
  },
  computed: {
    filterResult() {
      return this.bank.filter(value =>
        new RegExp(this.form.finance.branchBankName, "i").test(value.name)
      );
    },
    storeAddress() {
      return this.util.getAddr(
        this.form.custom.storeProvicne,
        this.form.custom.storeCity,
        this.form.custom.storeArea
      );
    },
    registAddress() {
      return this.util.getAddr(
        this.form.license.registProvince,
        this.form.license.registCity,
        this.form.license.registArea
      );
    },
    shopAddress() {
      return this.util.getAddr(
        this.form.shop.storeProvicne,
        this.form.shop.storeCity,
        this.form.shop.storeArea
      );
    }
  },
  data() {
    return {
      sendUrl: 'putCustom',
      backPath: {},
      state: "",
      loading: true,
      bank: Bank,
      popupVisible: false,
      selected: "1",
      form: {
        custom: {
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
        finance: {
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
        license: {
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
        shop: {
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
        },
        from: "bdcrm",
        token: this.$store.state.token
      }
    };
  },
  methods: {
    getBank(item) {
      this.form.finance.branchBankId = item.code;
      this.form.finance.branchBankName = item.name;
      this.popupVisible = false;
    },
    getValue(values, type) {
      switch (this.type) {
        case "busModel":
          this.form.shop.storeType = values[0].code;
          break;
        case "category":
          this.form.license.businessModel = values[0].code;
          break;
        case "line":
          this.form.custom.busLineName = values[0].name;
          this.form.custom.busLineId = values[0].code;
          break;
        case "city":
          this.form.storeProvicne = values[0].name + "@" + values[0].code;
          this.form.storeCity = values[1].name + "@" + values[1].code;
          this.form.storeArea = values[2].name + "@" + values[2].code;
          break;
      }
    },
    selectStoreCity(values) {
      this.form.custom.storeProvicne = values[0].name + "@" + values[0].code;
      this.form.custom.storeCity = values[1].name + "@" + values[1].code;
      this.form.custom.storeArea = values[2].name + "@" + values[2].code;
    },
    selectRegistCity(values) {
      this.form.license.registProvince = values[0].name + "@" + values[0].code;
      this.form.license.registCity = values[1].name + "@" + values[1].code;
      this.form.license.registArea = values[2].name + "@" + values[2].code;
    },
    selectShopCity(values) {
      this.form.shop.storeProvicne = values[0].name + "@" + values[0].code;
      this.form.shop.storeCity = values[1].name + "@" + values[1].code;
      this.form.shop.storeArea = values[2].name + "@" + values[2].code;
    },
    getLocation(position) {
      var sdkGpsOpts = new SDKLocationInformation();
      sdkGpsOpts.loadLocationPage(() => {
        if (sdkGpsOpts.locationOpts.state == true) {
          position==='cox'?this.form.shop.cox = sdkGpsOpts.locationOpts.lat:this.form.shop.coy = sdkGpsOpts.locationOpts.lng;
        }
      })
    },
    submit() {
      var isValidate = true
      this.form.finance.isCompany?(this.form.finance.reservePhone=this.form.finance.reservePersonCode=''):''
      var validate = [
        {
          value: this.form.custom.customFullName,
          required: true, message: '营业执照名称不能为空', regExp: /^.{2,30}$/, errorMsg: "营业执照名称长度大于等于2，小于等于30"
        }, {
          value: this.form.custom.customName,
          required: true, message: '商户门店简称不能为空', regExp: /^.{1,15}$/, errorMsg: "商户门店简称长度小于等于15"
        }, {
          value: this.form.custom.busLineName,
          required: true, message: '业务线不能为空'
        }, {
          value: this.form.custom.categoryName,
          required: true, message: '商户品类不能为空'
        }, {
          value: this.storeAddress,
          required: true, message: '经营地区不能为空'
        }, {
          value: this.form.custom.storeAddress,
          required: true, message: '详细地址不能为空', regExp: /^.{2,50}$/, errorMsg: "详细地址长度大于等于2，小于等于50"
        }, {
          value: this.form.custom.linkPerson,
          required: true, message: '业务联系人不能为空', regExp: /^.{2,10}$/, errorMsg: "业务联系人长度大于等于2，小于等于10"
        }, {
          value: this.form.custom.linkMobile,
          required: true, message: '业务联系人手机号不能为空', regExp: /^[1][3,4,5,7,8][0-9]{9}$/, errorMsg: "业务联系人手机号格式不对"
        }, {
          value: this.form.custom.linkPosition,
          required: true, message: '业务联系人职务不能为空', regExp: /^.{2,20}$/, errorMsg: "业务联系人职务长度大于等于2，小于等于20"
        }, {
            value: this.form.license.businessCode,
            required: false, message: '营业执照号不能为空', regExp: /^[a-zA-Z0-9]{1,18}$/, errorMsg: "营业执照号只能输入英文及数字，长度小于等于18位"
        }, {
          value: this.form.license.legalPersonCode,
          required: false, message: '法定代表人证件号码不能为空', regExp: /^.{15,18}$/, errorMsg: '法定代表人证件号码长度大于等于15，小于等于18'
        }, {
          value: this.form.license.chargePersonCode,
          required: false, message: '实际负责人证件号码不能为空', regExp: /^.{15,18}$/, errorMsg: '实际负责人证件号码长度大于等于15，小于等于18'
        }, {
            value: this.form.license.chargePersonPhone,
            required: false, message: '实际负责人手机号不能为空', regExp: /^[1][3,4,5,7,8][0-9]{9}$/, errorMsg: "实际负责人手机号格式不对"
        }, {
            value: this.form.shop.storeMobile,
            required: false, message: '门店联系人手机号不能为空', regExp: /^[1][3,4,5,7,8][0-9]{9}$/, errorMsg: "门店联系人手机号格式不对"
        }, {
          value: this.form.finance.reservePhone,
          required: false, message: '预留手机号不能为空', regExp: /^[1][3,4,5,7,8][0-9]{9}$/, errorMsg: "预留手机号格式不对"
        }, {
          value: this.form.finance.reservePersonCode,
          required: false, message: '身份证号不能为空', regExp: /^.{15,18}$/, errorMsg: '身份证号长度大于等于15，小于等于18'
        }, {
            value: this.form.finance.cardholderPhone,
            required: false, message: '财务联系人手机号不能为空', regExp: /^[1][3,4,5,7,8][0-9]{9}$/, errorMsg: "财务联系人手机号格式不对"
        }
      ]
      for(var i =0; i< validate.length; i++) {
        if (validate[i].value === ""&& validate[i].required ) {
          this.$toast({
            message: validate[i].message,
            position: "model",
            duration: 3000
          });
          isValidate = false
          break
        }
        if ((validate[i].regExp && validate[i].required) || (validate[i].value && !validate[i].required)) {
          if (!validate[i].regExp.test(validate[i].value)) {
            this.$toast({
              message: validate[i].errorMsg,
              position: "model",
              duration: 3000
            });
            isValidate = false
            break
          }
        }
      }
      if (isValidate) {     
        this.axios[this.sendUrl](this.form)
          .then(({ data }) => {
            if (data.success) {
              this.$toast({
                message: "保存成功",
                position: "model",
                duration: 3000
              });
              if ([3, 4, 5, 6].indexOf(this.state) !==-1) {
                this.$router.push({
                  path: "/detailEnter/" + this.id
                });
              } else {
                this.$router.push({
                  path: "/detailNotEnter/" + this.id
                });
              }
            }
            if (!data.success) {
              this.$toast({
                message: data.msg,
                position: "model",
                duration: 3000
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }

    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  text-align: center;
  color: $color-primary;
  font-size: $font-small;
}
</style>
