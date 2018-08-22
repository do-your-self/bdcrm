<template>
  <div>
    <mt-cell v-if="type === 'date' || type === 'time'" :title="title" is-link :value="myValue" @click.native="openPicker('picker')"></mt-cell>
    <mt-datetime-picker v-if="type === 'date'" :startDate="startDate" :endDate="endDate" :modal=true ref="picker" type="date" @confirm="handleChange"></mt-datetime-picker>
    <mt-datetime-picker v-if="type === 'time'" :modal=true ref="picker" type="time" @confirm="handleChange"></mt-datetime-picker>
    <mt-cell v-if="type !== 'date' && type !== 'time'" :title="title" is-link :value="myValue" @click.native="disabled?popupVisible = false:popupVisible = true"></mt-cell>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <mt-picker v-if="type === 'dateLong'" :slots="dateSlots" value-key="name" :show-toolbar="true" @change="onDateChange">
        <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible = false">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="handleConfirm()">确定</span>
      </mt-picker>
      <mt-picker v-if="type === 'city'" :slots="citySlots" value-key="name" :show-toolbar="true" @change="onValuesChange">
        <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible = false">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="handleConfirm">确定</span>
      </mt-picker>
      <mt-picker v-if="type !== 'city' && type !== 'date' && type !== 'time' && type !== 'dateLong'" :slots="slots" value-key="name" :show-toolbar="true" @change="onValuesChange">
        <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible = false">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="handleConfirm">确定</span>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
let year = ['长期']
for (var i=2009;i<=2070;i++){
  year.push(i)
}

import address from '../../js/city'
export default {
  name: '',
  props: {
    title: String,
    type: String,
    val: [String, Number],
    code: String,
    area: String,
    city: String,
    province: String,
    disabled: Boolean,
    slotsAll: Array
  },
  data () {
    return {
      startDate: new Date('2009-01-01'),
      endDate: new Date('2070-12-31'),
      popupVisible: false,
      defaultVal: '请选择',
      values: [],
      dateSlots: [
        {
          flex: 1,
          values: year,
          defaultIndex: 0,
          className: 'slot1'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          defaultIndex: 0,
          className: 'slot3'
        }, {
          divider: true,
          content: '-',
          className: 'slot4'
        }, {
          flex: 1,
          values: [],
          defaultIndex: 0,
          className: 'slot5'
        }
      ],
      citySlots: [
        {
          flex: 1,
          values: address,
          defaultIndex: 0,
          className: 'slot1'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: address[0].childs,
          defaultIndex: 0,
          className: 'slot3'
        }, {
          divider: true,
          content: '-',
          className: 'slot4'
        }, {
          flex: 1,
          values: address[0].childs[0].childs,
          defaultIndex: 0,
          className: 'slot5'
        }
      ]
    }
  },
  computed: {
    myValue () {
      if (this.val) {
        return this.val
      } else {
        return this.defaultVal
      }
    },
    slots () {
      let slotsValue = []
      switch (this.type) {
        case 'follow':
          slotsValue = [{"code": 1, "name": '电话'}, {"code": 2, "name": '拜访'}]
          break;
        case 'category':
          slotsValue = [{"code": 1, "name": '健身'}]
          break;
        case 'line':
          slotsValue = [{"code": 1, "name": '商城'}]
          break;
        case 'busModel':
          slotsValue = [{"code": 1, "name": '自营'}, {"code": 2, "name": '加盟'}]
          break;
        case 'cprtLevel':
          slotsValue = [{"code": 0, "name": '无兜底'}, {"code": 1, "name": '有兜底'}]
          break;
        case 'isSole':
          slotsValue = [{"code": 0, "name": '否'}, {"code": 1, "name": '是'}]
          break;
        case 'ownership':
          slotsValue = [{"code": 1, "name": '自有'}, {"code": 2, "name": '租赁'}, {"code": 3, "name": '其它'}]
          break;
        case 'storeType':
          slotsValue = [{"code": 1, "name": 'pop商户'}, {"code": 2, "name": '线下商户'}]
          break;
        case 'all':
          slotsValue = this.slotsAll
          break;
        // case '':
        //   slotsValue = 
        //   break
      }
      return [
        {
          flex: 1,
          values: slotsValue,
          defaultIndex: 0,
          className: 'slot1'
        }
      ]
    }
  },
  methods: {
    openPicker (picker) {
      this.$refs[picker].open()
    },
    handleChange (value) {
      if (this.type === 'date' || this.type === 'datelong') {
        let d = new Date(value)
        var month = (d.getMonth() + 1) < 10? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
        var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
        let resDate = d.getFullYear() + '-' + month + '-' + day
        this.defaultVal = resDate
        this.$emit('input', this.defaultVal)
      } else {
        this.defaultVal = value
        this.$emit('input', value)
      }
    },
    handleConfirm () {
      if (this.type === 'city') {
        this.defaultVal = this.values[0].name + '/' + this.values[1].name + '/' + this.values[2].name 
      }
      if (this.type === 'dateLong') {
        if(this.values[0]==='长期') {
          this.defaultVal = '长期'
          this.$emit('input', '2099-12-31')
        }else {
          this.defaultVal = this.values[0] + '-' + this.values[1] + '-' + this.values[2]
          this.$emit('input', this.defaultVal)
        }
      }
      if (this.type !== 'city') {
        this.defaultVal = this.values[0].name
      }
      if (this.type === 'all' || this.type === 'follow' || this.type === 'isSole' || this.type === 'cprtLevel' || this.type === 'ownership' || this.type === 'storeType' || this.type === 'busModel') {
        this.defaultVal = this.values[0].name
        this.$emit('input', this.values[0].code)
      } else {
        this.$emit('select', this.values, this.type)
      }
      this.popupVisible = false
    },
    onValuesChange(picker, values) {
      if(!values[0]){
        this.$nextTick(()=>{
          if(this.myAdress){
            // 赋默认值
          }else{
            picker.setValues([address[0],address[0].childs[0],address[0].childs[0].childs[0]])
          }
        });
      }else{
        this.values = values
        picker.setSlotValues(1, values[0].childs);
        let town = [];
        if(values[1]){
          town = values[1].childs;
        }
        picker.setSlotValues(2,town);
      }
    },
    onDateChange(picker, values) {
      this.values = values
      if(values[0]==='长期') {
        picker.setSlotValues(1, []);
        picker.setSlotValues(2, []);
      } else {
        picker.setSlotValues(1, ['01','02','03','04','05','06','07','08','09','10','11','12']);
        if (['01','03','05','07','08','10','12'].indexOf(values[1])!==-1) {
          picker.setSlotValues(2,['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']);
        }
        if (['04','06','09','11'].indexOf(values[1])!==-1) {
          picker.setSlotValues(2,['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']);
        }
        if (values[1]==='02'&&values[0]%4===0) {
          picker.setSlotValues(2,['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29']);
        }
        if(values[1]==='02'){
          picker.setSlotValues(2,['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28']);
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
</style>
