<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-gradual-pink shadow-blur">
			<block slot="content">作品</block>
		</cu-custom>
		<!-- <uni-card :cover="this.item.album_cover">
			<text>{{this.item.album}}</text>
		</uni-card>
		<uni-list>
			<template v-for="(songItem, index) in list">
				<uni-list-item :title="songItem.song_name" @tap="playAudio(index)"></uni-list-item>
			</template>
			
		</uni-list> -->
		<musicPlayer :audio="audio"></musicPlayer>

	</view>
</template>

<script>
	import musicPlayer from "@/components/musicPlayer/musicPlayer"
	// const db = uniCloud.database();
	// const innerAudioContext = uni.createInnerAudioContext()
	// innerAudioContext.autoplay = true
	export default {
		components: {
			// musicPlayer
		},
		data() {
			return {
				isPlay: false,
				menu1: {

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
		onLoad(item) {
			console.log("##music-detail", item)
		}
	}
</script>

<style lang="scss">
	* {
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
				}
			}
		}
	}
</style>
