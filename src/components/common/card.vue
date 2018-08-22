<template>
  <div>
    <div class="panel" v-if="type === 'list'">
      <div class="panel_hd">{{data.startTime}}~{{data.endTime}}<span>{{data.titleFullName}}</span></div>
      <div class="panel_bd">
        <div class="vux-card-content">
          <div class="card-demo-flex card-demo-content">
            <div class="card-1px-r">
              <div class="count-title">GMV</div>
              <div class="count-number">{{util.fmoney(data.gmvCount)}}</div>
            </div>
            <div class="card-1px-r">
              <div class="count-title">入驻商户</div>
              <div class="count-number">{{data.shopCount}}</div>
            </div>
            <div>
              <div class="count-title">拜访量</div>
              <div class="count-number">{{data.visitCount}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel" v-if="type === 'detail'">
      <span class="tag" v-if="data.tag">{{data.tag}}</span>
      <div class="panel_bd">
        <div class="vux-card-content">
          <div class="card-demo-flex card-demo-content">
            <div class="card-1px-r">
              <div class="count-title">GMV</div>
              <div class="count-number">{{util.fmoney(data.gmvCount)}}</div>
            </div>
            <div class="card-1px-r">
              <div class="count-title">入驻商户</div>
              <div class="count-number">{{data.orderCount}}</div>
            </div>
            <div>
              <div class="count-title">拜访量</div>
              <div class="count-number">{{data.visitCount}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel" v-if="type === 'busDetail'">
      <span class="tag" v-if="data.tag||data.endTime">{{data.tag}}</span>
      <div class="panel_hd" v-if="data.startTime">{{data.startTime}}~{{data.endTime}}<span>{{data.titleFullName}}</span></div>
      <div class="panel_bd">
        <div class="vux-card-content">
          <div class="card-demo-flex card-demo-content">
            <div class="card-1px-r">
              <div class="count-title">GMV</div>
              <div class="count-number">{{util.fmoney(data.gmvCount)}}</div>
            </div>
            <div class="card-1px-r">
              <div class="count-title">订单量</div>
              <div class="count-number">{{data.orderCount}}</div>
            </div>
            <div>
              <div class="count-title">成单量</div>
              <div class="count-number">{{data.finCount}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  data () {
    return {
    }
  },
  props: {
    data: Object,
    type: String
  }
}
</script>

<style lang="scss" scoped>
.panel {
  background-color: $white;
  margin: 8px 8px 10px 8px;
  position: relative;
  border-radius: 7px;
  box-shadow: 3px 3px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
}
.panel_hd {
  padding: 10px 0;
  margin: 0 10px;
  color: $font-color-title;
  font-size: $font-large;
  position: relative;
  border-bottom: 1px solid $line-color;
  span {
    float: right;
    display: inline-block;
    height: $font-middle;
    line-height: $font-middle;
  }
}
.tag {
  position: absolute;
  top: 8px;
  right: -8px;
  z-index: 1;
  background: $color-primary;
  color: $white;
  padding: 0 5px;
}
.count-title {
  font-size: $font-middle;
}
.count-number {
  font-size: $font-large;
}
.card-1px-r {
  position: relative;
}
.card-1px:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  border: 1px solid $line-color;
  color: $line-color;
  height: 200%;
  -webkit-transform-origin: left top;
          transform-origin: left top;
  -webkit-transform: scale(0.5);
          transform: scale(0.5);
}
.card-1px-r:after {
  content: " ";
  position: absolute;
  right: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-right: 1px solid #C7C7C7;
  color: #C7C7C7;
  -webkit-transform-origin: 100% 0;
          transform-origin: 100% 0;
  -webkit-transform: scaleX(0.5);
          transform: scaleX(0.5);
}
.card-demo-flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.card-demo-content {
  padding: 10px 0;
}
.card-demo-content > div > div {
  color: $label-color;
  padding: 5px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
          flex: 1;
  text-align: center;
  font-size: 12px;
}
</style>
