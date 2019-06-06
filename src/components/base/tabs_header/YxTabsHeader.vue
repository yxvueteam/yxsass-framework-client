<!--
   author: zhangwei
   desc:  固定的tabselect头部

   options:
        page&action=xx&param=xx

   tabs:
        [
            {
                name: '',
                action:'',
                param:'',
            }
        ]
-->
<template>
    <div class="cRoot colCenter" :style="{backgroundColor:bgColor}">
        <scroll-view scroll-x
                     v-if="mstyle == 'style1' || mstyle == 'style2'"
                     class="cScrollView">
            <div class="cItem"
                 v-for="(item,index) in tabs"
                 @click="change(index)"
                 :key='index'>
                 <style1 :item="item"
                         v-if="mstyle == 'style1'"
                         :index="index"
                         :select-color="selectColor"
                         :is-equal="isEqual"
                         :count="tabs.length"
                         :font-color="fontColor"
                         :select="select"></style1>

                <style2 :item="item"
                        v-if="mstyle == 'style2'"
                        :index="index"
                        :select-color="selectColor"
                        :is-equal="isEqual"
                        :count="tabs.length"
                        :font-color="fontColor"
                        :select="select"></style2>
            </div>
        </scroll-view>

        <div  v-if="mstyle == 'style3'"
              :style="{alignSelf: 'center', borderStyle:'solid',
                        borderRadius:'6px',
                        borderWidth:'1px', borderColor:selectColor}"
              class="rowCenter">
            <div class="cItemStyle3"
                 v-for="(item,index) in tabs"
                 @click="change(index)"
                 :key='index'>
                <style3 :item="item"
                        :index="index"
                        :select-color="selectColor"
                        :is-equal="isEqual"
                        :count="tabs.length"
                        :font-color="fontColor"
                        :select="select"></style3>
            </div>
        </div>
    </div>
</template>

<script>


	import Style1 from "./style1";
	import Style2 from "./style2";
	import Style3 from "./style3";

	export default {

		name:'yx-tabs-header',

		model: {
			prop: 'select',
			event: 'change'
		},

		props:{
			tabs:{
				type:Array,
				default:[] //{name:''}
			},

			select:{
				type:Number,
				default:0,
			},

            selectColor:{
				type:String,
                default:'#42ba84'
            },

			bgColor:{
				type:String,
				default:'#ffff00'
			},

			fontColor:{
				type:String,
				default:'#ffffff'
			},

			mstyle:{
				type:String,
                default:'style1', //style1, style2, style3
            },

            isEqual:{
				type:String,
                default:false,
            }
		},

		components:{
			Style3,
			Style2,
			Style1
		},

		methods:{
			change(index){
				this.select = index;
				this.$emit('change',index)
			},
		}
	}
</script>

<style scoped>

    .cRoot{
        width: 100%;
        height: 48px;
    }

    .cScrollView{
        width: 100%;
        height: 100%;
        white-space: nowrap;
    }

    .cItem{
        height: 100%;
        display: inline-block;
    }

    .cItemStyle3{
        height: 27px;
    }



</style>


