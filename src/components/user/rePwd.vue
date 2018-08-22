<template>
  <div class="bg-con">
    <mt-header title="修改密码">
      <router-link slot="left" to="">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="ml">
      <mt-field label="当前密码" placeholder="请输入登录密码" type="password" v-model="form.oldPwd"></mt-field>
      <mt-field label="新密码" placeholder="请输入8~12位的英文+数字组合" :attr="{maxlength: 12}" type="password" v-model="form.newPwd"></mt-field>
      <mt-field label="重复密码" placeholder="请输入密码" type="password" :attr="{maxlength: 12}" v-model="form.rePwd"></mt-field>
    </div>
    <div class="btnm">
      <mt-button size="large" type="primary" @click="submit">确定</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      form: {
        from: 'bdcrm',
        oldPwd: '',
        newPwd: '',
        rePwd: '',
        token: this.$store.state.token
      }
    }
  },
  methods: {
    submit () {
      if (this.form.newPwd === this.form.oldPwd) {
        this.$toast({
          message: '新密码请勿与初始密码一致',
          position: 'model',
          duration: 3000
        })
      } else if (this.form.rePwd !== this.form.newPwd) {
        this.$toast({
          message: '两次密码输入不一致',
          position: 'model',
          duration: 3000
        })
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(this.form.newPwd)) {
        this.$toast({
          message: '新密码设置不符合规则',
          position: 'model',
          duration: 3000
        })
      } else {
        this.axios.rePwd(this.form).then(({ data }) => {
          if (data.success) {
            this.$toast({
              message: '修改成功',
              position: 'model',
              duration: 3000
            })
            this.$router.push({
              path: '/home'
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
