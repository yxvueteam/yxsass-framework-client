import strUtil from 'yx-strutil'

const state = {
  
  //店铺颜色风格
  colors:{
      main:'#237DB7',      //店铺的主风格颜色
      sub:'#1976D2',  //店铺次颜色风格
      highlight:'#ff9100',
    },
  
    config:{//店铺配置信息
      appId:'wxd025b35a9ed0afa6', //wxb1b7857c468d1175
      timeout:30000,
      baseURL:'http://192.168.6.111:8000/',
      //baseURL:'http://192.168.1.198:8000/',
      shopId:"1",
      shopName:"",
      industry:"",
    },
  
   tabList:{
     color:"#000000",
     backgroundColor:'#ffffff',
     list:[
       {
         selectImage:"/static/images/tabbars/home_sel.png",
         unselectImage:'/static/images/tabbars/home.png',
         text:"活动",
         code:'main',
       },
       {
         selectImage:"/static/images/tabbars/classify_sel.png",
         unselectImage:'/static/images/tabbars/classify.png',
         text:"案例",
         code:'category',
       },
       {
         selectImage:"/static/images/tabbars/shoppingcart_sel.png",
         unselectImage:'/static/images/tabbars/shoppingcart.png',
         text:"学堂",
         code:'shopcart',
       },
       {
         selectImage:"/static/images/tabbars/my_sel.png",
         unselectImage:'/static/images/tabbars/my.png',
         text:"客户",
         code:'customer',
       },
       {
         selectImage:"/static/images/tabbars/my_sel.png",
         unselectImage:'/static/images/tabbars/my.png',
         text:"我的",
         code:'user',
       },
     ]
   }
}

// getters
const getters = {

}

const mutations = {
  setShopColor:(state,obj)=>{
    state.colors.main = obj.main;
    state.colors.sub = obj.sub;
    state.colors.highlight = obj.highlight;
  },
  
  /**
   *    设置底部bar
   * @param state
   * @param obj
   */
  setTabBarList:(state,obj)=>{
      state.tabList.list = [];
      for(var i = 0; i < obj.length;i++){
          var item = {
            selectImage: strUtil.stringFix(obj[i].tabItem.selectImage),
            unselectImage: strUtil.stringFix(obj[i].tabItem.unselectImage),
            text: strUtil.stringFix(obj[i].tabItem.text),
            type: strUtil.stringFix(obj[i].tabContent.type),
            code: strUtil.stringFix(obj[i].tabContent.code),
            templateId: strUtil.stringFix(obj[i].tabContent.templateId),
            content: strUtil.stringFix(obj[i].tabContent.content),
            color:strUtil.stringFix(obj[i].tabItem.unselectColor),
            selectColor:strUtil.stringFix(obj[i].tabItem.selectColor)
          }
          state.tabList.list.push(item)
      }
  },
  
  setTabListSelectColor:(state,obj)=>{
    for(var i = 0;i < state.tabList.list.length;i++){
      var item = state.tabList.list[i];
      if(i == obj.index){
        item.color = obj.color
      }else{
        item.color = state.tabList.unSelectColor
      }
    }
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
