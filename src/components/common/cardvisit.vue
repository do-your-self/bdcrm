<template>
  <div>
    <slot></slot>
    <div class="card-record list" v-if="type === 'list'">
      <h2 class="title" v-if="data.shopName">{{data.shopName}}</h2>
      <div class="container">
        <div class="item"><div>业务线：</div><div>{{data.busLineName}}</div></div>
        <div class="item"><div>行业：</div><div>{{data.categoryName}}</div></div>
      </div>
      <div class="container">
        <div class="item"><div>跟进日期：</div><div>{{data.followDate}}</div></div>
        <div class="item"><div>跟进方式：</div><div>{{data.followWayName}}</div></div>
      </div>
      <div class="container">
        <div class="item"><div>客户经理：</div><div>{{data.userName}}</div></div>
      </div>
    </div>
    <div class="card-record detail" v-if="type === 'detail'">
      <div class="container">
        <div class="item"><div>商户主体名称：</div><div>{{data.customFullName}}</div></div>
      </div>
      <div class="container">
        <div class="item"><div>业务线：</div><div>{{data.busLineName}}</div></div>
      </div>
      <div class="container">
        <div class="item"><div>品类：</div><div>{{data.categoryName}}</div></div>
      </div>
      <div class="container">
        <div class="item"><div>跟进日期：</div><div>{{data.followDate}}</div></div>
      </div>
      <div class="container">
        <div class="item"><div>跟进方式：</div><div>{{data.followWayName}}</div></div>
      </div>
      <div class="container">
        <div class="item"><div>客户经理：</div><div>{{data.userName}}</div></div>
      </div>
      <div class="container">
        <div class="item"><div>跟进内容：</div><div>{{data.followContent}}</div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    data: Object,
    type: String
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.card-record {
  background-color: #fff;
  padding: 5px;
  margin: 8px;
  border-radius: 5px;
}
.card-record h2 {
  padding: 8px 0;
  margin: 0 0 5px;
  font-weight: 400;
  font-size: $font-large;
  color: $label-color;
  border-bottom: 1px solid $line-color;
}
.title {
  font-size: $font-large;
  color: $label-color;
}
.container {
  display: flex;
  align-items: stretch;
  font-size: $font-middle;
  color: $font-color-primary;
}
.detail .item div:first-child {
  width: 100px;
}
.item {
  flex: 1;
  padding-bottom: 5px;
  overflow: hidden;
  line-height: 21px;
  div:first-child {
    float: left;
    width: 80px;
    color: $label-color
    // text-align:justify;
    // text-justify:distribute-all-lines;
    // text-align-last:justify
  }
  div:last-child {
    padding-left: 60px;
    color: $font-color-primary;
  }
}
</style>
