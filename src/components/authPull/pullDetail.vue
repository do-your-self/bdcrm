<template>
  <div class="">
    <mt-header title="数据详情">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <cardpull :isReg="$route.query.isReg?true:false" v-for="(item, index) in items" :key="index" v-bind:data="item"></cardpull>
  </div>
</template>

<script>
export default {
  name: '',
  created () {
    this.axios.userCountDetail(this.form).then(({ data }) => {
      if (data.success) {
        this.loading = false
        this.$set(this, 'items', this.util.sortDate(data.data, 'startTime', true))
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
  data () {
    return {
      form: {
        busLineId: this.$route.query.busLineId,
        cityId: this.$route.query.cityId,
        startTime: this.$route.query.startTime,
        endTime: this.$route.query.endTime,
        flag: this.$route.query.flag,
        from: 'bdcrm',
        token: this.$store.state.token
      },
      items: [],
      selected: '1'
    }
  },
  methods: {
    handleClick () {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
