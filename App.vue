<script>
	import Vue from 'vue'
	import initApp from '@/common/appInit.js';
	import openApp from '@/common/openApp.js';
	import checkIsAgree from '@/pages/uni-agree/utils/uni-agree.js';
	import {
		mapMutations,
		mapGetters
	} from "vuex"
	export default {
		globalData: {
			searchText: '',
			appVersion: {},
			config: {},
			$i18n: {},
			$t: {}
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			this.globalData.$i18n = this.$i18n
			this.globalData.$t = str => this.$t(str)

			initApp();

			// #ifdef H5
			openApp() //创建在h5端全局悬浮引导用户下载app的功能
			// #endif
			// #ifdef APP-PLUS
			//checkIsAgree(); APP端暂时先用原生默认生成的。目前，自定义方式启动vue界面时，原生层已经请求了部分权限这并不符合国家的法规
			// #endif

			// #ifdef H5
			// checkIsAgree(); // 默认不开启。目前全球，仅欧盟国家有网页端同意隐私权限的需要。如果需要可以自己去掉注视后生效
			// #endif

			// #ifdef APP-PLUS
			//idfa有需要的用户在应用首次启动时自己获取存储到storage中
			//https://ask.dcloud.net.cn/article/36107
			/*if(~plus.storage.getItem('idfa')){
				plus.device.getInfo({//需要勾选IDFA
					success:function(e){  
						console.log('idfa =  '+JSON.stringify(e.idfa));  
					},
					fail:function(e){
						console.log('getDeviceInfo failed: '+JSON.stringify(e));  
					}  
				});
			}*/
			// #endif
			//音乐播放器 
			// let audioPlayer = null;
			// let timer = null;
			// // #ifdef H5
			// audioPlayer = uni.createInnerAudioContext() //H5 则注册一个音乐组件
			// // #endif
			// // #ifdef APP-PLUS
			// audioPlayer = uni.getBackgroundAudioManager() //app,则注册一个背景音乐组件，当切后台后仍会播放音乐
			// // #endif
			//音乐播放器 注册事件函数写在全局或者写在vuex（不然重复绑定，内存泄露）里都行，目前卸载vuex中
			this.setInitBgAudioManager()		
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations('vuexMusic', ['setIsplayactive', 'setInitBgAudioManager','setTimer'])
		},
		computed: {
			...mapGetters('vuexMusic', ['bgAudioManager','timer']),
			name() {
				return this.data
			}
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "./common/css/common.scss";
	@import "./common/css/iconfont.css"
</style>
