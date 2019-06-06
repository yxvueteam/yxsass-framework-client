import Vue from 'vue'
import App from './App'

import YxConfig from './assets/YxConfig'
Vue.prototype.$config = YxConfig



//import wxUtils from "./utils/wxUtils"
//Vue.prototype.$sys = wxUtils
//
//import logUtils from "./utils/logUtils"
//Vue.prototype.$log = logUtils
//


import store from './store'
Vue.prototype.$store = store

//导入日志模块
//import YxLogger from 'yx-logger'
import YxLogger from './plugins/yx-logger/main'
Vue.prototype.$log = YxLogger

//导入字符操作类
import YxStrUtil from "yx-strutil"
Vue.prototype.$str = YxStrUtil

//导入网络模块
//import YxFly from 'yx-net'
import YxFly from "./plugins/yx-net/main"
YxFly.init(mpvuePlatform)
YxFly.setUrl(YxConfig.url)
Vue.prototype.$net = YxFly

//导入导航模块
//import YxRoute from 'yx-route'
import YxRoute from './plugins/yx-route/main'
Vue.prototype.$route = YxRoute

//导入平台模块
import YxPlatform from './utils/Platform'
Vue.prototype.$sys = YxPlatform
//
import '@/assets/icon_component/iconfont.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
