const state = {
	isplayingmusic: false,
	isplayactive:false,
	playdetail:'',
	audiolist:[],
}
const getters = {
	isplayingmusic(state) {
		return state.isplayingmusic
	},
	isplayactive(state) {
		return state.isplayactive
	},
	playdetail(state){
		return state.playdetail;
	},
	audiolist(state) {
		return state.audiolist
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
	setPlaydetail(state, param){
		state.playdetail = param
	},
	setAudiolist(state, param) {
		state.audiolist = param
	}
}
const actions = {
	isplayingmusicAction(context, param) {
		//调用mutations中的方法，来修改state中的
		context.commit('setIsplayingmusic', param)
	}
}
export default {
	state,
	mutations,
	getters,
	actions
}
