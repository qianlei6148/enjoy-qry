const state = {
	active: 'home',
	animate: 'bounce',
	tabbars: [{
			name: 'home',
			text: '首页',
			icon: '/static/tabbar/main.svg',
			// dot: true,
			path: '/pages/grid/grid'
		},
		{
			name: 'list',
			text: '列表',
			icon: '/static/tabbar/dashboard.svg',
			path: '/pages/list/list'
		},
		// {
		// 	name: 'plus',
		// 	text: '发布',
		// 	icon: 'plus',
		// 	raisede: true
		// },
		{
			name: 'music',
			text: '音乐',
			icon: '/static/tabbar/music.svg',
			// info: 99,
			path: '/pages/music/music'
		},
		{
			name: 'mine',
			text: '我的',
			icon: '/static/tabbar/user.svg',
			path: '/pages/ucenter/ucenter'
		}
	]
}

const getters = {
	active: state => state.active,
	animate: state => state.animate,
	tabbars: state => state.tabbars
}

const mutations = {
	SET_ACTIVE(state, data) {
		state.active = data
	},
	SET_TABBARS(state, data) {
		state.tabbars = data
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations
}
