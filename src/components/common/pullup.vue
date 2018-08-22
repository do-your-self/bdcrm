<template>
  <div class="">
    <div class="page-loadmore">
      <!-- <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }"> -->
      <div class="page-loadmore-wrapper" ref="wrapper">
        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange('loading')" :bottom-all-loaded="allLoaded" ref="loadmore">
          <slot></slot>
          <p v-if="allLoaded" class="info">当前年份没有数据啦~</p>
          <div slot="bottom" class="mint-loadmore-bottom">
            <!-- <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">{{bottomText}}</span> -->
            <span v-show="bottomStatus === 'loading'">
              <mt-spinner type="fading-circle"></mt-spinner>
            </span>
          </div>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      bottomStatus: ''
    }
  },
  props: {
    allLoaded: Boolean
  },
  methods: {
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadBottom () {
      this.$emit('request')
      this.$refs.loadmore.onBottomLoaded()
    }
  },
  mounted () {
    // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    // this.wrapperHeight = document.documentElement.clientHeight - 60
  }
}
</script>

<style lang="scss" scoped>
.info {
  color: $font-color-primary;
  font-size: $font-small;
  text-align: center;
}
</style>
