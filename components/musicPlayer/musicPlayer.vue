<template>
	<view>
		<aplayer :audio="audio" :lrcType="0" ref="aplayer" :fixed="true" :min="true"/>
	</view>
</template>

<script>
	// 音乐内容，里面有歌曲列表，用来播放音乐
	export default {
		name:"musicPlayer",
		data() {
			return {
				// audio: {
				// 	name: '时间停了',
				// 	artist: '鹿晗',
				// 	url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3b836f04-ddce-4239-b0e5-548eb33356a6/70c9ec02-3ffe-4f69-a6fc-0451145b9b57.mp3',
				// 	// url: 'https://music.163.com/#/song?id=1313113446',
				// 	cover: 'http://p2.music.126.net/5WMOwFSCHFGaUdl-mKlacA==/109951166673395097.jpg?param=130y130', // prettier-ignore
				// 	// lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
				// },
			};
		},
		props:['audio']
	}
</script>

<style>

</style>