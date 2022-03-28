<template>
	<uni-popup @change="handleChange" ref="prizeDetail" class="prizeDetail" width="640" left="56" top="336">
		<view class="wrapper">
			<view class="reword" :style="{background: `url(${
          'https://static.roi-cloud.com/upload/20220328/60935669091940'
        }) no-repeat`,backgroundSize: '100% 100%',}">
				<view class="reword__title">多挣亿点</view>
				<view>
					<view class="reword__contra">恭喜你获得积分</view>
					<view class="reword__point">{{prize.award_point||0}}</view>
				</view>
			</view>

			<view v-if="nearPrize && Object.keys(nearPrize).length!==0" class="p_body_mid_prize_yunbao_exchange"
				@click="handleToReword">
				<view class="header_wrapper">
					<view class="exchange">
						<image :src="nearPrize.prize_url" mode="aspectFill"></image>
					</view>
					<view class="title">
						<view v-if="nearPrize.distance_point==0">现在可以兑换<text
								class="name">{{nearPrize.prize_name}}</text>
						</view>
						<view v-else>{{`还差${nearPrize.distance_point}个${integralName}兑换`}}

						</view>
						<view><text class="name">{{nearPrize.prize_name }}</text></view>
					</view>
				</view>
				<progress class="progress" :stroke-width='10' activeColor='#ff4a1a' backgroundColor='#dbc5a4'
					:border-radius='20'
					:percent="nearPrize.distance_point==0?100: ((nearPrize.prize_point-nearPrize.distance_point)/nearPrize.prize_point)*100" />
			</view>
		</view>
		<!-- <view class="p_body">
			<view class="p_body_mid" v-if="result">
				<view class="p_body_mid_title" v-if="type == 1">恭喜您抽到奖品啦</view>
				<view class="p_body_mid_title" v-else>恭喜您摇到</view>
				<view class="p_body_mid_prize" v-if="type == 1">
					<view class="p_body_mid_prize_item">
						<image :src="prize.prize_url" mode="aspectFill"></image>
						<view>{{prize.prize_name}}</view>
					</view>
					<view class="p_body_mid_prize_item">
						<image src="https://static.roi-cloud.com/upload/20211213/60935669182359" mode="aspectFill">
						</image>
						<view class="bet">
							<text>{{integralName}}</text>
							<text>{{`+ ${prize.award_point}`}}</text>
						</view>

					</view>
				</view>
				<view class="p_body_mid_prize" v-else>
					<view class="p_body_mid_prize_yunbao">
						<view class="p_body_mid_prize_yunbao_title">
							<image src="https://static.roi-cloud.com/upload/20220118/60935669110029" mode="aspectFill">
							</image>
							<text class="yuanbao flap">{{`${prize.award_point}`}}</text>
							<text class="yuanbao_item">{{integralName}}</text>
						</view>
						<view class="p_body_mid_prize_yunbao_tip">
							<image src="https://static.roi-cloud.com/upload/20220118/60935669112147" mode="aspectFill">
							</image>
							<text>直接换奖品，累积冲排名</text>
						</view>
						<view v-if="nearPrize && Object.keys(nearPrize).length!==0"
							class="p_body_mid_prize_yunbao_exchange" @click="handleToReword">
							<view class="title">
								<view v-if="nearPrize.distance_point==0">现在可以兑换<text
										class="name">{{nearPrize.prize_name}}</text></view>
								<view v-else>{{`还差${nearPrize.distance_point}个${integralName}兑换`}}
									<text class="name">{{nearPrize.prize_name}}</text>
								</view>

								<progress class="progress" :stroke-width='10' activeColor='#e73d3d'
									backgroundColor='#fce2dd' :border-radius='20'
									:percent="nearPrize.distance_point==0?100: ((nearPrize.prize_point-nearPrize.distance_point)/nearPrize.prize_point)*100" />
							</view>
							<view class="reword">
								<image :src="nearPrize.prize_url" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="p_body_mid" v-else>
				<view class="no_prize_title">差一点就摇到了</view>
				<image class="no_win" src="https://static.roi-cloud.com/upload/20211213/60935669184341"
					mode="aspectFill"></image>
				<button open-type="share" class="invite_wrapper" data-type="0">
					<image class="invite" src="https://static.roi-cloud.com/upload/20220118/60935669141606"
						mode="aspectFill"></image>
				</button>

			</view>
			<view class="p_body_top">
				<view class="p_body_top_red">
					<image src="https://static.roi-cloud.com/upload/20220118/60935669103354">
					</image>
				</view>
				<view class="p_body_top_button" @click="close" v-if="playTime > 0 || !openShare"> 再来一把 </view>
				<button class="p_body_top_button" open-type='share' data-type='0' v-else> 喊好友加好运 </button>
			</view>
		</view>
		<view class="p_bottom">
			<image @click="$refs.prizeDetail.close()" class="icon_close"
				src="https://static.roi-cloud.com/upload/20211229/60935669091530" mode=""></image>
		</view> -->
	</uni-popup>
</template>

<script>
	import {
		inviteHelp
	} from '@/rest/api.js'
	export default {
		data() {
			return {
				PopOpen: false
			}
		},
		name: "RedEnvelope",
		props: {
			//是否中奖
			result: {
				type: Number,
				default: 0,
				required: true
			},
			prize: {
				type: Object
			},
			type: 1,
			playTime: 0,
			openShare: false,
			nearPrize: {
				type: Object,
				default: {},
			},
			integralName: {
				type: String,
				default: '积分'
			}
		},
		methods: {
			open() {
				this.$refs.prizeDetail.open()
			},
			handleChange(e) {
				this.PopOpen = e.show
				if (e.show) {
					this.$parent.init()
				}
				// && this.$parent.playTime == 4
				// if (!e.show ) {
				// 	setTimeout(function() {
				// 		this.$parent.rainData.visible = true
				// 		this.$parent.rainData.readyTime = 3
				// 	}.bind(this), 300)
				// }
			},
			close() {
				this.$refs.prizeDetail.close()
				this.$emit('play')
			},
			handleClick() {
				this.$emit('handleGameResult', this.result)
			},
			handleToReword() {
				const _this = this
				uni.navigateTo({
					url: `/pages/conversion/conversion?gameId=${_this.$parent.gameId}`
				})
			}
		},

	};
</script>

<style lang="scss">
	.wrapper {
		border-radius: 24rpx;
		box-sizing: border-box;
		min-height: 1100rpx;
		width: 520rpx;

		.reword {
			height: 750rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			padding-top: 100rpx;

			&__title {
				width: 80rpx;
				font-size: 100rpx;
			}

			&__contra {
				color: #FFE3BA;
				font-size: 24rpx;
				margin-top: 40rpx;
			}

			&__point {
				color: #FFE3BA;
				font-size: 80rpx;
				text-align: center;
			}
		}

		.p_body_mid_prize_yunbao_exchange {
			display: flex;
			flex-direction: column;
			// align-items: center;
			// justify-content: space-between;
			padding: 40rpx 40rpx;
			box-sizing: border-box;
			background: #fff4da;
			border-radius: 0 0 24rpx 24rpx;
			// width: 460rpx;
			margin: 0 auto;

			.header_wrapper {
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				margin-bottom: 24rpx;

				.title {
					color: #333;
					font-size: 28rpx;
					margin-top: 12rpx;

					.name {
						font-size: 28rpx;
					}

					image {
						width: 280rpx;
						height: 30rpx;
						margin-top: 16rpx;
					}
				}
			}



			.exchange {
				image {
					width: 108rpx;
					height: 108rpx;
					border-radius: 16upx;
					background: #aaa;
				}
			}
		}
	}
</style>
