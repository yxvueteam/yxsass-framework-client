/**
 *   调用之前必须先调用init 接口 setHeaderToken接口以及setUrl接口
 */

import YxLogger from "yx-logger";
import YxCache from '../yx-cache/main'

var FLY = null
if (mpvuePlatform === 'my') { //蚂蚁小程序
	FLY = require("flyio/dist/npm/ap");
}else{
	FLY = require("flyio/dist/npm/wx"); //微信小程序、头条小程序、百度小程序
}

var TAG = 'YxFly'
var YxFly = {
  
    fly:null,

    isDebug:true,

    platform:'wx', //日志输出平台
    PLATFORM_WX:'wx', //微信
    PLATFORM_TT:'tt', //头条
    PLATFORM_MY:'my', //蚂蚁
    PLATFORM_WEEX:'weex', //week
    PLATFORM_SWAN:'swan', //百度只能小程序

    METHOD_POST: 'post',
    METHOD_GET:'get',
    METHOD_DELETE:'delete',
    METHOD_PUT:'put',
    METHOD_PATCH:'patch',
    /**
     *  初始化调用凭条
     * @param platform
     */
    init:(platform)=>{
        if(YxFly.isDebug){
            YxLogger.debug(TAG, 'init', '初始化平台:' + platform)
        }
        if(YxFly.fly == null){
	        YxFly.fly = new FLY()
        }else {
         if(YxFly.isDebug){
             YxLogger.debug(TAG, 'init', '已经初始化化了')
         }
        }
    },
  
  /**
   *    设置全局token
   * @param token
   */
  setHeaderToken:(token)=>{

      if(YxFly.isDebug){
          YxLogger.debug(TAG, 'setHeaderToken', '设置token:' + token)
      }
      YxFly.fly.config.headers = {
        'Content-Type': 'application/json',
        'token':token
      }
  },

  setHeader:(header)=>{
      YxFly.fly.config.headers = header
  },

  /** 设置全局请求的url **/
  setUrl:(url)=>{
      if(YxFly.isDebug){
          YxLogger.debug(TAG, 'setUrl', '设置url:' + url)
      }
      YxFly.fly.config.baseURL = url
  },
  /**
   *    网络请求接口
   * @param method： post, get, put,delete,
   * @param action: 接口动作
   * @param param： 加快参数
   * @returns {Promise<any>}
   */
  netReq:(method, action, param)=>{
      if(YxFly.isDebug){
          YxLogger.debug(TAG, 'netReq', 'method:' + method)
          YxLogger.debug(TAG, 'netReq', 'aciton:' + YxFly.fly.config.baseURL + action)
          console.log("param:" + JSON.stringify(param))
      }

    return new Promise((resolve,reject) =>{
      
      var keys = {
        action:action,
        param:param
      }
      var cacheData = YxCache.getInterfaceCache(keys)
      if(cacheData != null && cacheData != ""){
          YxLogger.debug(TAG, 'netReq', '从缓存获取接口<' + action + '>获取数据')
          resolve(cacheData)
          return
      }else{
          if(YxFly.isDebug){
              YxLogger.debug(TAG, 'netReq', '从网络接口<' + action + '>获取数据')
          }
      }
      YxFly.fly.request(
        action,
        param,
        {method:method})
      .then((res)=>{
        try{
          if (YxFly.platform === 'my') { //蚂蚁小程序
              if(YxFly.isDebug){
                  console.log(JSON.parse(res.data))
              }
              resolve(JSON.parse(res.data))
          } else { //微信小程序、头条小程序、百度小程序
              YxCache.setInterfaceCache(keys,res.data)
              if(YxFly.isDebug){
                  console.log(JSON.stringify(res.data))
              }
              resolve(res.data)
          }
        }catch (err){
          YxLogger.error(TAG, 'netReq', err.name, err.message)
        }
      }).catch((err)=>{
        var errInfo = {returnCode:'10000',returnMsg:'请求错误',desc:''}
        if(err.status == 0){//网络请求失败
          errInfo.returnCode = '10001'
          errInfo.returnMsg = "网络异常，请检查网络并重新请求"
        }else if(err.status == 1){//服务器超时
          errInfo.returnCode = '10002'
          errInfo.returnMsg = "服务器请求超时，请联系管理员"
        }else if(err.status == 500){//自定义错误
          errInfo.returnCode = err.response.data.returnCode
          errInfo.returnMsg = err.response.data.returnMsg
          errInfo.desc = err.response.data.desc
        }else{//业务处理错误
          errInfo.returnCode = '10003'
          errInfo.returnMsg = '接口请求错误'
          errInfo.desc = JSON.stringify(err.response.data)
        }
        if(YxFly.isDebug){
            console.log(errInfo)
        }
        reject(errInfo)
      })
    })
  }
  
}

export default YxFly