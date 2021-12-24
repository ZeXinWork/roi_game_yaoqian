<template>
	<view id="main">
		<view class="prize_box">
			<view class="prize_title">领奖说明</view>
			<view class="prize_tips">
				请通过下方发起人留下的信息领奖， 如需核验中奖者身份可以出示领奖码。
			</view>
		</view>
		<view class="prize_box">
			<view class="userinfo">
				<view class="avatar">
					<image :src="contactInfo.avatar" mode=""></image>
				</view>
				<view class="">
					<view class="user_title">发起人</view>
					<view class="username">{{ contactInfo.nickname }}</view>
				</view>
			</view>
			<view class="code_content" >
				<view class="m_title">联系商家领奖</view>
				<view class="code_img">
					<image :show-menu-by-longpress="true" :src="contactInfo.qr_code_url" mode=""></image>
				</view>
				<view class="code_tip">长按二维码，保存图片到相册</view>
			</view>
			<!-- <view class="code_content" @longtap="saveImage">
				<view class="m_title">联系商家领奖</view>
				<view class="code_img">
					<image :show-menu-by-longpress="true" :src="contactInfo.qr_code_url" mode=""></image>
				</view>
				<view class="code_tip">长按二维码，保存图片到相册</view>
			</view> -->
			<view class="prize_item" @click="openCode">
				<view class="">
					<view class="m_title">领奖码</view>
					<view class="sub_title">点击保存领奖码</view>
				</view>
				<view class="">
					<image class="icon_code" src="https://static.roi-cloud.com/base/icon_code.png" mode=""></image>
					<image class="arrow_right" src="https://static.roi-cloud.com/base/arrow-right.png" mode=""></image>
				</view>
			</view>
			<view class="tips">
				<view class="m_title">温馨提示</view>
				<view class="tips_content">若发起人要求你通过虚拟充值转账、提前支付运费等行为， 请注意核实活动信息是否真实可靠，谨慎对待，以免造成资金损失。</view>
			</view>
		</view>
		<popup ref="code" class="popup_code" width="650" left="55" top="110">
			<view class="avatar">
				<image :src="userInfo.avatar" mode=""></image>
			</view>
			<view class="username">{{ userInfo.nickname }}</view>
			<view class="prize_level">{{ awardName }}</view>
			<view class="goods_name">{{ prizeInfo.prizeName }}</view>
			<view class="p_code_img">
				<image :src="codeTempFilePath" mode="aspectFit"></image>
			</view>
			<view class="p_tips">由发起人扫码，验证中奖者身份</view>
			<!-- <view id="canvasMask" @longtap="saveAccpectImage"></view> -->
			<canvas canvas-id="accpectCanvas" id="accpect_canvas"
				:style="{width: posterWidth + 'px', height: posterHeight + 'px'}"></canvas>
			<view class="p_btn" @click="saveAccpectImage">保存到相册</view>
		</popup>
		<view style="position: fixed;top: -999999999999px;transform: translateY(-100%);">
			<ayQrcode ref="qrcode" :modal="true" :url="codeMsg" />
		</view>
		<bottom-action ref="saveImage" :actions="saveImageArr" @onAction="actionSaveImage"></bottom-action>
	</view>
</template>

