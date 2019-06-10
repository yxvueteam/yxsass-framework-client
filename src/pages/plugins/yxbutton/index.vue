<!--
   author: 
   desc:
   用途:
-->
<template>
  <div class="col">
    <div>
      <yx-title-bar title="yx-button测试"></yx-title-bar>
    </div>

    <div style="margin-top: 20px;margin-left: 20px;">
    	<yx-button :plain="false"
                 :disabled="false"
                 :loading="false"
                 text="按钮1"
                 :btnStyle="btnStyle"
                 :textStyle="textStyle"
                 @click="onClickBtn"></yx-button>
    </div>

    <div style="margin-top: 20px;margin-left: 20px;">
    	<yx-button :plain="true"
                 :disabled="false"
                 :loading="false"
                 text="按钮2"
                 :btnStyle="btnStyle"
                 :textStyle="textStyle"
                 @click="onClickBtn"></yx-button>
    </div>

    <div style="margin-top: 20px;margin-left: 20px;">
    	<yx-button :plain="false"
                 :disabled="true"
                 :loading="false"
                 text="按钮3"
                 :btnStyle="btnStyle"
                 :textStyle="textStyle"
                 @click="onClickBtn"></yx-button>
    </div>

    <div style="margin-top: 20px;margin-left: 20px;">
    	<yx-button :plain="false"
                 :disabled="false"
                 :loading="true"
                 text="按钮4"
                 :btnStyle="btnStyle"
                 :textStyle="textStyle"
                 @click="onClickBtn"></yx-button>
    </div>
  </div>
</template>

<script>
	import YxTitleBar from "../../../components/cur_app/YxTitleBar";
	import YxButton from "../../../components/base/button/YxButton";
	export default {
		name:"index",

		components:{
			YxTitleBar,
	    YxButton,
    },

    data(){
    	return {
    		btnStyle:{
    			'width': '200px',
    			'height': '100px',
    			'background-color': 'red',
    			'border-radius' : '6px'
    		},
    		textStyle:{
    			'color': 'white',
    			'font-size':'25px'
    		},
    	}
    },

    methods:{
    	onClickBtn(){
    		console.log("点击了按钮")
    	},
    }
	}
</script>

<style scoped>

</style>