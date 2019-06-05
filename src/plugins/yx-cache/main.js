import YxLogger from 'yx-logger'
import dayjs from 'dayjs'
/**
 *     接口缓存，怎么判断一个接口是不是缓存接口，在action做判断
 *     如果aciton带了_cache_time则表示是缓存接口
 * @type {string}
 */

var tag = 'YxCache'


var YxCache = {
  
  platform:'wx', //日志输出平台
  
  isDebug:true, //是否打印日志
  
  PLATFORM_WX:'wx', //微信
  PLATFORM_TT:'tt', //头条
  PLATFORM_MY:'my', //蚂蚁
  PLATFORM_WEEX:'weex', //week
  PLATFORM_SWAN:'swan', //百度智能小程序
  
  CACHE_NAME:'_cache_', //cache标识
  CACHE_TIME:'_time_', //缓存时间
	/**
	 *  设置平台
	 * @param platform
	 */
	setPlatform:(platform)=>{
  	    YxCache.platform = platform
	},
	/**
	 *  异步清理缓存
	 * @param callback : 回调函数，成功为true, 失败返回false
	 */
	clearStorage:(callback)=>{
    if(YxCache.platform == YxCache.PLATFORM_WX){
        wx.clearStorage(
	        {
		        success(res){
		            callback(true)
		        },
		        fail(err){
			        callback(false)
		        }
	        }
        )
    }else if(YxCache.platform == YxCache.PLATFORM_TT){
        tt.clearStorage()
    }else if(YxCache.platform == YxCache.PLATFORM_MY){
        my.clearStorage()
    }else if(YxCache.platform == YxCache.PLATFORM_SWAN){
        swan.clearStorage()
    }
    else{
      YxLogger.error(tag, 'clearStorage', '没有找到平台')
    }
  },
  
  /**
   * 清除本地数据缓存的同步接口。
   */
  clearStorageSync:()=>{
    if(YxCache.platform == YxCache.PLATFORM_WX){
      wx.clearStorageSync()
    }else if(YxCache.platform == YxCache.PLATFORM_TT){
      tt.clearStorageSync()
    }else if(YxCache.platform == YxCache.PLATFORM_MY){
      my.clearStorageSync()
    }else{
      YxLogger.error(tag, 'clearStorageSync', '没有找到平台')
    }
  },
  
  /**
   *    从本地缓存中异步获取指定 key 的内容
   * @param key   ： 指定key
   * @param callback: 回调
   *    成功返回对应的值，失败返回null
   */
  getStorage:(key,callback)=>{
    try{
      if(YxCache.platform == YxCache.PLATFORM_WX){
        wx.getStorage({
          key: key,
          success (res) {
            callback(res)
          },
          fail(err){
            callback(null)
          }
        })
      }else if(YxCache.platform == YxCache.PLATFORM_TT){
        tt.getStorage({
          key: key,
          success (res) {
            callback(res)
          },
          fail(err){
            callback(null)
          }
        })
      }else if(YxCache.platform == YxCache.PLATFORM_MY){
        my.getStorage({
          key: key,
          success (res) {
            callback(res)
          },
          fail(err){
            callback(null)
          }
        })
      }else{
        YxLogger.error(tag, 'getStorage', '没有找到平台')
        callback(null)
      }
    }catch (err){
      //throw new YxLogger.except(tag, 'getStorage', err.name, err.message)
      YxLogger.error(tag, 'getStorage', err.name + err.message)
      callback(null)
    }
    
  },
  
  /**
   * 从本地缓存中同步获得数据
   * @param key: 传入的key
   */
  getStorageSync:(key)=>{
    try{
      var values = ""
      if(YxCache.platform == YxCache.PLATFORM_WX){
        values = wx.getStorageSync(key)
      }else if(YxCache.platform == YxCache.PLATFORM_TT){
        values = tt.getStorageSync(key)
      }else if(YxCache.platform == YxCache.PLATFORM_MY){
        values = my.getStorageSync(key)
      }else{
        YxLogger.error(tag, 'getStorageSync', '没有找到平台')
      }
      if(YxCache.isDebug){
        console.log("getStorageSync===>key:" + key)
        console.log(values)
        console.log("getStorageSync===>end")
      }
      return values
    }catch(err){
      YxLogger.error(tag, 'getStorageSync', err.name + err.message)
      return ""
      //throw new YxLogger.except(tag, 'getStorageSync', err.name, err.message)
    }
    
  },
  /**
   *   异步设置数据
   *   将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。
   *   数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，
   *   否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。
   * @param key
   * @param data
   */
  setStorage:(key,data)=>{
    if(YxCache.isDebug){
      console.log("setStorage===>key:" + key)
      console.log(data)
      console.log("setStorage===>end")
    }
    
    
     try{
       if(YxCache.platform == YxCache.PLATFORM_WX){
         wx.setStorage({
           key:key,
           data:data
         },
         )
       }else if(YxCache.platform == YxCache.PLATFORM_TT){
         tt.setStorage({
           key:key,
           data:data
         })
       }else if(YxCache.platform == YxCache.PLATFORM_MY){
         my.setStorage({
           key:key,
           data:data
         })
       }else{
         YxLogger.error(tag, 'setStorage', '没有找到平台')
       }
     }catch(err) {
       YxLogger.error(tag, 'setStorage', err.name + err.message)
       //throw new YxLogger.except(tag, 'setStorage', err.name, err.message)
     }
  },
  
  /**
   *    同步存储数据
   * @param key
   * @param data
   */
  setStorageSync:(key,data)=>{
    if(YxCache.isDebug){
      console.log("setStorageSync===>key:" + key)
      console.log(data)
      console.log("setStorageSync===>end")
    }
    try{
      if(YxCache.platform == YxCache.PLATFORM_WX){
        wx.setStorageSync(key, data)
      }else if(YxCache.platform == YxCache.PLATFORM_TT){
        tt.setStorageSync(key, data)
      }else if(YxCache.platform == YxCache.PLATFORM_MY){
        my.setStorageSync(key, data)
      }else if(YxCache.platform == YxCache.PLATFORM_SWAN){
        swan.setStorageSync(key, data)
      }else{
        YxLogger.error(tag, 'setStorageSync', '没有找到平台')
      }
    }catch(err) {
      YxLogger.error(tag, 'setStorageSync', err.name + err.message)
      //throw new YxLogger.except(tag, 'setStorageSync', err.name, err.message)
    }
  },
    /**
     *
     * @param callback
     */
  getStorageInfo:(callback)=>{
      try{
          if(YxCache.platform == YxCache.PLATFORM_WX){
              wx.getStorageInfo({
                  success (res) {
                      callback(res)
                      if(YxCache.isDebug){
                          YxLogger.debug(tag,'getStorageInfo', "keys:" + JSON.stringify(res.keys)
	                          + ",size:" + res.currentSize + ",limitSize:" + res.limitSize)
                      }
                  }
              })
          }
      }catch (err){
          YxLogger.error(tag, 'getStorageInfo', err.name + err.message)
      }

  },
	/**
	 *  同步获得缓存信息
	 */
	getStorageInfoSync:()=>{
     try{
	     if(YxCache.platform == YxCache.PLATFORM_WX){
		     const res = wx.getStorageInfoSync()
		     return res
		     if(YxCache.isDebug){
			     YxLogger.debug(tag,'getStorageInfoSync',
				     "keys:" + JSON.stringify(res.keys)
				     + "size:" + res.currentSize
				     + ",limitSize:" + res.limitSize)
		     }
	     }
     }catch (err){
	     YxLogger.error(tag, 'getStorageInfoSync', err.name + err.message)
     }
  },
  
  removeStorage:()=>{
     try{
	     if(YxCache.platform == YxCache.PLATFORM_WX){
		     wx.removeStorage({
			     key: 'key',
			     success (res) {
				     if(YxCache.isDebug){
					     YxLogger.debug(tag,'removeStorage','移除成功')
				     }
			     }
		     })
	     }
     }catch (err){
	     YxLogger.error(tag, 'removeStorage', err.name + err.message)
     }
  },
  
  removeStorageSync:(key)=>{
	  try{
		  if(YxCache.platform == YxCache.PLATFORM_WX){
			  wx.removeStorageSync(key)
			  if(YxCache.isDebug){
				  YxLogger.debug(tag,'removeStorageSync','移除成功,key:' + key)
			  }
		  }
	  }catch (err){
		  YxLogger.error(tag, 'removeStorage', err.name + err.message)
	  }
  },
  
  /**
   *    保存缓存数据
   * @param key : json数组，包含了action, param
   *
   * @param datas
   */
  setInterfaceCache:(keys, datas)=>{
      try{
      if(!YxCache.isCacheInterface(keys.action)) {
        if(YxCache.isDebug){
         YxLogger.debug(tag, 'setInterfaceCache', keys.action + '不是一个缓存接口')
        }
        return
      }
      
      var enKey = encodeURIComponent(JSON.stringify(keys))
      if(YxCache.isDebug){
        YxLogger.debug(tag, 'setInterfaceCache', "key=" + enKey)
      }
      
      YxCache.setStorageSync(enKey,{
        time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        data:datas
      })
      }catch(err){
      
      }
  },
  /**
   *    获取接口的缓存
   *  1. 判断接口是否是缓存接口，是否包含了字符 "_cache_"
   *  2. 获取keys对应的缓存值
   *  3. 获取缓存时间，没有设置默认五分钟
   *  4. 如果设置了缓存时间，需要判断缓存时间+存取时间是否大于当前时间
   *     大于了返回空字符串，否则返回缓存对象
   *
   * @param keys：
   *    action:
   *    param:
   * @returns {string}
   */
  getInterfaceCache:(keys) =>{
    try{
  
      //是否是缓存接口
      var action = keys.action
      if(!YxCache.isCacheInterface(action)) {
        if(YxCache.isDebug){
          YxLogger.debug(tag, 'getInterfaceCache', keys.action + '不是一个缓存接口')
        }
        return ""
      }
  
      var key = encodeURIComponent(JSON.stringify(keys))
      if(YxCache.isDebug){
          YxLogger.debug(tag, 'getInterfaceCache', "key=" + key)
      }

      var valueJson = YxCache.getStorageSync(key)
      if(valueJson == '' || valueJson == null)
      {//是否有该缓存的值
          if(YxCache.isDebug){
              YxLogger.debug(tag, 'getInterfaceCache', "没有找到key=" + key + "的值")
          }
          return ""
      }
      
      //key判断
      var cacheTime = 5
      if(action.indexOf(YxCache.CACHE_TIME) != -1) {
          cacheTime = action.split(YxCache.CACHE_TIME)[1]
          if(YxCache.isDebug){
              YxLogger.debug(tag, 'getInterfaceCache', "获取接口定义的缓存时间:" + cacheTime + '分钟')
          }
      }
      
      //比较缓存数据内的时间+缓存时间是否大于了当前时间
      var beforDayjs = dayjs(valueJson.time).add(cacheTime,'minute')
      var flag = dayjs().isBefore(beforDayjs)
      if(!flag){
        if(YxCache.isDebug){
            YxLogger.debug(tag, 'getInterfaceCache', "当前时间已经超过了缓存时间"
                + ":缓存过期时间:" + beforDayjs.format("YYYY-MM-DD HH:mm:ss")
                + ",当前时间:" + dayjs().format("YYYY-MM-DD HH:mm:ss"))
        }
        return ""
      }else{
        if(YxCache.isDebug){
            YxLogger.debug(tag, 'getInterfaceCache', "在缓存有效期时间内"
                + ":缓存过期时间:" + beforDayjs.format("YYYY-MM-DD HH:mm:ss")
                + ",当前时间:" + dayjs().format("YYYY-MM-DD HH:mm:ss"))
        }
        return valueJson.data
      }
    }catch (err){
      YxLogger.error(tag, 'getInterfaceCache', "keys:" + JSON.stringify(keys)  + "=>"+ err.name + err.message)
      return ""
    }
  },
  /**
   *   当前接口是不是缓存接口
   * @param action
   */
  isCacheInterface:(action)=>{
    if(action.indexOf(YxCache.CACHE_NAME) == -1) {
      return false
    }
    return true
  },
  
  /**
   *   设置平台
   * **/
  setPlatform:(platform)=>{
    YxCache.platform = platform
  }
  
  
  
}


export default YxCache