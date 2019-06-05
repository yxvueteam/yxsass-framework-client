import Vue from 'vue'
import Vuex from 'vuex'

import YxLogger from 'yx-logger'
import fly from '@/utils/netUtils'

import Shop from './modules/Shop'
import User from './modules/User'


Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const TAG = 'store/index'

export default new Vuex.Store({
  
  state:{
    
    screen:{
      screenScale:1, //屏幕缩放比例，用于样式计算
      pixelRatio:2,  //
      screenHeight:613, //屏幕高度
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
        state.screen.topBarHeight = obj.statusBarHeight + 47;
        state.screen.screenHeight = obj.screenHeight - state.screen.topBarHeight - state.screen.bottomBarHeight
        if(obj.model.indexOf('iPhone X') != -1){
          state.screen.isIphoneX = true;
          state.screen.bottomBarHeight = 49 + 34;
          state.screen.screenHeight = obj.screenHeight - state.screen.topBarHeight - state.screen.bottomBarHeight
        }
        console.log("screen info==" + JSON.stringify(state.screen))
      }
  },
  
  
  actions:{
    /**
     *     rest- framework 请求
     * @param context
     * @param request
          {
             action: 动作
             method: http方法
             param: 请求参数
          }
     * @returns {Promise<any>}
     */
    request_action(context, request){
      return new Promise((resolve,reject) =>{
  
        fly.config.baseURL = context.state.shopConfig.baseURL;
        fly.config.headers["Content-Type"] = 'application/json'
        fly.config.headers["zytoken"]= JSON.stringify(context.getters.getToken);
        
        fly.request(request.action,request.param,{method:request.method})
        .then((res)=>{
          try{
            resolve(res)
          }catch (err){
            YxLogger.error(TAG, 'request_action', err.message)
          }
        }).catch((err)=>{
          reject(err)
        })
      })
    },
    
    /**
     *  post 请求
     * @param context
     * @param request
     * @returns {Promise<any>}
     */
    common_action(context, request){
      return new Promise((resolve,reject) =>{
        
        fly.config.baseURL = context.state.shopConfig.baseURL;
        fly.config.headers["Content-Type"] = 'application/json'
        fly.config.headers["zytoken"]= JSON.stringify(context.getters.getToken);
        
        fly.post(request.action,request.param).then((res)=>{
          resolve(res)
        }).catch((err)=>{
          reject(err)
        })
      })
    }
    
  },
  
  
  modules: {
    shop:Shop,
    user:User,
  },
  
  strict: debug,
  //plugins: debug ? [createLogger()] : []
})

