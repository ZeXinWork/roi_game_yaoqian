<template>
	<view class="phone">
		<view>
			<view class="phone__title">
				<image :src="user.avatar" mode="aspectFill" class="phone__title__img">
				</image>
				<view class="phone__title__text"> {{ user.nickname }}</view>
			</view>
			<view class="phone__desc__wrap">
				<view class="phone__desc">为了给您提供更好的服务和体验，在您登录注册过程中，</view>
				<view class="phone__desc">我们将分布获取您的头像昵称和手机号码，</view>
				<view class="phone__desc">
					我们将遵守相关法律法规，合理收集、存储、使用以上信息。</view>
			</view>
			<view class="phone__content">
				<image src="../../static/images/login/wechant.png" mode="aspectFill" class="phone__content__img">
				</image>
				<view class="phone__content__text">
					<view class="phone__content__text__title">微信头像昵称</view>
					<view class="phone__content__text__body">将作为个人特色信息的展示</view>
				</view>
			</view>
			<view class="phone__content mt-24">
				<image src="../../static/images/login/phone.png" mode="aspectFill" class="phone__content__img"></image>
				<view class="phone__content__text">
					<view class="phone__content__text__title">手机号</view>
					<view class="phone__content__text__body">将作为您在本平台用户身份的唯一认证信息</view>
				</view>
			</view>

		</view>

		<button open-type="getPhoneNumber" @getphonenumber="getphonenumber" type="primary" class="phone__button">
			微信手机号登录
		</button>

	</view>
</template>

<script>
	import {
		getPhone
	} from '@/rest/api'
	export default {
		data() {
			return {
				user: '',

			}
		},
		onShow() {
			this.user = this.$storage.getUser()
		},
		methods: {

			getphonenumber(e) {
				let that = this
				// 不允许授权
				if (e.detail.errMsg !== 'getPhoneNumber:ok') {
					return
				}

				const user = this.$storage.getUser()
				const params = {
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv,
					agreement_id: this.user.agreement_id,
					privacy_clause_id: this.user.privacy_clause_id,
					platform: 'yaoyaoshu'
				}
				getPhone(params)
					.then((res) => {
						user.phone = res.phoneNumber
						this.$storage.setUser(user)
						uni.showToast({
							title: '授权成功',
							success: function() {
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/index/index'
									})
								}, 1500)
							},
						})
					})
					.catch((err) => {
						console.log(err, "err")
						uni.showToast({
							title: '出错啦',
						})
					})
			},
			openProtocol(flag) {
				const privacy = {
					url: this.user.privacy_clause_url,
					id: this.user.privacy_clause_id,
				}
				const agreenment = {
					url: this.user.agreement_url,
					id: this.user.agreement_id,
				}
				const url = flag === 'agreement' ? agreenment.url : privacy.url
				uni.downloadFile({
					url: url,
					success(res) {
						let filePath = res.tempFilePath
						uni.openDocument({
							filePath: filePath,
							fileType: 'pdf',
							success(res) {
								//
							},
							fail(res) {},
							complete() {},
						})
					},
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/phone.scss';
</style>
