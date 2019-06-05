<!--
   author: zhangwei
   desc:
   注意：
     1. 这里要scroll-view支持下拉刷新和上拉加载，需要在scroll-view下添加div包住内容，
        并设置类scrollContentDiv
     2. 这个时候scroll-view的事件不支持了
     3. 最外层的高度需要比屏幕高度高 一些
-->
<template>
   <div class="cRoot" :style="{height: getScreenHeight}">
      <scroll-view scroll-y style="height: 100%">
          <!--<div class="scrollContentDiv">-->
               <div v-for="(item,index) in items" :key="index">
                   <div class="cItem">{{item.name}}</div>
               </div>
          <!--</div>-->
      </scroll-view>
   </div>
</template>

<script>
	export default {
		name:"index",

        data(){
			return {
				items:[],
                action:null,
                param:null,
                page:1,
                limit:10,
                count:1
            }
        },

        onLoad(options){
			options.action = 'product/product_package_list'
            options.param = {
	            category:'0168a868'
            }

            this.action = options.action
            this.param = options.param
            this.param.page = this.page
            this.param.limit = this.limit
            this.reqNetData()
        },



		onReachBottom(){
			console.log(this.param)
            var isLastPage = (this.param.page + 1) * this.limit > this.count
            console.log("aaa")
            if(isLastPage){
                this.$log.debug(this, 'onReachBottom', "到底部了")
				return
            }

			this.param.page = this.param.page + 1
			this.reqNetData(true)
		},

		onPullDownRefresh(){
			this.param.page = 1
			this.reqNetData(false)
		},

        computed:{
	        getScreenHeight(){
	        	return (this.$store.getters.screen.screenHeight + 10) + 'px'
            }
        },

        methods:{
            reqNetData(loadmore){
                this.$net.netReq('get', this.action, this.param)
                    .then((res)=>{
                    	if(!loadmore){
                    		this.items = []
		                    this.items = res.results
                            this.$sys.stopRefresh()
                        }else{
		                    this.items = this.items.concat(res.results)
                            console.log("====:" + this.items.length)
                        }
                        this.count = res.count
                    }).catch((err)=>{
                        if(loadmore){
	                        this.param.page = this.param.page - 1;
                        }else{
	                        this.$sys.stopRefresh()
                        }
                    })
            },

	        loadMore(){
            	console.log("load more")
            }
        }
	}
</script>

<style scoped>

    .cRoot{
        width: 100%;
        background-color: yellow;
    }

   .clist {
      overflow:auto;
      margin:auto;
      position:absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
   }

   .cItem{
      width: 100%;
      height: 100px;
   }
</style>