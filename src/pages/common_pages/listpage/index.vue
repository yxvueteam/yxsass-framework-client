<!--
   author: zhangwei
   desc:  列表请求
   注意：

   请求参数样式:
        param是经过url编码的
        page&action=xxx&param=xx
-->
<template>
   <div class="col">
       <div>
           <yx-title-bar title="info"></yx-title-bar>
       </div>
       <div>
           <div v-for="(item,index) in items" :key="index">
               <div class="cItem">{{item.name}}</div>
           </div>
       </div>

       <!-- 到底部了显示 -->
       <div v-if="isBottom">
           <support></support>
       </div>

       <!-- 请求状态展示 -->
       <div class="cLoading" v-if="!isReqSuccess">
           <net-loading
               @onReload="relaodData"
               :error="error"></net-loading>
       </div>
   </div>
</template>

<script>

	import Support from "../../../components/cur_app/Support";
    import NetLoading from "../../../components/cur_app/NetLoading";
	import YxTitleBar from "../../../components/cur_app/YxTitleBar";

    export default {
	    components:{
		    YxTitleBar,
		    NetLoading,
		    Support
        },
	    name:"index",

        data(){
			return {
				items:[],
                action:null,
                param:null,
                limit:10,
                count:1,
				isBottom:false,
                error:null,
                isReqSuccess:false,
            }
        },

        onLoad(options){
			options.action = 'product/product_package_list'
            options.param = {
	            category:'0168a868'
            }
            options.type = '',

            this.action = options.action
            this.param = options.param
            this.param.page = 1
            this.param.limit = this.limit

        },

        onShow(){
	        this.reqNetData()
        },

        onUnload(){
	        this.items=[]
            this.action=null
            this.param=null
            this.limit=10
            this.count=1
            this.isBottom=false
            this.error=null
        },

		onReachBottom(){
            var isLastPage = this.param.page  * this.limit > this.count
            if(isLastPage){
            	this.isBottom = true
                this.$log.debug(this, 'onReachBottom', "到底部了")
				return
            }

			this.param.page = this.param.page + 1
			this.reqNetData(true)
		},

		onPullDownRefresh(){
			this.isBottom =false
			this.param.page = 1
			this.reqNetData(false)
		},

        methods:{

	    	/** 失败重新加载，只有第一次进来的时候需要操作**/
	    	relaodData(){
	    		this.error = null
	    		this.reqNetData(false)
            },
	        /**
             *  请求网络数据
	         * @param loadmore
	         */
            reqNetData(loadmore){
                this.$net.netReq('get', this.action, this.param)
                    .then((res)=>{
                    	this.isReqSuccess = true;
                    	if(!loadmore){
		                    this.items = res.results
                            this.$sys.stopRefresh()
                        }else{
		                    this.items = this.items.concat(res.results)
                        }
                        this.count = res.count
                    }).catch((err)=>{
                        if(loadmore){
	                        this.param.page = this.param.page - 1;
                        }else{
	                        this.$sys.stopRefresh()
                        }
                        this.error = err;
                        if(this.items.length != 0){
                        	this.$sys.toast(err.returnMessage,3)
                        }
                    })
            },

        }
	}
</script>

<style scoped>

   .cItem{
      width: 100%;
      height: 100px;
   }

    .cLoading{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 99;
    }
</style>