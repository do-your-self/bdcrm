<template>
  <div class="">
    <mt-header title="用户管理">
      <router-link slot="left" to="">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="ml">
      <mt-cell title="密码修改" is-link to="/rePwd">
      </mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userCenter',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
