import user from '@/store/modules/user.js'
import vuexMusic from '@/store/modules/music.js'
import tabbar from '@/store/modules/tabbar.js'

// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// const Logger = Vuex.createLogger()
const store = new Vuex.Store({
	modules: {
		user,
		vuexMusic,
		tabbar
	},
	strict: true
	// plugins: debug ? [Logger()] : []
})
// #endif

// #ifdef VUE3
import {createStore} from 'vuex'
const store = createStore({
	modules: {
		user,
		vuexMusic,
		tabbar
	}
	// strict: debug,
	// plugins: debug ? [Logger()] : []
})
// #endif

export default store