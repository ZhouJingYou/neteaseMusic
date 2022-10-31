import App from './App'
import Vue from 'vue'
import * as api from './common/api.js'

Vue.config.productionTip = false
Vue.prototype.$api = api

App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
