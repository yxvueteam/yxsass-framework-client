<!--
   author: zhangwei
   desc:  图标控件
   支持的图标列表:

   外部传参:
        name: 图标的名称
        padding: 图标的间距,主要针对一些情况可以增大点击的区域
        color:图标的颜色
        size: 图标的尺寸
        background-color: 背景颜色

   外部调用:
           <yx-icon
                 name="icon-shouye"
                 padding="10"
                 color="#ffff00"
                 size="30"
                 background-color="#ff0000"></yx-icon>
-->
<template>
    <div class="cIconRoot"
         :style="{backgroundColor:backgroundColor,padding:padding + 'px'}"
         @click="onClick">
        <i :class="getClassName"
           :style="{fontSize:size+'px',color:color}"></i>
    </div>
</template>

<script>
	export default {
		name:"yx-icon",

		props:{
			padding:{//内间距
				type:Number,
				default:0,
			},

			name:{//图标名称
				type:String,
				default:'',
			},

			size:{//图标大小
				type:Number,
				default:16,
			},

			color:{//图标颜色
				type:String,
				default:'',
			},

			backgroundColor:{//背景颜色
				type:String,
				default:'',
			}
		},

        computed:{
	        getClassName(){
	        	var ss = 'iconfont' + " " + this.name
	        	return ss
            }
        },

		methods:{
			onClick(){
				this.$emit('onClick')
			}
		}

	}
</script>

<style scoped>

</style>
