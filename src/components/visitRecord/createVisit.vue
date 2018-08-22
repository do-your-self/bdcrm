<template>
  <div class="">
    <mt-header title="录入拜访">
      <router-link :to="{ path:'/detailNotEnter/'+id }" slot="left">
        <mt-button icon="back">返回</mt-button>
        <!-- <mt-button icon="back" @click.native="$router.go(-1)">返回</mt-button> -->
      </router-link>
    </mt-header>
    <mt-field :readonly=true :disableClear=true label="商户名称" placeholder="请输入拜访商户名称" v-model="form.shopName"></mt-field>
    <selectList title="业务线" type="line" :disabled="isDisable" v-on:select="getValue" @click.native="regShop"></selectList>
    <selectList title="行业" type="category" :disabled="isDisable" v-on:select="getValue" @click.native="regShop"></selectList>
    <mt-field label="联系人" v-model="form.userName"></mt-field>
    <selectList title="跟进方式" :val="form.followWay==2?'拜访':''" type="follow" v-model="form.followWay"></selectList>
    <selectList title="跟进日期" type="date" v-model="form.followDate"></selectList>
    <mt-field label="跟进内容" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" :attr="{maxlength: 100}" placeholder="请录入内容" type="textarea" rows="2" v-model="form.followContent"></mt-field>
    <div class="btnl">
      <mt-button size="large" type="primary" @click="submit">提交</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    id: String
  },
  data () {
    return {
      isDisable: false,
      form: {
        busLineId: '1',	
        busLineName: '',
        categoryId: '1',
        categoryName: '',
        customId: this.id,
        followContent: '',
        followDate: '',
        followWay: 2,
        from: 'bdcrm',
        shopName: this.$route.query.shopName,
        token: this.$store.state.token,
        userId: this.$store.state.user.userId,
        userName: this.$store.state.user.userName
      }
    }
  },
  // watch: {
  //   form: {
  //     handler(val, oldVal){
  //       if (!val.shopName) {
  //         return this.isDisable = true
  //       } else {
  //         return this.isDisable = false
  //       }
  //     },
  //     deep:true
  //   }
  // },
  methods: {
    regShop () {
      if (this.isDisable) {
        this.$toast({
          message: '请先输入商户名称',
          position: 'model',
          duration: 3000
        })
      }
    },
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
      }
    },
    submit () {
      var validate = [{
          value: this.form.shopName,
          required: true, message: '商户名称不能为空'
        }, {
          value: this.form.busLineName,
          required: true, message: '业务线不能为空'
        }, {
          value: this.form.categoryName,
          required: true, message: '行业不能为空'
        }, {
          value: this.form.userName,
          required: true, message: '联系人不能为空'
        }, {
          value: this.form.followWay,
          required: true, message: '跟进方式不能为空'
        }, {
          value: this.form.followDate,
          required: true, message: '跟进日期不能为空'
        }, {
          value: this.form.followContent,
          required: true, message: '跟进内容不能为空', regExp: /^.{2,50}$/, errorMsg: "跟进内容长度大于等于2，小于等于50"
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
        if (i==5&&!(Date.parse(validate[i].value) <= Date.parse(new Date()))) {
          this.$toast({
            message: '跟进日期不能大于当前时间',
            position: "model",
            duration: 3000
          });
          isValidate = false
          break;
        }
      }
      if (isValidate) {
        this.axios.createVisit(this.form).then(({ data }) => {
          if (data.success) {
            // this.$store.dispatch({
            //   type: 'BaseInfo',
            //   form: data.data,
            //   area: this.area
            // })
            this.$toast({
              message: '录入成功',
              position: 'model',
              duration: 3000
            })
            this.$router.push({
              name: 'visitRecord',
              query: {id: this.id}
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

<style lang="scss" scoped>

</style>
