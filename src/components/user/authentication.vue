<template>
  <div class="bg-con">
    <h1 class="title">身份认证</h1>
    <mt-field label="手机号码" placeholder="请输入登录账号" type="tel" v-model="form.phone"></mt-field>
    <mt-field label="验证码" v-model="form.sendSmsCode">
      <span class="captcha" v-show="show" @click="getCode(form.phone)">获取验证码</span>
      <span class="captcha" v-show="!show">{{count}} s</span>
    </mt-field>
    <div class="btnm">
      <mt-button size="large" type="primary" @click="submit(formData)">确认</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'authentication',
  data () {
    return {
      form: {
        form: 'juzibaitiao',
        phone: '18514428716',
        sendSmsCode: ''
      },
      show: true,
      count: '',
      timer: null
    }
  },
  methods: {
    submit (data) {
      this.axios.sendSmsCode(data).then((data) => {
        console.log(data)
        if (data) {
          this.$toast({
            message: msg,
            position: 'model',
            duration: 3000
          })
        }
        this.$router.push({
          path: '/setPsw'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    getCode (data) {
      this.axios.sendSmsCode(data).then(({ data }) => {
      }).catch(error => {
        console.log(error)
      })
      if (!this.timer) {
        this.count = 60
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= 60) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
