<template>
	<view>
		<view class="tips">
			奖品领奖需自行联系商家。 可通过“去领奖”进入详细页面扫二维码添加商家微信或者直接电话（如果商家开放电话）
		</view>
		<view class="btns">
			<view :class="['default_btn',{active:current==0}]" @click="changeType(0)">全部</view>
			<view :class="['default_btn',{active:current==2}]" @click="changeType(2)">实物</view>
			<view :class="['default_btn',{active:current==1}]" @click="changeType(1)">优惠券</view>
		</view>
		<view class="goods_list" v-if="userPrizeList.length>0">
			<view v-for="item in userPrizeList" :class="['item_box',{item_gray:item.isVerify}]" :key="item">
				<view class="item_top">
					<view class="goods_info" @click="showDetail(item)">
						<view class="goods_img">
							<image  :src="item.prizeInfo.prizeImageUrl" mode=""></image>
						</view>
						<view class="goods_title">{{ item.prizeInfo.prizeName }}</view>
					</view>
					<navigator v-if="item.isVerify==0" :url="'./accpect?uid='+item.uid+'&gameId='+item.gameId"
						class="prize_btn">去领奖</navigator>
				</view>
				<view class="item_bottom">
					<text>来源发起：{{ item.gameInfo.gameName }}</text>
					<text v-if="item.verifyTime">领取日期：{{ item.verify_time }}</text>
				</view>
			</view>
		</view>
		<view class="no_data" v-else>
			暂无奖品
		</view>
		<popup ref="phone" class="exchange_poup" width="640" left="56" top="336">
			<view class="content">
				<view class="title">请填写领奖手机号</view>
				<view class="subtitle">填写手机号，方便商家联系你领奖</view>
				<input type="number" v-model="phone" class="phone_input" value="" placeholder="填写手机号" />
			</view>
			<view class="action_part">
				<view class="action_btn" @click="$refs.phone.hide()">取消</view>
				<view class="action_btn active" @click="confirm">是</view>
			</view>
		</popup>
		<popup ref="finish" class="finish_poup" width="640" left="56" top="336">
			<view class="finish_content">
				<view class="title">兑换成功</view>
				<view class="sub_title">使用 5,567 博饼分兑换了</view>
				<image class="goods_img" src="https://static.roi-cloud.com/base/icon_bowl.png" mode="aspectFit"></image>
				<view class="goods_info">MacBook AirM1版本16G SSD 256G</view>
				<view class="btn active">找商家领奖</view>
				<view class="btn " @click="$refs.finish.hide()">继续兑换</view>
			</view>
		</popup>
		<popup ref="prizeDetail" class="prizeDetail" width="640" left="56" top="336">
			<view class="p_header">
				<image @click="$refs.prizeDetail.hide()" class="icon_close" src="https://static.roi-cloud.com/base/close.png" mode=""></image>
			</view>
			<view class="g_info">
				<image :src="curr_show_item.prizeInfo.prizeImageUrl" mode="aspectFill"></image>
				<view class="g_info_name">
					{{ curr_show_item.prizeInfo.prizeName }}
				</view>
			</view>
			<view class="g_content">
				<view class="m_content">{{ curr_show_item.prizeInfo.prizeDetails || '暂无详细说明' }}</view>
				<view class="g_btn" @click="$refs.prizeDetail.hide()">我知道了</view>
			</view>
		</popup>
	</view>
</template>

<script>
	import {
		prizeList
	} from '@/rest/api.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				current: 0,
				page: 1,
				more: true,
				gameId:'',
				userPrizeList: [
					{
						"isVerify": false,
						"prizeInfo": {
							"prizeImageUrl": "https://static.roi-cloud.com/prizeImg/20210913/16/29/613f0bf6a055772189.jpg",
							"prizeName":"保时捷麻将(兑奖区域:沈阳、南宁、柳州、昆明、西安、福州，厦门)"
						},
						"uid":"asdfghj",
						"gameId": 1,
						"gameInfo": {
							"gameName": "建发汽车"        
						},
						"verify_time": "2021-01-01",
						"verifyTime": "2021-01-01"
					}
				],
				curr_show_item:{}
			};
		},
		onReachBottom(e) {
			if (this.more) {
				this.page++
				this.getPrizeList(this.current)
			}
		},
		onLoad(options) {
			this.gameId = options.gameId
			this.getPrizeList()
		},
		methods: {
			changeType(type) {
				this.page = 1
				this.current = type
				this.getPrizeList(type)
			},
			showDetail(item){
				this.curr_show_item = item
				this.$refs.prizeDetail.show()
			},
			getPrizeList(type) {
				let params = {
					page: this.page,
					pageSize: 20,
					gameId: this.gameId
				}
				type && (params.prizeType = type)
				this.$loading.show()
				prizeList(params).then(res => {
					for (let index in res.list) {
						res.list[index].verify_time = moment(res.list[index].verifyTime * 1000).format(
							'YYYY.MM.DD')
					}
					if(params.page==1) this.userPrizeList = res.list
					else this.userPrizeList = [...this.userPrizeList,...res.list]
					if (res.pageCount == this.page) {
						this.more = false
					}else{
						this.more = true
					}
					this.$loading.hide()
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #E83D3D;
	}

	.tips {
		margin: 0 93upx;
		color: #EFEFEF;
		font-size: 24upx;
		margin-top: 56upx;
	}
	
	.prizeDetail{
		.p_header{
			display: flex;
			padding: 40upx;
			justify-content:flex-end;
			
			.icon_close{
				width: 40upx;
				height: 40upx;
			}
		}
		.g_content{
			padding: 70upx;
			.m_content{
				padding-top: 40upx;
				max-height: 300upx;
				overflow: hidden;
				border-top: 1upx solid #D8D8D8;
				color: #666666;
				overflow-y: scroll;
				font-size: 28upx;
				margin-bottom: 60upx;
			}
			.g_btn{
				width: 406upx;
				height: 80upx;
				line-height: 80upx;
				color: #fff;
				text-align: center;
				font-size: 34upx;
				background: #E83D3D;
				border-radius: 51upx;
				margin: 0 auto;
			}
		}
		
		.g_info{
			padding: 0 70upx;
			display: flex;
			image{
				width: 130upx;
				height: 130upx;
				margin-right: 24upx;
			}
			.g_info_name{
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
			width: 176upx;
			height: 70upx;
			text-align: center;
			line-height: 70upx;
			border: 1upx solid #fff;
			color: #fff;
			border-radius: 70upx;

			&.active {
				background: #fff;
				color: #E83D3D;
			}
		}
	}

	.no_data {
		padding: 80upx 0;
		color: #fff;
		fonf-size: 30upx;
		text-align: center;
	}

	.goods_list {
		margin: 50upx 30upx;

		.item_box {
			padding: 0 30upx;
			background: #FFFFFF;
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
				}

				.goods_info {
					display: flex;
					width: 70%;
					height: 100%;
					align-items: center;
				}

				.goods_img {
					width: 88upx;
					height: 88upx;
					border-radius: 16upx;
					background: #eee;
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
						color: #E83D3D;
						text-align: center;
						border-radius: 51upx;
						border: 2upx solid #E83D3D;

						&.active {
							color: #fff;
							background: #E83D3D;
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
								color: #576B95;
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
					background: #E83D3D;
					color: #fff;

					&.default {
						background: #fff;
						border: 1upx solid #E83D3D;
						color: #E83D3D;
					}
				}
			}

			.item_bottom {
				height: 84upx;
				display: flex;
				color: #999999;
				font-size: 24upx;
				border-top: 1upx solid #F5F5F5;
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
