# 网络模块

* 调用方法，第一次调用的地方需要调用init方法和setUrl方法

        YxNet.netReq('get', 'fkc/product/product_category_list_cache_time_20',{shop:1}).then((res)=>{
                //console.log(res)
            }).catch((err)=>{
                //console.log(err)
            })
            
 * 参数设置
 
      1. 设置url
      
        YxNet.setUrl("http://192.168.1.198:8000/")
        
      2. 设置token
      
        YxNet.setHeaderToken("aa")
        
      3. 初始化平台
      
         YxNet.init(YxNet.PLATFORM_WX)
         
      4. 设置header
        
        YxNet.setHeader()
        
* 关于接口缓存

    1. action定义  action_cache_time_20,必须包含了"_cache_"
       的才能为是缓存接口，time_后面的整数指定了缓存时间
       
    2. 接口逻辑是接口调用的时候先判断是否有缓存，有从缓存获取，没有
       则从接口获取