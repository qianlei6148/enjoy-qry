<template>
	<view>
		<!-- <uni-card :cover="this.item.album_cover">
			<text>{{this.item.album}}</text>
		</uni-card>
		<uni-list>
			<template v-for="(songItem, index) in list">
				<uni-list-item :title="songItem.song_name" @tap="playAudio(index)"></uni-list-item>
			</template>
			
		</uni-list> -->
		<!-- <musicPlayer :audio="audio"></musicPlayer> -->
		<view class="bar_warp" ref="bar_warp">
			<view class="bar_progress" ref="bar_progress">
				<view class="progress_warp">
					<view class="bar_left">
						<img src="../../../static/app-plus/sharemenu/copyurl.png" alt="">
					</view>
					<view class="bar_mid">
						<view class="name">
							时间停了
						</view>
						<view class="author">
							鹿晗
						</view>
						<view class="bar" ref="bar">
							<span class="icon" ref="icon"></span>
						</view>
					</view>
					<view class="bar_right t_icon" :class="isPlay?'t-icon-bofang':'t-icon-bofang4'" @click="playBtn">	
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import musicPlayer from "@/components/musicPlayer/musicPlayer"
	// const db = uniCloud.database();
	const innerAudioContext = uni.createInnerAudioContext()
	innerAudioContext.autoplay = true
	export default {
		components: {
			// musicPlayer
		},
		data() {
			return {
				isPlay:false,
				menu1:{
					
				},
				// item: {},
				// list: [],
				audio: {
					// name: '时间停了',
					// artist: '鹿晗',
					// url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3b836f04-ddce-4239-b0e5-548eb33356a6/70c9ec02-3ffe-4f69-a6fc-0451145b9b57.mp3',
					// // url: 'https://music.163.com/#/song?id=1313113446',
					// cover: 'http://p2.music.126.net/5WMOwFSCHFGaUdl-mKlacA==/109951166673395097.jpg?param=130y130', // prettier-ignore
					// lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
				},
			}
		},
		methods: {
			// playAudio(i) {
			// 	let songMsg = this.list[i]
				
				
			// }
		},
		mounted() {
			// this.item = item
			// let db = uniCloud.database()
			// this.list = db.collection('music-list').where({
			// 	album_id: this.item._id
			// }).field('album_id,song_name,song,singer').getTemp()
			// innerAudioContext.src='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3b836f04-ddce-4239-b0e5-548eb33356a6/70c9ec02-3ffe-4f69-a6fc-0451145b9b57.mp3'
			// innerAudioContext.play()
			
			
			// const bar = this.$refs.bar
			// const icon = this.$refs.icon
			// let maxScroll = 0
			// let timeChangeX = 0
			// let flag = false
			// let offsetX = 0
			// innerAudioContext.onTimeUpdate(()=>{
			// 	if (!flag) {
			// 		maxScroll = bar.$el.clientWidth - icon.clientWidth
			// 		let progress = innerAudioContext.currentTime/innerAudioContext.duration
			// 		let position = maxScroll * progress
			// 		icon.style.transform = `translate(${position}px, -50%)`
			// 		timeChangeX = position
			// 	}
			// })
			// icon.addEventListener('touchstart', (ev)=>{
			// 	flag=true
			// 	maxScroll = bar.$el.clientWidth - icon.clientWidth
			// 	const startX = ev.changedTouches[0].clientX
			// 	const touchmoveCallback =(ev)=>{
			// 		offsetX = ev.changedTouches[0].clientX- startX+timeChangeX
			// 		if (offsetX <0) {
			// 			offsetX = 0
			// 		}
			// 		if (offsetX > maxScroll) {
			// 			offsetX = maxScroll
			// 		}
			// 		icon.style.transform = `translate(${offsetX}px, -50%)`
			// 	}
			// 	const touchendCallback = (ev)=>{
			// 		flag=false
			// 		maxScroll = bar.$el.clientWidth - icon.clientWidth
			// 		let progress = offsetX / maxScroll
			// 		let currentTime = innerAudioContext.duration* progress
			// 		innerAudioContext.seek(currentTime)
			// 		document.removeEventListener('touchmove', touchmoveCallback())
			// 		document.removeEventListener('touchend', touchendCallback())

			// 	}
			// 	document.addEventListener('touchmove', touchmoveCallback())
			// 	document.addEventListener('touchend', touchendCallback())
			// })
			
		},
		onLoad(item){
			console.log("##music-detail", item)
		}
	}
</script>

<style lang="scss">
	*{
		margin: 0%;
		padding: 0%;
		font-weight: 200;
		font-size: 13px;
	}
	.bar_warp {
		height: 60px;
		// display: none;
	}
	.bar_progress {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: center;
		background-color: rgb(240, 240, 240);
		
		.progress_warp {
			width: 95%;
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.bar_left {
				background-color: red;
				width: 12%;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					width: 100%;
				}
			}
			.bar_mid {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 70%;
				width: 65%;
				.name {
					color: black;
					font-size: 15px;
					font-weight: 600;
				}
				.author {
					color: rgba($color: #000000, $alpha: .3);
					font-size: 11px;
				}
				.bar {
					height: 4px;
					width: 100%;
					background-color: #ddd;
					.icon {
						position: relative;
						top: 50%;
						left: 0;
						transform: translate(-50%, -50%);
						display: block;
						width: 5px;
						height: 4px;
						background-color: rgba($color: #7bd25c, $alpha: 1.0);
						border-radius: 50%;
						&::before{
							content: "";
							position: absolute;
							top: -5px;
							left: -5px;
							bottom: -5px;
							right: -5px;
						}
					}
				}
			}
			.bar_right {
				width: 35px;
				height: 35px;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: 50% 50%;
			}
		}
	}
	@font-face {
		font-family: 'iconfont';
		src: url('https://at.alicdn.com/t/font_2634205_tfx2rjy7ocd.woff2?t=1624629652226') format('woff2'),
		url('https://at.alicdn.com/t/font_2634205_tfx2rjy7ocd.woff?t=1624629652226') format('woff'),
		url('https://at.alicdn.com/t/font_2634205_tfx2rjy7ocd.ttf2?t=1624629652226') format('truetype');
		
	}
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 14px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		
	}
</style>
