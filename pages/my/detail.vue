<template>
	<view class='detail'>
		<ListScrollView @handleScrollLower='handleScrollLower' @refreshHandler='getMyList'>
			<view class="user-info-game-wrap">
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
			</view>
		</ListScrollView>
	</view>
	</view>

</template>

<script>
	import ListScrollView from '@/components/ListScrollView.vue'
	import {
		getMyListMore
	} from '@/rest/api.js'
	import {
		getGameStatus
	} from '../../utils/utils.js'
	export default {
		data() {
			return {
				queryObj: {
					offset: 1,
					limit: 10,
				},
				gameList: [],
				noData: false
			};
		},
		methods: {
			getMyList() {
				getMyListMore(this.queryObj).then((res) => {
					console.log(res, "res")
					this.gameList = res
				})
			},
			getStatus(status) {
				const res = getGameStatus(status)
				return res
			},
			handleScrollLower() {
				console.log("到底了")
				if (noData) {
					return
				}
				this.queryObj.limit = this.queryObj.limit + 10
				this.getMyList()
			}
		},
		components: {
			ListScrollView
		},
		onLoad() {
			this.getMyList()
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		padding: 48rpx 40rpx 0 24rpx;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.activity-list-wrapper {
		flex: 1;
		width: auto;
		box-sizing: border-box;
		overflow: hidden;
	}

	page {
		height: 100%;
		display: flex;
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

			&_content:not(:last-child) {
				margin-bottom: 44rpx;
			}
		}
	}
</style>