<script>
	import {
		gameContact,
		apiGetGameInfo,
		prize
	} from '@/rest/api.js'
	import {
		pathToBase64,
		base64ToPath
	} from '@/utils/image-tools/index.js'
	import moment from 'moment'
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue"
	import BottomAction from '@/components/BottomAction.vue'
	export default {
		data() {
			return {
				gameId: '',
				contactInfo: {},
				gameInfo: {},
				userInfo: {},
				prizeInfo: {},
				codeMsg: '',
				levelList: {
					1: '一秀',
					2: '二举',
					3: '四进',
					4: '三红',
					5: '对堂',
					6: '状元'
				},
				awardName: '',
				posterWidth: 358,
				posterHeight: 540,
				saveImageArr: [{
					name: "保存名片到相册",
					value: 1,
				}],
				ctx: null,
				codeTempFilePath: '',
				changeBase64: true
			};
		},
		components: {
			ayQrcode,
			BottomAction
		},
		onLoad(options) {
			let that = this;
			this.userInfo = this.$storage.getUser()
			this.gameId = options.gameId
			this.initData(options)
			this.getGameInfo()
		},
		methods: {
			canvasToImage() {
				if (this.changeBase64) {
					this.changeBase64 = false
					this.codeTempFilePath = this.$refs.qrcode.imagePath
					pathToBase64(this.codeTempFilePath)
						.then(base64 => {
							this.codeTempFilePath = base64
							this.createPoster()
						})
						.catch(error => {
							console.log(error)
						})
					return
				}

				this.createPoster()

			},
			getGameInfo() {
				let gameInfo = this.$storage.get("gameInfo")
				gameInfo.redeemEndTime = moment(gameInfo.game_end_time * 1000).format('YYYY年MM月DD日')
				this.gameInfo = gameInfo
				// apiGetGameInfo({
				// 	game_id: this.gameId,
				// 	template_id: '2021110901'
				// }).then(res => {
				// 	res.redeemEndTime = moment(res.game_end_time * 1000).format('YYYY年MM月DD日')
				// 	this.gameInfo = res
				// })
			},
			openCode() {
				this.canvasToImage()
				this.$refs.code.show()
			},
			saveImage() {
				this.$refs.saveImage.open();
			},

			getImageInfo(url) {
				return new Promise((reslove, reject) => {
					uni.getImageInfo({
						src: url,
						success: res => {
							reslove(res)
						},
						fail(error) {
							reject(error)
						}
					})
				})
			},
			darwRoundRect(x, y, w, h, r, color, ctx) {
				ctx.save()
				ctx.beginPath()

				// 左上弧线
				ctx.arc(x + r, y + r, r, 1 * Math.PI, 1.5 * Math.PI)
				// 左直线
				ctx.moveTo(x, y + r)
				ctx.lineTo(x, y + h - r)
				// 左下弧线
				ctx.arc(x + r, y + h - r, r, 0.5 * Math.PI, 1 * Math.PI)
				// 下直线
				ctx.lineTo(x + r, y + h)
				ctx.lineTo(x + w - r, y + h)
				// 右下弧线
				ctx.arc(x + w - r, y + h - r, r, 0 * Math.PI, 0.5 * Math.PI)
				// 右直线
				ctx.lineTo(x + w, y + h - r)
				ctx.lineTo(x + w, y + r)
				// 右上弧线
				ctx.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI)
				// 上直线
				ctx.lineTo(x + w - r, y)
				ctx.lineTo(x + r, y)

				ctx.setFillStyle(color)
				ctx.fill()
			},
			createPoster: async function() {
				this.$loading.show()
				try {
					const ctx = uni.createCanvasContext('accpectCanvas', this)
					this.darwRoundRect(0, 0, this.posterWidth, this.posterHeight, 10, '#fff', ctx)
					let res = await this.getImageInfo(this.userInfo.avatar)
					// await this.context.drawImage(res.path, 0, 0, 260, 208);
					const avatarWidth = res.width
					const avatarLeft = avatarWidth / 2
					const avatarTop = res.height
					ctx.save()
					ctx.beginPath()
					ctx.arc(this.posterWidth / 2, 66, 35, 0, Math.PI * 2, false);
					ctx.clip()
					ctx.drawImage(res.path, 140, 30, 80, 80)
					ctx.closePath()
					ctx.restore()
					ctx.setFontSize(16)
					ctx.setTextAlign('center')
					ctx.setFillStyle('#333')
					ctx.fillText(this.userInfo.nickname, this.posterWidth / 2, 122)
					this.darwRoundRect(this.posterWidth / 2 - 25, 132, 48, 31, 6, '#FF2E2E', ctx)

					ctx.setFillStyle('#fff')
					ctx.setTextAlign('center')
					ctx.setFontSize(14)
					ctx.fillText(this.awardName, this.posterWidth / 2, 152)
					ctx.setFontSize(16)
					ctx.setFillStyle('#333')
					ctx.fillText(this.prizeInfo.prizeName, this.posterWidth / 2, 184)
					ctx.drawImage(this.$refs.qrcode.imagePath, this.posterWidth / 2 - 120, 210, 260, 260)
					ctx.setFontSize(12)
					ctx.setFillStyle('#aaa')
					ctx.fillText('由发起人扫码，验证中奖者身份', 170, 490)
					setTimeout(() => {
						ctx.draw()
						this.$loading.hide()
						// this.$refs.code.show()
					}, 200)
				} catch (e) {
					this.$loading.hide()
					console.log(e)
				}
			},
			saveAccpectImage() {
				uni.showModal({
					title: '提示',
					content: '是否保存到相册',
					confirmText: '确定',
					confirmColor: '#33CCCC',
					success: res => {
						if (res.confirm) {
							uni.canvasToTempFilePath({
								x: 0,
								y: 0,
								width: this.posterWidth,
								height: this.posterHeight,
								canvasId: 'accpectCanvas',
								success: res => {
									console.log(res.tempFilePath)
									uni.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: function() {
											uni.showToast({
												title: "保存成功",
												icon: "none"
											});
										},
										fail: function() {
											uni.showToast({
												title: "保存失败，请稍后重试",
												icon: "none"
											});
										}
									});
								},
								fail: function() {
									//TODO
								}
							})
						}
					}
				})

			},
			actionSaveImage(e) {
				uni.downloadFile({
					url: this.contactInfo.qr_code_url,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});
						}
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			initData(options) {
				// 获取奖品信息
				this.$loading.show()
				this.awardName = options.awardName
				let codeMsg = {
					gameId: options.gameId,
					verifyCode: options.verifyCode
				}
				codeMsg = JSON.stringify(codeMsg)
				this.$refs.qrcode.crtQrCode(codeMsg)
				this.prizeInfo = {
					prizeName: options.prizeName,
					prizeLevel: 1
				}
				// 获取联系方式
				gameContact({
					userPrizeId: options.uid,
				}).then(res => {
					this.contactInfo = res
					setTimeout(() => {
						// this.createPoster()
						this.$loading.hide()
					}, 1000)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #E83D3D;
	}

	#main {
		padding: 30upx 30upx 0;

		.m_title {
			color: #333333;
			font-weight: 600;
		}

		.p_tips {
			color: #999999;
			font-size: 24upx;
		}

		.p_btn {
			margin-top: 34upx;
			font-size: 34upx;
			border-top: 1upx solid #E5E5E5;
			color: #576B95;
			height: 110upx;
			font-weight: 500;
			line-height: 110upx;
		}

		.popup_code {
			text-align: center;

			#canvasMask {
				position: absolute;
				top: 0;
				bottom: 110upx;
				width: 100%;
			}

			#accpect_canvas {
				opacity: 0 !important;
				top: -10000000px;
				position: fixed;
				z-index: 111;
				transform: translateY(-100%);
				background: rgba($color: #fff, $alpha: 1);
			}

			.avatar {
				width: 140upx;
				height: 140upx;
				border-radius: 50%;
				background: #F0F0F0;
				overflow: hidden;
				margin: 60upx auto 10upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.username {
				color: #333333;
				text-align: center;
				font-size: 32upx;
			}

			.prize_level {
				background: #FF2E2E;
				color: #fff;
				font-size: 28upx;
				text-align: center;
				width: 96upx;
				height: 62upx;
				line-height: 62upx;
				margin: 10upx auto;
				border-radius: 16upx;
				padding: 0rpx 10rpx;
			}

			.goods_name {
				font-weight: 600;
				font-size: 32upx;
				color: #333;
			}

			.p_code_img {
				width: 380upx;
				height: 380upx;
				margin: 42upx auto;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.sub_title {
			color: #999999;
			font-size: 24upx;
		}

		.code_img {
			width: 212upx;
			height: 212upx;
			margin: 44upx auto 0;
		}

		.code_tip {
			margin-top: 24upx;
			color: #999;
			margin-top: 24upx;
			font-size: 24upx;
		}

		.prize_box {
			padding: 30upx;
			border-radius: 36upx;
			margin-bottom: 24upx;
			background: #fff;

			.userinfo {
				display: flex;
				color: #333;
				font-size: 28upx;
				align-items: center;
				padding-bottom: 34upx;
				border-bottom: 1upx solid #F5F5F5;

				.avatar {
					width: 80upx;
					height: 80upx;
					margin-right: 20upx;
					border-radius: 50%;
					background: #eee;
					overflow: hidden;
				}

				.user_title {
					font-size: 28upx;
					color: #999999;
				}
			}

			.code_content {
				padding: 30upx 0;
				text-align: center;
			}

			.prize_item {
				border-top: 1upx solid #F5F5F5;
				height: 160upx;
				align-items: center;
				display: flex;
				border-bottom: 1upx solid #F5F5F5;
				justify-content: space-between;

				.sub_title {
					margin-top: 4upx;
				}

				.icon_code {
					width: 40upx;
					height: 40upx;
					margin-right: 20upx;
					vertical-align: middle;
				}

				.arrow_right {
					width: 14upx;
					height: 24upx;
					vertical-align: middle;
				}
			}

			.tips {
				.m_title {
					margin-top: 30upx;
				}

				.tips_content {
					color: #999999;
					font-size: 24upx;
				}
			}

			.prize_title {
				font-size: 34upx;
				font-weight: 500;
				color: #333333;
			}

			.prize_tips {
				width: 80%;
				margin-top: 10upx;
				font-size: 26upx;
				color: #666666;
			}
		}
	}
</style>
