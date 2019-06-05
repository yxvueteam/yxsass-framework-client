<!--
   author: zhangwei
   desc:
   用途:
-->
<template>
    <div class="col">
        <div class="cCompony">{{getCompony}}</div>
        <div class="cWebsite">{{getWebsite}}</div>
    </div>
</template>

<script>
	export default {
		name:"support",

        computed:{
	        getCompony(){
                return this.$config.support
            },

	        getWebsite(){
		        return this.$config.website
            }
        }
	}
</script>

<style scoped>
    .cCompony{
        font-size: 14px;
        align-self: center;
        margin-top: 10px;
    }

    .cWebsite{
        font-size: 12px;
        color: #959595;
        align-self: center;
    }
</style>