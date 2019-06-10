<!--
   author: laijlong
   desc:  按钮组件

   外部传参:
        plain: 是否镂空
        disabled: 是否禁用
        loading: 是否显示loading转圈
        text: 按钮文字
        btnStyle: 按钮样式
        textStyle: 按钮文字样式

        click: 点击事件

   外部调用:
           <yx-button :plain="false"
                      :disabled="false"
                      :loading="false"
                      text="按钮"
                      :btnStyle="{'background-color':'red'}"
                      :textStyle="{'font-size':'16px'}"
                      @click="onClickBtn"></yx-button>
-->
<template>
  <div :class="getRootStyle" :style="getBtnStyle" @click="onClickBtn">
    <div class="circle" 
         :style="{width:textStyle['font-size'],height:textStyle['font-size']}"
         v-if="loading"></div>
    <div class="cBtnText" :style="getTextStyle">{{text}}</div>
  </div>
</template>

<script>
	export default {
		name:"yx-button",

		components:{
    },

    props:{
      plain:{//是否镂空
        type: Boolean,
        default: false,
      },

      disabled:{//是否禁用
        type: Boolean,
        default: false,
      },

      loading:{//是否显示loading转圈
        type: Boolean,
        default: false,
      },

      text:{//按钮文字
        type: String,
        default: '确认',
      },

      btnStyle:{//按钮样式
        type: Object,
        default: {},
      },

      textStyle:{//按钮文字样式
        type: Object,
        default: {},
      }
    },

    data(){
      return {
        plainColor:'',
      }
    },

    computed:{
      getRootStyle(){
        var style = "cBtnRoot "
        if(this.disabled){
          style = style + 'cBtnDisabled'
        }
        return style
      },

      getBtnStyle(){
        if(this.plain){
          var style = Object.assign({}, this.btnStyle)
          var borderColor = style['background-color']
          style['background-color'] = 'white'
          style['border-width'] = '1px'
          style['border-style'] = 'solid'
          style['border-color'] = borderColor
          this.plainColor = borderColor
          return this.changeObjToStr(style)
        }
        else{
          return this.changeObjToStr(this.btnStyle)
        }
      },

      getTextStyle(){
        var style = Object.assign({}, this.textStyle)
        if(this.plain){
          style['color'] = this.plainColor
          style['line-height'] = style['font-size']
          return this.changeObjToStr(style)
        }
        else{
          style['line-height'] = style['font-size']
          return this.changeObjToStr(style)
        }
      }
    },

    methods:{
      //将对象转变为style字符串
      changeObjToStr(style){
        var s = [];
        for(let i in style){
          s.push(i+':'+style[i]);
        }
        s = s.join(';')
        return  s
      },

      onClickBtn(){
        if(!this.disabled){
          this.$emit('click')
        }
      }
    }
	}
</script>

<style scoped>
  .cBtnRoot{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .cBtnText{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .cBtnDisabled{
    opacity: 0.6;
  }

  .circle{
    /*width: 100px;
    height: 100px;*/
    margin-right: 10px;
    border: 3px white solid;
    border-left-color: white;
    border-right-color: lightgray;
    border-radius: 100%;
    animation: loading 1s infinite linear;
  }
  @keyframes loading{
      from{transform: rotate(0deg)}to{transform: rotate(360deg)}
  }
</style>