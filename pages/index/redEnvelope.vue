<template>
	<uni-popup @change="handleChange" ref="prizeDetail" class="prizeDetail" width="640" left="56" top="336">
		<view class="p_body">
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
							<text>元宝</text>
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
							<text class="yuanbao_item">元宝</text>
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
								<view v-else>{{`还差${nearPrize.distance_point}个元宝兑换`}}
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
		</view>
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
	.bet {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.flap {
		animation: flip-horizontal-bottom 1s cubic-bezier(0.455, 0.030, 0.515, 0.955) forwards;
	}



	@-webkit-keyframes flip-horizontal-bottom {
		0% {
			-webkit-transform: rotateX(0);
			transform: rotateX(0);
		}

		25% {
			-webkit-transform: rotateX(-100deg);
			transform: rotateX(-180deg);
		}

		50% {
			-webkit-transform: rotateX(-180deg);
			transform: rotateX(-180deg);
		}

		75% {
			-webkit-transform: rotateX(0);
			transform: rotateX(0);
		}

		100% {
			-webkit-transform: rotateX(0);
			transform: rotateX(0);
		}
	}

	@keyframes flip-horizontal-bottom {
		0% {
			-webkit-transform: rotateX(0);
			transform: rotateX(0);
		}

		50% {
			-webkit-transform: rotateX(-180deg);
			transform: rotateX(-180deg);
		}

		100% {
			-webkit-transform: rotateX(0);
			transform: rotateX(0);
		}
	}

	.progress {
		margin-top: 16rpx;
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

	.two_coin_view {
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
			min-height: 880upx;
			border-radius: 32upx;
			background-image: linear-gradient(#fa7d6d, #e7514e);
			position: relative;
			box-sizing: border-box;
			padding-top: 32rpx;


			.p_body_mid {
				width: 524upx;
				min-height: 660upx;
				border-radius: 32upx;
				margin: auto;
				background-image: linear-gradient(#fff7e0, #e8d7cb);

				.no_prize_title {
					width: 100%;
					box-sizing: border-box;
					text-align: center;
					padding-top: 20rpx;
					color: #976F1D;
					font-weight: bold;
				}

				.no_win {
					width: 176rpx !important;
					height: 152rpx !important;
					margin: 0 auto !important;
					padding-top: 60rpx;
					display: block;
				}

				.invite_wrapper {
					background: none;
					width: 100% !important;
					margin: 0 auto;

					&:after {
						border: none;
					}

					.invite {
						width: 460rpx;
						height: 160rpx;
						margin: 0 auto !important;
						display: block;
						padding-top: 80rpx;

					}
				}


				.p_body_mid_title {
					text-align: center;
					padding: 30upx;
					font-size: 34upx;
					color: #976F1D;
					font-weight: bold;
				}

				.p_body_mid_prize {
					display: flex;
					flex-direction: column;
					margin-top: 0rpx;



					.p_body_mid_prize_yunbao {
						.p_body_mid_prize_yunbao_title {
							box-sizing: border-box;
							display: flex;
							align-items: flex-end;
							justify-content: center;

							image {
								width: 100rpx;
								height: 80rpx;
							}

							.yuanbao {
								margin-right: 32rpx;
								color: #FA4542;
								font-size: 140rpx;
								height: 160rpx;
								line-height: 160rpx;
								font-weight: bold;
							}

							.yuanbao_item {
								color: #FA4542;
								font-size: 34rpx;
								margin-bottom: 30rpx;
							}
						}

						.p_body_mid_prize_yunbao_tip {
							font-size: 26rpx;
							color: #BF9B66;
							margin: 40rpx 0rpx;
							box-sizing: border-box;
							display: flex;
							justify-content: center;
							align-items: center;

							image {
								width: 38rpx;
								height: 28rpx;
								margin-right: 8rpx;

							}
						}

						.p_body_mid_prize_yunbao_exchange {
							height: 160rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 40rpx 24rpx;
							box-sizing: border-box;
							background: #FFFFFF;
							border-radius: 20rpx;
							width: 460rpx;
							margin: 0 auto;

							.title {
								color: #976F1D;
								font-size: 26rpx;


								.name {
									color: #E73D3D
								}

								image {
									width: 280rpx;
									height: 30rpx;
									margin-top: 16rpx;
								}
							}

							.reword {
								image {
									width: 108rpx;
									height: 108rpx;
									border-radius: 16upx;
									background: #aaa;
									margin-left: 26rpx;
								}
							}
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
				height: 336upx;
				position: absolute;
				bottom: 0;
				left: 0;

				.p_body_top_pink {
					height: 272rpx;
					width: 100%;
					position: absolute;
					z-index: 1;
				}

				.p_body_top_red {
					height: 336rpx;
					position: absolute;
					width: 100%;
					z-index: 2;

					image {
						width: 100%;
						height: 100%;
					}
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
					bottom: 90rpx;
					margin: auto;
					color: #976F1D;
					font-weight: bold;
					font-size: 34rpx;
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
