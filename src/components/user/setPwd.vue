<template>
  <div class="bg-con">
    <mt-header title="修改密码">
      <router-link slot="left" to="">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <h1 class="title">请设置新密码</h1>
    <div class="ml">
      <mt-field label="新密码" placeholder="请输入8~12位的英文+数字组合" :attr="{maxlength: 12}" type="password" v-model="form.newPwd"></mt-field>
      <mt-field label="重复密码" placeholder="请输入密码" :attr="{maxlength: 12}" type="password" v-model="repPwd"></mt-field>
    </div>
    <div class="btnm">
      <mt-button size="large" type="primary" @click="submit">确定</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setPwd',
  props: {
    id: String
  },
  data () {
    return {
      form: {
        from: 'bdcrm',
        token: this.$store.state.token,
        userId: this.id,
        newPwd: ''
      },
      repPwd: ''
    }
  },
  methods: {
    submit () {
      if(this.repPwd === this.form.newPwd) {
        this.axios.setPwd(this.form).then(({ data }) => {
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
      } else {
        this.$toast({
          message: '两次密码不一致',
          position: 'model',
          duration: 3000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
