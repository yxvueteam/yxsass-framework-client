<!--
   author: zhangwei
   desc:
   用途:
-->
<template>
    <div>111222</div>
</template>

<script>
  import YxLogger from '../../../plugins/yx-logger/main'

  export default {
    name:"index",

    onLoad(options){

      //this.testLoggerPrint();

      //this.testSetPlatform(YxLogger.PLATFORM_WX);

      //this.testSetLevel(YxLogger.LOGGER_INFO);

       //this.testOutputWay(YxLogger.OUTPUT_WAY_CACHE)

        this.testException()

    },

    methods:{

        testLoggerPrint(){
           this.printLog()
        },

        testException(){
            try{
                throw new YxLogger.except(this, 'testException', '自定义异常', '异常信息')
            }catch (err){
                console.log("name:" + err.name + ",info:" + err.message)
            }
        },

        testSetPlatform(platform){
          YxLogger.setPlatform(platform);

          this.printLog()
        },

        testSetLevel(level){

            YxLogger.setLevel(level);

            this.printLog()
        },

        testOutputWay(way){

            YxLogger.setOutputWay(way)
            YxLogger.setMaxLogCacheCount(3)
            this.printLog()

            YxLogger.getCache((res)=>{
                console.log(res)
            })
        },

        printLog(){
            YxLogger.debug(this, 'printLog', 'debug')
            YxLogger.info(this, 'printLog', 'info')
            YxLogger.warn(this, 'printLog', 'warn')
            YxLogger.error(this, 'printLog', 'error')
        }
    }
  }
</script>

<style scoped>

</style>
