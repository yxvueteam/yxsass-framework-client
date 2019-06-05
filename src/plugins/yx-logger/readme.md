# 日志系统

* 调用方法

    1. debug:(obj, funcName, info)
    2. info:(obj, funcName, info)
    3. warn:(obj, funcName, info)
    4. error:(obj, funcName, info)
    参数说明：
        obj: 一般是this对象，只有page和组件有效，如果是在js中，需要自己输入类名
            页面显示页面路径：pages/plugins/yxlogger/main
            组件显示页面路径下的组件名
        funcName： 函数名
        info: 日志内容
    
    输出效果：
         2019-06-03 11:02:41 pages/plugins/yxlogger/main onLoad info 

* 配置参数，头提供对应的set方法

    isLogger：Boolean值 是否输出日志
    
    level：日志等级，提供4个等级   
    
        LOGGER_DEBUG:'debug'： 所有日志都输出
        LOGGER_INFO:'info', ： info，warn,error日志输出
        LOGGER_WARN:'warn', ： warn,error日志输出
        LOGGER_ERROR:'error'： error日志输出
            
    outputWay： 输出方式
    
        OUTPUT_WAY_CACHE:'cache', ： 输出到缓存，有个最大条数控制，
            maxLogCacheCount超过这个控制后就会保存缓存，并覆盖上次的缓存。
        OUTPUT_WAY_CONSOLE:'console',输出到控制台
        OUTPUT_WAY_SERVER:'server',：输出到服务器
    
    url： 输出到服务器时指定的url，待实现
    
    platform： 当前日志输出平台
    
          PLATFORM_WX:'wx', //微信
          PLATFORM_TT:'tt', //头条
          PLATFORM_MY:'my', //蚂蚁
          PLATFORM_WEEX:'weex', //week
          PLATFORM_SWAN:'swan', //百度智能小程序
          
* 提供方法
    
        setIsLogger:(isLogger) ：设置是否打印日志
        setLevel:(level) ： 设置日志输出等级
        setOutputWay:(output)： 设置日志输出方式
        setUrl:(url)： 设置日志输出地址
        setPlatform:(platform)： 设置日志输出平台
        setMaxLogCacheCount:(maxLogCacheCount)： 设置日志输入超过多少条后会存入缓存
        getCache:(callback)： 获得缓存里面的内容，
            调用方法：
            YxLogger.getCache((res)=>{
                console.log(res)
            })
            
* 关于缓存的输出方式：

    1. 设置输出为缓存时，默认需要调用setMaxLogCacheCount设置输入日志达到多少条以后写入缓存
    
    2. 如果不设置，默认1000条
    
    3. 应用程序退出以及异常的时候，需要保存当前缓存
    
    4. 遗留个问题就是退出了在进来，缓存继承问题，待后续讨论
    
* 自定义异常

        try{
            throw new YxLogger.except(this, 'testException', '自定义异常', '异常信息')
        }catch (err){
            console.log("name:" + err.name + ",info:" + err.message)
        }
        