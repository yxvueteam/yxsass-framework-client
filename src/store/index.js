import Vue from 'vue'
import Vuex from 'vuex'

import YxLogger from 'yx-logger'
//
import Shop from './modules/Shop'
//import User from './modules/User'


Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const TAG = 'store/index'

export default new Vuex.Store({
  
  state:{
    
    screen:{
      screenScale:1, //屏幕缩放比例，用于样式计算
      pixelRatio:2,  //
      screenMainHeight:667, //屏幕在主页面高度
	  screenHeight:667, //屏幕高度
      isIphoneX:false, //是否iphonex
      statusBarHeight:20,
      topBarHeight:67,    //顶部栏的高度
      bottomBarHeight:49, //底部栏的高度
    },
    
    openId:'', //小程序唯一openId
    

  },
  
  getters:{ //rootGetters不起作用
    
    /** 店铺全局配置颜色 **/
    shopColor:state => state.shop.colors,
    shopConfig:state => state.shop.config,
    /** 全局底部导航 **/
    shopTabs:state => state.shop.tabList,
    
    
    screen: state => state.screen,
    
    
    getAppid: state => state.shopConfig.appId,
    openId:state => state.user.openId,
    shopId:state => state.shopConfig.shopId,
    
    
    getToken:(state) =>{
      var userid = state.userInfo.userId
      if(userid === undefined || userid == null){
        userid = ''
      }
      
      var token = {
        openid: state.user.openId,
        shopid: state.shopConfig.shopId,
        userid: userid
      }
      return token
    },
  },
  
  mutations:{
    
      setScreenInfo:(state,obj)=>{
        console.log(JSON.stringify(obj))
        state.screen.screenScale = obj.windowWidth / 375;
        state.screen.pixelRatio = obj.pixelRatio;
        state.screen.statusBarHeight = obj.statusBarHeight;
        state.screen.topBarHeight = obj.statusBarHeight + state.screen.screenScale * 48;
        state.screen.screenHeight = obj.screenHeight
        state.screen.screenMainHeight = obj.screenHeight - state.screen.topBarHeight - state.screen.bottomBarHeight
        if(obj.model.indexOf('iPhone X') != -1){
          state.screen.isIphoneX = true;
          state.screen.bottomBarHeight = 49 + 34;
          state.screen.screenMainHeight = obj.screenHeight - state.screen.topBarHeight - state.screen.bottomBarHeight
        }
        console.log("screen info==" + JSON.stringify(state.screen))
      }
  },
  
  
  actions:{

  },
  
  
  modules: {
    shop:Shop,
    //user:User,
  },
  
  strict: debug,
  //plugins: debug ? [createLogger()] : []
})

