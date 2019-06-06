<!--
   author: zhangwei
   desc:
   用途:  最多支持3个，超过3个不建议使用
-->
<template>
    <div class="rowCenter"
         :style="{height:'100%',
                 backgroundColor: index == select ? selectColor : '',
                 borderTopLeftRadius:getTopLeft,
                 borderTopRightRadius:getTopRight,
                 borderBottomLeftRadius:getTopLeft,
                 borderBottomRightRadius:getTopRight,
                 borderRight:getBorderRight,
                 borderLeft:getBorderLeft,
                 width:getLineWidth}">
        <div class="cTextDiv">
            <div :style="{color: index == select ? '#ffffff' : '#c2c2c2'}"
                 class="cTabText">{{item.name}}</div>
        </div>
    </div>
</template>

<script>

	export default {
		name:"style3",

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

	        getLineWidth() {
		        if (this.count == 2) {
			        var leng = this.$store.getters.screen.screenScale * 120
			        return leng + 'px';
		        }else if(this.count == 3){
			        var leng = this.$store.getters.screen.screenScale * 80
			        return leng + 'px';
                }
	        },

	        getTopLeft(){
	        	if(this.index == 0 && this.index == this.select){
	        		return '6px'
                }else {
	        		return '0px'
                }
            },

            getTopRight(){
	        	if(this.index == this.count - 1 && this.index == this.select){
	        		return '6px'
                }else{
	        		return '0px'
                }
            },

	        getBorderRight(){
	        	if(this.index == 1
                    && this.select == 0
                    && this.count == 3){
	        		var ss = "solid 1px " + this.selectColor
	        		return ss
                }else{
	        		return ""
                }
            },

	        getBorderLeft(){
		        if(this.index == 1
			        && this.select == 2
			        && this.count == 3){
			        var ss = "solid 1px " + this.selectColor
			        return ss
		        }else{
		        	return ''
                }
	        },

        }
	}
</script>

<style scoped>
    .cTextDiv{
        align-self: center;
        flex: 1;

    }


    .cTabText{
        width: 100%;
        color: black;
        font-size: 14px;
        text-align: center;
        align-self: center;
    }
</style>