<template>
	<view class="user-wrap">
		<view class="user-info-wrap">
			<view class="user-info-container">
				<view class="user-status-bar" :style="{height: statusBarHeight + navBarHeight + 'px'}"></view>
				<view class="user-info-body" :style="{padding: statusBarHeight + navBarHeight + 'px 20px 0'}">
					<view class="user-info" @click="updateUserInfo">
						<image class="user-thumb" :src="user.avatar" />
						<view class="user-info-text-wrap">
							<text v-if="authorizeAble" class="user-name">你好 ，{{ user.nickName }}</text>
							<text @click.stop="doLogin" v-else class="user-name">请先登录</text>
							<text v-if="authorizeAble">点击更新个人信息</text>
						</view>
					</view>
				</view>
			</view>
			<view class="user-info-game-wrap">
				<view class="user-info-game-wrap_title">我的游戏</view>
				<view class='user-info-game-wrap_content'>
					<image src="https://static.roi-cloud.com/upload/20211211/60935669192518" mode="aspectFill"
						class="user-info-game-wrap_content_img"></image>
					<view class="user-info-game-wrap_content_body">
						<view class="user-info-game-wrap_content_body_header">
							<view class="user-info-game-wrap_content_body_header_title">摇钱树</view>
							<view class="user-info-game-wrap_content_body_header_status">
								<image src="https://static.roi-cloud.com/upload/20211211/60935669193851"
									mode="aspectFill"></image>
								<text>进行中</text>
							</view>
						</view>
						<view class="user-info-game-wrap_content_body_header_content">
							<view class="user-info-game-wrap_content_body_content_open">
								<image src="https://static.roi-cloud.com/upload/20211211/60935669200408"
									mode="aspectFill"></image>
								<text>开奖方式：即开即中</text>
							</view>
							<view class="user-info-game-wrap_content_body_content_open">
								<image src="https://static.roi-cloud.com/upload/20211211/60935669200828"
									mode="aspectFill"></image>
								<text>游戏时间：2021.12.01-2021.12.31</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight: 45,
				authorizeAble: false,
				user: {},
				winGameCount: 0,
				allGameCount: 0,
				gameCount: 0,
				loading: false,
				gameId: '',
				advertList: {}
			}
		},
	}
</script>

<style lang="scss">
	.user-wrap {
		height: 100vh;

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
				height: 410rpx;
				border-radius: 0 0 24rpx 24rpx;
				background: linear-gradient(to bottom right, #FF4C1A, #FF4A71);
				width: 100%;

				.user-status-bar {
					position: fixed;
					top: 0;
					left: 0;
					right: 0;
					background: linear-gradient(to bottom right, #FF4C1A, #FF4A71);
					z-index: 20;
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
							color: rgba(#FFFFFF, 0.8);
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
				z-index: 10;
				box-sizing: border-box;
				margin-top: -80rpx;
				width: 90%;

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
								color: #333
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
					color: #E83D3D;
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
			background: linear-gradient(to right, #95FFDC, #FF8944, #FF8944);
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
</style>
