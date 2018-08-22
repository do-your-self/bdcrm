<template>
  <div class="">
    <mt-header title="订单详情">
      <router-link slot="left" to="">
        <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="card-bd mm">
      <div class="title">订单号 {{order.orderCode}}<span>{{orderState[order.orderState]}}</span></div>
      <div class="container">
        <div class="item">{{order.goodsName}}</div>
        <div class="item"><span>￥{{util.fmoney(order.goodsPrice, 2)}}</span><br/><span>x{{order.goodsCount}}</span></div>
      </div>
      <div class="footer">
        <p>订单生成时间：{{order.createDate}}</p>
      </div>
      <mt-cell title="首付" :value="'￥' + util.fmoney(order.downPayments, 2)"></mt-cell>
      <mt-cell title="月供" :value="'￥' + util.fmoney(order.monthlySupply, 2) + '（含服务费' + util.fmoney(order.serviceCharge, 2) + '）'"></mt-cell>
      <mt-cell title="期数" :value="order.instalmentCount + '期'"></mt-cell>
      <mt-cell title="" is-link value="查看账单" :to="'/account/' + order.orderId"></mt-cell>
      <mt-cell title="借款人" :value="order.borrowerName"></mt-cell>
      <mt-cell title="手机号" :value="order.serviceCharge"></mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    id: String
  },
  created () {
    this.axios.getOrder(this.form).then(({ data }) => {
      if (data.success) {
        this.$set(this, 'order', data.data)
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
        from: 'bdcrm',
        orderId: this.id,
        token: this.$store.state.token
      },
      order: {},
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
  }
}
</script>

<style scoped lang="scss">
.card-bd {
  font-size: $font-small;
  color: $color-primary;
  border: 1px solid #ccc;
  border-top: 0;
  // border-radius: 5px;
  background: #fff;
  .title {
    padding: 8px;
    border-bottom: 1px solid #ccc;
    span {
      color: orange;
      float: right;
    }
  }
  .container {
    display: flex;
    align-items: stretch;
    padding: 8px;
    border-bottom: 1px solid #ccc;
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
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
