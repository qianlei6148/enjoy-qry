<template>
	<view class="container">
		<cu-custom :isBack="true" bgColor="bg-gradual-pink shadow-blur">
			<block slot="content">作品</block>
		</cu-custom>
		<scroll-view scroll-y="true" class="page-content" @scroll="scrollpage" :style="{top:customBar*2+'rpx'}">
			<uni-card :is-shadow="false" is-full>
				<view class="album-top">
					<view class="album-con">
						<view class="flex-box">
							<view class="flex-item"></view>
							<view class="img-info">
								<image class="img" :src="bgimg"></image>
							</view>
							<view class="flex-item"></view>
						</view>
						<view class="album-bot flex-box">
							<view class="flex-item"></view>
							<view class="">
								<view class="txt">{{ albumMsg.album }}</view>
							</view>
							<view class="flex-item"></view>
						</view>
					</view>
				</view>
			</uni-card>
			<uni-section overflow title="歌曲" type="line">
				<!-- <uni-card > -->
				<mu-list :list="targetMuList" :isNav="false" :cover="bgimg"></mu-list>
				<!-- </uni-card> -->
			</uni-section>
		</scroll-view>

	</view>
</template>

<script>
	// 防抖
	function debounce(fn, wait = 10) {
		var timeout = null;
		return function() {
			if (timeout !== null) clearTimeout(timeout);
			timeout = setTimeout(fn, wait);
		}
	}
	var that = null
	import muList from '@/components/musiclist.vue'
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import Vue from 'vue'

	const db = uniCloud.database()
	export default {
		data() {
			return {
				//专辑信息
				albumMsg: [],
				//专辑封面
				bgimg: '',
				playList: [],
				scrollTop: 20,
				scrollY: 0,
				targetMuList: {},
				lyric: []
			};
		},
		components: {
			muList
		},
		computed: {
			...mapGetters(['audiolist', 'playdetail']),
			//歌曲列表，通过专辑信息，实时计算出来
			targetMuLis() {
				if (!this.albumMsg.album) return [];
				const par = {
					album_id: this.albumMsg._id
				};
				const t = this.album.tracks.slice(0, 25);
				return t.map(val => {
					return {
						id: val.id,
						name: val.name,
						picUrl: val.al.picUrl,
						n1: val.ar[0].name,
						n2: val.al.name
					}
				})
			},
			customBar() {
				return this.CustomBar
			}
		},
		created() {
			that = this
		},
		onLoad(options) {
			//页面加载的时候，进行数据加载
			this.getData(options.item);
			this.initPlay(options.item)

		},
		methods: {
			...mapMutations(['setPlaydetail', 'setIsplayingmusic', 'setIsplayactive']),
			getData(id) {
				let par = {
					_id: id
				};
				db.collection('music-album')
					.where(par).get()
					.then(res => {
						console.log("music-album", res.result.data[0])
						this.albumMsg = res.result.data[0]
						this.bgimg = this.albumMsg.album_cover
					}).catch(err => {
						console.log(err)
					})
				par = {
					album_id: id
				};
				db.collection('music-list')
					.where(par)
					.get()
					.then(res => {
						console.log("music-list", res.result.data)
						this.targetMuList = res.result.data
						// this.setAudiolist(this.targetMuList)
					})
					.catch(err => {
						console.log("music-list", err)
					})
			},
			scrollpage(e) {
				this.scrollY = e.detail.scrollTop
				this.scroll()
			},
			// 设置背景条
			scroll: debounce(() => {
				if (that.scrollY < 5) {
					that.scrollTop = 20
				} else {
					if (that.scrollY < 300) {
						that.scrollTop = -parseInt(that.scrollY) + 20
					}
				}
			}),
			goBack() { // 返回上一页
				uni.navigateBack();
			},
			initPlay(id, index) {
				// if (index) {
				// 	this.curPlayIndex = index
				// }
				Vue.prototype.cusPlay = this.onPlayFn
				Vue.prototype.cusTimeUpdate = this.onTimeUpdateFn
				Vue.prototype.cusEnded = this.onEndedFn

				//for循环对比，获取当前的
				for (let i = 0; i < this.audiolist.length; i++) {
					let item = this.audiolist[i]
					if (id == item._id) {
						this.$au_player.url = item.song;
						this.$au_player.title = item.song_name;
						this.$au_player.coverImgUrl = item.song_cover;
						this.$au_player.singer = item.singer;
						//h5
						this.$au_player.autoplay = true;
						//app
						this.$au_player.src = item.song;
						this.setPlaydetail({
							id: item._id,
							pic: item.song_cover
						})
						break
					}
				}
			},
			onPlayFn() {
				console.log("#onPlayFn")
				// this.playTime = this.song.time;
				this.isPlay = true
				this.setIsplayingmusic(true)
				this.setIsplayactive(true)
				console.log('onplaying')
			},
			onTimeUpdateFn() {
				// console.log("#onTimeUpdateFn", this.$au_player.currentTime)
				const curtime = this.$au_player.currentTime
				this.curPlayTime = Math.floor(curtime);

			},
			onEndedFn() {
				console.log('ended')
				this.isPlay = false;
				this.setIsplayingmusic(false)
				this.setIsplayactive(false)
				this.next(true);
			},
			next(isAuto) {
				const index = this.getIndex('next', isAuto)
				console.log(index)
				this.initPlay(this.audiolist[index].id)
			},
			getIndex(type, isAuto) {
				//['0列表循环', '1随机播放', '2单曲循环']
				let next = 0;
				let prev = 0;
				//获取当前播放列表
				const last = this.audiolist.length - 1;
				let cur = 0
				//获取当前正在播放的歌曲
				this.playdetail
				//for循环对比，获取当前的
				for (let i = 0; i < this.audiolist.length; i++) {
					let audioCur = this.audiolist[i]
					if (this.playdetail.id == audioCur._id) {
						cur = i
						break
					}
				}
				next = cur == last ? 0 : cur + 1
				//判断是上一首还是下一首
				return type == 'next' ? next : prev
			},

		}
	};
