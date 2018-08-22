<template>
  <div class="bg-con">
    <h1 class="title">hi,欢迎登录BD_CRM系统~</h1>
    <mt-field label="手机号码" placeholder="请输入登录账号" type="tel" v-model="form.phone" :attr="{maxlength: 11}" @change.native="regExp(/^[1][3,4,5,7,8][0-9]{9}$/, form.phone, '请输入正确的手机号码', '手机号码')"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="form.password" @change.native="regExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/, form.password, '请输入由数字字母组成的不小于8位的密码', '密码')"></mt-field>
    <mt-field label="验证码" v-model="form.smsVerifyCode" v-if="isCaptcha" @change.native="regExp(/^[0-9A-Za-z]{1,}$/, form.smsVerifyCode, '请输入正确的验证码', '验证码')">
      <img :src="captchaUrl" height="30px" width="100px" @click="getcaptchaKey()" v-if="captchaUrl">
    </mt-field>
    <p class="forget"><span @click="$toast({
          message: '请与BD运营中心人员联系',
          position: 'model',
          duration: 3000
        })">忘记密码？</span></p>
    <!-- <p class="forget"><span @click="$router.push({path: '/authentication'})">忘记密码？</span></p> -->
    <div class="btnm">
      <mt-button size="large" type="primary" @click="login">登录</mt-button>
    </div>
    <p class="error" v-if="(errCount >= 3)">输入错误5次后，账户将被冻结。您已输入错误{{errCount}}次</p>
  </div>
</template>

<script>
export default {
  name: "login",
  created () {
    this.getcaptchaKey()
  },
  data() {
    return {
      form: {
        from: "bdcrm",
        phone: '',
        password: "",
        smsVerifyCode: "",
        captchaKey: ''
      },
      captchaUrl: null,
      errCount: null,
      isCaptcha: true,
      flag: true
    };
  },
  methods: {
    getcaptchaKey () {
      var time = Date.parse(new Date())
      this.form.captchaKey = time
      this.captchaUrl = "https://bdcrm-h5-api.juzifenqi.com/captcha?captchaKey=" + time
    },
    regExp (reg, val, msg, title) {
      if (val === '') {
        this.$toast({
          message: title+"不能为空",
          position: 'model',
          duration: 3000
        })
        this.flag = false
      } else if (!reg.test(val)) {
        this.$toast({
          message: msg,
          position: 'model',
          duration: 3000
        })
        this.flag = false
      } else {
        this.flag = true
      }
    },
    login() {
      this.flag?this.regExp(/^[1][3,4,5,7,8][0-9]{9}$/, this.form.phone, '请输入正确的手机号码', '手机号码'):''
      this.flag?this.regExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/, this.form.password, '请输入由数字字母组成的不小于8位的密码', '密码'):''
      this.flag?this.regExp(/^[0-9A-Za-z]{1,}$/, this.form.smsVerifyCode, '请输入正确的验证码', '验证码'):''
      if (this.flag) {
        this.axios.login(this.form).then(({ data }) => {
          if (data.success) {
            this.$store.dispatch({
              type: "Login",
              login: {
                pwd: this.form.password,
                token: data.data.token
              }
            });
            // 0 跳转到设置密码页 1 跳转到首页
            data.data.pwdFlg === "1"
              ? this.$router.push({ path: "/home" })
              : this.$router.push({ path: "/setPwd/" + data.data.userId });
          }
          if (!data.success) {
            this.$toast({
              message: data.msg,
              position: "model",
              duration: 3000
            });
            // this.isCaptcha = true;
            // this.captchaUrl = "https://bdcrm-h5-api.juzifenqi.com/captcha?d=" + Math.random();
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
p.forget {
  margin-right: 10px;
  text-align: right;
  font-size: $font-middle;
  color: $color-primary;
}
p.error {
  color: red;
  font-size: $font-middle;
  text-align: center;
}
</style>
