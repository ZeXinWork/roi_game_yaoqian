<template>
	<view style="padding-bottom: 40rpx">
		<view class="tips">
			奖品领奖需自行联系商家。
			可通过“去领奖”进入详细页面扫二维码添加商家微信或者直接电话（如果商家开放电话）
		</view>
		<view class="btns">
			<view :class="['default_btn', { active: current == 0 }]" @click="changeType(0)">全部</view>
			<view :class="['default_btn', { active: current == 1 }]" @click="changeType(1)">实物</view>
			<view :class="['default_btn', { active: current == 2 }]" @click="changeType(2)">优惠券</view>
		</view>
		<view class="goods_list" v-if="userPrizeList.length > 0">
			<view v-for="item in userPrizeList" :class="['item_box', { item_gray: item.is_verify != 0 }]" :key="item">
				<view class="item_top">
					<view class="goods_info" @click="showDetail(item)">
						<view class="goods_img">
							<image class="goods_img_c" :src="item.prize_url" mode=""></image>
						</view>
						<view class="goods_title">
							<text class="content_title">{{ item.prize_name }}</text>
							<text class="content_desc">{{ item.prize_desc }}</text>
						</view>
					</view>
					<!-- <navigator v-if="item.is_verify==0"  class="prize_btn"
					:url="'./accpect?uid='+item.user_prize_id+'&gameId='+item.game_id+'&verifyCode='+item.verify_code+'&prizeName='+item.prize_name">
						去领奖
					</navigator> -->
					<view v-if="item.is_verify == 0" class="prize_btn" @click="receivePrize(item)">去领奖</view>
					<view v-else class="prize_btn_l" @click="showDetail(item)">查看</view>
				</view>
				<view class="item_bottom">
					<text>奖品来源：{{ source[item.prize_source] }}</text>
					<text v-if="item.is_verify != 0">领取日期：{{ item.verify_time }}</text>
					<text v-else>领奖截止日期：{{ item.last_receive_time }}</text>
				</view>
			</view>
		</view>
		<view class="no_data" v-else> 暂无奖品 </view>
		<!-- 领券测试组件 -->
		<!-- <send-coupon  
			@customevent="getcoupon"  
			@sendcoupon="getcoupon"
			:send_coupon_params="send_coupon_params"  
			:sign="sign"  
			:send_coupon_merchant="send_coupon_merchant">  
			<view>领取</view>  
		</send-coupon>  -->
		<navigator delta="2" open-type="navigateBack" class="go_game">去游戏</navigator>
		<popup ref="prizeDetail" class="prizeDetail" width="640" left="56" top="336">
			<view class="p_header">
				<image @click="$refs.prizeDetail.hide()" class="icon_close"
					src="https://static.roi-cloud.com/base/close.png" mode=""></image>
			</view>
			<view class="g_info">
				<image :src="curr_show_item.prize_url" mode="aspectFill"></image>
				<view class="g_info_name">
					{{ curr_show_item.prize_name }}
				</view>
			</view>
			<view class="g_content">
				<view class="m_content">{{
          curr_show_item.prize_desc || '暂无详细说明'
        }}</view>
				<view class="g_btn" @click="$refs.prizeDetail.hide()">我知道了</view>
			</view>
		</popup>
		<uni-popup :maskClick="false" type="dialog" ref="dialog">
			<view class="phone-wrap">
				<view class="phone-container">
					<image @click="onClose" src="https://static.roi-cloud.com/base/close.png" class="phone-close" />
					<view class="phone-title">
						<text>请留手机号</text>
					</view>
					<view class="phone-subtitle">
						<text>作为兑奖备用联系方式，我们会保护你的隐私</text>
					</view>
					<view class="phone-input-wrap" v-if="phone">
						<input :value="phone" cursor-spacing="10" @input="changePhone" class="phone-input"
							placeholder="填写手机号" disabled="true" />
					</view>
					<button v-else open-type="getPhoneNumber" @getphonenumber="getphonenumber" type="primary"
						class="phone_button" :disabled="false">
						微信手机号登录
					</button>
					<view v-if="codeError" class="phone-error-msg"><text>{{ codeError }}</text></view>

					<view v-if="agreeError" class="agree-error-msg"><text>{{ agreeError }}</text></view>
					<view v-if="phone != ''" :class="['phone-button', { 'button-disabled': !phone }]"
						@click="savePhone">
						<text>保存</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		cleanObject
	} from '@/utils/utils.js'
	import '@/static/css/game.scss'
	import {
		prizeList,
		getPhone,
		userLogin
	} from '@/rest/api.js'
	import moment from 'moment'
	import {
		uploadTrackLog
	} from '@/rest/trackApi.js'

	export default {
		data() {
			return {
				current: 0,
				page: 0,
				more: true,
				gameId: '',
				phone: '',
				userPrizeList: [],
				curr_show_item: {},
				path: '/pages/index/index?gameId=' + this.gameId,
				goReceiveItem: {},
				user_info: {},
				gameInfo: {},
				integralName: '积分',
				source: ['', '即开即中', '积分兑换', '粉丝PK排行榜'],
				// 这部分是领券测试数据
				// send_coupon_params: [{
				// 	stock_id: "16278961",
				// 	out_request_no: "123456789",
				// 	create_coupon_merchant: "1616627254"
				// }],
				// send_coupon_merchant: "1616627254",
				// sign: "82C0D72F3069FF2559611F7D6274B5AE98165378607B3CF09999F4664DE9D3C3"
			}
		},
		onReachBottom(e) {
			if (this.more) {
				this.page++
				this.getPrizeList(this.current)
			}
		},
		onshow() {
			this.path = '/pages/index/index?gameId=' + this.gameId
		},
		onLoad(options) {
			this.gameId = options.gameId
			this.path = '/pages/index/index?gameId=' + this.gameId
			this.getPrizeList()
			const user = this.$storage.getUser()
			this.user_info = user
			this.phone = user.phone
			const gameInfo = this.$storage.get('gameInfo')
			this.gameInfo = gameInfo
			if (gameInfo.integral_name) {
				this.integralName = gameInfo.integral_name
				this.source = ['', '即开即中', this.integralName + '兑换', '粉丝PK排行榜']
			}
		},
		methods: {
			// 领券回调方法
			// getcoupon(params) {
			// 	console.log("getcoupon", params)
			// },
			changeType(type) {
				this.page = 0
				this.current = type
				this.getPrizeList(type)
			},
			showDetail(item) {
				this.curr_show_item = item
				this.$refs.prizeDetail.show()
			},
			getPrizeList(type) {
				let params = {
					offset: this.page * 20,
					limit: 20,
					gameId: this.gameId,
				}
				if (type != undefined && type > 0) params.prizeType = type
				this.$loading.show()
				prizeList(params).then((res) => {
					for (let index in res) {
						res[index].last_receive_time = moment(
							res[index].last_receive_time * 1000
						).format('YYYY.MM.DD')
					}
					if (res) {
						if (params.offset == 0) {
							this.userPrizeList = res
						} else {
							this.userPrizeList = [...this.userPrizeList, ...res]
						}
						if (res.length == 20) {
							this.more = true
						} else {
							this.more = false
						}
					} else {
						this.more = false
					}
					this.$loading.hide()
				})
			},
			receivePrize(item) {
				if (this.phone) {
					this.goReceiveItem = item
					this.toReceive(item)
				} else {
					const _this = this
					const user = _this.$storage.getUser()
					console.log(_this)
					uni.login({
						success(res) {
							const params = {
								avatarUrl: user.avatar,
								nickName: user.nickname,
								platform: 'yaoyaoqian',
								code: res.code,
							}
							userLogin(params).then((res) => {
								if (res.errno === '1') {
									uni.showToast({
										title: `请求异常！`,
										icon: 'error',
									})
									return
								}
								const user = _this.$storage.getUser()

								_this.$storage.setUser({
									...user,
									...res,
								})
							})
						},
					})
					this.$refs.dialog.open()
				}
			},
			getphonenumber(e) {
				// 不允许授权
				if (e.detail.errMsg !== 'getPhoneNumber:ok') {
					uni.showToast({
						title: '请授权！',
						icon: 'error',
					})
					return
				}

				const user = this.$storage.getUser()
				const params = {
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv,
					agreement_id: user.agreement_id,
					privacy_clause_id: user.privacy_clause_id,
					platform: 'yaoyaoqian',
				}
				getPhone(params)
					.then((res) => {
						if (res.errno) {
							uni.showToast({
								title: '出错啦',
								icon: 'error',
							})
							return
						}
						user.phone = res.phoneNumber
						this.phone = res.phoneNumber
						this.$storage.setUser(user)
					})
					.catch((err) => {
						uni.showToast({
							title: '出错啦',
							icon: 'error',
						})
					})
			},
			savePhone() {
				uni.showToast({
					title: '保存成功',
				})
				this.$refs.dialog.close()
			},
			onClose() {
				this.$refs.dialog.close()
			},
			toReceive(item) {
				this.trackEvent('claimPrizeInMyPrizePage', {})
				uni.navigateTo({
					url: './accpect?uid=' +
						item.user_prize_id +
						'&gameId=' +
						item.game_id +
						'&verifyCode=' +
						item.verify_code +
						'&prizeName=' +
						item.prize_name +
						'&awardName=' +
						item.award_name +
						'&prizeItem=' +
						JSON.stringify(this.goReceiveItem),
				})
			},
			trackEvent(name, data) {
				const locationTime = this.$storage.get('getLocationTime')
				const params = cleanObject({
					prizeId_evar: this.goReceiveItem.award_id,
					prizeName_evar: this.goReceiveItem.prize_name,
					prizeType_evar: this.goReceiveItem.prize_type,
					prizeExchangePoint_evar: this.goReceiveItem.prize_point,
					prizeLevel_evar: this.goReceiveItem.award_seq,
					'3rdpartyUserID_evar': this.user_info.userId,
					locationLongitude_evar: locationTime.longitude,
					locationLatitude_evar: locationTime.latitude,
					gameID_evar: this.gameId,
					gameName_evar: this.gameInfo.name,
					userOpenID_evar: this.user_info.openid + '',
					timeStamp_evar: Date.parse(new Date()) + '',
				})
				this.$uma.trackEvent(name, params)
				uploadTrackLog(name, params)
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #e83d3d;
	}

	.phone_button {
		border-radius: 92upx;
		// width: 480upx;
		height: 80upx;
		line-height: 80upx;
		margin: 40upx;
	}

	.tips {
		margin: 0 93upx;
		color: #efefef;
		font-size: 24upx;
		margin-top: 56upx;
	}

	.prizeDetail {
		.p_header {
			display: flex;
			padding: 40upx;
			justify-content: flex-end;

			.icon_close {
				width: 40upx;
				height: 40upx;
			}
		}

		.g_content {
			padding: 70upx;

			.m_content {
				padding-top: 40upx;
				max-height: 300upx;
				overflow: hidden;
				border-top: 1upx solid #d8d8d8;
				color: #666666;
				overflow-y: scroll;
				font-size: 28upx;
				margin-bottom: 60upx;
			}

			.g_btn {
				width: 406upx;
				height: 80upx;
				line-height: 80upx;
				color: #fff;
				text-align: center;
				font-size: 34upx;
				background: #e83d3d;
				border-radius: 51upx;
				margin: 0 auto;
			}
		}

		.g_info {
			padding: 0 70upx;
			display: flex;

			image {
				width: 130upx;
				height: 130upx;
				margin-right: 24upx;
			}

			.g_info_name {
				width: 1upx;
				flex: 1;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}

	.btns {
		display: flex;
		margin: 40upx 82upx 0;
		justify-content: space-between;

		.default_btn {
			width: 178upx;
			height: 70upx;
			text-align: center;
			line-height: 70upx;
			border: 1upx solid #fff;
			color: #fff;
			border-radius: 70upx;

			&.active {
				background: #fff;
				color: #e83d3d;
			}
		}
	}

	.no_data {
		padding: 80upx 0;
		color: #fff;
		font-size: 30upx;
		text-align: center;
	}

	.go_game {
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		width: 406rpx;
		margin: auto;
		background-image: linear-gradient(180deg, #fff6b1 0%, #ffcf79 100%);
		box-shadow: 0 10rpx 20rpx 0 #c12525, inset 0 -10rpx 20rpx 0 #ebac32;
		border-radius: 51rpx;
		font-family: PingFangSC-Semibold;
		font-size: 34rpx;
		color: #966502;
		letter-spacing: 0.26rpx;
		margin-bottom: 20px;
	}

	.goods_list {
		margin: 50upx 30upx;

		.item_box {
			padding: 0 30upx;
			background: #ffffff;
			margin-bottom: 24upx;
			border-radius: 36upx;

			.item_top {
				height: 148upx;
				line-height: 148upx;
				display: flex;
				padding-bottom: 30upx;
				align-items: center;
				justify-content: space-between;

				.goods_title {
					color: #333333;
					font-weight: 600;
					display: flex;
					flex-direction: column;

					.content_title {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						line-clamp: 1;
						-webkit-box-orient: vertical;
						text-overflow: -o-ellipsis-lastline;
						width: 310upx;
					}

					.content_desc {
						margin-top: 10rpx;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						overflow: hidden;
						-webkit-box-orient: vertical;
						font-size: 20rpx;
						color: rgb(156, 153, 153);
						width: 300rpx;
					}
				}

				.goods_info {
					display: flex;
					width: 70%;
					height: 100%;
					align-items: center;
				}

				.goods_img {
					width: 110upx;
					height: 110upx;
					border-radius: 16upx;
					background: #eee;
				}

				.goods_img_c {
					border-radius: 16rpx;
				}

				.finish_content {
					text-align: center;
					padding: 64upx 118upx;

					.title {
						font-weight: 500;
						font-size: 34upx;
					}

					.sub_title {
						margin-top: 10upx;
					}

					.goods_img {
						margin-top: 38upx;
						width: 240upx;
						height: 240upx;
					}

					.goods_info {
						width: 320upx;
						margin: 30upx auto 0;
					}

					.btn {
						margin-top: 30upx;
						width: 406upx;
						height: 80upx;
						line-height: 80upx;
						color: #e83d3d;
						text-align: center;
						border-radius: 51upx;
						border: 2upx solid #e83d3d;

						&.active {
							color: #fff;
							background: #e83d3d;
						}
					}
				}

				.exchange_poup {
					.content {
						padding: 60upx 48upx;
						margin: 0 auto;
						text-align: center;
						color: #333;
						font-size: 34upx;

						.title {
							font-size: 34upx;
							font-weight: 500;
						}

						.subtitle {
							color: #999999;
							margin-top: 10upx;
							font-size: 26upx;
						}

						.phone_input {
							margin-top: 44upx;
							height: 72upx;
							text-align: left;
							line-height: 72upx;
							border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
						}
					}

					.action_part {
						display: flex;
						height: 110upx;
						line-height: 110upx;
						border-top: 1upx solid rgba(0, 0, 0, 0.1);

						.action_btn {
							flex: 1;
							text-align: center;
							font-weight: 500;
							font-size: 34upx;

							&.active {
								color: #576b95;
								border-left: 1upx solid rgba(0, 0, 0, 0.1);
							}
						}
					}
				}

				.goods_title {
					width: 1upx;
					flex: 1;
					margin-left: 20upx;
					color: #333;
					height: 88upx;
					line-height: 40upx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.prize_btn {
					font-size: 28upx;
					width: 138upx;
					text-align: center;
					height: 56upx;
					border-radius: 56upx;
					line-height: 56upx;
					background: #e83d3d;
					color: #fff;

					&.default {
						background: #fff;
						border: 1upx solid #e83d3d;
						color: #e83d3d;
					}
				}

				.prize_btn_l {
					font-size: 28rpx;
					width: 138rpx;
					text-align: center;
					height: 56rpx;
					border-radius: 56rpx;
					line-height: 56rpx;
					background: #fff;
					color: #e83d3d;
					border-color: #e83d3d;
					border: solid 2rpx;
				}
			}

			.item_bottom {
				height: 84upx;
				display: flex;
				color: #999999;
				font-size: 24upx;
				border-top: 1upx solid #f5f5f5;
				align-items: center;
				justify-content: space-between;
			}

			&.item_gray {
				background: url(https://static.roi-cloud.com/base/icon_accpet_prize.png) no-repeat #fff;
				background-position: 80% 100%;
				background-size: 234upx 184upx;

				.goods_title {
					color: #999;
				}
			}
		}
	}
</style>
