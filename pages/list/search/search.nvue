<template>
	<view class="container">
		<view class="search-container">
			<!-- 搜索框 -->
			<view class="search-container-bar">
				<!-- #ifdef APP-PLUS -->
				<uni-icons class="search-icons" :color="iconColor" size="22" type="mic-filled" @click="speech" />
				<!-- #endif -->
				<!-- :cancelText="keyBoardPopup ? '取消' : '搜索'" -->
				<uni-search-bar ref="searchBar" style="flex:1;" radius="100" v-model="searchText" :focus="focus" :placeholder="hotWorld"
				 clearButton="auto" cancelButton="always" @clear="clear" @confirm="confirm" @cancel="cancel" />
			</view>
		</view>
		<view class="search-body">
			<!-- 搜索历史 -->
			<view class="word-container" v-if="localSearchList.length">
				<view class="word-container_header">
					<text class="word-container_header-text">搜索历史</text>
					<uni-icons v-if="!localSearchListDel" @click="localSearchListDel = true" class="search-icons" style="padding-right: 0;"
					 :color="iconColor" size="18" type="trash"></uni-icons>
					<view v-else class="flex-center flex-row" style="font-weight: 500;justify-content: space-between;">
						<text style="font-size: 22rpx;color: #666;padding-top:4rpx;padding-bottom:4rpx;padding-right:20rpx;" @click="LocalSearchListClear">全部删除</text>
						<text style="font-size: 22rpx;color: #c0402b;padding-top:4rpx;padding-bottom:4rpx;padding-left:20rpx;" @click="localSearchListDel = false">完成</text>
					</view>
				</view>
	
				<view class="word-container_body">
					<view class="flex-center flex-row word-container_body-text" v-for="(word,index) in localSearchList" :key="index"
					 @click="LocalSearchlistItemClick(word,index)">
						<text class="word-display" :key="word">{{word}}</text>
						<uni-icons v-if="localSearchListDel" size="12" type="closeempty" />
					</view>
				</view>
			</view>
			<!-- 搜索发现 -->
			<view class="word-container">
				<view class="word-container_header">
					<view class="flex-center flex-row">
						<text class="word-container_header-text">搜索发现</text>
						<uni-icons v-if="!netHotListIsHide" class="search-icons" :color="iconColor" size="14" type="reload" @click="searchHotRefresh"></uni-icons>
					</view>
					<uni-icons class="search-icons" style="padding-right: 0;" :color="iconColor" size="18" :type="netHotListIsHide ? 'eye-slash' : 'eye'"
					 @click="netHotListIsHide = !netHotListIsHide"></uni-icons>
				</view>
	
				<unicloud-db ref="udb" #default="{data, loading, error, options}" field="content" collection="opendb-search-hot"
				 orderby="create_date desc,count desc" page-data="replace" :page-size="10">
					<text v-if="loading && !netHotListIsHide" class="word-container_body-info">正在加载...</text>
					<view v-else class="word-container_body">
						<template v-if="!netHotListIsHide">
							<text v-if="error" class="word-container_body-info">{{error.message}}</text>
							<template v-else>
								<text v-for="(word,index) in data" class="word-container_body-text" :key="index" @click="search(word.content)">{{word.content}}</text>
							</template>
						</template>
						<view v-else style="flex:1;">
							<text class="word-container_body-info">当前搜索发现已隐藏</text>
						</view>
					</view>
				</unicloud-db>
			</view>
		</view>
		<!-- 搜索联想 -->
		<view class="search-associative" v-if="associativeShow">
			<uni-list>
				<uni-list-item  v-for="(item,index) in associativeList" :key="item._id" :ellipsis="1" :title="item.name" @click="associativeClick(item)" show-extra-icon
				 clickable :extra-icon="{size:18,color:iconColor,type:'search'}" >
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	/**
	 * 云端一体搜索模板
	 * @description uniCloud云端一体搜索模板，自带下拉候选、历史搜索、热搜。无需再开发服务器代码
	 */
	const searchLogDbName = 'opendb-search-log'; // 搜索记录数据库
	const mallGoodsDbName = 'opendb-news-articles'; // 文章数据库
	const associativeSearchField = 'title'; // 联想时，搜索框值检索数据库字段名
	const associativeField = '_id,title'; // 联想列表每一项携带的字段
	const localSearchListKey = '__local_search_history'; //	本地历史存储字段名

	// 数组去重
	const arrUnique = arr => {
		for (let i = arr.length - 1; i >= 0; i--) {
			const curIndex = arr.indexOf(arr[i]);
			const lastIndex = arr.lastIndexOf(arr[i])
			curIndex != lastIndex && arr.splice(lastIndex, 1)
		}
		return arr
	} // 节流
	// 防抖
	function debounce(fn, interval, isFirstAutoRun) {
		/**
		 * 
		 * @param {要执行的函数} fn 
		 * @param {在操作多长时间后可再执行，第一次立即执行} interval 
		 */
		var _self = fn;
		var timer = null;
		var first = true;

		if (isFirstAutoRun) {
			_self();
		}

		return function() {
			var args = arguments;
			var _me = this;
			if (first) {
				first = false;
				_self.apply(_me, args);
			}

			if (timer) {
				clearTimeout(timer)
				// return false;
			}

			timer = setTimeout(function() {
				clearTimeout(timer);
				timer = null;
				_self.apply(_me, args);
			}, interval || 200);
		}
	}

	export default {
		data() {
			return {
				mallGoodsDbName,
				searchLogDbName,
				statusBarHeight:'0px',
				//获取缓存记录
				localSearchList: uni.getStorageSync(localSearchListKey),
				localSearchListDel: false,
				netHotListIsHide: false,
				searchText: '',
				iconColor: '#999999',
				associativeList: [],
				keyBoardPopup: false,
				hotWorld: '钱润玉', //	搜索热词，如果没有输入即回车，则搜索热词，但是不会加入搜索记录
				focus: true, //	是否自动聚焦
				speechEngine: 'iFly' //	语音识别引擎 iFly 讯飞 baidu 百度
			}
		},
		created() {
			//实例创建，但未渲染时
			//连接云端数据库
			this.db = uniCloud.database();
			//连接数据库表
			this.searchLogDb = this.db.collection(this.searchLogDbName);
			this.mallGoodsDb = this.db.collection(this.mallGoodsDbName);
			// #ifndef H5
			uni.onKeyboardHeightChange((res) => {
				this.keyBoardPopup = res.height !== 0;
			})
			// #endif

			this.searchText = getApp().globalData.searchText;
		},
		computed: {
			associativeShow() {
				return this.searchText && this.associativeList.length;
			}
		},
		onLoad() {
			//#ifdef APP-PLUS
			this.statusBarHeight = `${uni.getSystemInfoSync().statusBarHeight}px`;
			//#endif
		},
		methods: {
			clear(res) {
				console.log("res: ", res);
			},
			confirm(res) {
				// 键盘确认
				this.search(res.value);
			},
			cancel(res) {
				uni.hideKeyboard();
				this.searchText = '';
				this.loadList();
			},
			//搜索框输入后，调用的方法
			search(value) {
				//如果没有值，连默认值都没有，那就直接返回无法搜索
				if (!value && !this.hotWorld) {
					return;
				}
				//将搜索内容存放到data中的searchText字段中
				if (value) {
					//填了数值，执行如下方法
					if (this.searchText !== value) {
						this.searchText = value
					}
					
					this.localSearchListManage(value);

					this.searchLogDbAdd(value)
				} else if (this.hotWorld) {
					//如果每填，但有热点词汇
					this.searchText = this.hotWorld
				}

				uni.hideKeyboard();
				this.loadList(this.searchText);
			},
			//将搜索记录存到本地缓存中
			localSearchListManage(word) {
				//获取本地搜索缓存
				let list = uni.getStorageSync(localSearchListKey);
				if (list.length) {
					//将缓存记录从头部插入数组
					this.localSearchList.unshift(word);
					//去除重复的搜索记录
					arrUnique(this.localSearchList);
					//如果总记录数大于10，去掉最后面的搜索记录
					if (this.localSearchList.length > 10) {
						//去除数组尾部的数据
						this.localSearchList.pop();
					}
				} else {
					//如果没有获取到缓存，则直接添加记录到组件实例中的localSearchList字段中
					this.localSearchList = [word];
				}
				//将搜索记录存放到本地缓存中
				uni.setStorageSync(localSearchListKey, this.localSearchList);
			},
			LocalSearchListClear() {
				uni.showModal({
					content: "确认清空搜索历史吗",
					confirmText: "删除",
					confirmColor: 'red',
					cancelColor: '#808080',
					success: res => {
						if (res.confirm) {
							this.localSearchListDel = false;
							this.localSearchList = [];
							uni.removeStorageSync(localSearchListKey)
						}
					}
				});
			},
			LocalSearchlistItemClick(word, index) {
				if (this.localSearchListDel) {
					this.localSearchList.splice(index, 1);
					uni.setStorageSync(localSearchListKey, this.localSearchList);
					if (!this.localSearchList.length) {
						this.localSearchListDel = false;
					}
					return;
				}
				this.search(word);
			},
			searchHotRefresh() {
				this.$refs.udb.refresh();
			},
			speech() {
				// #ifdef APP-PLUS
				plus.speech.startRecognize({
					engine: this.speechEngine,
					punctuation: false, // 标点符号 
					timeout: 10000
				}, word => {
					word = word instanceof Array ? word[0] : word;
					this.search(word)
				}, err => {
					console.error("语音识别错误: ", err);
				});
				// #endif
			},
			searchLogDbAdd(value) {
				/*
					在此处存搜索记录，如果登录则需要存 user_id，若未登录则存device_id
				 */
				//回调函数
				this.getDeviceId().then(device_id => {
					this.searchLogDb.add({
						// user_id: device_id,
						device_id,
						content: value,
						create_date: Date.now()
					})
				})
			},
			//获取设备id
			getDeviceId() {
				//返回一个promise对象，用来进行回调
				return new Promise((resolve, reject) => {
					//获取缓存中的用户信息id
					const uniId = uni.getStorageSync('uni_id');
					if (!uniId) {
						//如果没有，判断是移动端还是pc端
						// #ifdef APP-PLUS
						//如果移动端，则获取手机设备的信息
						plus.device.getInfo({
							success: (deviceInfo) => {
								//获取成功，获取uuid
								resolve(deviceInfo.uuid)
							},
							fail: () => {
								//获取失败，则取操作系统+随机数
								resolve(uni.getSystemInfoSync().system + '_' + Math.random().toString(36).substr(2))
							}
						});
						// #endif
						// #ifndef APP-PLUS
						//不是移动端则获取操作系统+随机数
						resolve(uni.getSystemInfoSync().system + '_' + Math.random().toString(36).substr(2))
						// #endif
					} else {
						//如果有，则返回
						resolve(uniId)
					}
				})
			},
			associativeClick(item) {
				/**
				 * 注意：这里用户根据自己的业务需要，选择跳转的页面即可
				 */
				console.log("associativeClick: ", item);
				this.loadList(item.title);
			},
			//当在搜索框中填写后，键盘按确认后，跳转到list页面
			loadList(text = '') {
				//将你输入的搜索内容存到vue实例中globalData里的searchText中，使内容可以到任何页面中获取到
				getApp().globalData.searchText = text;
				//跳转到tabbar页面
				uni.switchTab({
					url:'/pages/list/list'
				})
			},
			backPage(){
				uni.navigateBack();
			}
		},
		
		watch: {
			searchText: debounce(function(value) {
				if (value) {
					this.mallGoodsDb.where({
						[associativeSearchField]: new RegExp(value, 'gi'),
					}).field(associativeField).get().then(res => {
						this.associativeList = res.result.data;
					})
				} else {
					this.associativeList.length = 0;
					getApp().globalData.searchText = '';
				}
			}, 100)
		}
	}
