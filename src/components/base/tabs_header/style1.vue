<!--
   author: zhangwei
   desc:
   用途:
-->
<template>
    <div class="col" :style="{height: '100%',width:getLineWidth}">
        <div class="cTextDiv">
            <div :style="{color: index == select ? selectColor : fontColor}"
                 class="cTabText">{{item.name}}</div>
        </div>
        <div class="cLine"
             :style="{backgroundColor: index == select ? selectColor : ''}"></div>
    </div>
</template>

<script>

    import strUtil from 'yx-strutil'

	export default {
		name:"style1",

        props:{
			item:{
				type:Object,
                default:{},
            },

            index:{
				type:Number,
                default:0,
            },

            select:{
				type:Number,
                default:0,
            },

	        selectColor:{
				type:String,
                default:'',
            },

            fontColor:{
	            type:String,
	            default:'#ffffff',
            },

	        isEqual:{
		        type:String,
		        default:false,
	        },

            count:{
				type:Number,
                default:4,
            }
        },

        computed:{

	        getLineWidth(){
	        	if(this.isEqual || this.count > 5){
	        		var len = 375 / Math.min(this.count, 5)
			        var leng = this.$store.getters.screen.screenScale * len
			        return leng + 'px';
                }

		        var leng = strUtil.getTextWidth(this.item.name,16)
                var tip = 20;
		        if(this.index == 0){
		        	tip = 30
                }
                leng = this.$store.getters.screen.screenScale * (leng + tip)
		        return leng + 'px';
	        },
        }
	}
</script>

<style scoped>
    .cTextDiv{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }


    .cTabText{
        width: 100%;
        color: black;
        font-size: 16px;
        text-align: center;
        align-self: center;
    }

    .cLine{
        width: 100%;
        height: 3px;
        align-self: center;
        margin-top: 4px;
    }
</style>