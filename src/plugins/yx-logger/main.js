// http://www.ptbird.cn/day-js.html
// https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md
// npm install --save yx-logger
import dayjs from 'dayjs'

var YxLogger = {
  
  isLogger:true, //是否打开日志
  
  level: 'debug', //日志等级
  
  outputWay:'console', //日志输出方式 console: 控制台   cache缓存 server:服务器
  
  url:'', //上传日志服务器的地址
  
  platform:'wx', //日志输出平台
  
  logs:[], //
  
  maxLogCacheCount:1000, //最大日志缓存的条数
  
  //输出方式
  OUTPUT_WAY_CACHE:'cache',
  OUTPUT_WAY_CONSOLE:'console',
  OUTPUT_WAY_SERVER:'server',
  
  //日志平台
  PLATFORM_WX:'wx', //微信
  PLATFORM_TT:'tt', //头条
  PLATFORM_MY:'my', //蚂蚁
  PLATFORM_WEEX:'weex', //week
  PLATFORM_SWAN:'swan', //百度智能小程序
  
  //日志等级
  LOGGER_DEBUG:'debug',
  LOGGER_INFO:'info',
  LOGGER_WARN:'warn',
  LOGGER_ERROR:'error',
  LOGGER_NAME:'yxlogger',
  
  /**
   *   配置日志参数
   * @param platform:string ：所属平台
   * @param isLogger:boolean ： 是否输出日志
   * @param level:string ： 日志等级 debug info warn error
   * @param outputWay:string : 输出类型 console: 控制台   cache缓存, server:服务器
   * @param uploadTimeTip:int : 时间间隔，每个多少分钟上传或者清理一次日志
   * @param url:string ： 日志服务器地址:
   */
  config:(platform, url, isLogger, level, outputWay, uploadTimeTip, maxLogCacheCount)=>{
    YxLogger.platform = platform
    YxLogger.url = url
    YxLogger.isLogger = isLogger
    YxLogger.level = level
    YxLogger.outputWay = outputWay
    YxLogger.uploadTimeTip = uploadTimeTip
    YxLogger.maxLogCacheCount = maxLogCacheCount
  },
  
  debug:(obj, funcName, info) => {
    var canOutput = YxLogger.canOutputLogger(YxLogger.LOGGER_DEBUG)
    if(!canOutput){
      return
    }
  
    YxLogger.writeLogger(obj, funcName, info, YxLogger.LOGGER_DEBUG)
    
  },
  
  info:(obj, funcName, info) => {
    if(!YxLogger.canOutputLogger(YxLogger.LOGGER_INFO)){
      return
    }
    YxLogger.writeLogger(obj, funcName, info, YxLogger.LOGGER_INFO)
  },
  
  warn:(obj, funcName, info) => {
    if(!YxLogger.canOutputLogger(YxLogger.LOGGER_WARN)){
      return
    }
    YxLogger.writeLogger(obj, funcName, info, YxLogger.LOGGER_WARN)
  },
  
  error:(obj, funcName, info) => {
    if(!YxLogger.canOutputLogger(YxLogger.LOGGER_ERROR)){
      return
    }
    YxLogger.writeLogger(obj, funcName, info, YxLogger.LOGGER_ERROR)
  },
  /**
   *     自定义异常类
   * @param obj:this  当前对象
   * @param funName:string   函数名
   * @param eName:string  异常名
   * @param eMessage:string  异常信息
   * @returns {{name :*, message :string}}
   */
  except:(obj,funName,eName,eMessage) => {
    var path = YxLogger.getPath(obj)
    var time = YxLogger.getTime()
    var logger = time + ' ' + path + " " + funName + " " + eName + "->" + eMessage
    return {
      name:eName,
      message:logger
    }
  },
  /**
   *     写日志
   * @param obj:this    当前对象
   * @param funcMethod: 函数方法
   * @param info:  日志信息
   * @param callMethod: 调用方法名，是dubug还是info...
   */
  writeLogger:(obj, funcMethod, info, callMethod)=>{
    var path = YxLogger.getPath(obj)
    var time = YxLogger.getTime()
    
    if(YxLogger.outputWay == YxLogger.OUTPUT_WAY_CONSOLE){
       if(callMethod == YxLogger.LOGGER_DEBUG){
         console.log(time + ' ' + path + " " + funcMethod + " " + info)
       }else if(callMethod == YxLogger.LOGGER_INFO){
         console.info(time + ' ' + path + " " + funcMethod + " " + info)
       }else if(callMethod == YxLogger.LOGGER_WARN){
         console.warn(time + ' ' + path + " " + funcMethod + " " + info)
       }else if(callMethod == YxLogger.LOGGER_ERROR){
         console.error(time + ' ' + path + " " + funcMethod + " " + info)
       }
    }else if(YxLogger.outputWay == YxLogger.OUTPUT_WAY_CACHE){
      
       var logger = time + ' ' + path + " " + funcMethod + " " + info
       YxLogger.logs.push(logger)
       if(YxLogger.logs.length >= YxLogger.maxLogCacheCount){
          YxLogger.writeCache()
          YxLogger.logs = []
       }
    }
    
  },
  
  /**
   *   写缓存
   * @param info
   */
  writeCache:()=>{
    try{
      var jsonObj = JSON.stringify(YxLogger.logs)
      if(YxLogger.platform == YxLogger.PLATFORM_WX){
        wx.setStorageSync(YxLogger.LOGGER_NAME, jsonObj)
      }
    }catch(err){
    
    }
  },
  /**
   *    获得日志缓存
   * @returns {null}
   */
  getCache:(callback)=>{
    try{
      if(YxLogger.platform == YxLogger.PLATFORM_WX){
        wx.getStorage({
          key: YxLogger.LOGGER_NAME,
          success: function(res) {
              callback(res.data)
          }
        })
      }
    }catch(err){
      return null
    }
  },
  
  /** 获取当前时间 **/
  getTime:()=>{
      return dayjs().format("YYYY-MM-DD HH:mm:ss")
  },
  
  /**
   *   获得路径
   * @param obj
   * @returns {*}
   */
  getPath:(obj)=>{
    if(typeof(obj) == 'string'){
      return obj
    }else if (typeof(obj) == 'object'){
      if(YxLogger.platform == 'wx'){
        return YxLogger.getWxPath(obj)
      }
    }else{
      return "xxx"
    }
  },
  /**
   *   是否能输出日志
   * @param loggerMethod:string ： 日志调用方法
   * @returns {boolean}
   * @exception: 无
   */
  canOutputLogger:function(loggerMethod){
    if(!YxLogger.isLogger){
      return false
    }
    
    if(YxLogger.level == 'debug' && loggerMethod == 'debug'){
      return true
    }
    
    if((YxLogger.level == 'debug' || YxLogger.level == 'info')
      && loggerMethod == 'info'){
      return true
    }
    
    if((YxLogger.level == 'debug' || YxLogger.level == 'info' || YxLogger.level == 'warn')
      && loggerMethod == 'warn'){
      return true
    }
    
    if(loggerMethod == 'error'){
      return true
    }
    
    return false
  },
  
  
  /**
   *   获取微信小程序平台输出日志的文件路径，如果是组件就是文件：组件
   * @param obj:this :  对象
   * @returns {string} 路径
   * @exception: 无
   */
  getWxPath:(obj)=>{
    try{
      var path = '';
      if(obj.$mp !== undefined){//页面方法
        if(obj.$mp.appOptions !== undefined){
          path = obj.$mp.appOptions.path
        }
      }else{
        if(obj.$parent !== undefined
          && obj.$parent.$mp !== undefined
          && obj.$parent.$mp.appOptions !== undefined
          && obj.$options !== undefined){
          path = obj.$parent.$mp.appOptions.path + ":" + obj.$options._componentTag
        }
      }
      return path
    }catch (err){
      console.error(err.name + "==" + err.message)
      return "";
    }
  },
  
  setIsLogger:(isLogger)=>{
    YxLogger.isLogger = isLogger
  },
  
  setLevel:(level)=>{
    YxLogger.level = level
  },
  
  setOutputWay:(output)=>{
    YxLogger.outputWay = output
  },
  
  setUrl:(url)=>{
    YxLogger.url = url
  },
  
  setPlatform:(platform)=>{
    YxLogger.platform = platform
  },
  
  setMaxLogCacheCount:(maxLogCacheCount)=>{
    YxLogger.maxLogCacheCount = maxLogCacheCount
  }
}

export default YxLogger