</script>

<style>
	/* #ifndef APP-NVUE */
	page {
		height: 100%;
		flex: 1;
	}
	/* #endif */
</style>

<style lang="scss" scoped>
	$search-bar-height:52px;
	$word-container_header-height:72rpx;
	.status-bar{
		background-color: #fff;
	}
	.container {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		flex: 1;
		background-color: #f7f7f7;
	}

	.search-body {
		background-color: #fff;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
	}

	@mixin uni-flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
	}

	@mixin words-display {
		font-size: 26rpx;
		color: #666;
	}

	.flex-center {
		@include uni-flex;
		justify-content: center;
		align-items: center;
	}

	.flex-row {
		@include uni-flex;
		flex-direction: row;
	}

	/* #ifdef APP-PLUS */
	/* #ifndef APP-NVUE  || VUE3*/
	/deep/
	/* #endif */
	.uni-searchbar {
		padding-left: 0;
	}

	/* #endif */

	/* #ifndef APP-NVUE || VUE3*/
	/deep/
	/* #endif */
	.uni-searchbar__box {
		border-width: 0;
	}

	/* #ifndef APP-NVUE || VUE3 */
	/deep/
	/* #endif */
	.uni-input-placeholder {
		font-size: 28rpx;
	}

	.search-container {
		height: $search-bar-height;
		@include uni-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		background-color: #fff;

		@at-root {
			#{&}-bar {
				@include uni-flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
			}
		}
	}

	.search-associative {
		/* #ifndef APP-NVUE */
		overflow-y: auto;
		/* #endif */
		position: absolute;
		top: $search-bar-height;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		margin-top: 10rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}

	.search-icons {
		padding: 16rpx;
	}

	.word-display {
		@include words-display;
	}

	.word-container {
		padding: 20rpx;

		@at-root {
			#{&}_header {
				@include uni-flex;
				height: $word-container_header-height;
				line-height: $word-container_header-height;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				@at-root {
					#{&}-text {
						color: #3e3e3e;
						font-size: 30rpx;
						font-weight: bold;
					}
				}
			}

			#{&}_body {
				@include uni-flex;
				flex-wrap: wrap;
				flex-direction: row;

				@at-root {
					#{&}-text {
						@include uni-flex;
						@include words-display;
						justify-content: center;
						align-items: center;
						background-color: #f6f6f6;
						padding: 10rpx 20rpx;
						margin: 20rpx 30rpx 0 0;
						border-radius: 30rpx;
						/* #ifndef APP-NVUE */
						box-sizing: border-box;
						/* #endif */
						text-align: center;
					}

					#{&}-info {
						/* #ifndef APP-NVUE */
						display: block;
						/* #endif */
						flex: 1;
						text-align: center;
						font-size: 26rpx;
						color: #808080;
						margin-top: 20rpx;
					}
				}
			}
		}
	}
</style>
