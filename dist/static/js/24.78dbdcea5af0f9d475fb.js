webpackJsonp([24],{wUZA:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("4YfN"),s=o.n(n),i={name:"",beforeCreate:function(){var t=this,e=new Date,o=e.getFullYear()+"-"+(e.getMonth()+1);this.axios.userIndex({followMonth:o,from:"bdcrm",token:this.$store.state.token}).then(function(e){var o=e.data;o.success&&(t.$set(t,"indexInfo",o.data),t.$store.dispatch({type:"User",user:s()({followMonth:o.data.followMonth},o.data.user)}),t.loading=!1),o.success||t.$toast({message:o.msg,position:"model",duration:3e3})}).catch(function(t){console.log(t)})},data:function(){return{loading:!0,indexInfo:{}}},methods:{logout:function(){var t=this;this.axios.logout({from:"bdcrm",token:this.$store.state.token}).then(function(e){var o=e.data;o.success&&(t.$store.commit({type:"LOGOUT"}),t.$toast({message:"登出成功",position:"model",duration:3e3}),t.$router.push({path:"/login"})),o.success||t.$toast({message:o.msg,position:"model",duration:3e3})}).catch(function(t){console.log(t)})}}},a={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return t.loading?t._e():o("div",{},[o("mt-header",{attrs:{title:"BD_CRM系统"}}),t._v(" "),o("div",{staticClass:"card-title",on:{click:function(e){t.$router.push({path:"/userCenter"})}}},[t._v("\n    "+t._s(t.indexInfo.user.userName)+" ("+t._s(t.indexInfo.user.roleName)+")\n  ")]),t._v(" "),o("card",{attrs:{type:"detail",data:{tag:t.indexInfo.followMonth.split("-")[1]+"月",gmvCount:t.indexInfo.gmvCount,orderCount:t.indexInfo.shopCount,visitCount:t.indexInfo.visitCount}},nativeOn:{click:function(e){t.$router.push({path:"/historyData"})}}}),t._v(" "),1===t.indexInfo.user.roleLevel?o("mt-cell",{attrs:{title:"创建商户","is-link":"",to:"/createBusiness"}}):t._e(),t._v(" "),o("mt-cell",{attrs:{title:"商户管理","is-link":"",to:"/businessCenter"}},[t.indexInfo.expireCustomCount?o("span",[t._v(t._s(t.indexInfo.expireCustomCount)+"家")]):t._e(),t._v(" "),t.indexInfo.expireCustomCount?o("span",{staticStyle:{color:"red"}},[t._v("即将到期")]):t._e()]),t._v(" "),o("mt-cell",{attrs:{title:"商户订单","is-link":"",to:"/order"}},[t.indexInfo.orderCount?o("span",[t._v("共"+t._s(t.indexInfo.orderCount)+"单")]):t._e()]),t._v(" "),o("mt-cell",{attrs:{title:"拜访记录","is-link":"",to:"/visitRecord"}}),t._v(" "),o("mt-cell",{attrs:{title:"审批管理","is-link":"",to:"/approvalCenter"}},[t.indexInfo.approvalCount?o("div",[t._v(t._s(t.indexInfo.approvalCount)+"条"),o("span",{staticStyle:{color:"red"}},[t._v("审批中")])]):t._e()]),t._v(" "),o("div",{staticClass:"btnl"},[o("mt-button",{attrs:{size:"large",type:"primary"},on:{click:t.logout}},[t._v("退出系统")])],1)],1)},staticRenderFns:[]},r=o("vSla")(i,a,!1,null,null,null);e.default=r.exports}});
//# sourceMappingURL=24.78dbdcea5af0f9d475fb.js.map