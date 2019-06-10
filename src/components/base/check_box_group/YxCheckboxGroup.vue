<!--
   author: laijlong
   desc:  多选框组

   外部传参:
        value: 已选项数组
        optList: 选项数组
        direction: 选项排列方向 row column
        isShowCheckAll: 是否显示全选 
        size: 大小 big normal small mini
        checkedColor: 选中颜色
        unCheckedColor: 未选中颜色
        checkedIcon: 选中图标
        unCheckedIcon: 未选中图标
        marginTop: 每一项离上边的间距
        width: 每项的宽度

        change: 监听选项改变事件

   外部调用:
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
-->
<template>
  <div class="cDivGroup-column">
    <yx-checkbox :label="'全选'"
                 :size="size"
                 :checked="isCheckedAll"
                 :checkedColor="checkedColor"
                 :unCheckedColor="unCheckedColor"
                 :checkedIcon="checkedIcon"
                 :unCheckedIcon="unCheckedIcon"
                 :marginTop="marginTop"
                 :width="width"
                 @change="onChangeSelectAll"
                 v-if="isShowCheckAll"></yx-checkbox>
    <div :class="direction=='column'?'cDivGroup-column':'cDivGroup-row'">
      <yx-checkbox v-for="(item,index) in optList"
                   :key="index"
                   :label="item.label"
                   :value="item.value"
                   :size="size"
                   :checked="item.checked"
                   :checkedColor="checkedColor"
                   :unCheckedColor="unCheckedColor"
                   :checkedIcon="checkedIcon"
                   :unCheckedIcon="unCheckedIcon"
                   :marginTop="marginTop"
                   :width="width"
                   @change="change($event,index)"></yx-checkbox>
    </div>
  </div>
</template>

<script>
  import YxCheckbox from "./YxCheckbox";
  export default {
    name:"yx-checkbox-group",

    props:{
      value:{//已选项数组
        type:Array,
        default:[]
      },

      optList:{//选项数组
        type:Array,
        default:[]
      },

      direction:{//选项排列方向 row column
        type:String,
        default:'row'
      },

      isShowCheckAll:{//是否显示全选 
        type:Boolean,
        default:false,
      },

      size:{  //big normal small mini
        type:String,
        default:'normal',
      },

      checkedColor:{  //#xxxxxx
        type:String,
        default:'#409eff',
      },

      unCheckedColor:{  //#xxxxxx
        type:String,
        default:'#5f5f5f',
      },

      checkedIcon:{  //选中图标
        type:String,
        default:'icon-check-select',
      },

      unCheckedIcon:{  //未选中图标
        type: String,
        default:'icon-check-unselect',
      },

      marginTop:{//每一项离上边的间距
        type:String,
        default:"10px"
      },

      width:{ //每项的宽度
        type:String,
        default: '80px',
      },
    },

    components: {
      YxCheckbox
    },

    computed:{
      isCheckedAll(){
        let optLength = this.optList.length;
        let checkedCount = this.value.length;
        if(checkedCount == optLength){
          return true;
        }
        else{
          return false;
        }
      }
    },

    onLoad(){
      this.init()
    },

    mounted() {
    },

    methods:{
      init(){
        for(var i=0;i<this.value.length;i++){
          for(var j=0;j<this.optList.length;j++){
            if(this.value[i] == this.optList[j].value){
              this.optList[j].checked = true;
              continue
            }
          }
        }
      },

      change(params,index){
        var checked = params.checked;
        var val = this.optList[index].value;
        if(checked){
          this.optList[index].checked = checked;
          this.value.push(this.optList[index].value);
        }
        else{
          this.optList[index].checked = checked;
          this.value.splice(this.value.indexOf(val), 1);
        }
        this.$emit("change")
      },

      onChangeSelectAll(params){
        var checked = params.checked;
        if(checked){
          for(var i=0;i<this.optList.length;i++){
            if(this.optList[i].checked===undefined || this.optList[i].checked == false){
              this.optList[i].checked = true;
              this.value.push(this.optList[i].value);
              continue
            }
          }
        }
        else{
          for(var i=0;i<this.optList.length;i++){
            if(this.optList[i].checked == true){
              this.optList[i].checked = false;
              this.value.splice(this.value.indexOf(this.optList[i].value), 1);
              continue
            }
          }
        }
        this.$emit("change")
      }
    }
  }
</script>

<style scoped>
  .cDivGroup-column{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .cDivGroup-row{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
  }
</style>
