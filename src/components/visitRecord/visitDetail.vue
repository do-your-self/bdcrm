<template>
  <div class="" v-if="!loading">
    <mt-header title="拜访详情">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <cardvisit type='detail' v-bind:data="item">
      <div class="head" v-if="item.followDate">
        {{item.followDate.slice(0,7)}}
      </div>
    </cardvisit>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    'id': String
  },
  created () {
    this.axios.visitDetail({visitId: this.id, from: 'bdcrm', token: this.$store.state.token}).then(({ data }) => {
      if (data.success) {
        this.loading = false
        this.$set(this, 'item', data.data)
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
      loading: true,
      item: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.head {
  font-size: $font-middle;
  color: $color-primary;
  font-weight: 700;
  padding: 10px 10px 0;
}
</style>
