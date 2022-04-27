<template>
	<view class="">
		<cu-custom :isBack="true" bgColor="bg-gradual-pink shadow-blur">
			<block slot="content">注册</block>
		</cu-custom>
		<scroll-view scroll-y="true" class="page-content uni-container">
			<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="undertext">
				<uni-forms-item name="username" required>
					<uni-easyinput :inputBorder="false" class="easyinput input-row"
						:placeholder="$t('register.usernamePlaceholder')" v-model="formData.username" trim="both" />
				</uni-forms-item>
				<uni-forms-item name="nickname">
					<uni-easyinput :inputBorder="false" class="easyinput input-row"
						:placeholder="$t('register.nicknamePlaceholder')" v-model="formData.nickname" trim="both" />
					<!-- style="width: 660rpx;" -->
				</uni-forms-item>
				<uni-forms-item name="password" v-model="formData.password" required>
					<uni-easyinput :inputBorder="false" class="easyinput input-row"
						:placeholder="$t('register.passwordDigitsPlaceholder')" type="password"
						v-model="formData.password" trim="both" />
				</uni-forms-item>
				<uni-forms-item name="pwd2" v-model="formData.pwd2" required>
					<uni-easyinput :inputBorder="false" class="easyinput input-row"
						:placeholder="$t('register.passwordAgain')" type="password" v-model="formData.pwd2"
						trim="both" />
				</uni-forms-item>
				<!-- <uni-agreements @setAgree="agree = $event"></uni-agreements> -->
				<button class="send-btn" type="primary" @click="submit">{{$t('register.registerAndLogin')}}</button>
			</uni-forms>
		</scroll-view>
	</view>
</template>

<script>
	import rules from './validator.js';
	import mixin from '../common/login-page.mixin.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				formData: {
					"username": "",
					"nickname": "",
					'password': '',
					'pwd2': ''
				},
				rules,
				agree: true //没有勾选，所以暂时默认true, 后续如果有用户确认的才设成false
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('register.navigationBarTitle')
			})
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				if (!this.agree) {
					return uni.showToast({
						title: this.$t('common').noAgree,
						icon: 'none'
					});
				}
				uni.showLoading({
					mask: true
				})
				this.$refs.form.validate().then((res) => {
						this.submitForm(res)
					}).catch((errors) => {
						console.log(errors);
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			submitForm(params) {
				uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'register',
						params,
					},
					success: ({
						result
					}) => {
						console.log(result);
						if (result.code === 0) {
							this.loginSuccess(result)
						} else {
							uni.showModal({
								content: result.msg,
								showCancel: false
							});
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../common/login-page.css");

	.uni-container {
		padding: 15px;
	}

	.page-content {
		position: fixed;
		top: 64px;
		left: 0;
		right: 0;
		bottom: 0;
		margin-top: 60rpx;
		/* #ifdef H5 */
		top: 44px; // h5 无状态栏
		bottom: 100rpx;
		/* #endif */
		// background: #f8f8f8;
	}

	.input-row {
		width: 600rpx;
		height: 75rpx;
		margin: 0 auto;
		border: 1px solid $color;
		color: #6c6c6c;
		border-radius: 75rpx;
		padding: 0 50rpx;
		line-height: 75rpx;
		margin-bottom: 45rpx;
		font-size: 26rpx;
	}

	.send-btn {
		margin-top: 5px;
	}

	.uni-container ::v-deep .uni-forms-item__label {
		width: 15px !important;
	}
</style>
