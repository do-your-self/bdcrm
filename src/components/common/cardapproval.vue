<template>
  <div class="card-approval">
    <h2 class="title"><span>{{type[data.type]}}</span><span v-if="data.type"> — </span><span class="cusname">{{data.customName}}</span><span class="date">{{data.createDate?data.createDate.slice(0,10):''}}</span></h2>
    <div class="container">
      <div class="item"><span>商户地区：</span><span>{{util.getAddr(data.storeProvicne,data.storeCity,data.sotreArea)}}</span></div>
    </div>
    <div class="container">
      <div class="item"><span>所属业务线：</span><span>{{data.busLineName}}</span></div>
    </div>
    <div class="container">
      <div class="item"><span>品类：</span><span>{{data.categoryName}}</span></div>
    </div>
    <div class="footer success" v-if="data.approvalState=='9'">{{approvalState[data.approvalState]}} 审批通过</div>
    <div class="footer process" v-if="data.crmState===2||['2','3','5','6','7'].indexOf(data.approvalState)!==-1">{{approvalState[data.approvalState]}} 审批中</div>
    <div class="footer reject" v-if="['-2','-3','-5','-6','-7'].indexOf(data.approvalState)!==-1">{{approvalState[data.approvalState]}} 审批拒绝</div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    data: Object
  },
  data () {
    return {
      type: {
        '1':'入驻申请',
        '2':'资料修改',
        '3':'续签申请',
        '4':'客户经理变更'
      },
      approvalState: {
        "2": '待城市经理审批',
        "3": '待大区经理审批',
        "5": '待总部审核',
        "6": '待风控审核',
        "7": '待业务方审核',
        "-2": '城市经理拒绝',
        "-3": '大区经理拒绝',
        "-5": '总部拒绝',
        "-6": '风控拒绝',
        "-7": '业务方拒绝',
        "9": '审核通过'
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
h2.title {
  height: 30px;
}
h2.title span {
  float:left;
}
.date {
  float: right;
}
.cusname {
  display:inline-block;
  width:180px;
  // height:14px;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  text-overflow: ellipsis;/* IE/Safari */
  -ms-text-overflow: ellipsis;
  -o-text-overflow: ellipsis;/* Opera */
  // -moz-binding: url("ellipsis.xml#ellipsis");/*FireFox*/
}
.card-approval {
  background-color: #FFFFFF;
  position: relative;
  background-color: #fff;
  padding: 8px 8px 5px;
  font-size: $font-middle;
  color: $font-color-primary;
  .date {
    float: right;
  }
  .footer {
    padding-bottom: 8px;
    border-bottom: 1px solid $line-color;
  }
  .process {
    color: orange;
  }
  .success {
    color: green;
  }
  .reject {
    color: red;
  }
}
.card-approval h2 {
  padding: 8px 0 4px;
  margin: 0 0 4px;
  font-weight: 100;
  font-size: $font-large;
  color: $label-color;
}
.container {
  display: flex;
}
.item {
  flex: 1;
  text-align: left;
  padding-bottom: 10px;
  span:first-child {
    color: $label-color
  }
}
</style>
