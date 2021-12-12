<template>
	<view class='detail'>
		<view class="user-info-game-wrap_content">
			<image src="https://static.roi-cloud.com/upload/20211211/60935669192518" mode="aspectFill"
				class="user-info-game-wrap_content_img"></image>
			<view class="user-info-game-wrap_content_body">
				<view class="user-info-game-wrap_content_body_header">
					<view class="user-info-game-wrap_content_body_header_title">摇钱树</view>
					<view class="user-info-game-wrap_content_body_header_status">
						<image src="https://static.roi-cloud.com/upload/20211211/60935669193851" mode="aspectFill"></image>
						<text>进行中</text>
					</view>
				</view>
				<view class="user-info-game-wrap_content_body_header_content">
					<view class="user-info-game-wrap_content_body_content_open mb-8">
						<image src="https://static.roi-cloud.com/upload/20211211/60935669200408" mode="aspectFill"></image>
						<text>开奖方式：即开即中</text>
					</view>
					<view class="user-info-game-wrap_content_body_content_open">
						<image src="https://static.roi-cloud.com/upload/20211211/60935669200828" mode="aspectFill"></image>
						<text>游戏时间：2021.12.01-2021.12.31</text>
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

			};
		}
	}
</script>

<style lang="scss" scoped>
	.detail{
		padding: 48rpx 40rpx 0 24rpx;
	}
	.mb-8 {
		margin-bottom: 16rpx;
	}
	.user-info-game-wrap_content {
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
</style>
