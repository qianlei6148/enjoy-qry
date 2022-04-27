<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-gradual-pink shadow-blur">
		  <block slot="content">{{title}}</block>
		</cu-custom>
		<web-view v-if="url" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad({url,title}) {
			if(url.substring(0, 4) != 'http'){
				uni.showModal({
					title:"错误",
					content: '不是一个有效的网站链接,'+'"'+url+'"',
					showCancel: false,
					confirmText:"知道了",
					complete: () => {
						uni.navigateBack()
					}
				});
				title = "页面路径错误"
			}else{
				console.log(url,title);
				this.url = url;
			}
			if(title){
				this.title = title
				uni.setNavigationBarTitle({title});
			}
		},
		data() {
			return {
				url:null,
				title:""
			};
		}
	}
</script>

<style lang="scss">

</style>
