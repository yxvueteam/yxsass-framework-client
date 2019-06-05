<!--
   author: zhangwei
   desc:
   用途:
-->
<template>
    <div></div>
</template>

<script>

	export default {
		name:"index",

        onLoad(){
            this.initScreenInfo()
        },

        mounted(){
		    this.$route.navigateTo("/pages/common_pages/listpage/main")
        },

        methods:{
	        initScreenInfo(){
		        this.$sys.getSystemInfo((res)=>{
		        	console.log(res)
			        this.$store.commit('setScreenInfo',res)
		        })
	        },
        }
	}
</script>

<style scoped>

</style>