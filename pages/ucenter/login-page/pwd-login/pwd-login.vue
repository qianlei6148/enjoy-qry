<template>
	<view class="" style="background: #f8f8f8;">
		<cu-custom :isBack="true" bgColor="bg-gradual-pink shadow-blur">
			<block slot="content">{{$t('pwdLogin.pwdLogin')}}</block>
		</cu-custom>
		<!-- 顶部文字 -->
		<!-- <text class="title">{{$t('pwdLogin.pwdLogin')}}</text> -->
		<scroll-view scroll-y="true" class="page-content content">
			<!-- <text class="title"></text> -->
			<input class="input-box input-row" :inputBorder="false" v-model="username"
				:placeholder="$t('pwdLogin.placeholder')" />
			<input type="password" class="input-box input-row" :inputBorder="false" v-model="password"
				:placeholder="$t('pwdLogin.passwordPlaceholder')" />
			<view class="captcha-box" v-if="captchaBase64">
				<image class="captcha-img" @click="createCaptcha" :src="captchaBase64" mode="widthFix"></image>
				<input type="text" class="input-box input-row captcha" :inputBorder="false" v-model="captcha"
					:placeholder="$t('pwdLogin.verifyCodePlaceholder')" />
			</view>
			<!-- <uni-agreements @setAgree="agree = $event"></uni-agreements> -->
			<button class="send-btn" :disabled="!canLogin" :type="canLogin?'primary':'default'"
				@click="pwdLogin">{{$t('pwdLogin.login')}}</button>
			<!-- 忘记密码 -->
			<view class="auth-box">
				<text class="link" @click="toRetrievePwd">{{$t('pwdLogin.forgetPassword')}}</text>
				<text class="link" @click="toRegister">{{$t('pwdLogin.register')}}</text>
			</view>
			<uni-quick-login :agree="agree" ref="uniQuickLogin"></uni-quick-login>
		</scroll-view>
	</view>
	
</template>

<script>
	import mixin from '../common/login-page.mixin.js';
	export default {
		mixins: [mixin],
		data() {
			return {
				"password": "",
				"username": "",
				"agree": true, //没有勾选，所以暂时默认true, 后续如果有用户确认的才设成false
				"captchaBase64": "",
				"captcha": ""
			}
		},
		computed: {
			canLogin() {
				return this.username.length && this.isPwd;
			},
			isPwd() {
				return /^.{6,20}$/.test(this.password);
			},
			isPhone() {
				return /^1\d{10}$/.test(this.phone);
			},
		},
		methods: {
			// 页面跳转，找回密码
			toRetrievePwd() {
				uni.navigateTo({
					url: '../pwd-retrieve/pwd-retrieve?phoneNumber=' + (this.isPhone ? this.username : '') +
						'&phoneArea=' + this.currenPhoneArea
				})
			},
			/**
			 * 密码登录
			 */
			pwdLogin() {
				if (!this.agree) {
					return uni.showToast({
						title: this.$t('common').noAgree,
						icon: 'none'
					});
				}
				// 下边是可以登录
				uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'login',
						params: {
							"username": this.username,
							"password": this.password,
							"captcha": this.captcha
						},
					},
					success: ({
						result
					}) => {
						console.log(result);
						if (result.code === 0) {
							this.loginSuccess(result)
						} else {
							if (result.needCaptcha) {
								uni.showToast({
									title: result.msg || '完成',
									icon: 'none'
								});
								this.createCaptcha()
							} else {
								uni.showModal({
									title: this.$t('common').error,
									content: result.msg,
									showCancel: false,
									confirmText: this.$t('common').gotIt
								});
							}
						}
					}
				})
			},
			createCaptcha() {
				uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'createCaptcha',
						params: {
							scene: "login"
						},
					},
					success: ({
						result
					}) => {
						if (result.code === 0) {
							this.captchaBase64 = result.captchaBase64
						} else {
							uni.showModal({
								content: result.msg,
								showCancel: false
							});
						}
					}
				})
			},
			/* 前往注册 */
			toRegister(e) {
				console.log(e);
				uni.navigateTo({
					url: '/pages/ucenter/login-page/register/register'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import url("../common/login-page.css");

	.page-content {
		position: fixed;
		top: 64px;
		left: 0;
		right: 0;
		bottom: 0;
		margin-top: 120rpx;
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
		width: 600rpx;
		border: 1px solid;
		border-radius: 75rpx;
	}

	.auth-box {
		width: 600rpx;
		flex-direction: row;
		justify-content: space-between;
		margin: 20px auto 0;
	}

	.auth-box .link {
		font-size: 26rpx;
	}

	.login-text-sub {
		color: #8a8f8b;
	}

	.toRegister {
		margin-top: 80px;
		width: 600rpx;
	}

	.captcha-box {
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.captcha-img {
		margin: 0 15px 10px 0;
		width: 250rpx;
	}

	.captcha {
		width: 350rpx;
	}
</style>
