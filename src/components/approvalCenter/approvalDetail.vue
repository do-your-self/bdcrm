<template>
  <div class="" v-if="!loading">
    <mt-header title="审批详情">
      <router-link to="/approvalCenter" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" v-if="$store.state.user.roleLevel !== 1&&$route.query.type==='4'"><span class="rightbtn" @click="$router.push({name: 'approval', query: {
        approvalState: data.customEnter.approvalState,
        customId: data.custom.customId,
        enterFlowId: data.customEnter.id,
        type:$route.query.type
        }})">审批</span></mt-button>
    </mt-header>
    <mt-field :readonly=true :disableClear=true label="发起时间" :value="data.custom.createDate"></mt-field>
    <mt-field :readonly=true :disableClear=true label="发起人" :value="data.customEnter.createBy"></mt-field>
    <mt-field :readonly=true :disableClear=true label="发起事项" :value="type[data.customEnter.type]"></mt-field>
    <mt-field v-if="data.customEnter.type=='4'" :readonly=true :disableClear=true label="原客户经理" :value="data.oldUserName"></mt-field>
    <mt-field v-if="data.customEnter.type=='4'" :readonly=true :disableClear=true label="变更客户经理" :value="data.newUserName"></mt-field>
    <mt-field v-if="data.customEnter.type=='4'" :readonly=true :disableClear=true label="变更原因" :value="data.remark"></mt-field>
    <mt-field v-if="data.customEnter.type=='4'" :readonly=true :disableClear=true label="生效时间" :value="data.effectiveTime"></mt-field>
    <mt-field :readonly=true :disableClear=true v-if="data.customEnter.type !='4'" label="商户门店简称" :value="data.custom.customName"></mt-field>
    <mt-field :readonly=true :disableClear=true v-if="data.customEnter.type !='4'" label="营业执照名称" :value="data.custom.customFullName"></mt-field>
    <mt-field :readonly=true :disableClear=true v-if="data.customEnter.type !='4'" label="业务线" :value="data.custom.busLineName"></mt-field>
    <mt-field :readonly=true :disableClear=true v-if="data.customEnter.type !='4'" label="行业" :value="data.custom.categoryName"></mt-field>
    <mt-cell v-if="data.customEnter.type=='2'||data.customEnter.type=='1'" :title="data.customEnter.type==1?'商户信息':'商户变更信息'" is-link @click.native="$router.push({path: '/busInfo/' + data.custom.customId,query:{approval:true}})"></mt-cell>
    <mt-cell v-if="data.customEnter.type=='2'||data.customEnter.type=='1'" :title="data.customEnter.type==1?'合同信息':'合同变更信息'" is-link @click.native="$router.push({name: 'contractInfo', query:{
          id:data.custom.customId,canEdit: false}})">{{$store.state.user.roleLevel !== 1?'资料版本V'+data.custom.versionId:''}}</mt-cell>
    <div class="step">
      <div class="step_title">审批流程</div>
      <div class="step_body">
        <div>
          <div class="step_list">
            <div class="item1 flex3">
              <span>提交</span>发起申请&nbsp;&nbsp;{{data.custom.userFullName}}
            </div>
            <div class="item2 flex2">{{data.custom.createDate}}</div>
          </div>
          <div class="step_line"></div>
        </div>
        <div v-for="(item, index) in approvalList" :key="index">
          <div class="step_list">
            <div class="item1">
              <span>{{item}}</span>{{data.approvalList[index]?data.approvalList[index].titleFullName:''}}
            </div>
            <div class="item2" v-if="data.approvalList.length==0||(index == data.approvalList.length &&data.customEnter.approvalState!=9&&data.approvalList[index-1].approvalState==1)">
              等待审批
            </div>
            <div class="item2" v-else-if="index < data.approvalList.length-1||(index == data.approvalList.length-1 &&data.customEnter.approvalState!=9&&data.approvalList[index].approvalState==1)">
              {{data.approvalList[index].approvalTime}}
            </div>
            <div class="item2" v-else-if="data.approvalList[index]&&index == data.approvalList.length-1 &&data.customEnter.approvalState!=9">
              {{[2,3,5,6,7].indexOf(data.customEnter.approvalState)==-1?'审批拒绝':'等待审批'}}
            </div>
            <div class="item2" v-else-if="index == data.approvalList.length-1 &&data.customEnter.approvalState==9&&data.approvalList[index].approvalState==1">
              审批通过
            </div>
          </div>
          <div class="step_line" v-if="index<approvalList.length-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    'id': String
  },
  created () {
    let form = {}
    if(this.$route.query.type==='4') {
      form = {
        flowId: this.id,
        from: 'bdcrm',
        token: this.$store.state.token
      }
    }else {
      form = {
        enterFlowId: this.id,
        from: 'bdcrm',
        token: this.$store.state.token
      }
    }
    this.axios.approveDetail (form).then(({ data }) => {
      if (data.success) {
        this.$set(this, 'data', data.data)
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
      selected: '1',
      loading: true,
      data: {},
      approvalList: ['城市','大区','总部','风控','业务'],
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
  }
}
</script>

<style lang="scss" scoped>
.step {
  color: $label-color;
  font-size: $font-small;
  .step_title {
    padding: 10px 20px;
  }
  .step_body {
    background: #fff;
    padding: 10px;
    .step_list {
      display: flex;
      height: 30px;
      line-height: 30px;
      .item1 {
        flex: 1;
        span {
          font-size: 8px;
          box-sizing: border-box;
          margin-right: 10px;
          display: inline-block;
          width: 30px;
          height: 30px;
          text-align: center;
          border: 2px solid #666;
          border-radius: 20px;
        }
      }
      .item2 {
        flex: 1;
        text-align: right;
        font-size: $font-small;
      }
      .flex3 {
        flex: 3;
      }
      .flex2 {
        flex: 2;
      }
    }
    .step_line {
      margin-left: 14px;
      height: 20px;
      border-left: 2px solid #666;
    }
  }
}
</style>
