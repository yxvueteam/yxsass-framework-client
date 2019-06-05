import YxLogger from 'yx-logger'

var Fly = require("flyio/dist/npm/wx"); //微信小程序、头条小程序、百度小程序
if (mpvuePlatform === 'my') { //蚂蚁小程序
  Fly = require("flyio/dist/npm/ap");
}
var fly = new Fly
fly.config.timeout= 30000;

const Tag = 'NetUtils'

/**
 * 请求拦截
 */
fly.interceptors.request.use((request)=>{
  //给所有请求添加自定义header
  //request.headers["Content-Type"] = 'application/json'
  //request.headers["zytoken"]= JSON.stringify(store.getters.getToken);
  //request.baseURL = store.state.shopConfig.baseURL;
  
  YxLogger.warn(Tag,"interceptors","url:" + request.url)
  YxLogger.warn(Tag,"interceptors", JSON.stringify(request.headers))
  YxLogger.warn(Tag,"interceptors", JSON.stringify(request.body))
  
  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
})



//添加响应拦截器，响应拦截器会在then/catch处理之前执行
/**
 * {
  message:"Not Find 404", //错误消息
  status:404, //如果服务器可通，则为http请求状态码。网络异常时为0，网络超时为1
  request:{...}, //对应的请求信息
  response:{}, //响应信息
  engine:{}//请求使用的http engine(见下面文档),浏览器中为本次请求的XMLHttpRequest对象
}
 */
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    YxLogger.debug('请求成功:' + response.request.url,JSON.stringify(response.data))
    //return response.data
    if (mpvuePlatform === 'my') { //蚂蚁小程序
      try{
        return JSON.parse(response.data)
      }catch (err){
        YxLogger.error(Tag, 'response', err.name, err.message)
        return null;
      }
    } else { //微信小程序、头条小程序、百度小程序
      return response.data
    }
  },
  (err) => {
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
      errInfo.returnMsg = '业务请求错误'
      errInfo.desc = JSON.stringify(err.response.data)
    }
    return errInfo;
  }
)



export default fly
