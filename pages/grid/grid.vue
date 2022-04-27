<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<status-bar />
		<!-- #endif -->
		
		<!-- banner -->
		<unicloud-db ref="bannerdb" v-slot:default="{data, loading, error, options}" collection="opendb-banner"
			field="_id,bannerfile,open_url,title" @load="onqueryload">
			<!-- 当无banner数据时显示占位图 -->
			<image v-if="!(loading||data.length)" class="banner-image" src="/static/grid/empty.png" mode="aspectFill" :draggable="false" />
			<uni-swiper-dot v-else class="uni-swiper-dot-box" @clickItem="clickItem" :info="data" mode="round"
				:current="current" field="content">
				<swiper class="swiper-box" @change="changeSwiper" :current="swiperDotIndex">
					<swiper-item v-for="(item, index) in data" :key="item._id">
						<view class="swiper-item" @click="clickBannerItem(item)">
							<image class="banner-image" :src="item.bannerfile.url" mode="aspectFill" :draggable="false" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</unicloud-db>
		
		
	<!-- 宫格 -->
		<uni-section :title="$t('grid.grid')" style="margin: 0;" type="line"></uni-section>
		<view class="example-body">
			<!-- @change="change" -->
			<uni-grid :column="3" :highlight="true" @change="change">
				<template v-for="(item,i) in gridList">
					<!-- v-if="i<3 || i>2&&i<6&&hasLogin || i>5&&uniIDHasRole('admin')" -->
					<uni-grid-item :index="i" :key="i">
						<view class="grid-item-box" style="background-color: #fff;padding:0">
							<image :src="item.url" mode="aspectFill" style="width: 100%; height: 100%;" />
							<!-- <text class="text">{{item.visibleToAll}}</text> -->
							<!-- <image :src="'/static/grid/c'+(i+1)+'.png'" class="image" mode="aspectFill" />
							<text class="text">{{item}}</text> -->
						</view>
					</uni-grid-item>
				</template>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
	} from 'vuex';
	import statusBar from "@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar";
	export default {
		components: {
			statusBar
		},
		data() {
			return {
				//宫格的数据源
				gridList: [],
				//轮转图索引从0开始
				current: 0,
				//
				swiperDotIndex: 0
			}
		},
		computed: {
			//公共变量 用户是否登录，存放在vuex中
			...mapGetters({
				hasLogin: 'user/hasLogin'
			})
		},
		//初始化，页面加载时，还未渲染时
		onLoad() {
			let gridList = []
			let url = [
				'http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2022/04/18/1ZrfQka3q0h-589th.jpg',
				'http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2022/04/18/zFmsqn钱润玉图1.webp',
				'http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2022/04/18/OOXB9X007IlaJNly1gz6iax5lz3j30u0140483.jpeg',
				// 'http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2022/04/18/EzjmUY007IlaJNly1h02m7s9rmaj30u0190thx.jpeg',
				'http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2022/04/18/tDWflc007IlaJNly1h1179sybbpj31uo18gkc9.jpeg',
				'http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2022/04/18/7tDaVM007IlaJNly1h1179tfrhvj318g1uo1kx.jpeg',
				'http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2022/04/18/sAqwvN007IlaJNly1h02m7v2nibj31900u0wlt.jpeg',
				'http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2022/04/25/RJ5OQv尴尬而不是礼貌的微笑.png',
				'http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2022/04/25/0cezZy高马尾.png',
				'http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2022/04/25/8tvT6R与昂贵的麦合影.png'
			]
			for (var i = 0; i < url.length; i++) {
				gridList.push({ 
					// visibleToAll:this.$t('grid.visibleToAll'),
					url:url[i]
				})
			}
			// for (var i = 0; i < 3; i++) {
			// 	gridList.push( this.$t('grid.invisibleToTourists') )
			// }
			// for (var i = 0; i < 3; i++) {
			// 	gridList.push( this.$t('grid.adminVisible') )
			// }
			this.gridList = gridList
		},
		methods: {
			//放大
			previewImage(e) {
				uni.previewImage({
					current:e.url,
					urls:[e.url],
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			//宫格图点击图片进行放大
			change(e) {
				// uni.showToast({
				// 	title:this.$t('grid.clickTip') + " " + `${e.detail.index}` + " " + this.$t('grid.clickTipGrid'),
				// 	icon: 'none'
				// })
				let item = this.gridList[e.detail.index]
				this.previewImage(item)
				// uni.previewImage({
				// 	current:item.url,
				// 	urls:[item.url],
				// 	success: (res) => {
				// 		console.log("图片放大成功", res.errMsg)
				// 	},
				// 	fail: (err) => {
				// 		console.log("图片放大失败", err)
				// 	}
				// })
			},
			/**
			 * banner加载后触发的回调
			 */
			onqueryload(data) {
			},
			//banner轮转获取current
			changeSwiper(e) {
				this.current = e.detail.current
			},
			//点击获取	？？？
			clickItem(e) {
				this.swiperDotIndex = e
			},
			/**
			 * 点击banner的处理
			 */
			clickBannerItem(item) {
				// 有外部链接-跳转url
				if (item.open_url) {
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=' + item.open_url + '&title=' + item.title,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
				// 其余业务处理
			}
			
		}
	}
</script>

<style>
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff;
		min-height: 100%;
		height: auto;
	}
	view {
		font-size: 14px;
		line-height: inherit;
	}
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
	/* #endif */

	/* #ifdef APP-NVUE */
	.warp {
		background-color: #fff;
	}
	/* #endif */

	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.image {
		width: 50rpx;
		height: 50rpx;
	}

	.text {
		text-align: center;
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.banner-image {
		width: 750rpx;
		height: 400rpx;
	}

	.swiper-box {
		height: 400rpx;
	}

	.search-icons {
		padding: 16rpx;
	}

	.search-container-bar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #fff;
	}

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
</style>
