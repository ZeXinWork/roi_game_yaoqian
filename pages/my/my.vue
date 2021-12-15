<template>
	<view class="user-wrap">
		<view class="user-info-wrap">
			<view class="user-info-container">
				<view class="user-info-body">
					<view class="user-info" @click="updateUserInfo">
						<image class="user-thumb" :src="user.avatar" />
						<view class="user-info-text-wrap">
							<text v-if="user.userId" class="user-name">你好 ，{{ user.nickname }}</text>
							<text @click.stop="doLogin" v-else class="user-name">请先登录</text>
							<text v-if="authorizeAble">点击更新个人信息</text>
						</view>
					</view>
				</view>
			</view>
			<view class="user-info-game-wrap">
				<view class="user-info-game-wrap_title">我的游戏</view>
				<view class="user-info-game-wrap_content" v-for="item of gameList" :ikey='item.game_id'>
					<image :src="item.logo_url" mode="aspectFill" class="user-info-game-wrap_content_img"></image>
					<view class="user-info-game-wrap_content_body">
						<view class="user-info-game-wrap_content_body_header">
							<view class="user-info-game-wrap_content_body_header_title">{{item.name}}</view>
							<view class="user-info-game-wrap_content_body_header_status">
								<image src="https://static.roi-cloud.com/upload/20211212/60935669153723"
									mode="aspectFill"></image>
								<text>{{getStatus(item.status)}}</text>
							</view>
						</view>
						<view class="user-info-game-wrap_content_body_header_content">
							<view class="user-info-game-wrap_content_body_content_open mb-8">
								<image src="https://static.roi-cloud.com/upload/20211211/60935669193851"
									mode="aspectFill"></image>
								<text>{{`开奖方式：${item.lottery_type===1?'即开即中':'积分兑换'}`}}</text>
							</view>
							<view class="user-info-game-wrap_content_body_content_open">
								<image src="https://static.roi-cloud.com/upload/20211212/60935669153633"
									mode="aspectFill"></image>
								<text>{{`游戏时间：${item.game_start_time}-${item.game_end_time}`}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="more">
					<text @click="handleMore">查看更多</text>
				</view>
			</view>

		</view>

		<view class="agreement-wrapper__text">
			<view>使用本产品服务表示您已同意</view>
			<text class="cert-item-xieyi" @click="openProtocol('agreement')">
				络绎有客用户服务协议
			</text>
			和
			<text class="cert-item-xieyi" @click="openProtocol('privacy')">络绎有客用户隐私条款</text>
		</view>
	</view>
</template>

<script>
	import {
		getMyList
	} from '@/rest/api.js'
	import {
		getGameStatus
	} from '../../utils/utils.js'
	export default {
		onLoad() {
			const user = this.$storage.getUser()
			this.user = user
			getMyList({
				offset: 1,
				limit: 3
			}).then((res) => {
				if (Array.isArray(res)) {
					this.gameList = res
				} else {
					uni.showToast({
						title: "出错啦",
						icon: "error"
					})
				}

			}).catch(err => {
				uni.showToast({
					title: "出错啦",
					icon: "error"
				})
			})

		},
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight: 45,
				authorizeAble: false,
				user: {},
				loading: false,
				gameList: [], //我的游戏列表
			}
		},
		methods: {
			getStatus(status) {
				const res = getGameStatus(status)
				return res
			},
			handleMore() {
				uni.navigateTo({
					url: './detail'
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
		}
	}
</script>

<style lang="scss">
	.mb-8 {
		margin-bottom: 16rpx;

	}

	.more {
		text-align: center;
		font-size: 28rpx;
		color: #8e8e8e;
		margin-top: 74rpx;
	}

	.user-wrap {
		min-height: 100vh;
		padding-bottom: 100rpx;

		.uni-card {
			border-radius: 12px !important;
			margin: 12px 16px !important;
		}

		.uni-card__header-title-text {
			font-size: 15px !important;
			font-weight: bold !important;
		}

		.uni-card__header-extra-text {
			color: #999999 !important;
			font-size: 10px !important;
		}

		.user-info-wrap {
			display: flex;
			flex-direction: column;
			align-items: center;

			.user-info-container {
				height: 300rpx;
				border-radius: 0 0 24rpx 24rpx;
				background: linear-gradient(to bottom right, #ff4c1a, #ff4a71);
				width: 100%;

				.user-status-bar {
					position: fixed;
					background: linear-gradient(to bottom right, #ff4c1a, #ff4a71);
					margin-top: 800rpx;
					box-sizing: border-box;
				}

				.user-info-body {
					padding: 0 40rpx;

					.user-info {
						margin: 32rpx 0 0;
						display: flex;
						align-items: center;

						.user-thumb {
							width: 128rpx;
							height: 128rpx;
							background: #fff;
							border-radius: 100%;
						}

						.user-info-text-wrap {
							display: flex;
							flex-direction: column;
							margin: 0 0 0 24rpx;
							color: rgba(#ffffff, 0.8);
							font-size: 24rpx;

							.user-name {
								font-weight: bold;
								font-size: 36rpx;
								color: #fff;
							}
						}
					}
				}
			}

			.user-info-game-wrap {
				background-color: #fff;
				border-radius: 20px;
				padding: 20rpx 36rpx 54rpx 36rpx;
				box-sizing: border-box;
				margin-top: -80rpx;
				width: 90%;
				margin-bottom: 100rpx;

				&_title {
					font-size: 30rpx;
					box-sizing: border-box;
					margin-bottom: 50rpx;
				}

				&_content {
					border-bottom: 2rpx solid #f5f5f5;
					padding-bottom: 32rpx;
					box-sizing: border-box;
					display: flex;

					&_img {
						width: 192rpx;
						height: 192rpx;
					}

					&_body {
						flex: 1;
						margin-left: 32rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						&_header {
							display: flex;
							justify-content: space-between;

							&_title {
								font-size: 40rpx;
								color: #333;
							}

							&_status {
								display: flex;
								align-items: center;

								image {
									width: 32rpx;
									height: 32rpx;
									margin-right: 8rpx;
								}
							}
						}

						&_content {
							&_open {
								display: flex;
								align-items: center;

								image {
									width: 24rpx;
									height: 24rpx;
									margin-right: 8rpx;
								}

								text {
									color: #787878;
									font-size: 20rpx;
								}
							}
						}
					}
				}

				&_content:not(:last-child) {
					margin-bottom: 44rpx;
				}


			}
		}

		.user-report-wrap {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;

			.user-report-container {
				display: flex;
				flex-direction: column;
				color: #999999;
				font-size: 12px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				.user-report-title {
					color: #333333;
					font-weight: bold;
					font-size: 22px;
				}

				.user-report-subtitle {
					color: rgba(#333333, 0.5);
					font-size: 16px;
					font-weight: normal;
				}

				.user-report-more {
					color: #e83d3d;
				}
			}
		}

		.user-tool-wrap {
			margin: 16px 16px 0 16px;
			padding: 16px;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			border-radius: 12px;
			background-color: #fff;

			.user-tool {
				display: flex;
				flex-direction: column;
				color: #666666;
				font-size: 12px;
				align-items: center;

				.user-tool-icon {
					width: 40px;
					height: 40px;
					margin: 0 0 6px;
				}
			}
		}

		.user-ad-wrap {
			margin: 16px 16px 0;
			border-radius: 12px;
			background: linear-gradient(to right, #95ffdc, #ff8944, #ff8944);
			height: 85px;
			overflow: hidden;

			swiper,
			image,
			.swiper-item {
				width: 100%;
				height: 100%;
			}
		}
	}

	.agreement-wrapper__text {
		font-size: 22rpx;
		color: #b3b2b2;
		bottom: 100rpx;
		width: 100%;
		text-align: center;
	}

	.cert-item {
		box-shadow: inset 0px -0.5px 0px #eeeeee;
		margin: 30rpx 0rpx;

		&-xieyi {
			color: #0059ff;
		}

		&-xieyi-checkbox {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;

			radio {
				transform: scale(0.7);
			}
		}
	}
</style>
