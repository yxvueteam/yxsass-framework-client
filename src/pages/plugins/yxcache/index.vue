<!--
   author: zhangwei
   desc:
   用途:
-->
<template>
    <div>

    </div>
</template>

<script>

  import YxCache from '../../../plugins/yx-cache/main'

  export default {
    name:"index",

    key1: 'one',

    onLoad(options){
       //this.testCacheSync(this.key1)

        //this.testRemoveCache(this.key1)

      //this.setNetCacheInterface()
    },

    methods:{

    	testRemoveCache(key){
    		 YxCache.removeStorageSync(key);

	       this.testShowCache(true)
      },

	    /**
       *  测试显示所有缓存信息
       * @param isSync
       */
      testShowCache(isSync){
    		 if(!isSync){
             YxCache.getStorageInfo((res)=>{
               console.log(res)
             })
         }else{
    		 	  var res = YxCache.getStorageInfoSync();
    		 	  console.log(res)

         }

      },

	    /**
       *  测试同步的缓存保存和获取
        */
      testCacheSync(key){

         YxCache.setStorageSync(key ,"天气")

         YxCache.getStorageSync(key)
      },

      setNetCacheInterface(){
          var keys = {
            action:'fkc/net/info_cache_time_30',
            param:{
              id:190,
              name:'zhang'
            }
          }

          var infos = {
            name:'good',
            base:'wang',
          }
          YxCache.setInterfaceCache(keys, infos)

          YxCache.getInterfaceCache(keys)

      },
    }
  }
</script>

<style scoped>

</style>