<template>
  <div class="panel" :class="{'panel': true, 'color-1': data.crmState===-1, 'color0': data.crmState===0, 'color1': data.crmState===1, 'color2': data.crmState===2, 'color3': data.crmState===3, 'color4': data.crmState===4, 'color5': data.crmState===5, 'color6': data.crmState===6}">
    <span class="tag">{{state[data.crmState]}}</span>
    <span class="tag due" v-if="data.crmState === '3'&& datedifference(data.crmState) < 30">即将到期</span>
    <div class="panel_hd">{{data.customName}}</div>
    <div class="panel_line"><span></span></div>
    <div class="panel_bd">
      <div class="container">
        <div class="item"><div>业务线：</div><div>{{data.busLineName}}</div></div>
        <div class="item"><div>品类：</div><div>{{data.categoryName}}</div></div>
      </div>
      <div class="container">
        <div class="item"><div>客户经理：</div><div>{{data.userFullName}}</div></div>
      </div>
      <div class="container" v-if="[-1, 0, 1, 2, 6].indexOf(data.crmState) == -1">
        <div class="item"><div>合同时间：</div><div>{{data.createDate}}</div></div>
      </div>
      <div class="container" v-if="[3, 4, 5].indexOf(data.crmState) == -1">
        <div class="item"><div>创建时间：</div><div>{{data.createDate}}</div></div>
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
  data () {
    return {
      state: {
        '-1': '失败',
        '0': '未签约',
        '1': '签约中',
        '2': '入驻审批',
        '3': '入驻中',
        '4': '修改审批',
        '5': '冻结中',
        '6': '过期'
      }
    }
  },
  methods: {
    datedifference (sDate1, sDate2) {    // sDate1和sDate2是yyyy-mm-dd格式  计算日期差值
      let dateSpan
      let tempDate
      let iDays
      sDate1 = Date.parse(sDate1)
      sDate2 = Date.parse(sDate2||new Date())
      dateSpan = sDate1 - sDate2
      // dateSpan = Math.abs(dateSpan)
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000)) + 1
      return iDays
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  background-color: $white;
  margin: 8px 8px 0 8px;
  padding: 10px 5px;
  position: relative;
  border-radius: 7px;
}
.panel_hd {
  padding-bottom: 5px;
  color: $label-color;
  font-size: $font-large;
  position: relative;
}
.panel_bd {
  margin-top: 2px;
}
.tag {
  position: absolute;
  top: 8px;
  right: 0;
  z-index: 1;
  color: $white;
  font-size: $font-small;
  padding: 2px 5px;
}
.due {
  color: #f00;
  top: 20px;
}
.panel.color-1 {
  border: 1px solid #f00;
  .tag {
    background: #f00;
  }
}
.panel.color0 {
  border: 1px solid #fff;
  .tag {
    background: #fff;
    color: $label-color;
  }
}
.panel.color1 {
  border: 1px solid #6c3;
  .tag {
    background: #6c3;
  }
}
.panel.color2 {
  border: 1px solid #fc3;
  .tag {
    background: #fc3;
  }
}
.panel.color3 {
  border: 1px solid #6c9;
  .tag {
    background: #6c9;
  }
}
.panel.color4 {
  border: 1px solid #ffcc33;
  .tag {
    background: #ffcc33;
  }
}
.panel.color5 {
  border: 1px solid #868686;
  .tag {
    background: #868686;
  }
}
.panel.color6 {
  border: 1px solid #6b6b6b;
  .tag {
    background: #6b6b6b;
  }
}
.panel_line {
  width: 70%;
  border-bottom: 1px solid #E5E5E5;
  span {
    float: right;
    border: 3px solid #E5E5E5;
    transform: rotate(45deg);
    margin-top: -3px;
  }
}
.container {
  display: flex;
  align-items: stretch;
  font-size: $font-middle;
  color: $font-color-primary;
  .item {
    flex: 1;
    padding-top: 5px;
    overflow: hidden;
    line-height: 21px;
    div:first-child {
      float: left;
      width: 80px;
      color: $label-color;
      // text-align:justify;
      // text-justify:distribute-all-lines;
      // text-align-last:justify
    }
    div:last-child {
      padding-left: 60px;
      color: $font-color-primary;
    }
  }
}
</style>
