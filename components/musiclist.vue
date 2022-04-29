<template>
	<view class="mulist">
		<view class="nav" v-if="isNav">
			<text class="l">{{title}}</text>
			<text class="r">{{more}}</text>
		</view>
		<view class="item" v-for="(val,index) in list" :key="index">
			<view class="flex-item index-item" style="width: 60rpx;">
				{{index+1}}
			</view>
			<view class="text ellipsis flex-box">
				<text class="name ellipsis">{{val.song_name}}</text>
			</view>
			<view class="play-btn flex-item" @click="play(index, val)">
				<view v-if="(playdetail.id==val._id && isplayingmusic==true)" class="iconfont">&#xe76a;</view>
				<view v-else class="iconfont">&#xe638;</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import Vue from 'vue'
	let update = true;
	export default {
		data() {
			return {
				// isPlay: false,
			}
		},
		props: {
			title: {
				type: String,
				default: '歌曲推荐'
			},
			more: {
				type: String,
				default: '更多推荐'
			},
			list: {
				// type:Array,
				default: []
			},
			isNav: {
				type: Boolean,
				default: true
			},
			cover: {
				type: String,
				default: ''
			}

		},
		computed: {
			...mapGetters('vuexMusic', ['audiolist', 'playdetail', 'isplayingmusic'])
		},
		methods: {
			...mapMutations('vuexMusic', ['setAudiolist','setPlaydetail', 'setIsplayingmusic', 'setIsplayactive']),
			// toPlayer(ele) {
			// 	uni.navigateTo({
					// animationDuration:500,
					// animationType:'fade-in',
			// 		url: '/pages/music/music-detail/palyer?id=' + ele.id + '&index=' + ele.index + '&list=' +
			// 			encodeURIComponent(JSON.stringify(ele.list))
			// 	})
			// },
			play(index, item) {
				console.log("musicList-play", item)
				//添加当前音乐列表
				this.setAudiolist(this.list)
				//如果不是同一首歌，则重置
				if (this.$bgAudioManager.src !== item.song) {
					this.$bgAudioManager.url = item.song;
					this.$bgAudioManager.title = item.song_name;
					this.$bgAudioManager.coverImgUrl = item.song_cover;
					this.$bgAudioManager.singer = item.singer;
					//h5
					this.$bgAudioManager.autoplay = true;
					//app
					this.$bgAudioManager.src = item.song;
					
					this.setPlaydetail({
						id: item._id,
						pic: item.song_cover
					})
					this.setIsplayingmusic(false)
				}
				if (this.isplayingmusic) {
					this.$bgAudioManager.pause()
					this.setIsplayingmusic(false)
				} else {
					this.$bgAudioManager.play()
					this.setIsplayingmusic(true)
				}
				// this.isPlay = !this.isPlay;
				
			}
		}
	}
</script>

<style lang="scss">
	.mulist {
		padding: 0 30rpx;

		.nav {
			height: 110rpx;
			font-size: 34rpx;
			display: flex;
			padding: 30rpx 0;

			.l {
				width: 100%;
				font-weight: 600;
			}

			.r {
				flex-shrink: 0;
				padding: 0rpx 25rpx;
				height: 50rpx;
				line-height: 50rpx;
				font-size: 24rpx;
				border: 2rpx solid #e6e6e6;
				border-radius: 50rpx;
			}
		}

		.item {
			display: flex;
			align-items: center;
			margin-bottom: 15rpx;

			.img {
				height: 100rpx;
				width: 100rpx;
				border-radius: 18rpx;
			}

			.index-item {
				font-size: 34rpx;
			}

			.text {
				flex: 1;
				margin-left: 20rpx;
				;

				text {
					display: block;
				}

				.name {
					font-size: 32rpx;
					overflow: hidden;
				}

				.ar {
					font-size: 24rpx;
					overflow: hidden;

					.point {
						font-size: 40rpx;
					}
				}
			}

			.item-icon {
				margin: 0 6rpx;
			}

			.cuIcon-right {
				margin: 10rpx 6rpx;
				font-size: 34rpx;
				// color: #E7EBED;
				width: 68rpx;
				// height: 80rpx;
			}

			.play-btn {
				position: relative;
				margin: 10rpx 6rpx;
				font-size: 34rpx;

				// width: 0rpx;
				.iconfont {
					font-size: 10rpx;
					// width: 68rpx;

				}

				&::before {
					content: '';
					display: block;
					position: absolute;
					top: 50%;
					left: 50%;
					border: 2rpx solid #000000;
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					transform: translateX(-50%) translateY(-50%);
				}
			}
		}
	}
</style>
