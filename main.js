import App from './App'
import Vue from 'vue'
import * as api from './common/api.js'
import * as utils from './utils/index.js'
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$utils = utils
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
