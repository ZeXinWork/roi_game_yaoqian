<template>
	<view class="main" v-if="gameInfo.game_id">
		<view class="rule_box">
			<view class="main_title">游戏规则</view>
			<view class="subtitle">
				<view>嘿！欢迎来到{{ gameInfo.name }}</view>
				<view class="text_center">摇摇签活动</view>
			</view>
			<view class="gift_list">
				<view class="gift_item" v-for="item in gameAward" :key="item.game_award_id">
					<view class="gift_img">
						<image :src="item.prize_url" mode=""></image>
					</view>
					<text>{{ item.prize_name }}</text>
				</view>
			</view>
			<view class="row_line">
				<view class="number">1</view>
				<view class="row_text">以上为主要奖品图片，还有更多其他礼品等你赢！</view>
			</view>
			<view v-if="gameInfo.gameType === 1" class="row_line">
				<view class="number">2</view>
				<view class="row_text">游戏赢{{integralName}}，凭{{integralName}}换好礼，最快一天即可换奖品！</view>
			</view>
			<view v-if="gameInfo.gameType === 2" class="row_line">
				<view class="number">2</view>
				<view class="row_text">游戏即玩即中对应奖品，最快一把即可领奖品！</view>
			</view>
			<view class="row_line" v-if="gameInfo.isSvip">
				<view class="number">3</view>
				<view class="row_text">累计总游戏{{integralName}}计入【排行榜】，争夺更多大奖！</view>
			</view>
		</view>
		<view class="rule_box">
			<view class="radius_item">
				<view class="radiu_title">活动时间</view>
				<view class="radiu_line">{{ gameInfo.game_play_time}}</view>
			</view>
			<view class="radius_item">
				<view class="radiu_title">活动范围</view>
				<view class="radiu_line">
					<text>{{area}}</text>
				</view>
			</view>
			<view class="radius_item">
				<view class="radiu_title">参与方式</view>
				<view class="row_line">
					<view class="number">1</view>
					<view class="row_text">所有用户均可参与，每人每天有6次免费游戏次数。</view>
				</view>
				<view class="row_line">
					<view class="number">2</view>
					<view class="row_text">所有游戏次数当天23:59:59清零。</view>
				</view>
				<view class="row_line" v-if="!openShare == 'false'">
					<view class="number">3</view>
					<view class="row_text">{{`邀请好友助力成功，双方各加一次游戏次数（多邀多得，上不封顶），每天可助力他人${gameInfo.help_times}次（当天不可重复助力）。`}}</view>
				</view>
			</view>
		</view>
		<view v-if="Number(gameInfo.lottery_type) === 2" class="rule_box">
			<view class="radiu_title">游戏玩法</view>
			<view class="row_line">
				<view class="number">1</view>
				<view class="row_text">游戏赢游戏{{integralName}}</view>
			</view>
			<view class="row_line">
				<view class="number">2</view>
				<view class="row_text">所得游戏{{integralName}}，将累计计入个人总游戏{{integralName}}及可兑换游戏{{integralName}}中</view>
			</view>
			<view class="row_line">
				<view class="number">3</view>
				<view class="row_text">凭累计的可兑换游戏{{integralName}}可前往【奖品兑换】处兑换奖品。奖品数量有限，兑完即止。点击首页【奖品兑换】即可进入。</view>
			</view>
			<view class="row_line" v-if="gameInfo.isSvip">
				<view class="number">4</view>
				<view class="row_text">累计的总游戏{{integralName}}还将计入首页【排行榜】，活动结束后，排行榜得分最高的前几位将额外获得大奖。</view>
			</view>
		</view>
		<view class="rule_box">
			<view class="radiu_title">奖品兑换</view>
			<view class="row_line">
				<view class="number">1</view>
				<view class="row_text">奖品兑换及查看：点击首页【兑换奖品】可
					兑换奖品，奖品使用方式详见兑换详情页。
					奖品兑换处点击【我的奖品】可查看已兑换的
					奖品。</view>
			</view>
			<view class="row_line" v-if="gameInfo.game_pk_plugin.length!==0">
				<view class="number">2</view>
				<view class="row_text">
					粉丝PK排行榜奖品领取：游戏结束后，请于领奖期限内联系游戏客服领取奖品，逾期视为放弃。
				</view>
			</view>
		</view>
		<view @click="back" class="btn">
			去游戏
		</view>
	</view>
