<template>
  <div class="card-pull ms">
    <h2 class="title" v-if="type !== 'custom'">{{data.startTime}}~{{data.endTime}} <span>{{data.titleFullName}}</span></h2>
    <h2 class="title" v-if="type === 'custom'">{{data.month}}</h2>
    <div class="container">
      <div class="item">商户拉新{{isReg?'用户认证':''}}</div>
      <div class="item">{{util.fmoney(data.customUserCount)}}人</div>
    </div>
    <div class="container" v-if="type !== 'custom'">
      <div class="item">个人拉新{{isReg?'用户认证':''}}</div>
      <div class="item">{{util.fmoney(data.personalUserCount)}}人</div>
    </div>
    <p class="foot" v-if="type !== 'custom'">合计：{{util.fmoney(data.userCount)}}人</p>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  props: {
    data: Object,
    type: String,
    isReg: Boolean
  }
}
</script>

<style lang="scss" scoped>
.card-pull {
  background-color: $white;
  padding: 0 10px;
  margin-bottom: 2px;
  color: $font-color-primary;
}
.card-pull h2.title {
  padding: 10px 0 5px;
  margin: 0 0 5px;
  font-weight: 100;
  font-size: $font-large;
  color: $label-color;
  border-bottom: 1px solid $line-color;
  span {
    float: right;
    display: inline-block;
    height: $font-middle;
    line-height: $font-middle;
  }
}
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 3px solid #000;
}
.container {
  display: flex;
  color: $font-color-primary;
  font-size: $font-middle;
}
.item {
  flex: 1;
  text-align: right;
  padding-bottom: 10px;
}
p.foot {
  color: $label-color;
  font-size: $font-middle;
  text-align: right;
  padding: 8px;
  margin: 0 0 0 100px;
  border-top: 1px solid #ccc;
}
</style>
