<template>
  <div class="">
    <mt-header title="客户经理变更">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <!-- <mt-cell label="原客户经理" v-model="form.oldUserId" v-link></mt-cell> -->
    <mt-field :readonly=true :disableClear=true label="原客户经理" v-model="oldName"></mt-field>
    <!-- <mt-field label="变更客户经理" placeholder="请输入" v-model="form.newUserId"></mt-field> -->
    <mt-cell title="变更客户经理" is-link :value="form.newUserId" @click.native="popupVisible = !popupVisible">{{userName}}</mt-cell>
    <mt-popup v-model="popupVisible" position="right" class="search">
      <mt-search v-model="userName" :show="true" :result="filterResult">
        <mt-cell v-for="item in filterResult" :title="item.userName" :key="item.userId" @click.native="getUser(item)"></mt-cell>
        <div class="error" v-if="filterResult.length === 0">
          <p>没有查询结果</p>
          <mt-button size="small" @click.native="popupVisible = false;userName =''">返回</mt-button>
        </div>
      </mt-search>
    </mt-popup>
    <mt-field label="变更原因" :attr="{maxlength: 20}" placeholder="请输入" type="textarea" rows="3" v-model="form.remark"></mt-field>
    <mt-field label="变更生效时间" placeholder="请输入" v-model="form.effectiveTime"></mt-field>
    <div class="btnl">
      <mt-button size="large" type="primary" @click="submit">提交</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  created () {
    this.axios.customSelect({
        customId: this.$route.query.id,
        from: 'bdcrm',
        token: this.$store.state.token
      }).then(({ data }) => {
      if (data.success) {
        this.$set(this, 'searchItems', data.data)
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
    filterResult() {
      return this.searchItems.filter(value =>
        new RegExp(this.userName, "i").test(value.userName)
      );
    }
  },
  data () {
    return {
      form: {
        customId: this.$route.query.id,
        busLineld: 'shangcheng',
        effectiveTime: '',
        from: 'bdcrm',
        newUserId: "",
        oldUserId: this.$route.query.id,
        remark: "",
        token: this.$store.state.token
      },
      oldName: this.$route.query.name,
      userName: "",
      searchItems: [],
      popupVisible: false
    }
  },
  methods: {
    getUser(item) {
      this.form.newUserId = item.userId;
      this.userName = item.userName;
      this.popupVisible = false;
    },
    submit () {
      var validate =[{
        value: this.form.newUserId,
        required: true, message: '变更客户经理不能为空'
      },{
        value: this.form.remark,
        required: true, message: '变更原因不能为空'
      }]
      var isValidate = true
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
        if ((validate[i].regExp && validate[i].required) || (validate[i].value !== "" && !validate[i].required)) {
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
        this.axios.changeCustom(this.form).then(({ data }) => {
          if (data.success) {
            this.$toast({
              message: '提交成功',
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
      }
    }
  }
}
</script>

<style scoped lang="scss">
.error {
  text-align: center;
  color: $color-primary;
  font-size: $font-small;
}
</style>
