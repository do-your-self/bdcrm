<template>
  <div class="">
    <mt-header title="数据详情">
      <router-link to="/historyData" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <card type="list" v-for="(item, index) in items" :key="index" v-bind:data="item"></card>
  </div>
</template>

<script>
export default {
  name: '',
  created () {
    this.axios.countDetail(this.form).then(({ data }) => {
      if (data.success) {
        this.$set(this, 'items', this.util.sortDate(data.data, 'startTime', true))
        this.loading = false
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
        endTime: this.$route.query.endTime,
        from: 'bdcrm',
        startTime: this.$route.query.startTime,
        token: this.$store.state.token
      },
      items: []
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