</script>

<style lang="scss" scoped>
	$bgheight: 520rpx;
	$bgtop: -44px;

	.container {
		overflow: hidden;
	}

	.nav-bar {
		position: relative;
		background-position: 0 0px;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.bg {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		filter: blur(35px);
		background-position: 0 0px;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.bg1 {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.2);
		z-index: 2;
	}

	.page-content {
		position: fixed;

	}

	.album-top {
		position: relative;
		top: $bgtop;
		height: $bgheight;
		padding-top: 44px;
		overflow: hidden;
		background: #fff;

		.bg {
			background-size: 100%;
		}

		.album-con {
			position: absolute;
			width: 100%;
			padding: 46rpx 24rpx 0 30rpx;
			// padding: 46rpx 0 0 0 ;
			z-index: 10;
		}
	}

	.album-bot {
		padding-top: 42rpx;
		// color: #fff;
		text-align: center;

		.iconfont {
			font-size: 44rpx;
		}

		.txt {
			font-size: x-large;
			color: #252621;
		}
	}

	.img-info {
		position: relative;
		// width: 390rpx;
		width: 280rpx;
		height: 280rpx;
		// margin-right: 40rpx;
		border-radius: 10rpx;
		overflow: hidden;
		margin: 0, auto;

		// background-image: url('@/static/music/vinyl_03.png');
		// background-size: cover;
		// background-repeat: no-repeat;
		&:before {
			content: ' ';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 40rpx;
			z-index: 2;
			background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.2), transparent);
		}

		.img {
			width: 280rpx;
			height: 280rpx;

		}

		.count {
			position: absolute;
			top: 0;
			right: 0;
			padding-left: 25rpx;
			line-height: 34rpx;
			color: #fff;
			font-size: 24rpx;
			z-index: 10;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAqFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8j1z1tAAAAN3RSTlMA9wcC+/3w4A/RoQv0m4s6IBkU7eeRK73kxaZtW+rc1cmxe3UmwbiWQNmqgWZUzUY1ME4dhmGuJ2Z0kQAABVtJREFUeNrtnYtWGkEQRFsEeSmgII8EVBASUFHx1f//ZwmJRwaZYhndjdU5c//gQp8DVTvTK5FIJBKJRCKRSCQSiUQikcj/yWI6vRfzNEYz/U23NhbLlF70jZ7hr+W+pQ6FoxOxyXhP12neiEVyZd3gdiH2uFYfP0tijP2mehk8iy3miui1xRLfFHNaFTv0dAutvpihq1uZmPmp1yRqRuZLVxyol+5cLOB+9nMwZ52G8OOKSLWWVx97TzlhZ01EZDxRL8UHIcf92ZAl/ZZ6+UE+XxsiUjoF8zWinq9NEZH2BZivO+HFJyLyPFAvL4/Cil9ESkcF9XFIO19ARGRRVi9ndaHEDVPvksp38FP/7VgIQSJLTirq5fByX+jAIkvq5+rlnG++tovI/uWheqmwlUZAZMXxlXo5+M41X0DEZXqmXspUpaSuOBJAbrTq8GhLSSzi8jjUv/CWkusimLui/oa4lNxVRHLXYL5ISkmPCKLRYS4lPSIYFOovCEpJXVGRJGCoz59++XwBEci4R1pKIhFMv0VZegeL4FCfDyklGUSWoZ6vlAQiSTw32UpJN/lJMm6o5yolkUgy92WqUjJcxA31RKXkJ0RwqN+7TpwvLpFlqGcpJYNEQkL9MOtSEotcSRIo1DOU3kEigaH+bCoQShEY6vUKlpKcIjDU41IyS5EXSSY81M/q4oNXBIR6VHoTi4BQD0pJahEQ6kHpnZ3IUAIIDPWF96U3u8hGqEelJL/IWqjHpaQFERjqC0er0siECAj12c6Xm4ckRW6a20tJMyKvoR6WknZEcKgf9EXEkggO9b22LREY6pelpC0RHOq7fWMiONRPxlmJdCQLcKjPP1VtieBQX5wbE8GhvtOwJbIM9bCUtCWCQ33xzpgIDvWVXLoiE8macQck4YYxERjqy/vWRFCofzInItKeqIdxiiI9yRwc6msWRXyhfmBSxBfqFzZFNkP9g1UROVkP9TfpiVzIv6VRVodLqyLv/7D0jYps/IW8Nyni+VNfNSjii1kVSU/kVjIHB9+6ORF/FTEUYyKgHBqUjIlMZ+rjcCppipQlY47BOoNyQ0yJoEq7JmJJpH4Om1NLIieVAjzAbUgEPSjJn1YlA5FzyYj7Mn6eaEhkmTvQtRNLIjdNeBHIksjiFp+CyExkJmlT+lmA5wYsiTwP8PVFQyLti20XSs2IVE/zGZ+mwyJnkh79VsKlaxsi40niiUALIug44IF7BtiAyLyb7anZZJGipECjs9s5ZnKR3NPejifLuUUeimDBzeZUMYs0fgQ8SOcVAU/R0X2YLEW66ZXSyTfgSEUeh19+JxGIhJbSX39L1G00PlxKM9zbBSIhpTTHTWogElBKk9xt/5xIfUazAtXtZ8JLaaL9D64IX334L0Tq51w7LNySJqyUJttaA0QSp4pujxAWCS+lb9vydbiZeudSmnHXVrDITZNz+1mgyOKWdR8dEIGlNO2GwBCR5wHxzka36kgopXvUWzRdEapSOiORfot906ybTINL6RnHVHlEUCltYFtussi8++WrQtIQaXQIlreEinhLaYZ1OoEi+Z1L6R+EW9ehCC6lzyjfs4BElqU0zRKwQJHCeinNUB9+VgSX0rxvh/GJ5EagPnwifl+POryV0jT14WdEjq+I6sMPilCV0p8R2Zf6jKs+/KAIKqUH5FO1IXKght+NqCt4F3fvwtu3QL+qP4GybqFwZGKq/jBUTJnldQO78F1VbbxgJIHSHpgqivowhIp/qoiKnh05aZqfqlceiOvDMC51jRlb0bM79RZrfRhKqXb46lExOlVv5O5G19ejB/bQEYlEIpFIJBLJkF8r2nFUwcJuMQAAAABJRU5ErkJggg==) no-repeat;
			background-size: 25rpx 25rpx;
			transform: scale(0.8);
		}
	}

	.info-con {
		.title {
			margin-bottom: 14rpx;
			// color: #fff;
			line-height: 46rpx;
			font-weight: 600;
			height: auto;
			/*高度自动*/
			display: inline-block;
			/*转为行内块元素*/
			white-space: pre-wrap;
			/*处理元素内的空白,保留空白符序列，但是正常地进行换行*/
			word-wrap: break-word;
			/*允许长单词或 URL 地址换行到下一行,在长单词或 URL 地址内部进行换行*/
		}
	}

	.avator-box {
		margin-bottom: 26rpx;
		align-items: center;
		color: #ccc0ba;
		font-size: 25rpx;

		.avator {
			width: 60rpx;
			height: 60rpx;
			margin-right: 12rpx;
			border-radius: 60rpx;
		}
	}

	.desc-box {
		align-items: center;
		line-height: 40rpx;
		color: #ccc0ba;
		font-size: 23rpx;
	}

	.album-list {
		position: relative;
		top: - 84px;
		background: #fff;
		border-radius: 36rpx 36rpx 0 0;
		z-index: 100;

		.title-bar {
			padding: 10rpx;
			justify-content: space-between;

			.iconfont {
				margin-left: 16rpx;
				margin-right: 16rpx;
				font-size: 40rpx;
			}

			.play {
				line-height: 80rpx;
				color: #252621;
				font-weight: 600;
				font-size: 32rpx;
			}

			.collect {
				width: 228rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 80rpx;
				color: #fff;
				background: #fb2b21;
			}
		}

		.item {
			align-items: center;
			height: 120rpx;
		}

		.con {
			padding-right: 40rpx;
			align-items: center;
			justify-content: space-between;
		}

		.num {
			width: 84rpx;
			text-align: center;
			line-height: 120rpx;
			color: #999;
			font-size: 24rpx;

			&.on {
				color: #ff3a3a;
			}
		}

		.tit {
			margin-right: 20rpx;
			color: #333;
			line-height: 48rpx;
			font-size: 32rpx;
		}

		.count {
			margin-right: 20rpx;
			color: #ccc;
			line-height: 48rpx;
			font-size: 24rpx;
			transform: scale(0.84);
		}

		.icon {
			width: 56rpx;
			height: 20rpx;
		}

		.desc {
			// color: #999;
			color: #999999;
			font-size: 24rpx;
			line-height: 40rpx;
		}
	}
</style>
