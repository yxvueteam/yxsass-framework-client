<!--
   author: zhangwei
   desc:
   用途:

   展现效果:

   UI规范:

   注意事项:

   外部传参:style="{backgroundColor:getBgColorTitle}"
   外部调用:
-->
<template>
    <div>
        <div class="col cFixTop" :style="{height:getStateBarHeight}">
            <div :style="{height:getTitleHeight, backgroundColor:getBgColorTitle}"></div>

            <div class="cTitleBar row" :style="{backgroundColor:getBgColorTitle}">
                <div v-if="level == 'sub'" class="row paddingRight"
                     :style="{height: '100%'}">
                    <div style="align-self: center;"
                         @touchend="touchendReturn"
                         @touchstart="touchstartReturn"
                         :style="{backgroundColor:touchColor}"
                         class="paddingHalf">
                        <yx-icon name="icon-arrow-left"
                                 :size="20"
                                 color="#ffffff"></yx-icon>
                    </div>
                    <div class="gTitleBarText cSubTitle singleLine">{{title}}</div>
                </div>

                <div class="gTitleBarText cTextMiddle" v-else>
                    <div>

                    </div>
                    <div>{{title}}</div>
                </div>
            </div>
        </div>

        <div :style="{width: '100%', height: getStateBarHeight}">

        </div>
    </div>

</template>

<script>
	import YxIcon from "../icon/YxIcon";

	export default {
		components:{ YxIcon },
		name:"yx-title-bar",

		props:{
			title:{
				type:String,
				default:'标题'
			},

			level:{//标题类型，sub:二级标题   main: 一级标题
				type:String,
				default:'sub'
			}
		},

		data(){
			return {
				touchColor:'',
			}
		},

		computed:{
			getBgColorBar(){
				return this.$store.getters.shopColor.sub
			},

			getBgColorTitle(){
				return this.$store.getters.shopColor.main
			},

			getStateBarHeight(){
				var height = this.$store.getters.screen.topBarHeight + 'px';

				console.log("height==" + height)
				return height
			},

			getTitleHeight(){
				return this.$store.getters.screen.statusBarHeight + 'px'
			},

		},

		methods:{
			/**
			 *   touch时设置背景色
			 */
			touchstartReturn(){
				this.touchColor = this.$store.getters.shopColor.highlight
			},

			/**
			 * touch取消时返回
			 */
			touchendReturn(){
				this.touchColor = '';
				this.$sys.navigateBack()
			}
		}
	}
</script>

<style scoped>

    .cFixTop{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 100;
    }

    .cTitleBar{
        width: 100%;
        height: 47px;
    }

    .cTextMiddle{
        flex: 1;
        text-align: center;
        align-self: center;
        line-height: 44px;
    }

    .cSubTitle{
        width: 240px;
    }
</style>
