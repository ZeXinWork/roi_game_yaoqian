<template>
	<uni-popup ref="prizeDetail" class="prizeDetail" width="640" left="56" top="336">
		<view class="p_body">
			<view class="p_body_mid" v-if="result">
				<view class="p_body_mid_title" v-if="type == 1">恭喜您抽到奖品啦</view>
				<view class="p_body_mid_title" v-else>恭喜您抽到积分啦</view>
				<view class="p_body_mid_prize" v-if="type == 1">
					<view class="p_body_mid_prize_item">
						<image :src="prize.prize_url" mode="aspectFill"></image>
						<view>{{prize.prize_name}}</view>
					</view>
					<view class="p_body_mid_prize_item">
						<image src="https://static.roi-cloud.com/upload/20211213/60935669182359" mode="aspectFill">
						</image>
						<view class="bet">
							<text>积分</text>
							<text>{{`+ ${prize.award_point}`}}</text>
						</view>

					</view>
				</view>
				<view class="p_body_mid_prize" v-else>
					<view class="p_body_mid_prize_integral">
						<image v-if="prize.template_award_id == 1" src="https://static.roi-cloud.com/upload/20211230/60935669173307" mode="aspectFill"></image>
						<image v-if="prize.template_award_id == 2" src="https://static.roi-cloud.com/upload/20211231/60935669105816" mode="aspectFill"></image>
						<image v-if="prize.template_award_id >= 3 || prize.template_award_id == 0" src="https://static.roi-cloud.com/upload/20211230/60935669173445" mode="aspectFill"></image>
						<view class="get_integral">
							<view><span>{{`+ ${prize.award_point} `}}</span> 积分</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else class="p_body_mid">
				<view class="no_prize">很遗憾，没有中奖</view>
				<image class="no_win" src="https://static.roi-cloud.com/upload/20211213/60935669184341"
					mode="aspectFill"></image>
			</view>
			<view class="p_body_top">
				<view class="p_body_top_red">
					<image
						src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzExIiBoZWlnaHQ9IjEzMiIgdmlld0JveD0iMCAwIDMxMSAxMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMxMC4wMSAwbC0uMDA1IDExNS43MThjMCA4LjgzNy03LjE2MyAxNi0xNiAxNmgtMjc4Yy04LjgzNiAwLTE2LTcuMTYzLTE2LTE2TDAgMGM0NS40NTkgMjAuMTU3IDk4LjQ0IDMxLjcxOCAxNTUuMDA1IDMxLjcxOCA1Ni41NjYgMCAxMDkuNTQ3LTExLjU2MSAxNTUuMDA1LTMxLjcxOHoiIGZpbGw9IiNFQTM1MkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==">
					</image>
				</view>
				<view class="p_body_top_pink">
					<image
						src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzExIiBoZWlnaHQ9IjE0MSIgdmlld0JveD0iMCAwIDMxMSAxNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMxMC4wMSAwbC0uMDA1IDEyNC43MThjMCA4LjgzNy03LjE2MyAxNi0xNiAxNmgtMjc4Yy04LjgzNiAwLTE2LTcuMTYzLTE2LTE2TDAgMGM0NS40NTkgMjAuMTU3IDk4LjQ0IDMxLjcxOCAxNTUuMDA1IDMxLjcxOCA1Ni41NjYgMCAxMDkuNTQ3LTExLjU2MSAxNTUuMDA1LTMxLjcxOHoiIGZpbGw9IiNGMUE0OUEiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==">
					</image>
				</view>
				<view class="p_body_top_button" @click="close" v-if="playTime > 0 || !openShare"> 再来一把 </view>
				<button class="p_body_top_button" open-type='share' data-type='1' v-else> 喊好友加好运 </button>
			</view>
		</view>
		<view class="p_bottom">
			<image @click="$refs.prizeDetail.close()" class="icon_close"
				src="https://static.roi-cloud.com/upload/20211229/60935669091530" mode=""></image>
		</view>
	</uni-popup>
