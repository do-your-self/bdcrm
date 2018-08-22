<template>
  <div class="card-order ms">
    <div class="card-hd">
      {{data.goodsName}}
    </div>
    <div class="card-bd">
      <div class="title">订单号 {{data.orderId}}<span>{{orderState[data.orderState]}}</span></div>
      <div class="container">
        <div class="item">{{data.goodsName}}</div>
        <div class="item"><span>￥{{util.fmoney(data.goodsPrice, 2)}}</span><br/><span>x{{data.goodsCount}}</span></div>
      </div>
      <div class="footer">
        <p>月供：¥{{util.fmoney(data.monthlySupply, 2)}}（含服务费{{util.fmoney(data.serviceCharge, 2)}}）x {{data.instalmentCount}}</p>
        <p>合计：¥{{util.fmoney(data.orderPrice, 2)}}（含首付¥{{util.fmoney(data.downPayments, 2)}}）</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    data: Object
  },
  computed: {
  },
  data () {
    return {
      orderState: {
        110: "已下单，待认证",
        120: "认证激活中",
        140: "待支付首付",
        141: "待签约",
        145: "交易复核中",
        150: "待确认收货",
        160: "已收货，分期还款中",
        170: "已完成",
        180: "已取消",
        185: "交易复核失败",
        190: "待信用支付",
        202: "退货处理中",
        203: "已退货",
        204: "退货失败",
        205: "已取消，退货后取消"
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.card-order {
  font-size: $font-middle;
  color: $font-color-primary;
  margin: 8px;
  .card-hd {
    border: 1px solid $line-color;
    border-bottom: 1px dashed $line-color;
    border-radius: 5px;
    padding: 10px;
    background: #fff;
  }
  .card-bd {
    border: 1px solid $line-color;
    border-top: 0;
    border-radius: 5px;
    background: #fff;
    .title {
      padding: 8px;
      border-bottom: 1px solid $line-color;
      span {
        color: orange;
        float: right;
      }
    }
    .container {
      display: flex;
      align-items: stretch;
      padding: 8px;
      border-bottom: 1px solid $line-color;
      .item:last-child {
        flex: 2;
        text-align: right;
      }
      .item:first-child {
        flex: 3;
        overflow: hidden;
        line-height: 21px;
      }
    }
    .footer {
      text-align: right;
      p {
        margin: 0;
        padding: 15px 5px;
      }
      p:first-child {
        border-bottom: 1px solid $line-color;
      }
    }
  }
}
</style>
