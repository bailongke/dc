<template>
  <div  class="ad">
    <ChuQing></ChuQing>
  </div>
</template>

<script>
import ChuQing from '@/components/ChuQing.vue'
export default {
    components: {
    ChuQing,
   
  },

}
</script>

<style lang="less" scoped>
.ad{
  background-image: url(../assets/image/bg.gif) !important;
 
  height: 100%;
}
</style>