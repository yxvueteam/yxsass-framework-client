<!--
   author: zhangwei
   desc:
   用途:
-->
<template>
   <div class="cRoot">
      <scroll-view scroll-y

                   style="height: 100%">
          <div class="scrollContentDiv">
               <div v-for="(item,index) in items" :key="index">
                   <div class="cItem">{{item.name}}</div>
               </div>
          </div>
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

        methods:{
            reqNetData(){
                this.$net.netReq('get', this.action, this.param)
                    .then((res)=>{
                    	this.items = res.results
                    }).catch((err)=>{

                })
            }
        }
	}
</script>

<style scoped>

    .cRoot{
        width: 100%;
        height: 100vh;
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