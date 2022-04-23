<template>
	<view class="warp">
		<!-- fixed="true" mini="true" -->
		<!-- <aplayer /> -->
		<uni-grid :column="2" :show-border="false" :square="false" @change="change">
			<uni-grid-item v-for="(item ,index) in list" :index="index" :key="index">
				<view class="grid-item-box">
					<image class="image" :src="item.url" mode="aspectFill" />
					<text class="text">{{item.text}}</text>
					<!-- <view v-if="item.badge" class="grid-dot">
						<uni-badge :text="item.badge" :type="item.type" />
					</view> -->
				</view>
			</uni-grid-item>
		</uni-grid>
		<!-- <rich-text :nodes="nodes"></rich-text> -->
		<!-- <button type="default" @click="jump">跳转</button> -->
		<!-- <musicPlayer></musicPlayer> -->
	</view>
</template>

<script>
	// 专辑列表 
	// 左右 左右的格式展现
	export default {
		data() {
			return {
				list: [{
						url: 'http://ql-u-pic.oss-cn-shanghai.aliyuncs.com/upic/2022/04/23/b3Up2n1151650698344_.pic.jpg',
						text: 'Trust In U',
						// badge: '0',
						// type: "primary"
					},
					{
						url: '/static/c2.png',
						text: 'Grid 2',
						// badge: '1',
						// type: "success"
					},
					{
						url: '/static/c3.png',
						text: 'Grid 3',
						// badge: '99',
						// type: "warning"
					},
					{
						url: '/static/c4.png',
						text: 'Grid 4',
						// badge: '2',
						// type: "error"
					},
					{
						url: '/static/c5.png',
						text: 'Grid 5'
					},
					{
						url: '/static/c6.png',
						text: 'Grid 6'
					},
					{
						url: '/static/c7.png',
						text: 'Grid 7'
					},
					{
						url: '/static/c8.png',
						text: 'Grid 8'
					},
					{
						url: '/static/c9.png',
						text: 'Grid 9'
					}
				]
				,
				nodes: [{
						name: 'view',
						attrs: {
							class: 'div-class',
							style: 'line-height: 60px; color: red; text-align:center;'
							
						},
						type: 'text',
						text: 'Hello&nbsp;uni-app!\t\n'
						// children: [{
						// 	type: 'text',
						// 	text: 'Hello&nbsp;uni-app!\t\n'
						// }]
					},
					{
						name: 'img',
						attr: {
							src:'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png'
						},
						// children: [{
						// 	type: 'text',
						// 	text: '跳转'
						// }]
					}
				],
				// strings: '<div style="text-align:center;"><img src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png"/></div>'
			}
		},
		methods: {
			jump() {
				uni.navigateTo({
					url: '@/pages/music-detail/music-detail'
				})
			}
		}
	}
</script>

<style>
	.image {
		width: 25px;
		height: 25px;
	}
	
	.text {
		font-size: 14px;
		margin-top: 5px;
	}
.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
</style>
