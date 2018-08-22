<template>
  <div class="">
    <mt-header title="创建商户门店">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-field label="客户经理人" placeholder="请输入客户经理人" v-model="form.userFullName" :readonly=true :disableClear=true></mt-field>
    <mt-field label="营业执照名称" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" placeholder="请输入商户名称" :attr="{maxlength: 30}" v-model.trim="form.customFullName"></mt-field>
    <mt-field label="商户门店简称" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" placeholder="请输入商户门店简称(≤15位)" :attr="{maxlength: 15}" v-model.trim="form.customName"></mt-field>
    <selectList title="业务线" type="line" :val="form.busLineName" v-on:select="getValue"></selectList>
    <selectList title="商户行业" type="category" :val="form.categoryName" v-on:select="getValue"></selectList>
    <selectList title="经营地区" type="city" v-on:select="getValue"></selectList>
    <mt-field label="详细地址" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" placeholder="请输入详细地址" :attr="{maxlength: 50}" type="textarea" rows="4" v-model="form.storeAddress"></mt-field>
    <mt-field label="业务联系人" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" placeholder="请输入业务联系人姓名" :attr="{maxlength: 10}" v-model="form.linkPerson"></mt-field>
    <mt-field label="联系人手机" placeholder="请输入联系人手机号码" :attr="{maxlength: 11}" type="tel" v-model="form.linkMobile"></mt-field>
    <mt-field label="职务" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" placeholder="请输入职务" :attr="{maxlength: 20}" v-model="form.linkPosition"></mt-field>
    <div class="btnl">
      <mt-button size="large" type="primary" @click="created">创建商户门店</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      form: {
        busLineId: 'shangcheng',
        busLineName: '商城',
        categoryId: 'jianshen',
        categoryName: '健身',
        customFullName: '',
        customName: '',
        from: 'bdcrm',
        linkMobile: '',
        linkPerson: '',
        linkPosition: '',
        storeAddress: '',
        storeArea: '',
        storeCity: '',
        storeProvicne: '',
        token: this.$store.state.token,
        userFullName: this.$store.state.user.titleFullName,
        userId: this.$store.state.user.userId
      },
      storeAddress: ''
    }
  },
  methods: {
    getValue (values, type) {
      switch (type) {
        case 'category':
          this.form.categoryName = values[0].name
          this.form.categoryId = values[0].code
          break;
        case 'line':
          this.form.busLineName = values[0].name
          this.form.busLineId = values[0].code
          break;
        case 'city':
          this.storeAddress = values[0].name + '/' + values[1].name + '/' + values[2].name
          this.form.storeProvicne = values[0].name + '@' + values[0].code
          this.form.storeCity = values[1].name + '@' + values[1].code
          this.form.storeArea = values[2].name + '@' + values[2].code
          break;
      }
    },
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    selectCity (data) {
      this.form.storeArea = data.area
      this.form.storeCity = data.city
      this.form.storeProvicne = data.provicne
    },
    created () {
      var validate = [
        {
          value: this.form.customFullName,
          required: true, message: '营业执照名称不能为空', regExp: /^.{2,30}$/, errorMsg: "营业执照名称长度大于等于2，小于等于30"
        }, {
          value: this.form.customName,
          required: true, message: '商户门店简称不能为空', regExp: /^.{1,15}$/, errorMsg: "商户门店简称长度小于等于15"
        }, {
          value: this.form.busLineName,
          required: true, message: '业务线不能为空'
        }, {
          value: this.form.categoryName,
          required: true, message: '商户品类不能为空'
        }, {
          value: this.storeAddress,
          required: true, message: '经营地区不能为空'
        }, {
          value: this.form.storeAddress,
          required: true, message: '详细地址不能为空', regExp: /^.{2,50}$/, errorMsg: "详细地址长度大于等于2，小于等于50"
        }, {
          value: this.form.linkPerson,
          required: true, message: '业务联系人不能为空', regExp: /^.{2,10}$/, errorMsg: "业务联系人长度大于等于2，小于等于10"
        }, {
          value: this.form.linkMobile,
          required: true, message: '业务联系人手机号不能为空', regExp: /^[1][3,4,5,7,8][0-9]{9}$/, errorMsg: "业务联系人手机号格式不对"
        }, {
          value: this.form.linkPosition,
          required: true, message: '业务联系人职务不能为空', regExp: /^.{2,20}$/, errorMsg: "业务联系人职务长度大于等于2，小于等于20"
        }
      ]
      var isValidate = true
      for(var i =0; i< validate.length; i++) {
        if (!validate[i].value && validate[i].required ) {
          this.$toast({
            message: validate[i].message,
            position: "model",
            duration: 3000
          });
          isValidate = false
          break;
        }
        if ((validate[i].regExp && validate[i].required)|| (validate[i].value&& !validate[i].required)) {
          if (!validate[i].regExp.test(validate[i].value)) {
            this.$toast({
              message: validate[i].errorMsg,
              position: "model",
              duration: 3000
            });
            isValidate = false
          break;
          }
        }
      }
      if (isValidate) {
        this.axios.createCustom(this.form).then(({ data }) => {
          if (data.success) {
            this.$store.dispatch({
              type: 'BaseInfo',
              form: {
                custom: data.data
              }
            })
            this.$toast({
              message: '商户创建成功，可以继续完善资料并添加拜访记录',
              position: 'model',
              duration: 3000
            })
            this.$router.push({
              path: '/completeInfo/' + data.data.customId
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
    }
  }
}
</script>
<style scoped lang="scss">
</style>
