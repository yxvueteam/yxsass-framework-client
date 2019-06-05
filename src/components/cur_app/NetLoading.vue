<!--
   author: zhangwei
   desc:
   用途:
-->
<template>
    <div class="rowCenter cRoot">
        <div v-if="getCode == 'loading'" class="spinner">
            <div class="rect1 cdiv"></div>
            <div class="rect2 cdiv"></div>
            <div class="rect3 cdiv"></div>
            <div class="rect4 cdiv"></div>
            <div class="rect5 cdiv"></div>
            <div class="cTextLoading">努力加载数据中</div>
        </div>
        <div v-else style="align-self: center">
            <div style="align-self: center">
                <i class="iconfont icon-kulian"
                   style="font-size: 160px;color: #333333;"></i>
            </div>

            <div style="text-align: center">{{error.returnMsg}}</div>
            <div class="cButton" @click="onClick">点击重新请求</div>
        </div>

    </div>
</template>

<script>
	export default {
		name:"net-loading",

        props:{
			error:{
				type:Object,
                default:null //loading
            }
        },

        computed:{
	        getCode(){
                if(this.error == null){
                	return 'loading'
                }

                return 'error'
            },
        },

        methods:{
	        onClick(){
	        	this.$emit('onReload')
            }
        }
	}
</script>

<style scoped>

    .cRoot{
        width: 100%;
        height: 100%;
    }

    .cButton{
        width: 200px;
        line-height: 40px;
        border-radius: 8px;
        font-size: 16px;
        text-align: center;
        background-color: green;
        color: white;
        margin-top: 10px;
    }

    .spinner {
        width: 100px;
        height: 60px;
        text-align: center;
        font-size: 10px;
        align-self: center;
    }

    .cdiv {
        background-color: #67CF22;
        height: 100%;
        width: 6px;
        display: inline-block;
        margin-right: 4px;
        -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
        animation: stretchdelay 1.2s infinite ease-in-out;
    }

    .cTextLoading{
        margin-top: 10px;
    }

    .rect2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }

    .rect3 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }

    .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }

    @-webkit-keyframes stretchdelay {
        0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
        20% { -webkit-transform: scaleY(1.0) }
    }

    @keyframes stretchdelay {
        0%, 40%, 100% {
            transform: scaleY(0.4);
            -webkit-transform: scaleY(0.4);
        }  20% {
               transform: scaleY(1.0);
               -webkit-transform: scaleY(1.0);
           }
    }
</style>