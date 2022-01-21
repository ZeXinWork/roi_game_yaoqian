<template>
	<view class='detail'>
		<view class="user-info-game-wrap">
			<ListScrollView @handleScrollLower='handleScrollLower'>
				<view class="user-info-game-wrap_content" v-for="item of gameList" :key='item.game_id' @click="toGame(item)">
					<image src="https://static.roi-cloud.com/upload/20211223/60935669155516" mode="aspectFill" class="user-info-game-wrap_content_img"></image>
					<view class="user-info-game-wrap_content_body">
						<view class="user-info-game-wrap_content_body_header">
							<view class="user-info-game-wrap_content_body_header_title">{{item.name}}</view>
							<view class="user-info-game-wrap_content_body_header_status">
								<image v-if="item.status == 3" src="https://static.roi-cloud.com/upload/20211212/60935669153723"
									mode="aspectFill"></image>
								<text :class="item.status == 3 ? 'doing_text': 'did_text'">{{getStatus(item.status)}}</text>
							</view>
						</view>
						<view class="user-info-game-wrap_content_body_header_content">
							<view class="user-info-game-wrap_content_body_content_open mb-8">
								<image src="https://static.roi-cloud.com/upload/20211223/60935669153957"
									mode="aspectFill"></image>
								<text>{{`开奖方式：${item.lottery_type===1?'即开即中':'元宝兑换'}`}}</text>
							</view>
							<view class="user-info-game-wrap_content_body_content_open">
								<image src="https://static.roi-cloud.com/upload/20211212/60935669153633"
									mode="aspectFill"></image>
								<text>{{`游戏时间：${momentData(item.game_start_time)}-${momentData(item.game_end_time)}`}}</text>
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
	import _ from 'lodash'
	import {
		getMyListMore
	} from '@/rest/api.js'
	import moment from 'moment'
	import {
		getGameStatus
	} from '../../utils/utils.js'
	export default {
		data() {
			return {
				queryObj: {
					offset: 0,
					limit: 10,
				},
				gameList: [],
				noData: false
			};
		},
		methods: {
			toGame(game) {
				uni.navigateTo({ url: `../index/index?gameId=${game.game_id}` })
			},
			momentData(date) {
				return moment(date * 1000).format('YYYY.MM.DD')
			},
			getMyList() {
				getMyListMore(this.queryObj).then((res) => {
					if (this.queryObj.offset === 0) {
						this.gameList = res
					} else {
						if (_.isArray(res)){
							if (res.length < this.queryObj.limit) {
								this.noData = true
							}
							this.gameList = [...this.gameList, ...res]
						}
					}

				})
			},
			getStatus(status) {
				const res = getGameStatus(status)
				return res
			},
			handleScrollLower() {

				if (this.noData) {
					return
				}
				this.queryObj.offset = this.queryObj.offset + this.queryObj.limit
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
		padding: 48rpx 0rpx 0 24rpx;
		display: flex;
		flex-direction: column;
		flex: 1;
		max-height: 100vh;
	}

	.user-info-game-wrap {
		width: auto;
		box-sizing: border-box;
		overflow: hidden;
		height: 90vh;

	}

	page {
		height: 100%;
		display: flex;
	}

	.mb-8 {
		margin-bottom: 16rpx;
	}

	.user-info-game-wrap_content {
		border-bottom: 2rpx solid #efeaea;
		// padding-bottom: 32rpx;
		box-sizing: border-box;
		display: flex;
		// padding-right: 40rpx;
		padding: 20rpx 40rpx 32rpx 10rpx;

		&_img {
			width: 192rpx;
			height: 192rpx;
			border-radius: 20rpx;
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
					width: 260rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				&_status {
					display: flex;
					align-items: center;

					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 8rpx;
					}

					.doing_text {
						font-size: 25rpx;
						color: #E83D3D;
						letter-spacing: 0.2rpx;
					}

					.did_text {
						font-size: 25rpx;
						color: #8B8B8B;
						letter-spacing: 0.2rpx;
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
