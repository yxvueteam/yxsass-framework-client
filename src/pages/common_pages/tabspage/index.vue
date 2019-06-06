<!--
   author: zhangwei
   desc:
      1。 首先通过类别接口获取所有类别
      2.  通过内容接口获取内容

   类别接口的定义：需要包含action, param
        [{"name":"沟通技巧","code":"53a87ca6",
            "action":"school/get_subject_content_in_category",
            "param":{"category":"53a87ca6","page":1,"limit":10}},
         {"name":"健康知识","code":"fbf1a6f4","action":"school/get_subject_content_in_category","param":{"category":"fbf1a6f4","page":1,"limit":10}}]
-->

<template>
    <div>
        <yx-title-bar title="分页组件"></yx-title-bar>

        <div class="col">
            <div class="cTop" :style="{top:getHeadHeight}">
                <yx-tabs-header :tabs="heads"
                                v-model="select"
                                @change="onClickHead"
                                :select-color="getSelectColor"
                                font-color="#ffffff"
                                mstyle="style3"
                                :bg-color="getBgColor"></yx-tabs-header>
            </div>
            <div class="cTip"></div>
            <scroll-view scroll-y
                         @scrolltolower="onLoadMore"
                         :style="{height:getScrollHeight}">
                <div v-if="isReqSuccess && items.length == 0">
                    <div class="cNoDatas">当前分类下数据为空</div>
                </div>
                <div v-for="(item,index1) in items" :key="index1">
                    <div>{{item.ss_name}}</div>
                </div>

                <!-- 到底部了显示 -->
                <div v-if="isBottom">
                    <support></support>
                </div>

            </scroll-view>
        </div>
    </div>
</template>

<script>
	import YxTitleBar from "../../../components/cur_app/YxTitleBar";
	import YxTabsHeader from "../../../components/base/tabs_header/YxTabsHeader";
	import Support from "../../../components/cur_app/Support";

	export default {
		components:{
			Support,
			YxTabsHeader,
			YxTitleBar
        },
		name:"index",

        data(){
			return {
				//头部数据
				heads:[
                    {name:'样式一'},
					{name:'样式二'},
                ],
                //列表数据
                items:[],
                select:0, //当前选中的tab

				count:1,
				isBottom:false,
				error:null,
				isReqSuccess:false,
            }
        },

        computed:{
	        getBgColor(){
	        	return this.$store.getters.shopColor.main
            },

	        getSelectColor(){
	        	return this.$store.getters.shopColor.highlight
            },

	        getHeadHeight(){
	        	return this.$store.getters.screen.topBarHeight
            },

	        getScrollHeight(){
	        	var height =  (this.$store.getters.screen.screenHeight * this.$store.getters.screen.screenScale
                    - this.$store.getters.screen.topBarHeight) + 'px'
                return height
            }
        },

        onLoad(options){
		    options.action = 'school/get_category_list',
            options.param = {
		    	shop:1,
            }

            this.reqGetCategory(options.action, options.param)
        },

        onUnload(){

        },

        methods:{
	        /**
             *   请求分类
	         * @param action
	         * @param param
	         */
			reqGetCategory(action,param){
                this.$net.netReq('get', action, param)
                    .then((res)=>{
                        this.heads = res
                        this.reqListContent(false)
                    }).catch((err)=>{

                })
            },

	        /**
             *   请求列表内容
	         * @param loadmore
	         */
            reqListContent(loadmore){
                var item = this.heads[this.select]
                if(!loadmore){
                	item.param.page = 1
                }
                this.$net.netReq('get', item.action, item.param)
                    .then((res)=>{
	                    if(!loadmore){
		                    this.items = res.results
	                    }else{
		                    this.items = this.items.concat(res.results)
	                    }
	                    this.isReqSuccess = true;
	                    this.count = res.count
                        this.$sys.showLoading(false)
                    }).catch((err)=>{
                        if(loadmore){
	                        item.param.page = item.param.page - 1
                        }
                        this.isReqSuccess = false;
	                    this.$sys.toast(err.returnMessage,3)
	                    this.$sys.showLoading(false)
                    })
            },
	        /**
             *   点击tabs切换类别
	         */
	        onClickHead(){
		        this.isBottom = false
                this.isReqSuccess = false
				this.$sys.showLoading(true)
                this.reqListContent(false)
            },

	        /**
             *   下拉加载更多
	         */
	        onLoadMore(){
				var item = this.heads[this.select]
		        var isLastPage = item.param.page  * item.param.limit > this.count
		        if(isLastPage){
			        this.isBottom = true
			        this.$log.debug(this, 'onReachBottom', "到底部了")
			        return
		        }
		        item.param.page = item.param.page + 1
		        this.reqListContent(true)
            }
        }
	}
</script>

<style scoped>
    .cTop{
        position: fixed;
        left: 0;
        right: 0;
        z-index: 99;
    }

    .cTip{
        width: 100%;
        height: 48px;
    }

    .cNoDatas{
        align-self: center;
        text-align: center;
        font-size: 14px;
        color: #959595;
        margin-top: 10px;
    }
</style>