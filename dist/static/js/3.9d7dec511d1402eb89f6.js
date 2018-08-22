webpackJsonp([3],{BhUe:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("YxPG"),n={name:"",props:{id:String},components:{businessInfo:s.a},created:function(){var t=this;this.axios.getCustom(this.form).then(function(e){var a=e.data;a.success&&(a.data.customEntity&&(t.data.customEntity=a.data.customEntity),a.data.customFinanceEntity&&(t.data.customFinanceEntity=a.data.customFinanceEntity),a.data.customLicenseEntity&&(t.data.customLicenseEntity=a.data.customLicenseEntity),a.data.customShopEntity&&(t.data.customShopEntity=a.data.customShopEntity),t.loading=!1),a.success||t.$toast({message:a.msg,position:"model",duration:3e3})}).catch(function(t){console.log(t)})},data:function(){return{selected:"1",loading:!0,form:{customId:this.id,from:"bdcrm",token:this.$store.state.token},data:{customEntity:{busLineId:"",busLineName:"",categoryId:"",categoryName:"",customFullName:"",customId:"",customName:"",linkMobile:"",linkPerson:"",linkPosition:"",storeAddress:"",storeArea:"",storeCity:"",storeProvicne:"",userFullName:"",userId:""},customFinanceEntity:{accountName:"",bankCard:"",bankCity:"",bankProvince:"",branchBankId:"",branchBankName:"",cardholder:"",cardholderPhone:"",cardholderTel:"",customId:"",id:"",isCompany:1,reservePersonCode:"",reservePhone:""},customLicenseEntity:{businessCode:"",businessModel:"",chargePerson:"",chargePersonCode:"",chargePersonPhone:"",customId:"",legalPerson:"",legalPersonCode:"",licenseId:"",registAddress:"",registArea:"",registCapital:"",registCity:"",registDate:"",registProvince:"",shopCount:"",validityDate:""},customShopEntity:{busspace:"",cooperateLevel:"",cox:"",coy:"",customId:"",endTime:"",isSole:"",monthTurnover:"",ownership:"",remarks:"",shopId:"",startTime:"",storeAddress:"",storeArea:"",storeCity:"",storeMobile:"",storePerson:"",storePosition:"",storeProvicne:"",storeShortName:"",storeType:"",totalPerson:""}},crmState:{0:{text:"未签约",class:"no"},1:{text:"签约中",class:"await"},2:{text:"入驻审批",class:"success"},"-1":{text:"失败",class:"error"}}}},methods:{}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("mt-header",{attrs:{title:"商户详情"}},[a("router-link",{attrs:{slot:"left",to:"/businessCenter"},slot:"left"},[a("mt-button",{attrs:{icon:"back"}},[t._v("返回")])],1)],1),t._v(" "),t.loading?t._e():a("div",{staticClass:"busInfo"},[a("div",{staticClass:"title"},[t._v("\n      "+t._s(t.data.customEntity.customName)+"\n    ")]),t._v(" "),a("div",{staticClass:"reject"},[t._v("\n      "+t._s(t.data.customEntity.dismissal)+"\n    ")]),t._v(" "),t.crmState[t.data.customEntity.crmState]?a("span",{staticClass:"tag",class:t.crmState[t.data.customEntity.crmState].class},[t._v(t._s(t.crmState[t.data.customEntity.crmState].text))]):t._e()]),t._v(" "),a("mt-cell",{staticClass:"ms",attrs:{title:"录入拜访","is-link":""},nativeOn:{click:function(e){t.$router.push({path:"/createVisit/"+t.id,query:{shopName:t.data.customEntity.customName}})}}}),t._v(" "),a("mt-cell",{attrs:{title:"查看拜访记录"},nativeOn:{click:function(e){t.$router.push({name:"visitRecord",query:{id:t.id}})}}}),t._v(" "),a("mt-cell",{attrs:{title:"去签约","is-link":""},nativeOn:{click:function(e){2!==t.data.customEntity.crmState?t.$router.push({path:"/contract",query:{legalCard:t.data.customLicenseEntity.legalPersonCode,legalPerson:t.data.customLicenseEntity.legalPerson,customFullName:t.data.customEntity.customFullName,customName:t.data.customEntity.customName,id:t.id}}):t.$router.push({name:"contractInfo",query:{id:t.id,canEdit:!1,selected:t.selected}})}}}),t._v(" "),t.loading?t._e():a("businessInfo",{staticClass:"ml",attrs:{data:t.data},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}}),t._v(" "),2!==t.data.customEntity.crmState?a("div",{staticClass:"btnl"},[a("mt-button",{attrs:{size:"large",type:"primary"},on:{click:function(e){t.$router.push({path:"/completeInfo/"+t.id,query:{id:t.id,selected:t.selected}})}}},[t._v("编辑商户信息")])],1):t._e()],1)},staticRenderFns:[]};var i=a("vSla")(n,o,!1,function(t){a("udx2")},"data-v-5557cbd0",null);e.default=i.exports},OtHA:function(t,e){},YxPG:function(t,e,a){"use strict";var s={name:"",props:{data:Object},data:function(){return{selected:"1",isEdit:!1}},watch:{selected:function(t,e){this.$emit("input",this.selected)}},computed:{storeAddress:function(){return this.util.getAddr(this.data.customEntity.storeProvicne,this.data.customEntity.storeCity,this.data.customEntity.storeArea)},registAddress:function(){return this.util.getAddr(this.data.customLicenseEntity.registProvince,this.data.customLicenseEntity.registCity,this.data.customLicenseEntity.registArea)},shopAddress:function(){return this.util.getAddr(this.data.customShopEntity.storeProvicne,this.data.customShopEntity.storeCity,this.data.customShopEntity.storeArea)}},methods:{submit:function(){this.$router.push({path:"/detailNotEnter/"+this.$store.state.baseInfo.form.customId})}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{},[a("mt-navbar",{model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[a("mt-tab-item",{attrs:{id:"1"}},[t._v("基本信息")]),t._v(" "),a("mt-tab-item",{attrs:{id:"2"}},[t._v("商户信息")]),t._v(" "),a("mt-tab-item",{attrs:{id:"3"}},[t._v("门店信息")]),t._v(" "),a("mt-tab-item",{attrs:{id:"4"}},[t._v("财务信息")])],1),t._v(" "),a("mt-tab-container",{staticClass:"ml",model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[a("mt-tab-container-item",{attrs:{id:"1"}},[a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"商户门店简称"},model:{value:t.data.customEntity.customName,callback:function(e){t.$set(t.data.customEntity,"customName",e)},expression:"data.customEntity.customName"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"营业执照名称"},model:{value:t.data.customEntity.customFullName,callback:function(e){t.$set(t.data.customEntity,"customFullName",e)},expression:"data.customEntity.customFullName"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"商户业务线"},model:{value:t.data.customEntity.busLineName,callback:function(e){t.$set(t.data.customEntity,"busLineName",e)},expression:"data.customEntity.busLineName"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"商户品类"},model:{value:t.data.customEntity.categoryName,callback:function(e){t.$set(t.data.customEntity,"categoryName",e)},expression:"data.customEntity.categoryName"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"经营地址"},model:{value:t.storeAddress,callback:function(e){t.storeAddress=e},expression:"storeAddress"}}),t._v(" "),a("mt-field",{staticClass:"ms",attrs:{readonly:!0,disableClear:!0,label:"业务联系人"},model:{value:t.data.customEntity.linkPerson,callback:function(e){t.$set(t.data.customEntity,"linkPerson",e)},expression:"data.customEntity.linkPerson"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"联系人手机"},model:{value:t.data.customEntity.linkMobile,callback:function(e){t.$set(t.data.customEntity,"linkMobile",e)},expression:"data.customEntity.linkMobile"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"职务"},model:{value:t.data.customEntity.linkPosition,callback:function(e){t.$set(t.data.customEntity,"linkPosition",e)},expression:"data.customEntity.linkPosition"}})],1),t._v(" "),t.data.customLicenseEntity?a("mt-tab-container-item",{attrs:{id:"2"}},[a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"营业模式",value:1===t.data.customLicenseEntity.businessModel?"自营":2===t.data.customLicenseEntity.businessModel?"加盟":""}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"营业执照号"},model:{value:t.data.customLicenseEntity.businessCode,callback:function(e){t.$set(t.data.customLicenseEntity,"businessCode",e)},expression:"data.customLicenseEntity.businessCode"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"营业执照注册地址"},model:{value:t.registAddress,callback:function(e){t.registAddress=e},expression:"registAddress"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"营业执照注册详细地址"},model:{value:t.data.customLicenseEntity.registAddress,callback:function(e){t.$set(t.data.customLicenseEntity,"registAddress",e)},expression:"data.customLicenseEntity.registAddress"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"注册资金(万元)",value:t.data.customLicenseEntity.registCapital?t.data.customLicenseEntity.registCapital:""}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"成立日期"},model:{value:t.data.customLicenseEntity.registDate,callback:function(e){t.$set(t.data.customLicenseEntity,"registDate",e)},expression:"data.customLicenseEntity.registDate"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"营业期限至",value:"2099-12-31"===t.data.customLicenseEntity.validityDate?"长期":t.data.customLicenseEntity.validityDate}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"门店数量",value:t.data.customLicenseEntity.shopCount?t.data.customLicenseEntity.shopCount:""}}),t._v(" "),a("mt-field",{staticClass:"ms",attrs:{readonly:!0,disableClear:!0,label:"法定代表人"},model:{value:t.data.customLicenseEntity.legalPerson,callback:function(e){t.$set(t.data.customLicenseEntity,"legalPerson",e)},expression:"data.customLicenseEntity.legalPerson"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"法定代表人证件号码"},model:{value:t.data.customLicenseEntity.legalPersonCode,callback:function(e){t.$set(t.data.customLicenseEntity,"legalPersonCode",e)},expression:"data.customLicenseEntity.legalPersonCode"}}),t._v(" "),a("mt-field",{staticClass:"ms",attrs:{readonly:!0,disableClear:!0,label:"实际负责人"},model:{value:t.data.customLicenseEntity.chargePerson,callback:function(e){t.$set(t.data.customLicenseEntity,"chargePerson",e)},expression:"data.customLicenseEntity.chargePerson"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"实际负责人证件号码"},model:{value:t.data.customLicenseEntity.chargePersonCode,callback:function(e){t.$set(t.data.customLicenseEntity,"chargePersonCode",e)},expression:"data.customLicenseEntity.chargePersonCode"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"实际负责人手机号码"},model:{value:t.data.customLicenseEntity.chargePersonPhone,callback:function(e){t.$set(t.data.customLicenseEntity,"chargePersonPhone",e)},expression:"data.customLicenseEntity.chargePersonPhone"}})],1):t._e(),t._v(" "),t.data.customShopEntity?a("mt-tab-container-item",{attrs:{id:"3"}},[a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"门店类型",value:1===t.data.customShopEntity.storeType?"pop商户":2===t.data.customShopEntity.storeType?"线下商户":""}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"门店简称"},model:{value:t.data.customShopEntity.storeShortName,callback:function(e){t.$set(t.data.customShopEntity,"storeShortName",e)},expression:"data.customShopEntity.storeShortName"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"是否独家合作",value:1===t.data.customShopEntity.isSole?"是":0===t.data.customShopEntity.isSole?"否":""}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"配合力度",value:1===t.data.customShopEntity.cooperateLevel?"有兜底":0===t.data.customShopEntity.cooperateLevel?"无兜底":""}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"月营业额（万元）",value:t.data.customShopEntity.monthTurnover?t.data.customShopEntity.monthTurnover:""}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"门店介绍"},model:{value:t.data.customShopEntity.remarks,callback:function(e){t.$set(t.data.customShopEntity,"remarks",e)},expression:"data.customShopEntity.remarks"}}),t._v(" "),a("mt-field",{staticClass:"ms",attrs:{readonly:!0,disableClear:!0,label:"门店联系人"},model:{value:t.data.customShopEntity.storePerson,callback:function(e){t.$set(t.data.customShopEntity,"storePerson",e)},expression:"data.customShopEntity.storePerson"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"门店联系人手机号码"},model:{value:t.data.customShopEntity.storeMobile,callback:function(e){t.$set(t.data.customShopEntity,"storeMobile",e)},expression:"data.customShopEntity.storeMobile"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"门店联系人职务"},model:{value:t.data.customShopEntity.storePosition,callback:function(e){t.$set(t.data.customShopEntity,"storePosition",e)},expression:"data.customShopEntity.storePosition"}}),t._v(" "),a("mt-field",{staticClass:"ms",attrs:{readonly:!0,disableClear:!0,label:"营业开始时间"},model:{value:t.data.customShopEntity.startTime,callback:function(e){t.$set(t.data.customShopEntity,"startTime",e)},expression:"data.customShopEntity.startTime"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"营业结束时间"},model:{value:t.data.customShopEntity.endTime,callback:function(e){t.$set(t.data.customShopEntity,"endTime",e)},expression:"data.customShopEntity.endTime"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"员工人数",value:t.data.customShopEntity.totalPerson?t.data.customShopEntity.totalPerson:""}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"经营面积（㎡）",value:t.data.customShopEntity.busspace?t.data.customShopEntity.busspace:""}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"门店实际经营地址"},model:{value:t.shopAddress,callback:function(e){t.shopAddress=e},expression:"shopAddress"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"门店实际经营详细地址"},model:{value:t.data.customShopEntity.storeAddress,callback:function(e){t.$set(t.data.customShopEntity,"storeAddress",e)},expression:"data.customShopEntity.storeAddress"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"经营场所物业所有权",value:1==t.data.customShopEntity.ownership?"自有":2==t.data.customShopEntity.ownership?"租赁":3==t.data.customShopEntity.ownership?"其它":""}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"经纬度 X"},model:{value:t.data.customShopEntity.cox,callback:function(e){t.$set(t.data.customShopEntity,"cox",e)},expression:"data.customShopEntity.cox"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"经纬度 Y"},model:{value:t.data.customShopEntity.coy,callback:function(e){t.$set(t.data.customShopEntity,"coy",e)},expression:"data.customShopEntity.coy"}})],1):t._e(),t._v(" "),t.data.customFinanceEntity?a("mt-tab-container-item",{attrs:{id:"4"}},[a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"收款账号"},model:{value:t.data.customFinanceEntity.bankCard,callback:function(e){t.$set(t.data.customFinanceEntity,"bankCard",e)},expression:"data.customFinanceEntity.bankCard"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"账号开户行"},model:{value:t.data.customFinanceEntity.branchBankName,callback:function(e){t.$set(t.data.customFinanceEntity,"branchBankName",e)},expression:"data.customFinanceEntity.branchBankName"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"开户行支行"},model:{value:t.data.customFinanceEntity.bankCity,callback:function(e){t.$set(t.data.customFinanceEntity,"bankCity",e)},expression:"data.customFinanceEntity.bankCity"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"是否对公账户",value:0===t.data.customFinanceEntity.isCompany?"否":"是"}}),t._v(" "),t.data.customFinanceEntity.isCompany?a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"联行号"},model:{value:t.data.customFinanceEntity.bankProvince,callback:function(e){t.$set(t.data.customFinanceEntity,"bankProvince",e)},expression:"data.customFinanceEntity.bankProvince"}}):t._e(),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:t.data.customFinanceEntity.isCompany?"账户名称（持有账号主体名）":"账户名称（持卡人名称）"},model:{value:t.data.customFinanceEntity.accountName,callback:function(e){t.$set(t.data.customFinanceEntity,"accountName",e)},expression:"data.customFinanceEntity.accountName"}}),t._v(" "),t.data.customFinanceEntity.isCompany?t._e():a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"预留手机号"},model:{value:t.data.customFinanceEntity.reservePersonCode,callback:function(e){t.$set(t.data.customFinanceEntity,"reservePersonCode",e)},expression:"data.customFinanceEntity.reservePersonCode"}}),t._v(" "),t.data.customFinanceEntity.isCompany?t._e():a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"身份证号"},model:{value:t.data.customFinanceEntity.reservePhone,callback:function(e){t.$set(t.data.customFinanceEntity,"reservePhone",e)},expression:"data.customFinanceEntity.reservePhone"}}),t._v(" "),a("mt-field",{staticClass:"ms",attrs:{readonly:!0,disableClear:!0,label:"财务联系人"},model:{value:t.data.customFinanceEntity.cardholder,callback:function(e){t.$set(t.data.customFinanceEntity,"cardholder",e)},expression:"data.customFinanceEntity.cardholder"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"财务联系人手机号码"},model:{value:t.data.customFinanceEntity.cardholderPhone,callback:function(e){t.$set(t.data.customFinanceEntity,"cardholderPhone",e)},expression:"data.customFinanceEntity.cardholderPhone"}}),t._v(" "),a("mt-field",{attrs:{readonly:!0,disableClear:!0,label:"财务联系人固定电话"},model:{value:t.data.customFinanceEntity.cardholderTel,callback:function(e){t.$set(t.data.customFinanceEntity,"cardholderTel",e)},expression:"data.customFinanceEntity.cardholderTel"}})],1):t._e()],1)],1)},staticRenderFns:[]};var o=a("vSla")(s,n,!1,function(t){a("OtHA")},"data-v-7e3c8b2e",null);e.a=o.exports},udx2:function(t,e){}});
//# sourceMappingURL=3.9d7dec511d1402eb89f6.js.map