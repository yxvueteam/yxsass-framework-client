<!--
   author: laijlong
   desc:  多选框项

   外部传参:

   外部调用: 外部只需直接调用yx-check-box-group即可满足
-->
<template>
  <div :class="getBoxSize"
       :style="{width:width,marginTop:marginTop}"
       @click="onClickBox">
    <yx-icon :name="checked?checkedIcon:unCheckedIcon"
             :size="getIconSize"
             :color="checked?checkedColor:unCheckedColor"></yx-icon>
    <div class="cText"
         :style="{fontSize:getFontSize,
                  marginLeft:getFontMargin,
                  lineHeight:getFontSize,
                  color:checked?checkedColor:unCheckedColor}">{{label}}</div>
  </div>
</template>

<script>
  import YxIcon from "../icon/YxIcon";
  export default {
    name:"yx-checkbox",

    components: {
      YxIcon,
    },

    props:{
      label:{//显示的标签
        type:String,
        default:'',
      },

      size:{  //big normal small mini
        type:String,
        default:'big',
      },

      width:{ //每项的宽度
        type:String,
        default: '80px',
      },

      checkedColor:{  //#xxxxxx
        type:String,
        default:'#409eff',
      },

      unCheckedColor:{  //#xxxxxx
        type:String,
        default:'#5f5f5f',
      },

      checked:{//是否勾选
        type:Boolean,
        default:false,
      },

      marginTop:{//每一项离上边的间距
        type:String,
        default:""
      },

      checkedIcon:{  //选中图标
        type:String,
        default:'icon-circle-check',
      },

      unCheckedIcon:{  //未选中图标
        type: String,
        default:'icon-circle-check1',
      },
    },

    computed:{
      getFontSize(){
         if(this.size == 'big'){
           return '18px'
         }
         else if(this.size == 'normal'){
           return '14px'
         }
         else if(this.size == 'small'){
           return '12px'
         }
         else if(this.size == 'mini'){
           return '12px'
         }
         else{
           return '14px'
         }
      },

      getFontMargin(){
         if(this.size == 'big'){
           return '8px'
         }
         else if(this.size == 'normal'){
           return '6px'
         }
         else if(this.size == 'small'){
           return '4px'
         }
         else if(this.size == 'mini'){
           return '4px'
         }
         else{
           return '6px'
         }
      },

      getIconSize(){
        if(this.size == 'big'){
           return 18
         }
         else if(this.size == 'normal'){
           return 14
         }
         else if(this.size == 'small'){
           return 12
         }
         else if(this.size == 'mini'){
           return 12
         }
         else{
           return 14
         }
      },

      getBoxSize(){
        var style = 'cRoot '
        return style
      }
    },

    methods:{
      onClickBox(){
        this.checked = !this.checked;
        var params = {
            checked:this.checked
        }
        this.$emit("change",params)
      }
    },
  }
</script>

<style scoped>
  .cRoot{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
  }

  .cText{
    text-align: center;
  }

  .cBoxSize-big{
    padding: 7px;
  }

  .cBoxSize-normal{
    padding: 5px;
  }

  .cBoxSize-small{
    padding: 3px;
  }

  .cBoxSize-mini{
    padding: 3px;
  }
</style>