</template>

<script>
	import {
		inviteHelp
	} from '@/rest/api.js'
	export default {
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
			openShare: false
		},
		methods: {
			open() {
				this.$refs.prizeDetail.open()
			},
			close() {
				this.$refs.prizeDetail.close()
			},
			handleClick() {
				this.$emit('handleGameResult', this.result)
			},
			handlePlay() {
				this.$emit('play')
			}
		},
	
	};
</script>

<style lang="scss">
	.bet {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.one_coin_view {
		position: absolute;
		top: 114rpx;
		left: 23%;
		.one_coin {
			width: 300rpx;
			height: 250rpx;
		}
	}

	.two_coin_view{
		position: absolute;
		z-index: 3;
		top: 5%;
		.two_coin {
			width: 560rpx;
			height: 440rpx;
		}
	}
	
	.three_coin_view {
		position: absolute;
		margin-top: 20%;
		.three_coin {
			width: 560rpx;
			height: 440rpx;
		}
	}

	

	.prizeDetail {
		.p_body {
			width: 600upx;
			min-height: 650upx;
			border-radius: 32upx;
			background-image: linear-gradient(#eba278, #ff2626);
			position: relative;

			.p_body_mid {
				width: 510upx;
				position: absolute;
				min-height: 750upx;
				border-radius: 32upx;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				background-image: linear-gradient(#fcf4b9, #e3d36d);

				.no_prize {
					width: 100%;
					box-sizing: border-box;
					text-align: center;
					margin: 48rpx 0 54rpx 0
				}

				.no_win {
					width: 220rpx !important;
					height: 196rpx !important;
					margin: 0 auto !important;
					padding-top: 40px;
					display: block;
				}


				.p_body_mid_title {
					text-align: center;
					padding: 30upx;
					font-size: 34upx;
					font-weight: 600;
				}

				.p_body_mid_prize {
					display: flex;
					flex-direction: column;
					margin-top: 0rpx;
					.p_body_mid_prize_item {
						background-color: #fefcf1;
						border-radius: 20upx;
						min-height: 152upx;
						align-items: center;
						display: flex;
						width: 540upx;
						margin-left: -15upx;
						margin-top: 10upx;
						margin-bottom: 10upx;
						box-sizing: border-box;
						padding: 20rpx 20rpx 20rpx 20rpx;
						align-items: center;

						image {
							width: 100rpx;
							height: 100rpx;
							margin-right: 30rpx;
							border-radius: 16rpx;
						}

						view {
							font-size: 28rpx;
							flex: 1;
						}
					}

					.p_body_mid_prize_integral {
						display: flex;
						flex-direction: column;
						align-items: center;
						image {
							width: 450rpx;
							height: 330rpx;
							// margin: auto 40rpx;
						}
						.get_integral {
							font-size: 28rpx;
							margin-top: -40rpx;
							view {
								display: flex;
								line-height: 100rpx;
							}
							span {
								font-size: 60rpx;
								padding-right: 20rpx;
							}		
						}
					}
				}
			}

			.p_body_top {
				z-index: 100;
				width: 100%;
				height: 268upx;
				position: absolute;
				bottom: 0;

				.p_body_top_pink {
					height: 272rpx;
					width: 100%;
					position: absolute;
					z-index: 1;
				}

				.p_body_top_red {
					height: 290rpx;
					position: absolute;
					width: 100%;
					z-index: 2;
				}

				.p_body_top_button {
					height: 80rpx;
					position: absolute;
					width: 400rpx;
					z-index: 3;
					border-radius: 80rpx;
					text-align: center;
					line-height: 80rpx;
					left: 0;
					right: 0;
					bottom: 50rpx;
					margin: auto;
					background-image: linear-gradient(180deg, #F7EEB2 0%, #ECD87A 100%);
				}
			}
		}

		.p_bottom {
			position: absolute;
			left: 40%;
			padding: 40upx;

			.icon_close {
				width: 80upx;
				height: 80upx;
			}
		}
	}
</style>
