import Vue from 'vue'
const state = {
	//是否正在播放
	isplayingmusic: false,
	//是否打开迷你播放器
	isplayactive: false,
	//当前播放的歌曲
	playdetail: '',
	//播放列表
	audiolist: [],
	//播放器
	bgAudioManager: '',
	//定时时间,用于背景音频播放进度更新事件目前没用）
	timer: null
}
const getters = {
	isplayingmusic(state) {
		return state.isplayingmusic
	},
	isplayactive(state) {
		return state.isplayactive
	},
	playdetail(state) {
		return state.playdetail;
	},
	audiolist(state) {
		return state.audiolist
	},
	bgAudioManager(state) {
		return state.bgAudioManager
	},
	timer(state) {
		return state.timer
	}
}
//mutation 直接修改state中的属性
const mutations = {
	setIsplayingmusic(state, param) {
		state.isplayingmusic = param
	},
	setIsplayactive(state, param) {
		state.isplayactive = param
	},
	setPlaydetail(state, param) {
		state.playdetail = param
	},
	setAudiolist(state, param) {
		state.audiolist = param
	},
	//播放器初始化
	setInitBgAudioManager(state, param) {
		//音乐播放器
		let audioPlayer = null;
		// #ifdef H5
		audioPlayer = uni.createInnerAudioContext() //H5 则注册一个音乐组件
		// #endif
		// #ifdef APP-PLUS
		audioPlayer = uni.getBackgroundAudioManager() //app,则注册一个背景音乐组件，当切后台后仍会播放音乐
		// #endif
		state.bgAudioManager = audioPlayer
		state.bgAudioManager.onPlay(() => {
			console.log('playing')
			Vue.prototype.cusPlay && Vue.prototype.cusPlay()
			clearInterval(state.timer)
			console.log(Vue.$store)
			console.log(this)
			this.commit('vuexMusic/setTimer', param)
		})
		// Vue.prototype.$bgAudioManager.onTimeUpdate(()=>{
		// 	console.log('update')
		// 	Vue.prototype.cusTimeUpdate && Vue.prototype.cusTimeUpdate()
		// })
		state.bgAudioManager.onEnded(() => {
			Vue.prototype.cusEnded && Vue.prototype.cusEnded()
			clearInterval(state.timer)
		})
		state.bgAudioManager.onError((err) => {
			console.log('play err:' + err)
			this.commit('vuexMusic/setIsplayactive', false)
			clearInterval(state.timer)
		})
		state.bgAudioManager.onStop((res) => {
			console.log('play stop:' + res)
			this.commit('vuexMusic/setIsplayactive', false)
			clearInterval(state.timer)
		})
	},
	//播放器参数赋值
	setBgAudioManager(state, param) {
		state.bgAudioManager.url = param.song;
		state.bgAudioManager.title = param.song_name;
		state.bgAudioManager.coverImgUrl = param.song_cover;
		state.bgAudioManager.singer = param.singer;
		//h5
		state.bgAudioManager.autoplay = true;
		//app
		state.bgAudioManager.src = param.song;
	},
	setTimer(state, param) {
		state.timer = setInterval(() => { //安卓和ios app 下onTimeUpdate事件在替换资源和seek之后不会触发，这里做手动触发
			console.log('update')
			Vue.prototype.cusTimeUpdate()
		}, 200)
	},
	playAudio(state, param) {
		let playPromise = state.bgAudioManager.play()
		if (playPromise !== undefined) {
			playPromise.then(() => {
				state.bgAudioManager.play()
			}).catch(() => {

			})
		}
		// state.bgAudioManager.play()
	},
	pauseAudio(state, param) {
		state.bgAudioManager.pause()
	},
	stopAudio(state, param) {
		state.bgAudioManager.stop()
	}

}
const actions = {
	isplayingmusicAction(context, param) {
		//调用mutations中的方法，来修改state中的
		context.commit('setIsplayingmusic', param)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
