import Vue from 'vue'
import App from './App'
import storage from '@/utils/storage.js'
import toast from '@/utils/toast.js'
import loading from '@/utils/loading.js'
import request from '@/rest/simple.js'
import uma from 'umtrack-wx'

uma.init({
  appKey: '61cabb8ce0f9bb492bafae0f', //由友盟分配的APP_KEY
  // 使用Openid进行统计，此项为false时将使用友盟+uuid进行用户统计。
  // 使用Openid来统计微信小程序的用户，会使统计的指标更为准确，对系统准确性要求高的应用推荐使用Openid。
  useOpenid: false,
  // 使用openid进行统计时，是否授权友盟自动获取Openid，
  // 如若需要，请到友盟后台"设置管理-应用信息"(https://mp.umeng.com/setting/appset)中设置appId及secret
  autoGetOpenid: false,
  debug: true, //是否打开调试模式
  uploadUserInfo: false, // 自动上传用户信息，设为false取消上传，默认为false
})

// 此处用来挂载入uma到组件实例上，方便组件内使用this.$uma
uma.install = function (Vue) {
  Vue.prototype.$uma = uma
}

Vue.use(uma)
Vue.config.productionTip = false
Vue.prototype.$storage = storage
Vue.prototype.$request = request
Vue.prototype.$toast = toast
Vue.prototype.$loading = loading

import '@/static/css/common.scss'

App.mpType = 'app'

const app = new Vue({
  ...App,
})
app.$mount()
