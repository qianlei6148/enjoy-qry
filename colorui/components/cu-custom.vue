<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
		<view class="bg-blur-img" :style="imgstyle">
		</view>
		<playerMin :require="re"></playerMin>
	</view>
</template>

<script>
	import playerMin from '@/components/playermin.vue'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				re: this.require
			};
		},
		name: 'cu-custom',
		components: {
			playerMin
		},
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			},
			imgstyle() {
				return this.bgImgBlur ? 'background-image:url(' + this.bgImgBlur + ');height:' + this.CustomBar * 2 +
					'rpx;' : '';
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			bgImgBlur: {
				type: String,
				default: ''
			},
			backText: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			require: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			BackPage() {
				if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
					let url = '/' + __wxConfig.pages[0]
					return uni.redirectTo({
						url
					})
				}
				uni.navigateBack({
					delta: 1
				});
			}
		},
		mounted() {
			console.log("#cu-custom", this.require)
		}
	}
</script>

<style>
	.box {
		width: 100%;
	}

	.bg-blur-img {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		filter: blur(35px);
		background-position: 0 0px;
		background-repeat: no-repeat;
		background-size: cover;
		transform: scale(1.5);
	}
</style>
