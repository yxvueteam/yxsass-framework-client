import YxLogger from "yx-logger";
var TAG = 'YxRoute'

var YxRoute = {
	
	isDebug:true,
	
	platform:'wx', //日志输出平台
	
	//平台
	PLATFORM_WX:'wx', //微信
	PLATFORM_TT:'tt', //头条
	PLATFORM_MY:'my', //蚂蚁
	PLATFORM_WEEX:'weex', //week
	PLATFORM_SWAN:'swan', //百度智能小程序
	
	/**
	 *   导航到指定页面
	 * @param url
	 */
	navigateTo:(url)=>{
		mpvue.navigateTo({
			url: url,
			fail(err){
				YxLogger.error(TAG, 'navigateTo', url)
			}
		})
	},
	/**
	 *   返回到指定页面
	 * @param delta： 不指定默认返回上一级
	 */
	navigateBack:(delta)=>{
		var index = 1
		if(delta !== undefined){
			index = delta
		}
		mpvue.navigateBack({
			delta: index
		})
	},
	/**
	 * 关闭所有页面，打开到应用内的某个页面
	 */
	reLaunch:(url)=>{
		mpvue.reLaunch({
			url: url
		})
	},
	
	/**
	 * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
	 */
	redirectTo:(url)=>{
		mpvue.redirectTo({
			url: url
		})
	}
}

export default YxRoute