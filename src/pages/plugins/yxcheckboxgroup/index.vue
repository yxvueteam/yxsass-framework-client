<!--
   author: 
   desc:
   用途:
-->
<template>
  <div class="col">
    <div>
      <yx-title-bar title="yx-check-box-group测试"></yx-title-bar>
    </div>

    <div style="margin-top: 20px;margin-left: 20px;">
      <yx-checkbox-group :value="checkList"
                         :optList="optList"
                         direction="row"
                         :isShowCheckAll="true"
                         size="big"
                         checkedColor="red"
                         unCheckedColor="grey"
                         checkedIcon="icon-kulian"
                         unCheckedIcon="icon-arrow-left"
                         marginTop="20px"
                         width="100px"
                         @change="onCheckboxChange"></yx-checkbox-group>
    </div>
  </div>
</template>

<script>
	import YxTitleBar from "../../../components/cur_app/YxTitleBar";
  import YxCheckboxGroup from '../../../components/base/check_box_group/YxCheckboxGroup'
	export default {
		name:"index",

		components:{
			YxTitleBar,
      YxCheckboxGroup
    },

    data(){
    	return {
        checkList:[],
        optList:[
          {label:'选项1',value:'item_1'},
          {label:'选项2',value:'item_2'},
          {label:'选项3',value:'item_3'},
          {label:'选项4',value:'item_4'},
          {label:'选项5',value:'item_5'},
          {label:'选项6',value:'item_6'},
          {label:'选项7',value:'item_7'},
          {label:'选项8',value:'item_8'},
          {label:'选项9',value:'item_9'},
          {label:'选项10',value:'item_10'},
          {label:'选项11',value:'item_11'},
          {label:'选项12',value:'item_12'},
          {label:'选项13',value:'item_13'},
          {label:'选项14',value:'item_14'},
        ],
    	}
    },

    methods:{
      onCheckboxChange(){
        console.log(JSON.stringify(this.checkList))
      }
    }
	}
</script>

<style scoped>

</style>