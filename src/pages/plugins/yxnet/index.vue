<!--
   author: zhangwei
   desc:
   用途:
-->
<template>
    <div>111</div>
</template>

<script>

    import YxNet from "../../../plugins/yx-net/main"

  export default {
    name:"index",

    onLoad(options){


    },

    methods:{
      //获得毫秒数

        testNetReq(){
            YxNet.init(YxNet.PLATFORM_WX)

            YxNet.setUrl("http://192.168.1.198:8000/")

            YxNet.setHeaderToken("aa")

            YxNet.netReq('get', 'fkc/product/product_category_list_cache_time_20',{shop:1}).then((res)=>{
                //console.log(res)
            }).catch((err)=>{
                //console.log(err)
            })
        }

    },
  }
</script>

<style scoped>

</style>