</template>

<script>
	import {
		gameRule,
		apiGetGameInfo
	} from '@/rest/api.js'
	import moment from 'moment'
	import _ from 'lodash'
	export default {
		data() {
			return {
				gameId: 0,
				rule: {
					prizeInfo: []
				},
				gameInfo: {},
				openShare: false,
				gameAward: [],
				integralName: '积分',
			};
		},
		computed: {
			area() {
				if (!_.isEmpty(this.gameInfo.areas)) {
					if (this.gameInfo.areas.length === 1) {
						return this.gameInfo.areas[0].address
					} else {
						return `${this.gameInfo.areas[0].address}等${this.gameInfo.areas.length}个区域`
					}
				} else {
					return `不限地区`
				}

			}
		},
		onLoad(options) {
			let gameInfo = this.$storage.get("gameInfo")
			this.gameInfo = gameInfo
			this.gameAward = gameInfo.game_award.slice(0, 3)
			if (gameInfo.integral_name) {
				this.integralName = gameInfo.integral_name
			}
			console.log(options)
			this.openShare = options.openShare
			if (!gameInfo.game_id) {
				uni.showToast({
					title: "出错啦"
				})
				return
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			getGameInfo() {
				apiGetGameInfo({
					gameId: this.gameId,
				}).then(res => {
					this.gameInfo = res
				})
			},
			getRule() {
				gameRule({
					gameId: this.gameId
				}).then(res => {
					res.endTime = moment(res.endTime * 1000).format('YYYY年MM月DD日')
					res.startTime = moment(res.startTime * 1000).format('YYYY年MM月DD日')
					res.redeemEndTime = moment(res.redeemEndTime * 1000).format('YYYY年MM月DD日')
					this.rule = res
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #E83D3D;
	}

	.main {
		padding-bottom: 146upx;
	}

	.radiu_title {
		background: #FF4545;
		color: #fff;
		padding: 0 36upx;
		border-radius: 72upx;
		display: inline-block;
		height: 72upx;
		line-height: 72upx;
	}

	.btn {
		height: 80upx;
		line-height: 80upx;
		margin: 52upx 172upx 0;
		color: #E83D3D;
		text-align: center;
		background: #fff;
		border-radius: 80upx;
	}

	.radius_item {
		margin-bottom: 60upx;
	}

	.radiu_line {
		color: #666;
		margin: 20upx 0 0 10upx;
	}

	.row_line {
		margin-top: 34upx;
		display: flex;

		.number {
			background: #FF4545;
			width: 44upx;
			height: 44upx;
			text-align: center;
			color: #fff;
			border-radius: 50%;
			line-height: 44upx;
		}

		.row_text {
			width: 1upx;
			flex: 1;
			font-size: 28upx;
			color: #666666;
			margin-left: 20upx;
		}
	}

	.rule_box {
		background: #fff;
		margin: 24upx 30upx 0;
		border-radius: 36upx;
		padding: 30upx;

		.main_title {
			font-size: 34upx;
			font-weight: 600;
			color: #333333;
			text-align: center;
		}

		.subtitle {
			margin-top: 18upx;
			font-size: 28upx;
			padding-bottom: 18upx;
			text-align: center;
		}

		.gift_list {
			display: flex;
			justify-content: space-around;
			padding: 40upx 0;
			border-top: 1upx solid #F5F5F5;
			border-bottom: 1upx solid #F5F5F5;

			.gift_item {
				width: 162upx;
				text-align: center;
				color: #333;

				.gift_img {
					width: 120upx;
					height: 120upx;
					margin: 0 auto 18upx;
					border-radius: 16upx;
					background: #eee;
					overflow: hidden;

				}
			}
		}
	}

	.text_center {
		text-align: center;
	}
</style>
