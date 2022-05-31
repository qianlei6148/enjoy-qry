<template>
	<view class="warp">
		<cu-custom bgColor="bg-gradual-pink shadow-blur">
			<block slot="content">音乐</block>
		</cu-custom>
		<uni-section title="作品" type="line" padding>
			<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="music-album"
				field="_id,album,album_cover,release_date" orderby="release_date desc" @load="onqueryload">
				<image v-if="!(loading||data.length)" class="banner-image" src="/static/grid/empty.png"
					mode="aspectFill" :draggable="false" />
				<uni-grid v-else :column="2" :show-border="false" :square="false" @change="change">
					<uni-grid-item v-for="(item ,index) in data" :index="index" :key="index">
						<view class="grid-item-box">
							<!-- @tap.native="jump(item)" -->
							<image class="image" :src="item.album_cover" mode="aspectFill" />
							<text class="text">{{item.album}}</text>
							<view v-if="item.badge" class="grid-dot">
								<uni-badge :text="item.badge" :type="item.type" />
							</view>
						</view>
					</uni-grid-item>
				</uni-grid>
			</unicloud-db>
		</uni-section>
		<!-- <rich-text :nodes="nodes"></rich-text> -->
		<!-- <u-parse :content="strings"></u-parse> -->
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				
			}
		},
		methods: {
			change(e){
				let item = this.$refs.udb.dataList[e.detail.index]
				this.jump(item)
			},
			jump(item) {
				console.log(item);
				uni.navigateTo({
					animationDuration: 500,
					animationType: 'pop-in',
					url: './music-detail/music-detail?item=' + item._id
				})
			},
			onqueryload(data) {}
		}
		// onLoad() {
		// 	uni.$on('change', (e)=>{
		// 		let item = this.$refs.udb.dataList[e.detail.index]
		// 		jump(item)
		// 	});
		// },
		// onUnload() {
		// 	uni.$off('change')
		// }
	}
</script>

<style lang="scss">
	.image {
		width: 150px;
		height: 150px;
		//圆角图片
		border-radius: 10px;
	}

	.text {
		font-size: 17px;
		margin-top: 5px;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		// display: block;
		/* #endif */
	}

	.grid-dynamic-box {
		margin-bottom: 15px;
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

	.grid-item-box-row {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}

	.swiper {
		height: 420px;
	}

	/* #ifdef H5 */
	@media screen and (min-width: 768px) and (max-width: 1425px) {
		.swiper {
			height: 630px;
		}
	}

	@media screen and (min-width: 1425px) {
		.swiper {
			height: 830px;
		}
	}

	/* #endif */
</style>
