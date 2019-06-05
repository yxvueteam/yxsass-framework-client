<!--
   author: zhangwei
   desc:
   用途:
-->
<template>
    <div>111</div>
</template>

<script>
  import dayjs from 'dayjs'

  export default {
    name:"index",

    onLoad(options){
      this.$log.info(this,'onLoad', 'erro')
    },

    methods:{
      //获得毫秒数

      getTime(){
        dayjs().unix()

        //指定格式输出
        console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"))

        //加多少分钟
        console.log(dayjs("2019-06-03 13:49:57").add(500,'minute').format("YYYY-MM-DD HH:mm:ss"))

      },
    },
  }
</script>

<style scoped>

</style>
