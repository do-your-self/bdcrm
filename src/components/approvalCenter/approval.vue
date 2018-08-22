<template>
  <div class="">
    <mt-header title="审批">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <selectList title="审批结果" :slotsAll="slots" type="all" v-model="flag"></selectList>
    <mt-field label="备注说明" placeholder="请输入" type="textarea" rows="4" v-model="form.remark"></mt-field>
    <div class="btnl">
      <mt-button size="large" type="primary" @click="submit">保存</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      flag: '通过',
      slots: [{"code": '通过', "name": '通过'}, {"code": '驳回', "name": '驳回'}],
      form: {
        approvalState: this.$route.query.approvalState,
        customId: this.$route.query.customId,
        enterFlowId: this.$route.query.enterFlowId,
        from: 'bdcrm',
        remark: '',
        token: this.$store.state.token
      },
      cusForm: {
        customId: this.$route.query.customId,
        enterFlowId: this.$route.query.enterFlowId,
        from: 'bdcrm',
        remark: '',
        token: this.$store.state.token
      }
    }
  },
  methods: {
    submit () {
      let type=''
      let form={}
      if(this.$route.query.type==='4'){
        type=this.flag === '通过'?'customApproval':'customReject'
        form=this.cusForm
      }else {
        type=this.flag === '通过'?'approval':'approvalReject'
        form=this.form
      }
      this.axios[type] (this.form).then(({ data }) => {
        if (data.success) {
          this.$toast({
            message: data.msg,
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
      // if (this.flag === '通过') {
      //   this.axios.approval (this.form).then(({ data }) => {
      //     if (data.success) {
      //       this.$toast({
      //         message: data.msg,
      //         position: 'model',
      //         duration: 3000
      //       })
      //     }
      //     if (!data.success) {
      //       this.$toast({
      //         message: data.msg,
      //         position: 'model',
      //         duration: 3000
      //       })
      //     }
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // } else {
      //   this.axios.approvalReject (this.form).then(({ data }) => {
      //     if (data.success) {
      //       this.$toast({
      //         message: data.msg,
      //         position: 'model',
      //         duration: 3000
      //       })
      //     }
      //     if (!data.success) {
      //       this.$toast({
      //         message: data.msg,
      //         position: 'model',
      //         duration: 3000
      //       })
      //     }
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
