<template>
	<!-- <view class="wrap" :style="{
      backgroundColor:
        gameInfo.game_pk_plugin && gameInfo.game_pk_plugin.length !== 0
          ? '#ff2626'
          : '#fdccb9',
    }"> -->
	<view class="wrap" :style="{
      backgroundColor: '#ff1500',
    }">
		<navbar :params="{
        navColor: navColor,
        title: gameInfo.logo_url ? '' : `${gameInfo.name || ''}`,
      }" class="">
			<view v-if="gameInfo.logo_url" class="diy_logo" :style="
          'background:url(' +
          gameInfo.logo_url +
          ') center center no-repeat;background-size:contain'
        " />
		</navbar>
		<!-- <view id="main" :style="{
        paddingTop: navbarHeight + 'px',
        background: `url(${
          gameInfo.backgroundInfo.backgroundUrl ||
          'https://static.roi-cloud.com/upload/20211229/60935669175808'
        }) no-repeat`,
        backgroundSize: '100%',
      }"> -->
		<!-- https://static.roi-cloud.com/upload/20220113/60935669134954 -->
		<!-- https://static.roi-cloud.com/upload/20220114/60935669172731 -->
		<!-- https://static.roi-cloud.com/upload/20220117/60935669135726 -->
		<!-- https://static.roi-cloud.com/upload/20220117/60935669135726 -->
		<!-- https://static.roi-cloud.com/upload/20220117/60935669174041 -->
		<view id="main" :style="{
        paddingTop: navbarHeight + 'px',
        minHeight: minHeight + 'px',
        background: `url(${
          gameInfo.backgroundInfo.backgroundUrl ||
          'https://static.roi-cloud.com/upload/20220114/60935669172731'
        }) no-repeat`,
        backgroundSize: '100%',
      }">
<!-- 			<button @click="startPlay">开始</button>
			<button @click="pause">停止</button> -->

			<canvas :style="{display:hideAmCanv?'none':'inline-block'}" canvas-id="lottie_demo" id="lottie_demo"
				type="2d" />
			<!-- <button @click="init">初始化</button> -->
			<!-- <button @click='startPlay'>开始玩</button> -->
			<!-- 	<image class="levl-1 trunk" src="https://static.roi-cloud.com/upload/20211229/60935669183338"
				mode="aspectFill">
			</image> -->
			<!-- <image class="cloud" src="https://static.roi-cloud.com/upload/yaoyaoshu/a0c6bdea09dc971d00d2a4656f5afe3.png"
				mode="aspectFill"></image> -->
			<view class="barrage1" v-show="radomIndex===1">
				<image :src="showCash.avatar" mode="aspectFill"></image>
				<view>
					<text class="user_info">{{showCash.nickname}}已兑换</text>
					<text class="reword">{{showCash.prize_name}}</text>
				</view>
			</view>
			<view class="barrage2" v-show="radomIndex===2">
				<image :src="showCash.avatar" mode="aspectFill"></image>
				<view>
					<text class="user_info">{{showCash.nickname}}已兑换</text>
					<text class="reword">{{showCash.prize_name}}</text>
				</view>
			</view>
			<view class="barrage3" v-show="radomIndex===3">
				<image :src="showCash.avatar" mode="aspectFill"></image>
				<view>
					<text class="user_info">{{showCash.nickname}}已兑换</text>
					<text class="reword">{{showCash.prize_name}}</text>
				</view>
			</view>
			<view class="barrage4" v-show="radomIndex===4">
				<image :src="showCash.avatar" mode="aspectFill"></image>
				<view>
					<text class="user_info">{{showCash.nickname}}已兑换</text>
					<text class="reword">{{showCash.prize_name}}</text>
				</view>
			</view>
			<view class="barrage5" v-show="radomIndex===5">
				<image :src="showCash.avatar" mode="aspectFill"></image>
				<view>
					<text class="user_info">{{showCash.nickname}}已兑换</text>
					<text class="reword">{{showCash.prize_name}}</text>
				</view>
			</view>

			<image id="trunkId" :class="[
          'levl-1',
          { swiper_anumation: !playAnimation },
          { trunk_slow: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211230/60935669143532" mode="aspectFill">
			</image>
			<image :class="[
          'levl-2 ',
          { swiper_anumation_slow: !playAnimation },
          { trunk_most: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211229/60935669181927" mode="aspectFill">
			</image>
			<image :class="[
          'levl-3 ',
          { swiper_anumation_most: !playAnimation },
          { trunk_slow: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211230/60935669144124" mode="aspectFill">
			</image>
			<image :class="[
          'levl-4 ',
          { swiper_anumation: !playAnimation },
          { trunk: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211229/60935669184846" mode="aspectFill">
			</image>
			<image :class="[
          'levl-5 ',
          { swiper_anumation_slow: !playAnimation },
          { trunk_slow: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211230/60935669145511" mode="aspectFill">
			</image>
			<image :class="[
          'levl-6 ',
          { swiper_anumation_most: !playAnimation },
          { trunk: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211230/60935669145930" mode="aspectFill">
			</image>
			<image :class="[
          'levl-7 ',
          { swiper_anumation: !playAnimation },
          { trunk: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211229/60935669191217" mode="aspectFill">
			</image>
			<image :class="[
          'levl-8 ',
          { swiper_anumation_slow: !playAnimation },
          { trunk_slow: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211229/60935669191506" mode="aspectFill">
			</image>

			<image :class="[
          'hongbao1',
          { swiper_anumation_slow: playAnimation },
          { Wobble_move: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211230/60935669091359" mode="aspectFill">
			</image>
			<image :class="[
          'hongbao2',
          { swiper_anumation_slow: !playAnimation },
          { Wobble_move: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211230/60935669091359" mode="aspectFill">
			</image>
			<image :class="[
          'hongbao3 ',
          { swiper_anumation: !playAnimation },
          { Wobble_move: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211230/60935669091359" mode="aspectFill">
			</image>
			<image :class="[
          'hongbao4  ',
          { swiper_anumation_slow: !playAnimation },
          { Wobble_move: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211230/60935669091359" mode="aspectFill">
			</image>
			<image :class="[
          'hongbao5 ',
          { swiper_anumation: !playAnimation },
          { Wobble: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211230/60935669091359" mode="aspectFill">
			</image>
			<image :class="[
          'hongbao6 ',
          { swiper_anumation_most: !playAnimation },
          { Wobble: playAnimation },
        ]" src="https://static.roi-cloud.com/upload/20211230/60935669091359" mode="aspectFill">
			</image>
			<view class="swiper_wrap">
				<uni-notice-bar showIcon="true" color="#fff" background-color="transparent" scrollable="true"
					single="true"
					text="活动发起方和参与用户需同意《络绎有客游戏用户服务协议》方可进行游戏，使用本服务即视为已阅读并同意受本协议的约束。活动发起方不得利用本程序从事国家法律法规禁止的违法犯罪活动，不得上架法律法规禁止或限制发布的产品，活动发起方对所提供奖品的质量和兑奖承诺全权负责。">
				</uni-notice-bar>
			</view>
			<view class="tips" v-if="Number(gameInfo.status) == 3">
				游戏时间：{{
          gameInfo.game_start_time + " - " + gameInfo.game_end_time
        }}
			</view>
			<view class="tips" v-else-if="Number(gameInfo.status) > 3">
				{{ gameStatus(Number(gameInfo.status)) }}
			</view>
			<canvas canvas-id="shareCanvas" id="shareCanvas"></canvas>
			<!-- <view class="bowl_title">
				<image src="https://static.roi-cloud.com/base/icon_bo-title.png" mode=""></image>
			</view> -->
			<view class="bowl rule-wrapper">
				<view :data-url="
            '/pages/rule/rule?gameId=' +
            gameId +
            '&openShare=' +
            isOpenShareContent
          " class="rule" @click="toPage">游戏规则</view>
			</view>

			<view style="position: relative">
				<view :data-url="'/pages/conversion/conversion?gameId=' + gameId" class="gift_wrap" @click="toPage">
					<image class="icon_gift" src="https://static.roi-cloud.com/base/icon_gift.png" mode=""></image>
					<view class="shadow">兑换奖品</view>
				</view>
				<view style="position: relative">
					<view v-if="gameInfo.gameType == 2" :data-url="'/pages/prize/prize?gameId=' + gameId"
						class="gift_wrap" @click="toPage">
						<image class="icon_gift" src="https://static.roi-cloud.com/base/icon_gift.png" mode=""></image>
						<view class="shadow">兑换奖品</view>
					</view>
					<view class="chance">
						您还能摇
						<view class="number">
							{{ playTime }}
						</view>
						次红包
					</view>
					<view class="de_btn btn_primary" @click="play">摇一摇</view>
				</view>
			</view>
			<redEnvelope @handleGameResult="handleGameResult" @play="play" ref="redEnvelope" :result="gameResult.result"
				:prize="gameResult.prize" :playTime="playTime" :type="gameInfo.lottery_type"
				:openShare="isOpenShareContent" :nearPrize='nearPrize' />
			<view v-if="isOpenShareContent" style="position: relative" class="de_btn zl_btn" @click="popShow('share')">
				喊好友来游戏</view>
			<view class="recorde_ad_wrap" style="position: relative">
				<!-- <view class="recorde_ad_wrap" :style="{'min-height': gameInfo && gameInfo.ad_info.length > 0 ? '400rpx' : '200rpx'}"> -->
				<view class="record_wrap">
					<text @click="popShow('score')">积分明细</text>
					<view class="line"></view>
					<text @click="onMy">个人中心</text>
					<view class="line"></view>
					<text @click="onHelper">助力记录</text>
				</view>
				<view class="gift_swiper" v-if="advertList.length > 0">
					<swiper :circular="true" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item v-for="item in advertList" :key="item">
							<view class="swiper-item">
								<image :src="item.ad_pic_url" mode="aspectFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>

			<view class="rank_ad_wrap" v-if="
          (gameInfo.game_pk_plugin &&
            gameInfo.game_pk_plugin.length &&
            gameInfo.game_pk_plugin.length !== 0) ||
          gameInfo.open_pk_plugin
        ">
				<view class="rank_wrap">
					<view class="rank_title">
						<view class="rank_title_left">
							<view class="icon_rangk"></view>
							<text>排行榜</text>
						</view>
					</view>

					<view class="rank_time">
						{{ gameInfo.game_start_time }} - {{ gameInfo.game_end_time }}
					</view>
					<view class="my_rank">
						<view class="my_rank_top">
							<view class="rank_avatar">
								<image :src="user.avatar" mode=""> </image>
							</view>
							<view class="my_rank_item">
								<view class="my_rank_title">我的排行</view>
								<view class="rank_item_number">{{
                  userRank.ranking || 0
                }}</view>
							</view>
							<view class="my_rank_item">
								<view class="my_rank_title">总积分</view>
								<view class="rank_item_number">{{
                  userRank.integral || 0
                }}</view>
							</view>
						</view>
						<button v-if="isOpenShareContent" class="share_btn" open-type="share" data-type="2"
							:data-rank="userRank.ranking">
							<image class="icon_wechat" src="https://static.roi-cloud.com/base/icon_wechat.png" mode="">
							</image>
							<text>晒排名 加次数</text>
						</button>
					</view>
					<view class="rank_list" v-if="Number(gameInfo.open_pk_award)">
						<view v-for="(item, index) in kingofKingsList" :key="index" class="mlr30">
							<view class="rank_box">
								<view class="gift_image">
									<image :src="item.info.prize_url" mode="aspectFill"></image>
								</view>
								<view class="gift_right">
									<view class="gift_title">
										<view class="gift_level">{{ item.info.ranking_name }}</view>
										<view class="no_number">{{ item.range }}</view>
									</view>
									<view class="">{{ item.info.prize_name }}</view>
								</view>
							</view>
							<view class="box_item" v-for="(user, userIndex) in item.list" :key="userIndex">
								<view class="box_item_left">
									<image v-if="user.no_num < 4" class="no_icon" :src="
                      'https://static.roi-cloud.com/base/icon_no_' +
                      user.no_num +
                      '.png'
                    " mode="aspectFill">
									</image>
									<view class="no_icon" v-else>{{ user.no_num }}</view>
									<image class="avatar" :src="user.avatar" mode=""></image>
									<text class="username">{{ user.nickname }}</text>
								</view>
								<text>{{ user.ranking_integral }}</text>
							</view>
						</view>

						<view class="border_top">
							<view class="box_item" v-for="(user, userIndex) in otherKingList" :key="userIndex">
								<view class="box_item_left">
									<view class="no_icon">{{ user.no_num }}</view>
									<image class="avatar" :src="user.avatar" mode=""></image>
									<text class="username">{{ user.nickname }}</text>
								</view>
								<text>{{ user.ranking_integral }}</text>
							</view>
						</view>
					</view>
					<view class="rank_list" v-else>
						<view v-for="(user, userIndex) in kingofKingsList" :key="userIndex" class="box_item">
							<view class="box_item_left">
								<image v-if="user.no_num < 4" class="no_icon" :src="
                    'https://static.roi-cloud.com/base/icon_no_' +
                    user.no_num +
                    '.png'
                  " mode="aspectFill">
								</image>
								<view class="no_icon" v-else>{{ user.no_num }}</view>
								<image class="avatar" :src="user.avatar" mode=""></image>
								<text class="username">{{ user.nickname }}</text>
							</view>
							<text>{{ user.ranking_integral }}</text>
						</view>
					</view>
				</view>
			</view>
			<popup ref="onceShare" width="650" bgColor="#FFF8DC">
				<view class="p_title">立即分享游戏
					<image @click="$refs.onceShare.hide()" class="icon_close"
						src="https://static.roi-cloud.com/base/icon_close.png" mode=""></image>
				</view>

				<button open-type="share" class="pop_share_btn" data-type="0">
					<image src="https://static.roi-cloud.com/base/icon_share_wechat.png" mode=""></image>
					<view class="share_text"> 邀请好友 </view>
				</button>
			</popup>

			<popup ref="share" width="650" bgColor="#FFF8DC">
				<view class="p_title" v-if="playTime == 0">邀请好友，赢游戏次数
					<image @click="$refs.share.hide()" class="icon_close"
						src="https://static.roi-cloud.com/base/icon_close.png" mode=""></image>
				</view>
				<view class="p_title" v-else>多邀多得上不封顶
					<image @click="$refs.share.hide()" class="icon_close"
						src="https://static.roi-cloud.com/base/icon_close.png" mode=""></image>
				</view>
				<view class="share_img_wrap">
					<image src="https://game0.roi-cloud.com/static/images/share_red_img.png" mode="aspectFit"></image>
				</view>
				<button open-type="share" class="pop_share_btn" data-type="0" v-if="user.userId">
					<image src="https://static.roi-cloud.com/base/icon_share_wechat.png" mode=""></image>
					<view class="share_text"> 邀请好友 </view>
				</button>
				<view class="pop_share_btn" v-else @click="$refs.share.hide(), toLogin()">
					<image src="https://static.roi-cloud.com/base/icon_share_wechat.png" mode=""></image>
					<view class="share_text"> 邀请好友 </view>
				</view>
			</popup>

			<!-- 分数排行 -->
			<uni-popup ref="score" width="650">
				<view class="score_detail">
					<view class="p_title f-normal">积分明细
						<image @click="$refs.score.close()" class="icon_close"
							src="https://static.roi-cloud.com/base/icon_close.png" mode=""></image>
					</view>
					<view class="score_menu">
						<view :class="['score_item', { active: currentScoreItem == 1 }]" @click="changeItem(1)">中奖明细
						</view>
						<view :class="['score_item', { active: currentScoreItem == 2 }]" @click="changeItem(2)">兑奖明细
						</view>
					</view>
					<view v-if="currentScoreItem == 1">
						<view class="score_list" v-if="scoreDetailList.length > 0">
							<scroll-view @scrolltolower.stop="getAward" scroll-y style="height: 500rpx" :scroll-top="0"
								scroll-top>
								<view class="score_list_item" v-for="item in scoreDetailList" :key="item.id">
									<view class="item_left" v-if="Number(gameInfo.lottery_type) === 1">{{ item.name }}
									</view>
									<view class="item_right">
										<text class="t_blod" v-if="item.integral">{{
                      `+${item.integral}`
                    }}</text>
										<view class="item_right_time">
											<view class="item_right_time_date">{{ item.date }} {{ item.time }}</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
						<view class="no_data" v-else>暂无数据</view>
					</view>
					<view v-if="currentScoreItem == 2">
						<view class="score_list" v-if="exchangeList.length > 0">
							<scroll-view @scrolltolower.stop="getExchange" scroll-y style="height: 500rpx">
								<view class="score_list_item" v-for="item in exchangeList" :key="item">
									<view class="item_left">{{ item.name }}</view>
									<view class="item_right">
										<text class="t_blod" v-if="item.integral">{{
                      `-${item.integral}`
                    }}</text>
										<view class="item_right_time">
											<view class="item_right_time_date">{{ item.date }}</view>
											<view class="">
												{{ item.time }}
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
						<view class="no_data" v-else>暂无数据</view>
					</view>
				</view>
			</uni-popup>

			<uni-popup ref="help" width="650" :canClose="false">
				<view class="help_pop">
					<view class="p_title">
						<text>助力记录</text>
						<image @click.stop="closeHelp" class="icon_close"
							src="https://static.roi-cloud.com/base/icon_close.png" mode=""></image>
					</view>
					<view class="help_menu">
						<view :class="['help_item', { active: currentHelpItem == 1 }]" @click="changeHelpTypeList(1)">
							好友助力
						</view>
						<view :class="['help_item', { active: currentHelpItem == 2 }]" @click="changeHelpTypeList(2)">
							我的助力
						</view>
					</view>
					<view class="help_tip">
						<image src="https://static.roi-cloud.com/base/icon_bulb.png" mode=""></image>
						<text>每人每天可邀请无限好友助力（不可重复助力）</text>
					</view>
					<view class="help_list" v-if="helper.list.length > 0">
						<scroll-view v-show="showItem == 1" :scroll-y="true" ref="scroll" :scroll-top="helperTop"
							@scrolltolower.stop.prevent="helpMeListMore" @scroll="helpScroll" style="height: 100%">
							<view class="help_list_item" v-for="item in helper.list" :key="item.id">
								<view class="help_left">
									<view class="avatar">
										<image :src="item.avatar" mode=""></image>
									</view>
									<view class="username">{{ item.name }}</view>
								</view>
								<view class="help_right">
									<text>{{ item.date }} </text>
									<text class="ml10" v-if="currentHelpItem == 1">为我助力</text>
									<text class="ml10" v-else>为Ta助力</text>
								</view>
							</view>
						</scroll-view>
						<scroll-view v-show="showItem == 2" :scroll-y="true" ref="scroll" :scroll-top="helperTop"
							@scrolltolower.stop.prevent="helpMeListMore" @scroll="helpScroll" style="height: 100%">
							<view class="help_list_item" v-for="item in helper.list" :key="item.recordId">
								<view class="help_left">
									<view class="avatar">
										<image :src="item.userInfo.avatar" mode=""></image>
									</view>
									<view class="username">{{ item.userInfo.nickName }}</view>
								</view>
								<view class="help_right">
									<text>{{ getTime(item.helpTime) }} </text>
									<text class="ml10">为TA助力</text>
								</view>
							</view>
						</scroll-view>
					</view>
					<view v-else class="no_data"> 暂无数据 </view>
				</view>
			</uni-popup>

			<popup ref="assistance" class="assistance_pop" width="630">
				<view class="avatar">
					<image :src="helperInfo.avatar" mode=""></image>
				</view>
				<text class="username">{{ helperInfo.nickName }}</text>
				<!-- 分享中奖 -->
				<view v-if="helperInfo.prizeName">
					<view class="ass_m_title mt50">在[ {{ helperInfo.gameName }} ] 获得了</view>
					<view class="g_img">
						<view class="goods_wrap">
							<image :src="helperInfo.prize && helperInfo.prize.prizeImageUrl" mode=""></image>
							<view class="prizeName">
								{{ helperInfo.prizeName }}
							</view>
						</view>
					</view>
					<view class="ass_m_title">你也来一把</view>
				</view>
				<!-- 分享排行 -->
				<view v-else-if="helperInfo.king.rankNumber > 0">
					<view class="ass_m_title mt50">在[ {{ helperInfo.gameName }} ] 排名</view>
					<view class="g_rank_no">第 {{ helperInfo.king && helperInfo.king.rankNumber }} 名</view>
					<view class="ass_m_title">帮我冲刺一下</view>
				</view>
				<!-- 未中奖 -->
				<view v-else>
					<view class="ass_m_title mt50">正在参与[ {{ helperInfo.gameName }} ]</view>
					<view class="ass_m_title">你也来一把</view>
				</view>

				<view class="mt10">一起游戏，各得一次机会</view>
				<view class="play_btn mt50" @click="gameHelp">我也来一把</view>
				<view class="ad_wrap" v-if="advertList[4].length > 0">
					<swiper :circular="true" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item v-for="item in advertList[4]" :key="item">
							<view class="swiper-item">
								<image :src="item.uploadImgInfo.img" mode="aspectFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</popup>

			<popup ref="help_other" class="help_other" width="630">
				<view class="help_status_icon">
					<image src="https://static.roi-cloud.com/base/icon_success.png" mode=""></image>
				</view>
				<view class="help_m_title">助力成功</view>
				<view class="help_sub_title">恭喜您获得一次游戏机会</view>
				<view class="play_btn mt100" @click="$refs.help_other.hide()">去游戏</view>
			</popup>
			<popup ref="help_other_faile" class="help_other_faile" width="630">
				<view class="help_status_icon">
					<image src="https://static.roi-cloud.com/base/icon_fail.png" mode=""></image>
				</view>
				<view class="help_m_title">助力失败</view>
				<view class="help_sub_title">{{ helpFaileMsg }}</view>
				<view class="play_btn mt100" @click="$refs.help_other_faile.hide()">去游戏</view>
			</popup>
			<uni-popup ref="no_play_num">
				<view class="no_play_num">
					<view class="over_title">
						<text></text>
						<uni-icons @click="$refs.no_play_num.close()" class="icon_close" type="closeempty" size="30"
							color="#9e9c9c"></uni-icons>
					</view>
					<view class="help_status_icon">
						<image src="https://static.roi-cloud.com/base/icon_fail.png" mode=""></image>
					</view>
					<view class="help_m_title">游戏次数已用完</view>
					<view class="help_sub_title">您今日的游戏次数已用完</view>
					<view class="help_sub_title">可通过分享好友助力获得游戏次数</view>
					<button class="share_btn" @click="$refs.no_play_num.close()" open-type="share" data-type="0">
						分享助力
					</button>
				</view>
			</uni-popup>
			<popup ref="get_out" bgColor="#FFF8DC" class="get_out" width="630">
				<image @click="closeThisPage" class="icon_close" src="https://static.roi-cloud.com/base/icon_close.png"
					mode="">
				</image>
				<image class="icon_sad" src="https://static.roi-cloud.com/base/icon_fail.png" mode=""></image>
				<view class="m_title">本游戏因违规已停止服务</view>
				<view class="s_title"> 很抱歉由于涉嫌违规已 停止服务。 </view>
				<view class="btn_know" @click="closeThisPage">我知道</view>
				<navigator hover-class="none"
					url="/pages/webView/webView?src=https://mp.weixin.qq.com/s/-vyXSDr_h-OTVsZfkZRf6w"
					class="bttom_tips">
					关闭后依然可进行奖品相关操作 如有疑问请 <text>点击查看</text>
				</navigator>
			</popup>

			<popup ref="over_popup" bgColor="#FFF8DC" class="over_popup" width="630">
				<view>
					<view class="over_header">
						<view class="over_title">
							<text>活动结束</text>
							<uni-icons @click="$refs.over_popup.hide()" class="icon_close" type="closeempty" size="30"
								color="#fff"></uni-icons>
						</view>
					</view>
					<view class="o_avatar">
						<image :src="user.avatar" mode=""></image>
					</view>
					<view class="o_username">{{ user.nickname }}</view>
					<view v-if="gameInfo.lottery_type == 1">
						<view class="o_rank">本次活动已经结束</view>
						<view class="o_rank">最终排名为<text>【第{{ rankeOpenAward.prize_source }}名】</text></view>
						<view class="o_prize">
							<image :src="rankeOpenAward.prize_url" mode="aspectFill"></image>
							<view class="o_prize_text">
								<view class="ranke_name">{{
                  rankeOpenAward.ranking_name
                }}</view>
								<view class="prize_name">{{ rankeOpenAward.prize_name }}</view>
							</view>
						</view>
						<view>
							<view class="svip_end_tips">
								本次活动已结束
								<view>请于{{
                    rankeOpenAward.last_receive_time
                  }}前提交领奖信息，过期作废</view>
							</view>
							<navigator :url="'/pages/prize/prize?gameId=' + gameId" class="get_btn">点我领奖</navigator>
						</view>
					</view>
					<view v-else>
						<view class="o_rank">感谢参与，本次活动已结束</view>
						<view class="icon_gift_box">
							<image src="https://static.roi-cloud.com/base/icon_gift_box.png" mode=""></image>
							<view class="gift_box_tips">
								奖品兑换截止{{
                  gameInfo.last_cash_time
                }}数量有限，对完即止</view>
						</view>
						<navigator :url="'/pages/conversion/conversion?gameId=' + gameId" class="get_btn">点我去兑换
						</navigator>
					</view>
				</view>
			</popup>
		</view>
		<uni-popup ref="login_popup" type="bottom">
			<view class="login_poup">
				<view class="login_title">登录小程序</view>
				<view class="sub_title">申请获取以下权限，以提供更优质的服务</view>
				<view class="logint_desc">
					获取你的公开信息（昵称、头像、地区等）
					获取你当前地理位置以匹配游戏范围
				</view>
				<view class="agreement">
					<radio :checked="isChecked" @click="handleChecked"></radio>
					<text>我已阅读并同意</text>
					<text class="protocol" @click="openProtocol('arg')">用户协议</text>
					<text>与</text>
					<text class="protocol" @click="openProtocol('prv')">隐私政策</text>
				</view>
				<view class="btns">
					<view class="def_btn" @click="cancelLogin">取消</view>
					<view class="def_btn active" @click="userLogin">登录</view>
				</view>
			</view>
		</uni-popup>
		<popup ref="contact" class="contactPoup" width="500">
			<view class="">
				<image src="https://static.roi-cloud.com/base/customerService.png" mode=""></image>
			</view>
		</popup>
		<popup ref="tip" bgColor="#FFF8DC" class="get_out" width="630">
			<image @click="$refs.tip.close()" class="icon_close" src="https://static.roi-cloud.com/base/icon_close.png"
				mode="">
			</image>
			<view class="p_bowl">
				<image class="img_bowl" src="https://static.roi-cloud.com/base/icon_bowl.png" mode=""></image>
				<image class="icon_dice-2" src="https://static.roi-cloud.com/base/p_dice.png" mode=""></image>
				<image class="icon_dice-1" src="https://static.roi-cloud.com/base/p_dice-2.png" mode=""></image>
				<image class="icon_dice-4" src="https://static.roi-cloud.com/base/icon_dice-4.png" mode=""></image>
				<image class="icon_dice-5" src="https://static.roi-cloud.com/base/icon_dice-5.png" mode=""></image>
			</view>
			<image class="icon_dice" src="https://static.roi-cloud.com/base/p_dice.png" mode=""></image>
			<image class="icon_dice-3" src="https://static.roi-cloud.com/base/icon_dice-3.png" mode=""></image>
			<image class="icon_sad" src="https://static.roi-cloud.com/base/icon_fail.png" mode=""></image>
			<view class="m_title">
				<text>本游戏人数已经达到上限</text>
			</view>
			<view class="s_title">
				<text>很抱歉，{{ gameInfo.gameName }}人数达到上限，新用户无法加入。</text>
			</view>
			<view class="btn_know" @click="$refs.tip.close()">我知道</view>
			<navigator hover-class="none"
				url="/pages/webView/webView?src=https://mp.weixin.qq.com/s/-vyXSDr_h-OTVsZfkZRf6w" class="bttom_tips">
				关闭后依然可以进行奖品相关操作 如有疑问请点击查看
				<text>更多解决方案</text>
			</navigator>
		</popup>
		<popup ref="network" bgColor="#FFF8DC" class="get_out" width="630">
			<image @click="$refs.network.close()" class="icon_close"
				src="https://static.roi-cloud.com/base/icon_close.png" mode="">
			</image>
			<image class="icon_sad" src="https://static.roi-cloud.com/base/icon_fail.png" mode=""></image>
			<view class="m_title">
				<text>无法进行游戏</text>
			</view>
			<view class="s_title">
				<text>很抱歉，因为没有可用的网络连接，不能进行游戏。</text>
			</view>
			<view class="btn_know" @click="$refs.network.close()">我知道</view>
			<navigator hover-class="none"
				url="/pages/webView/webView?src=https://mp.weixin.qq.com/s/-vyXSDr_h-OTVsZfkZRf6w" class="bttom_tips">
				如您正在手机网络不好的地方，请稍后重试 如多次失败，请点击查看
				<text>更多解决方案</text>
			</navigator>
		</popup>
		<popup ref="position" bgColor="#FFF8DC" class="get_out" width="630">
			<image @click="$refs.position.close()" class="icon_close"
				src="https://static.roi-cloud.com/base/icon_close.png" mode="">
			</image>
			<view class="p_bowl">
				<image class="img_bowl" src="https://static.roi-cloud.com/base/icon_bowl.png" mode=""></image>
				<image class="icon_dice-2" src="https://static.roi-cloud.com/base/p_dice.png" mode=""></image>
				<image class="icon_dice-1" src="https://static.roi-cloud.com/base/p_dice-2.png" mode=""></image>
				<image class="icon_dice-4" src="https://static.roi-cloud.com/base/icon_dice-4.png" mode=""></image>
				<image class="icon_dice-5" src="https://static.roi-cloud.com/base/icon_dice-5.png" mode=""></image>
			</view>
			<image class="icon_dice" src="https://static.roi-cloud.com/base/p_dice.png" mode=""></image>
			<image class="icon_dice-3" src="https://static.roi-cloud.com/base/icon_dice-3.png" mode=""></image>
			<image class="icon_sad" src="https://static.roi-cloud.com/base/icon_fail.png" mode=""></image>
			<!-- <view class="m_title">
				<text>本游戏人数已经达到上限</text>
			</view> -->
			<view class="s_title">
				<text>{{ positionMsg }}</text>
			</view>
			<view class="btn_know" @click="$refs.position.close()">我知道</view>
			<view style="height: 24px"></view>
		</popup>
		<popup ref="get_out" bgColor="#FFF8DC" class="get_out" width="630">
			<image @click="$refs.get_out.close()" class="icon_close"
				src="https://static.roi-cloud.com/base/icon_close.png" mode="">
			</image>
			<image class="icon_sad" src="https://static.roi-cloud.com/base/icon_fail.png" mode=""></image>
			<view class="m_title">游戏已被下架</view>
			<view class="s_title">
				游戏涉及违规，已经被平台下架。具体详情，请联系游戏客服。
			</view>
			<view class="btn_know" @click="$refs.get_out.close()">好的</view>
			<view class="h-40"></view>
		</popup>
		<popup ref="get_over" bgColor="#FFF8DC" class="get_out" width="630">
			<image @click="$refs.get_over.close()" class="icon_close"
				src="https://static.roi-cloud.com/base/icon_close.png" mode="">
			</image>
			<image class="icon_sad" src="https://static.roi-cloud.com/base/icon_fail.png" mode=""></image>
			<view class="m_title">{{
        gameInfo.status === 6 ? "游戏已关闭" : "游戏已结束"
      }}</view>
			<view class="s_title">
				游戏已经结束，请及时查看中奖情况进行兑奖和领奖。
			</view>
			<view class="btn_know" @click="$refs.get_over.close()">好的</view>
			<view class="h-40"></view>
		</popup>
		<popup ref="location" bgColor="#FFF8DC" class="get_out" width="630">
			<image @click="$refs.location.close()" class="icon_close"
				src="https://static.roi-cloud.com/base/icon_close.png" mode="">
			</image>
			<image class="icon_sad" src="https://static.roi-cloud.com/base/icon_fail.png" mode=""></image>
			<view class="m_title">
				<text>无法进行游戏游戏</text>
			</view>
			<view class="s_title">
				<text>很抱歉，因为无法获取您当前的地理位置，不能进行游戏游戏。</text>
			</view>
			<view class="btn_know" @click="openLocationSetting">我知道</view>
			<navigator hover-class="none"
				url="/pages/webView/webView?src=https://mp.weixin.qq.com/s/-vyXSDr_h-OTVsZfkZRf6w" class="bttom_tips">
				如您正在手机网络不好的地方，请稍后重试 如多次失败，请点击查看
				<text>更多解决方案</text>
			</navigator>
		</popup>
		<popup ref="locationFail" bgColor="#FFF8DC" class="get_out" width="630">
			<image @click="$refs.locationFail.close()" class="icon_close"
				src="https://static.roi-cloud.com/base/icon_close.png" mode="">
			</image>
			<image class="icon_sad" src="https://static.roi-cloud.com/base/icon_fail.png" mode=""></image>
			<view class="m_title">
				<text>您不在游戏范围内</text>
			</view>
			<view class="s_title" style="margin-top: 50rpx">
				<text>很抱歉，您当前所在的区域不在游戏投放范围内，无法进行游戏。您依然可以进行兑奖操作</text>
			</view>
			<view class="btn_know" style="margin-bottom: 50rpx" @click="$refs.locationFail.close()">我知道</view>
		</popup>
		<uni-popup :maskClick="false" type="dialog" ref="dialog">
			<view class="phone-wrap">
				<view class="phone-container">
					<image @click="onClose" src="https://static.roi-cloud.com/base/close.png" class="phone-close" />
					<view class="phone-title">
						<text>请留个备用手机号</text>
					</view>
					<view class="phone-subtitle">
						<text>作为兑奖备用联系方式，我们会保护你的隐私</text>
					</view>
					<view class="phone-input-wrap">
						<input :value="phone" cursor-spacing="10" @input="changePhone" class="phone-input"
							placeholder="填写手机号" />
					</view>
					<view v-if="phoneError" class="phone-error-msg"><text>{{ phoneError }}</text></view>
					<view class="phone-input-wrap">
						<input :value="verifyCode" cursor-spacing="10" @input="changeVerifyCode" maxlength="6"
							class="phone-code-input" placeholder="填写验证码" />
						<view :class="[
                'phone-code-button',
                { 'phone-code-button-disabled': verifyCodeTime !== 0 },
              ]" @click="sendCode">
							<text>{{ verifyCodeText }}</text>
						</view>
					</view>
					<view v-if="codeError" class="phone-error-msg"><text>{{ codeError }}</text></view>

					<view v-if="agreeError" class="agree-error-msg"><text>{{ agreeError }}</text></view>
					<view :class="[
              'phone-button',
              { 'button-disabled': !phone || !verifyCode },
            ]" @click="savePhone">
						<text>保存</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import lottie from 'lottie-miniprogram'
	import '@/static/css/game.scss'
	import Modal from '@/components/Modal.vue'
	import startsWith from 'lodash/startsWith'
	import {
		validPhone,
		relativePath
	} from "@/utils/tool.js";
	import {
		acceptDataPrevpage
	} from "@/utils/utils.js";
	import wechat from "@/utils/wechatUtils.js";
	import popup from "@/components/popup/popup.vue";
	import navbar from "@/components/Navbar.vue";
	import redEnvelope from "./redEnvelope";
	import moment from "moment";
	import _ from "lodash";
	import {
		userLogin,
		gameInfo,
		gameNumber,
		gameResult,
		prizeDetail,
		cashDetail,
		getArg,
		getRank,
		userHelpRecordList,
		userHelpRecordMyList,
		addGameHelp,
		inviteHelp,
		inviteInfo,
		getOpenAward,
		getMyRank,
		apiWechatMessage,
		apiSetUserLocation,
		getCashList
	} from '@/rest/api.js'
	export default {
		components: {
			popup,
			navbar,
			redEnvelope,
		},
		data() {
			return {
				currentCashIndex: 0,
				currentCashArrayIndex: 0,
				currentCashArray: [],
				radomIndex: 0,
				cashTimer: "",
				noCashItem: false,
				showCash: {},
				playAnimation: false,
				share: false,
				onceShare: true,
				isChecked: false,
				timer: null,
				playLoading: false,
				getGift: 2,
				canClose: false,
				navColor: "transparent",
				currentScoreItem: 1,
				currentHelpItem: 1,
				level: 1, //中奖登记
				navbarHeight: 0, //navbar高度
				userPlayInfo: {}, //用户玩的次数
				userRank: {}, //用户排名
				gameResult: {
					prize: {},
					result: 0,
				},
				helpFaileMsg: "您的助力次数已用完",
				helper: {
					page: 1,
					pageSize: 10,
					list: [],
				},
				setting: {
					SHARE: {
						STATUS: 1,
					},
				}, //游戏配置
				pointsImages: [
					"/static/images/icon_dice-3.png",
					"/static/images/icon_dice-5.png",
					"/static/images/icon_dice-3.png",
					"/static/images/icon_dice-1.png",
					"/static/images/icon_dice-5.png",
					"/static/images/icon_dice-6.png",
				],
				bgmPlay: false,
				logining: false,
				canGetUserProfile: false,
				gameId: "",
				helperInfo: {}, //助力人信息
				loadOptions: {},
				kingofKingsList: [],
				advertList: [],
				scoreDetailList: [], //积分明细
				exchangeList: [], //兑换明细
				otherKingList: [],
				playAnimation: false,
				show: false,
				helpLoading: false,
				helperTop: 0,
				hasMore: true,
				loadImagePath: "",
				showItem: 1,
				Audio: null,
				UnpublishedAudio: null,
				context: null,
				sharePath: "https://static.roi-cloud.com/base/share_bg.png",
				kingPrize: null,
				phone: "",
				verifyCode: "",
				verifyCodeText: "发送验证码",
				verifyCodeTime: 0,
				codeError: "",
				timer: null,
				verifyCodeResult: {},
				gameId: "",
				gameInfo: {},
				playTime: 6,
				inviteCode: '',
				isInvite: false,
				user: {},
				isStart: false,
				rankeOpenAward: {}, // 最终排名开奖结果
				isOpenAssistance: false,
				isOpenShareContent: false,
				isOpenSendMessage: false,
				minHeight: 0,
				lastAcc: {}, // 陀螺仪
				shakePlay: false,
				scrollTop: 0,
				gameHelpClick: false,
				awardQuery: {
					hasMore: true,
					isPlay: false,
				},
				exchangeQuery: {
					hasMore: true,
					isPlay: false,
				},
				isLocation: true,
				inited: false,
				hideAmCanv: true,
				nearPrize: {}
			}
		},
		onUnload() {
			console.log('写在啦.....')
			clearInterval(this.cashTimer)
		},
		onShow() {
			if (this.user && this.user.userId) {
				this.getData();
				const launchOptions = this.$storage.get("options");
				const locationTime = this.$storage.get("getLocationTime");
				const exange = acceptDataPrevpage("exange");
				if (exange && exange.flag) {
					this.exchangeQuery.isPlay = true;
					this.exchangeQuery.hasMore = true;
					this.getExchange();
				}
				this.trackEvent("viewHomePage", {
					sceneID_evar: launchOptions.scene + "",
					referrerInfo_evar: JSON.stringify(launchOptions.referrerInfo),
					locationLongitude_evar: locationTime.longitude,
					locationLatitude_evar: locationTime.latitude,
					"3rdpartyUserID_evar": this.user.userId,
				});
				uni.onGyroscopeChange((res) => {
					var delA = Math.abs(res.x - this.lastAcc.x); // x轴偏转角
					var delB = Math.abs(res.y - this.lastAcc.y); // y轴偏转角
					var delG = Math.abs(res.z - this.lastAcc.z); // z轴偏转角

					if (
						(delA > 7 && delB > 7) ||
						(delA > 7 && delG > 7) ||
						delB > 7 ||
						delG > 7
					) {
						// 用户设备摇动了，触发响应操作
						// 此处的判断依据是任意两个轴篇转角度大于15度

						this.shakePlay = true;
						// this.play(true)
					}
					this.lastAcc = res; // 存储上一次的event
				});
				uni.startGyroscope({
					interval: "game",
					success() {},
					fail() {},
				});
			}
		},
		onReady() {
			const _this = this;
			uni.getSystemInfo({
				success: function(res) {
					_this.minHeight = res.windowHeight
				},
			});
			this.init()
			this.context = uni.createCanvasContext("shareCanvas", this);
		},
		onLoad(options) {
			const _this = this
			// uni.getSystemInfo({
			// 	success: function(res) {
			// 		// _this.minHeight = res.windowHeight

			// 	},
			// })
			console.log(
				process.env.NODE_ENV,
				"process.env.NODE_ENVprocess.env.NODE_ENVprocess.env.NODE_ENVprocess.env.NODE_ENV"
			);
			this.navbarHeight =
				getApp().globalData.statusBarHeight + getApp().globalData.navBarHeight;
			let localGameId = this.$storage.get("gameId");

			if (options.gameId && options.gameId !== localGameId) {
				localGameId = options.gameId;
				this.$storage.set("gameId", options.gameId);
			}
			// localGameId = '211206093256824726'
			this.gameId = localGameId.trim();
			this.$storage.set("gameId", this.gameId);
			const user = this.$storage.getUser();
			if (options.code) {
				this.gameId = options.gameId;
				this.$storage.set("gameId", options.gameId);
				this.$storage.set("invite", options.code);
			}
			this.inviteCode = this.$storage.get("invite");
			if (options.share) {
				this.share = true;
				if (!user.userId) {
					this.toLogin();
				} else {
					this.$refs.onceShare.show();
				}
			}

			if (this.inviteCode) {
				let list = this.$storage.get("inviteList");
				const isInvite = list && list.indexOf(this.inviteCode) > -1;

				if (user.userId && !(isInvite == true)) {
					this.getInviteInfo(this.inviteCode, localGameId.trim());
				}
				if (!user.userId) {
					this.isOpenAssistance = true;
					this.toLogin();
				}
			}
			// 初始化音频组件
			this.Audio = uni.createInnerAudioContext(); // 获奖
			this.Audio.src =
				"https://static.roi-cloud.com/upload/audio/getReword.m4a"; //音频地址
			this.ShakeAudio = uni.createInnerAudioContext(); // 摇树
			this.ShakeAudio.src =
				"https://static.roi-cloud.com/game/music/rocking_tree.m4a";
			this.UnpublishedAudio = uni.createInnerAudioContext(); // 未获奖
			this.UnpublishedAudio.src =
				"https://static.roi-cloud.com/upload/audio/noReword.m4a"; //音频地址

			this.user = user;

			if (user.userId) {
				this.gameId = localGameId.trim();
				this.getGameInfo(); //获取游戏信息
				this.getPlayNumber(); //获取游戏可玩次数
				this.getHelperList(1); // 助力记录
				this.getMyRank(); //获取当前我的排名信息
				if (this.currentScoreItem === 1) {
					this.getAward();
				}
			}
			this.getPrivacy()

		},

		onHide() {
			this.$refs.help.close();
			this.currentHelpItem = 1;
			uni.stopGyroscope({
				success() {
					console.log("stop success!");
				},
				fail() {
					console.log("stop fail!");
				},
			});
		},
		computed: {
			gameOver() {
				if (this.gameInfo.status > 5) {
					this.playLoading = false;
					if (this.gameInfo.status === 7) {
						this.$refs.get_out.show();
					} else {
						this.$refs.get_over.show();
					}
					return;
				}
				return gameInfo.status !== 3;
			},
		},
		methods: {
			startPlay() {
				this.hideAmCanv = false
				this.ani.play()
				this.init()
			},
			pause() {
				
				this.hideAmCanv = true
				this.ani.pause()
			},
			init() {
				const _this = this
				uni.createSelectorQuery().selectAll('#lottie_demo').node(res => {
					// const canvas = res[0].node
					// let device = uni.getSystemInfo();
					// const context = canvas.getContext('2d')
					// const height = res[0].height
					// const width = res[0].width
					// const dpr = wx.getSystemInfoSync().pixelRatio
					// canvas.width = width * dpr
					// canvas.height = height * dpr
					// lottie.setup(canvas)
					// _this.ani = lottie.loadAnimation({
					// 	loop: true,
					// 	autoplay: true,
					// 	path: 'https://static.roi-cloud.com/upload/yaoyaoshu/yaoyaoshu_new.json',
					// 	rendererSettings: {
					// 		context,
					// 	},
					// })
					// _this.inited = true

					const dpr = wx.getSystemInfoSync().pixelRatio
					const canvas = res[0].node
					let device = uni.getSystemInfo();
					const context = canvas.getContext('2d')

					canvas.height = 520 * dpr
					canvas.width = 375 * dpr
					lottie.setup(canvas)
					_this.ani = lottie.loadAnimation({
						loop: false,
						autoplay: false,
						path: 'https://static.roi-cloud.com/upload/audio/hongbaodiaolluo.json',
						rendererSettings: {
							context,
						},
					})
					_this.inited = true
				}).exec()
			},
			async handleCashShow() {
				const _this = this
				const data = await getCashList({
					gameId: this.gameId,
					offset: 0,
					limit: 50
				})
				if (Array.isArray(data) && data.length > 0) {
					_this.currentCashIndex = 0
					clearInterval(this.cashTimer)
					_this.radomIndex = Math.ceil(Math.random() * 5)
					_this.showCash = data[_this
						.currentCashIndex
					]
					_this.currentCashIndex = _this.currentCashIndex + 1
					this.cashTimer = setInterval(function() {
						_this.radomIndex = Math.ceil(Math.random() * 5)
						_this.showCash = data[_this
							.currentCashIndex
						]
						if (_this.currentCashIndex + 1 === data.length) {
							_this.currentCashIndex = 0
						} else {
							_this.currentCashIndex = _this.currentCashIndex + 1
						}
					}, 12000)
				}
			},
			handleTest() {
				this.awardQuery.hasMore = true;
			},
			handlePlayAnimation() {
				this.playAnimation = true;
				const _this = this;
				setTimeout(function() {
					_this.startPlay()
					setTimeout(function() {
						_this.pause()
						if (_this.gameResult.result) {
							_this.playSound();
						} else {
							_this.playUnpublishedSound();
						}
						_this.playAnimation = false;
						_this.$refs.redEnvelope.open();
						_this.playLoading = false;
					}, 2900)

				}, 2000);
			},
			gameStatus(code) {
				const orderStatus = {
					1: "待设置",
					2: "待开始",
					3: "进行中",
					4: "兑奖中",
					5: "领奖中",
					6: "已结束",
					7: "已下架",
				};
				return orderStatus[Number(code)] || "";
			},
			getInviteInfo(code, gameId) {
				const params = {
					invite_code: code,
					game_id: gameId,
				};
				inviteInfo(params).then((res) => {
					if (res.errno) {
						return;
					}
					this.helperInfo = {
						avatar: res.avatar,
						nickName: res.user_name,
						prize: {
							prizeImageUrl: res.award_url,
						},
						prizeName: res.award_name,
						king: {
							rankNumber: res.rank,
						},
						gameName: res.game_name,
						helpOpenid: res.openid,
					};
					const user = this.$storage.getUser();
					if (user && user.userId) {
						this.$refs.assistance.show();
					}
				});
			},
			changeVerifyCode: function(e) {
				this.verifyCode = e.detail.value;
			},
			handleChecked() {
				this.isChecked = !this.isChecked;
			},
			playSound() {
				this.Audio.seek(0.1);
				this.Audio.play(); //执行播放
			},
			playUnpublishedSound() {
				this.UnpublishedAudio.seek(0.1);
				this.UnpublishedAudio.play(); //执行播放
			},
			playShackSound() {
				if (!Number(this.playTime) || !this.isLocation) {
					return
				}

				this.ShakeAudio.seek(0.1);
				this.ShakeAudio.play(); //执行播放
			},
			getMyRank() {
				getMyRank({
					gameId: this.gameId,
				}).then((res) => {
					this.userRank = res;
				});
			},

			handleGameResult(result) {
				if (!result) {
					this.play();
				} else {
					this.$refs.share.show();
				}
			},
			getPrivacy() {
				getArg({
					platform: "yaoyaoshu",
				}).then((res) => {
					const params = {
						agreement_id: res.agreement_id,
						privacy_clause_id: res.privacy_clause_id,
						privacy_clause_url: res.privacy_clause_url,
						agreement_url: res.agreement_url,
					};
					const user = this.$storage.getUser();
					if (user.userId) {
						this.$storage.setUser({
							...user,
							...params,
						});
					} else {
						this.$storage.setUser(params);
					}
				});
			},
			getExchange() {
				if (this.exchangeQuery.hasMore) {
					this.$loading.show();
					cashDetail({
							game_id: this.gameId,
							offset: this.exchangeQuery.isPlay ? 0 : this.exchangeList.length,
							limit: this.exchangeQuery.isPlay ? 1 : 20,
						})
						.then((res) => {
							this.$loading.hide();
							if (res.list.length === 0) {
								this.exchangeQuery.hasMore = false;
								this.exchangeQuery.isPlay = false;
								return;
							}
							if (res.list.length < 20 && !this.exchangeQuery.isPlay) {
								this.exchangeQuery.hasMore = false;
							}

							if (this.exchangeQuery.isPlay) {
								this.exchangeQuery.isPlay = false;
								this.exchangeList = [...res.list, ...this.exchangeList];
							} else {
								this.exchangeList = [...this.exchangeList, ...res.list];
							}
						})
						.catch((err) => {
							this.$loading.hide();
							uni.showToast({
								title: "出错啦",
								icon: "error",
							});
						});
				}
			},
			onMy() {
				const user = this.$storage.getUser();
				if (!user.userId) {
					this.toLogin();
					return;
				}
				if (this.isOpenSendMessage) {
					wechat.getAuthOfSubscribeMessage(() => {
						uni.navigateTo({
							url: "/pages/my/my",
						});
					});
				} else {
					uni.navigateTo({
						url: "/pages/my/my",
					});
				}
			},
			savePhone: function() {
				if (!this.phone) {
					this.phoneError = "请填写手机号";
					return false;
				} else if (!validPhone(this.phone)) {
					this.phoneError = "手机号格式错误";
					return false;
				} else {
					this.phoneError = "";
				}
				if (!this.verifyCode) {
					this.codeError = "请填写验证码";
					return false;
				} else {
					this.codeError = "";
				}
				let params = {
					phone: this.phone,
					verifyCode: this.verifyCode,
					time: this.verifyCodeResult.time,
					hash: this.verifyCodeResult.hash,
				};
				this.$loading.show();
				updateUserPhone(params)
					.then((response) => {
						clearInterval(this.timer);
						this.user = {
							...this.user,
							phone: this.phone,
						};
						// let user = this.$storage.getUser();
						// this.$storage.setUser({
						// 	...user,
						// 	phone: this.phone
						// });
						this.$refs.dialog.close();
						this.$loading.hide();
					})
					.catch((error) => {
						this.$loading.hide();
						this.$toast.error(error.msg || "短信验证码验证失败");
					});
			},
			changePhone: function(e) {
				this.phone = e.detail.value;
			},
			sendCode: function() {
				if (this.verifyCodeTime === 0) {
					if (!this.phone) {
						this.phoneError = "请填写手机号";
						return false;
					} else if (!validPhone(this.phone)) {
						this.phoneError = "手机号格式错误";
						return false;
					} else {
						this.phoneError = "";
					}
					let params = {
						phone: this.phone,
					};
					smsBindUserVerifyCode(params).then((response) => {
						this.verifyCodeResult = response;
						let code = 60;
						this.verifyCodeTime = code;
						this.verifyCodeText = code;
						this.timer = setInterval(() => {
							code = code - 1;
							this.verifyCodeTime = code;
							if (code <= 0) {
								this.verifyCodeTime = 0;
								this.verifyCodeText = "重新发送";
								clearInterval(this.timer);
							} else {
								this.verifyCodeText = code;
							}
						}, 1000);
					});
				}
			},
			onClose: function() {
				clearInterval(this.timer);
				this.$refs.dialog.close();
			},
			checkPhone() {
				this.$loading.show();
				userInfo().then((res) => {
					this.$loading.hide();
					if (res.phone) {
						this.$refs.over_popup.close();
					} else {
						this.phone = "";
						this.verifyCode = "";
						this.verifyCodeText = "发送验证码";
						this.verifyCodeTime = 0;
						this.phoneError = "";
						this.codeError = "";
						this.agreeError = "";
						this.$refs.dialog.open();
					}
				});
			},
			onHelper: function() {
				this.helpTop = 0;
				this.hasMore = true;
				this.show = true;
				if (this.isOpenSendMessage) {
					wechat.getAuthOfSubscribeMessage(() => {
						this.$refs.help.open();
					});
				} else {
					this.$refs.help.open();
				}
			},
			getKingOfKingPrize() {
				apiKingOfKingPrize({
					gameId: this.gameId,
				}).then((res) => {
					this.kingPrize = res;
					this.$refs.assistance.hide();
					this.$refs.over_popup.show();
				});
			},
			closeHelp: function() {
				this.$refs.help.close();
			},
			helpMeListMore() {
				if (!this.helpLoading && this.hasMore) {
					if (this.currentHelpItem == 1) {
						this.getHelperList(this.helper.page + 1);
					} else {
						this.changeHelpMyList(this.helper.page + 1);
					}
				}
			},
			helpScroll: function(e) {
				this.helpTop = e.detail.scrollTop;
			},
			closeThisPage() {
				uni.switchTab({
					url: "/pages/sponsor/sponsor",
				});
			},
			cancelLogin() {
				this.$refs.login_popup.close();
			},
			openProtocol(flag) {
				const user = this.$storage.getUser();
				let query = "";
				if (flag === "arg") {
					query = user.agreement_url;
				} else {
					query = user.privacy_clause_url;
				}
				uni.downloadFile({
					url: query,
					success(res) {
						let filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							fileType: "pdf",
							success(res) {
								//
							},
							fail(res) {},
							complete() {},
						});
					},
				});
			},
			getData() {
				this.getGameInfo();
				// 获取排行榜
				this.getRankScore();
				// 获取我的排行
				this.getMyRank();
				//获取游戏可玩次数
				this.getPlayNumber();
				this.getWechatMessage();
			},
			// 初始化

			openLocationSetting() {
				uni.openSetting({
					success: (res) => {
						if (res.authSetting["scope.userLocation"]) {
							this.$refs.location.hide();
						}
					},
					fail(err) {},
				});
			},
			onVip: function() {
				uni.navigateTo({
					url: "/pages/vip/vip",
				});
			},
			cancel: function() {
				this.$refs.popup.close();
			},
			changeItem(type) {
				this.currentScoreItem = type;
			},

			toPage(e) {
				if (!this.gameId) {
					uni.showToast({
						title: "不存在该游戏！",
						icon: "error",
					});
					return;
				}
				const user = this.$storage.getUser();
				if (user && user.userId) {
					if (
						this.isOpenSendMessage &&
						(e.currentTarget.dataset.url.indexOf("conversion/conversion") >= 1 ||
							e.currentTarget.dataset.url.indexOf("prize/prize") >= 1)
					) {
						wechat.getAuthOfSubscribeMessage(() => {
							uni.navigateTo({
								url: e.currentTarget.dataset.url,
							});
						});
					} else {
						uni.navigateTo({
							url: e.currentTarget.dataset.url,
						});
					}
				} else {
					this.$refs.login_popup.open("bottom");
				}
			},
			getImageInfo(url) {
				return new Promise((reslove, reject) => {
					uni.getImageInfo({
						src: url,
						success: (res) => {
							reslove(res);
						},
						fail(error) {
							reject(error);
						},
					});
				});
			},
			createNewImg: async function(gameInfo) {
				let res = await this.getImageInfo(
					"https://static.roi-cloud.com/base/share_bg.png"
				);
				await this.context.drawImage(res.path, 0, 0, 260, 208);
				if (gameInfo.logoInfo && gameInfo.logoInfo.img) {
					let logoInfo = await this.getImageInfo(gameInfo.logoInfo.img);
					this.context.drawImage(
						logoInfo.path,
						10,
						10,
						100,
						(100 / logoInfo.width) * logoInfo.height
					);
				}
				await this.context.draw();
				setTimeout(() => {
					uni.canvasToTempFilePath({
						canvasId: "shareCanvas",
						success: (toImage) => {
							this.sharePath = toImage.tempFilePath;
						},
						fail: function() {
							//TODO
						},
					});
				}, 300);
			},
			getAward() {
				if (this.awardQuery.hasMore) {
					this.$loading.show();
					prizeDetail({
							game_id: this.gameId,
							offset: this.awardQuery.isPlay ? 0 : this.scoreDetailList.length,
							limit: this.awardQuery.isPlay ? 1 : 20,
						})
						.then((res) => {
							this.$loading.hide();
							if (res.list.length === 0) {
								this.awardQuery.hasMore = false;
								this.awardQuery.hasMore = false;
								return;
							}
							if (res.list.length < 20 && !this.awardQuery.isPlay) {
								this.awardQuery.hasMore = false;
							}

							if (this.awardQuery.isPlay) {
								this.awardQuery.isPlay = false;
								this.scoreDetailList = [...res.list, ...this.scoreDetailList];
							} else {
								this.scoreDetailList = [...this.scoreDetailList, ...res.list];
							}
						})
						.catch((err) => {
							this.$loading.hide();
							uni.showToast({
								title: "出错啦",
								icon: "error",
							});
						});
				}
			},
			checkLogin() {
				let flag = true;
				if (!this.user.userId) {
					flag = false;
				}
				return flag;
			},
			gameHelp() {
				let params = {
					invite_code: this.inviteCode,
				};
				if (!this.gameHelpClick) {
					this.gameHelpClick = true;
					addGameHelp(params)
						.then((res) => {
							this.$refs.assistance.hide();
							// 助力结果弹出
							if (JSON.stringify(res) == "{}") {
								this.inviteCode = "";
								this.getGameInfo();
								this.getPlayNumber();
								const locationTime = this.$storage.get("getLocationTime");
								this.trackEvent("helpOtherPerson", {
									userBeenHelpedOpenID_evar: this.helperInfo.helpOpenid,
									locationLongitude_evar: locationTime.longitude,
									locationLatitude_evar: locationTime.latitude,
									"3rdpartyUserID_evar": this.user.userId,
								});
								this.$refs.help_other.show();
							} else {
								this.helpFaileMsg = res.errmsg;
								this.$refs.help_other_faile.show();
							}
							this.$storage.clear("invite");
							let list = this.$storage.get("inviteList");
							if (list && _.isArray(list)) {
								list.push(params.invite_code);
							} else {
								list = [params.invite_code];
							}
							this.gameHelpClick = false;
							this.$storage.set("inviteList", list);
						})
						.catch((error) => {
							this.gameHelpClick = false;
							this.$refs.assistance.hide();
							this.helpFaileMsg = error.msg;
							this.$refs.help_other_faile.show();
						});
				}
			},
			changeHelpMyList(page) {
				userHelpRecordMyList({
						game_id: this.gameId,
						limit: this.helper.pageSize,
						page: page,
					})
					.then((res) => {
						let list = res.list || [];
						if (list.length < this.helper.pageSize) {
							this.hasMore = false;
						}

						if (page !== 1) {
							list = [...this.helper.list, ...list];
						}
						this.helper = {
							...this.helper,
							list: list,
							page: page,
						};
						this.helpLoading = false;
						this.$loading.hide();
					})
					.catch((error) => {});
			},
			changeHelpTypeList(type) {
				this.hasMore = true;
				this.currentHelpItem = type;
				if (type == 1) {
					this.getHelperList(1, true, type);
				} else {
					// this.helpTop = 0;
					this.changeHelpMyList(1);
				}
			},
			play(isShake) {
				if (!isShake && this.isOpenSendMessage) {
					wechat.getAuthOfSubscribeMessage(() => {
						this.playLoading = false;
						uni.getNetworkType({
							success: (res) => {
								if (res.networkType === "none") {
									this.$refs.network.show();
									return;
								} else {
									if (this.playLoading) {
										return;
									}
									this.playLoading = true;
									const user = this.$storage.getUser();

									if (!user.userId) {
										this.playLoading = false;
										this.$refs.login_popup.open("bottom");
										return;
									}
									if (!this.gameId) {
										uni.showToast({
											title: "暂无游戏信息!",
											icon: "none",
										});
										this.playLoading = false;
										return;
									}
									if (this.gameInfo.status > 3) {
										this.playLoading = false;
										if (this.gameInfo.status === 7) {
											this.$refs.get_out.show();
										} else {
											this.$refs.get_over.show();
										}
										return;
									} else if (!this.isStart) {
										const status = this.gameInfo.status;
										if (status == 1 || status == 2) {
											uni.showToast({
												title: "游戏未开始!",
												icon: "none",
											});
										}
										this.playLoading = false;
										return;
									}
									if (this.$storage.get("getLocationTime") == "") {
										this.getSetting(() => {
											if (this.showNoPlayNum()) {
												this.playShackSound();
												this.getGameResult();
											}
										});
										return;
									} else {
										let get_time = this.$storage.get("getLocationTime").get_time;
										let now = new Date().getTime();
										if ((now - get_time) / 1000 / 60 / 60 > 3) {
											this.getSetting(() => {
												if (this.showNoPlayNum()) {
													this.playShackSound();
													this.getGameResult();
												}
											});
											return;
										}
									}
									if (this.showNoPlayNum()) {
										this.playShackSound();
										this.getGameResult();
									}
								}
							},
						});
					});
				} else {
					uni.getNetworkType({
						success: (res) => {
							if (res.networkType === "none") {
								this.$refs.network.show();
								return;
							} else {
								if (this.playLoading) {
									return;
								}
								this.playLoading = true;
								const user = this.$storage.getUser();

								if (!user.userId) {
									this.playLoading = false;
									this.$refs.login_popup.open("bottom");
									return;
								}

								if (!this.gameId) {
									uni.showToast({
										title: "暂无游戏信息!",
										icon: "none",
									});
									this.playLoading = false;
									return;
								}

								if (this.gameInfo.status > 3) {
									this.playLoading = false;
									if (this.gameInfo.status === 7) {
										this.$refs.get_out.show();
									} else {
										this.$refs.get_over.show();
									}
									return;
								} else if (!this.isStart) {
									const status = this.gameInfo.status;
									if (status == 1 || status == 2) {
										uni.showToast({
											title: "游戏未开始!",
											icon: "none",
										});
									}
									this.playLoading = false;
									return;
								}

								if (this.$storage.get("getLocationTime") == "") {
									this.getSetting(() => {
										if (this.showNoPlayNum()) {
											this.playShackSound();
											this.getGameResult();
										}
									});
									return;
								} else {
									let get_time = this.$storage.get("getLocationTime").get_time;
									let now = new Date().getTime();
									if ((now - get_time) / 1000 / 60 / 60 > 3) {
										this.getSetting(() => {
											if (this.showNoPlayNum()) {
												this.playShackSound();
												this.getGameResult();
											}
										});
										return;
									}
								}
								if (this.showNoPlayNum()) {
									this.playShackSound();
									this.getGameResult();
								}
							}
						},
					});
				}
			},
			showNoPlayNum() {
				if (!Number(this.playTime)) {
					if (this.isOpenShareContent) {
						// this.$refs.no_play_num.open()
						this.$refs.share.show();
						this.playLoading = false;
						return false;
					} else {
						console.log("????????????");
						uni.showToast({
							title: "你的次数已用完",
							icon: "error",
						});
						this.playLoading = false;
						return false;
					}
				}
				return true;
			},
			toLogin() {
				this.$refs.login_popup.open("bottom");
			},
			addPlay() {
				try {
					if (this.userPlayInfo.playTimes - this.userPlayInfo.playedTimes == 0) {
						this.playLoading = false;
						this.$refs.share.show();
						// this.$refs.award.show()
						this.$loading.hide();
						return;
					}
					this.$loading.show();
					this.playLoading = true;
					addUserGameRecord({
							agreeType: 1,
							gameId: this.gameId,
						})
						.then((res) => {
							let arr = res.gameResult.split(",");
							this.pointsImages = [];
							for (let index in arr) {
								this.pointsImages.push(
									"/static/images/icon_dice-" + arr[index] + ".png"
								);
							}
							this.gameResult = res;
							this.$loading.hide();
							this.playSound();
							this.playAnimation = true;
							this.timer = setTimeout(() => {
								clearTimeout(this.timer);
								this.$refs.award.show();
								this.getUserPlayInfo();
								this.getGameInfo();
								setTimeout(() => {
									this.playLoading = false;
								}, 500);
								this.playAnimation = false;
							}, 1200);
						})
						.catch((error) => {
							this.$loading.hide();
							/* 超过人数 */
							if (startsWith(error.msg, "该游戏人数已经达到上限")) {
								this.$refs.tip.show();
							} else if (startsWith(error.msg, "该游戏指定参与范围")) {
								this.positionMsg = error.msg;
								this.$refs.position.show();
							} else if (startsWith(error.msg, "请授权位置进行游戏")) {
								this.$refs.location.show();
							} else {
								this.$toast.error(error.msg);
							}
							this.playLoading = false;
						});
					uni.requestSubscribeMessage({
						tmplIds: [
							"7d-RFgHEirGnN77ZbgGZU5vGfHIUeBpX8hwM8GCEXbM",
							"mVo4jCV2RqAOb4nZdBjCOfXyTbQs5L3F04XBbEVJroc",
						],
						success: (subscribeRes) => {},
						fail: (res) => {},
					});
				} catch (e) {}
			},
			updateLocation(res) {
				res.get_time = new Date().getTime();
				this.$storage.set("getLocationTime", res);
				this.$loading.show();
				apiSetUserLocation({
						longitude: res.longitude,
						latitude: res.latitude,
					})
					.then((res) => {
						this.playLoading = false;
						this.$loading.hide();
					})
					.catch((err) => {
						this.playLoading = false;
						this.$loading.hide();
					});
			},
			getSetting(handler) {
				const that = this;
				uni.getSetting({
					success: (res) => {
						if (res.authSetting["scope.userLocation"]) {
							uni.getLocation({
								type: "gcj02",
								altitude: true,
								success(res) {
									that.updateLocation(res);
									handler && handler();
								},
							});
						} else {
							that.getAuthorize(handler);
						}
					},
				});
			},
			// 用户授权
			getAuthorize(handler) {
				const that = this;
				uni.authorize({
					scope: "scope.userLocation",
					success(res) {
						uni.getLocation({
							type: "gcj02",
							altitude: true,
							success(res) {
								that.updateLocation(res);
								handler && handler();
							},
						});
					},
					// 授权失败
					fail: (err) => {
						this.playLoading = false;
						this.$refs.location.show();
					},
				});
			},
			closeThisPage() {
				uni.switchTab({
					url: "/pages/index/index",
				});
			},
			popShow(ref) {
				if (!this.gameId) {
					uni.showToast({
						title: "不存在该游戏!",
						icon: "error",
					});
					return;
				}
				if (ref == "share" && this.gameInfo.status > 5) {
					uni.showToast({
						title: this.gameInfo.status == 6 ? "游戏已结束!" : "游戏已关闭!",
						icon: "error",
					});
					return;
				}
				if (this.checkLogin()) {
					if (ref == "score") {
						if (this.isOpenSendMessage) {
							wechat.getAuthOfSubscribeMessage(() => {
								this.$refs[ref].open();
							});
							return;
						}
						this.$refs[ref].open()
						return
					}
					this.$refs[ref].show();
				}
			},

			getRankScore() {
				const query = {
					offset: 0,
					limit: 50,
				};
				if (!this.gameInfo.open_pk_award) {
					getRank({
						gameId: this.gameId,
						...query,
					}).then((kingList) => {
						let userList = kingList;
						if (!Array.isArray(userList)) {
							userList = [];
						}
						this.kingRankList = userList;
						let num = 1;
						for (let index in userList) {
							userList[index].no_num = parseInt(index) + 1;
						}
						this.kingofKingsList = userList;
					});
				} else {
					getRank({
						gameId: this.gameId,
						...query,
					}).then(async (kingList) => {
						let userList = kingList;
						if (!Array.isArray(userList)) {
							userList = [];
						}
						this.kingRankList = userList;
						let numIndex = userList.length;
						let kingofKingsList = [];
						for (let index in userList) {
							userList[index].no_num = parseInt(index) + 1;
						}
						let num = 1;
						let lastFlag = false;
						if (userList.length < 50) {
							lastFlag = true;
						}
						for (let index in this.gameInfo.game_pk_plugin) {
							if (
								!lastFlag &&
								userList.length < this.gameInfo.game_pk_plugin[index].start_seq
							) {
								query.offset = (query.offset + 1) * 50;
								const result = await getRank({
									gameId: this.gameId,
									...query,
								});
								for (let index in result) {
									result[index].no_num = numIndex + parseInt(index) + 1;
								}
								if (result.length < 50) {
									lastFlag = true;
								}
								const newList = [...userList, ...result];
								userList = [...newList];
								numIndex = userList.length + numIndex;
							}

							let item = {
								info: this.gameInfo.game_pk_plugin[index],
								range: this.gameInfo.game_pk_plugin[index].end_seq == 1 ?
									"第" + num + "名" : "第" +
									num +
									"～" +
									this.gameInfo.game_pk_plugin[index].end_seq +
									"名",
								list: userList.slice(
									0,
									Number(this.gameInfo.game_pk_plugin[index].prize_num)
								),
							};
							num += Number(this.gameInfo.game_pk_plugin[index].end_seq);
							userList.splice(
								0,
								Number(this.gameInfo.game_pk_plugin[index].prize_num)
							);
							kingofKingsList.push(item);
						}

						this.kingofKingsList = kingofKingsList;
						let lnum = 0;
						this.kingofKingsList.forEach((item) => {
							item.list.forEach((value) => {
								lnum = lnum + 1;
							});
						});
						if (lnum > 50 && !lastFlag) {
							const res = getIntNumber(userList.length);
							if (userList.length >= 20 + res) {
								this.otherKingList = userList.splice(0, 20 + res);
							} else {
								const lastIndex = 20 + res - userList.length;
								query.offset = (query.offset + 1) * lastIndex;
								query.limit = lastIndex;
								const result = await getRank({
									gameId: this.gameId,
									...query,
								});
								for (let index in result) {
									result[index].no_num = numIndex + parseInt(index) + 1;
								}
								const newList = [...userList, ...result];
								this.otherKingList = [...newList];
							}
						} else {
							if (!lastFlag) {
								const lastIndex = 50 - lnum;
								if (userList.length >= lastIndex) {
									this.otherKingList = userList.splice(0, lastIndex);
								} else {
									const requireIndex = lastIndex - userList.length;
									query.limit = requireIndex;
									query.offset = (query.offset + 1) * requireIndex;
									const result = await getRank({
										gameId: this.gameId,
										...query,
									});
									for (let index in result) {
										result[index].no_num = numIndex + parseInt(index) + 1;
									}
									const newList = [...userList, ...result];
									this.otherKingList = [...newList];
								}
							} else {
								const lastIndex = 50 - lnum;
								this.otherKingList = userList.splice(0, lastIndex);
							}
						}
					});
				}
			},
			getIntNumber(number) {
				if (number % 10) {
					const result = 10 - parseInt(number % 10);
					return result;
				}
				return 0;
			},
			getUserProfile(e) {
				if (this.logining == true) {
					return;
				}
				// 推荐使用uni.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				this.logining = true;
				uni.getUserProfile({
					desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						let params = {
							avatarUrl: res.userInfo.avatarUrl,
							nickName: res.userInfo.nickName,
						};
						this.$loading.show();
						uni.login({
							success: (result) => {
								this.wxLogin({
									code: result.code,
									...params,
								});
							},
							fail: () => {
								this.logining = false;
							},
						});
					},
					fail: (res) => {
						this.logining = false;
					},
				});
			},
			getHelperList(page) {
				this.$loading.show();
				this.helpLoading = true;
				userHelpRecordList({
						game_id: this.gameId,
						limit: this.helper.pageSize,
						page: page,
					})
					.then((res) => {
						let list = res.list || [];
						if (list.length < this.helper.pageSize) {
							this.hasMore = false;
						}
						if (page !== 1) {
							list = [...this.helper.list, ...list];
						}
						this.helper = {
							...this.helper,
							list: list,
							page: page,
						};
						this.helpLoading = false;
						this.$loading.hide();
					})
					.catch(() => {
						this.helpLoading = false;
						this.$loading.hide();
					});
			},
			onGameManager: function() {
				this.$refs.popup.open();
			},
			getUserPlayInfo() {
				userGame({
					gameId: this.gameId,
				}).then((res) => {
					this.userPlayInfo = res;
				});
			},
			getGameInfo(handler) {
				let localGameId = this.$storage.get("gameId");
				let params = {
					template_id: "2021110901",
				};
				const game_id = localGameId ? localGameId : this.gameId;
				if (game_id) {
					params = {
						...params,
						game_id,
					};
				}
				gameInfo(params)
					.then((res) => {
						if (res.errno === "1") {
							uni.showToast({
								title: "不存在该游戏!",
								icon: "error",
							});
							this.gameId = "";
							return;
						}
						this.gameInfo = {
							...res,
							game_start_time: moment(res.game_start_time * 1000).format(
								"MM月DD日 HH:mm"
							),
							game_end_time: moment(res.game_end_time * 1000).format(
								"MM月DD日  HH:mm"
							),
						};
						console.log(">>>>>>>>>>>>>>", res.ad_info);
						if (res.ad_type == 1 && res.ad_info[0] && res.ad_info[0].ad_pic_url) {
							this.advertList = res.ad_info;
						} else {
							if (res.ad_info.length > 0) {
								res.ad_info.forEach((item) => {
									if (Number(item.ad_location) == 1 && item.ad_pic_url) {
										this.advertList = [item];
										return;
									}
								});
							}
						}
						this.$storage.set("gameInfo", this.gameInfo);
						this.gameId = this.gameInfo.game_id;
						this.$storage.set("gameId", this.gameId);
						this.showGamePopup(Number(res.status));

						this.getRankScore() // 排行榜信息
						this.handleCashShow()
						handler && handler()
					})
					.catch((err) => {
						uni.showToast({
							title: "出错啦",
						});
					});
			},
			showGamePopup(status) {
				if (status == 1 || status == 2) {
					// 待开始
					uni.showToast({
						title: "游戏未开始！",
						icon: "none",
					});
				}
				if (status == 3) {
					// 进行中
					this.isStart = true;
				}
				if (status == 4) {
					this.$refs.get_over.show();
				}
				if (status == 6) {
					// 已结束
					if (Number(this.gameInfo.lottery_type) == 1) {
						getOpenAward({
							gameId: this.gameId,
						}).then((res) => {
							this.rankeOpenAward = res;
							this.$refs.over_popup.show();
						});
					} else {}
				}
				if (status == 7) {
					// 已下架
					this.$refs.get_out.show();
				}
			},
			//获取游戏可玩次数
			getPlayNumber() {
				gameNumber({
					game_id: this.gameId,
				}).then((res) => {
					this.playTime = res.time;
				});
			},
			//获取游戏结果
			getGameResult() {
				gameResult({
					game_id: this.gameId,
				}).then((res) => {
					if (res.errno === '1') {
						if (res.errmsg === '您不在游戏范围内') {
							this.isLocation = false
							this.$refs.locationFail.show()
						} else {
							uni.showToast({
								title: `${res.errmsg}`,
								icon: 'error',
							})
						}
						this.trackEvent('playGame', {})
						this.playLoading = false
						this.playAnimation = false
						return
					}
					this.isLocation = true
					this.gameResult.result = res.result
					if (res.result) {
						this.gameResult.prize = res.prize;
						this.nearPrize = res.near_prize
						this.getMyRank();
						this.getRankScore();
						this.awardQuery.hasMore = true;
						this.awardQuery.isPlay = true;
						this.getAward();
					}
					this.trackEvent("playGame", {});
					this.handlePlayAnimation();
					this.getPlayNumber();
				});
			},
			getTime: function(time, format = "YYYY-MM-DD") {
				return time ? moment.unix(time).format(format) : "";
			},
			userLogin: function() {
				// 推荐使用uni.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				if (!this.isChecked) {
					uni.showModal({
						title: "提示",
						content: "请先阅读并同意相关服务协议！",
						showCancel: false,
					});
					return;
				}
				if (!this.logining) {
					this.logining = true;
					uni.getUserProfile({
						desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
						success: (res) => {
							const params = {
								avatarUrl: res.userInfo.avatarUrl,
								nickName: res.userInfo.nickName,
								platform: "yaoyaoshu",
							};
							this.$uma.setUserInfo(res.userInfo);
							this.$loading.show();
							uni.login({
								success: (result) => {
									this.wxLogin({
										code: result.code,
										...params,
									});
								},
								fail: (err) => {
									uni.showToast({
										title: "错误！！",
									});
									this.logining = false;
								},
							});
						},
						fail: (res) => {
							this.logining = false;
						},
					});
				}
			},
			wxLogin: function(wxData) {
				userLogin(wxData)
					.then((res) => {
						if (res.errno === "1") {
							uni.showToast({
								title: `请求登陆失败！`,
								icon: "error",
							});
							this.logining = false;
							return;
						}
						const user = this.$storage.getUser();
						const params = {
							...user,
							...res,
						};

						this.$storage.setUser({
							...user,
							...res,
						});
						this.$loading.hide();
						this.logining = false;
						this.$refs.login_popup.close();
						this.user = this.$storage.getUser();
						this.$uma.setOpenid(this.user.openid);
						this.getGameInfo(() => {
							//获取游戏信息

							this.getPlayNumber(); //获取游戏可玩次数
							this.getHelperList(1); // 助力记录
							this.getMyRank(); //获取当前我的排名信息
							this.getWechatMessage();
						});

						if (this.$storage.get("getLocationTime") == "") {
							this.getSetting(() => {
								if (this.isOpenAssistance) {
									this.isOpenAssistance = false;
									this.getInviteInfo(this.inviteCode, this.gameId);
								}
								if (this.share && this.onceShare) {
									this.$refs.onceShare.show();
								}
							});
						} else {
							if (this.isOpenAssistance) {
								this.isOpenAssistance = false;
								this.getInviteInfo(this.inviteCode, this.gameId);
							}
							if (this.share && this.onceShare) {
								this.$refs.onceShare.show();
							}
						}
						const locationTime = this.$storage.get("getLocationTime");
						const launchOptions = this.$storage.get("options");
						this.trackEvent("loginGame", {
							sceneID_evar: launchOptions.scene + "",
							referrerInfo_evar: JSON.stringify(launchOptions.referrerInfo),
							locationLongitude_evar: locationTime.longitude,
							locationLatitude_evar: locationTime.latitude,
							"3rdpartyUserID_evar": this.user.userId,
						});
					})
					.catch((res) => {
						this.logining = false;
						this.$loading.hide();
						this.$refs.login_popup.close();
						uni.showToast({
							title: `${res.errmsg}`,
						});
					});
			},
			getWechatMessage(handler) {
				apiWechatMessage().then((res) => {
					this.isOpenSendMessage = res.high_frequency_notice == 1;
					this.isOpenShareContent = res.show_share_btn == 1;
					handler && handler();
				});
			},
			trackEvent(name, data) {
				const gameInfo = this.$storage.get("gameInfo");
				this.$uma.trackEvent(name, {
					...data,
					gameID_evar: this.gameId,
					gameName_evar: gameInfo.name,
					userOpenID_evar: this.user.openid + "",
					timeStamp_evar: Date.parse(new Date()) + "",
				});
			},
		},
		async onShareAppMessage(e) {
			if (!this.gameId) {
				uni.showToast({
					title: "不存在该游戏!",
					icon: "error",
				});
				this.$refs.onceShare.hide();
				return;
			}
			if (this.gameInfo.status > 5) {
				uni.showToast({
					title: this.gameInfo.status == 6 ? "游戏已结束!" : "游戏已关闭!",
					icon: "error",
				});
				return;
			}

			if (this.gameInfo.status == 1 || this.gameInfo.status == 2) {
				uni.showToast({
					title: "游戏未开始!",
					icon: "none",
				});
				return;
			}
			if (this.share && this.onceShare) {
				const path = `/pages/index/index?gameId=${this.gameId}`;
				this.onceShare = false;
				this.$refs.onceShare.hide();
				return {
					title: this.gameInfo.name,
					path,
				};
			}
			let type, rank;
			if (e.from === "button") {
				// 来自页面内分享按钮

				type = e.target.dataset.type;
				rank = e.target.dataset.rank;
			}
			let params = {
				game_id: this.gameId,
				type,
			};
			if (type == 1) {
				// 礼品
				params = {
					...params,
					prize_id: this.gameResult.prize.game_award_id,
				};
			}
			if (type == 2) {
				// 排名
				params = {
					...params,
					rank,
				};
			}
			// 获取邀请码
			const inviteData = await inviteHelp(params);
			const locationTime = this.$storage.get("getLocationTime");
			this.trackEvent("shareGame", {
				locationLongitude_evar: locationTime.longitude,
				locationLatitude_evar: locationTime.latitude,
				"3rdpartyUserID_evar": this.user.userId,
			});

			const path =
				"/pages/index/index?gameId=" +
				this.gameId +
				"&type=" +
				type +
				"&code=" +
				inviteData.code;
			return {
				title: this.gameInfo.name,
				path,
				imageUrl: "https://static.roi-cloud.com/upload/20220110/60935669173101",
			};
		},
		watch: {
			currentScoreItem: {
				handler(value, old) {
					const user = this.$storage.getUser();
					if (user.userId) {
						// if (Number(value) === 1) {
						// 	this.getAward();
						// }
						if (Number(value) === 2) {
							this.getExchange();
						}
					}
				},
				deep: true,
			},
			shakePlay: function(val, oldVal) {
				if (val) {
					this.play(true);
					this.shakePlay = false;
				}
			},
		},
	};
</script>

<style lang="scss">
	#lottie_demo {
		height: 520px;
		width: 100vw;
		position: absolute;
		top: 302rpx;
		z-index: 88888
	}

	.cloud {
		width: 100vw;
		height: 912rpx;
		position: absolute;
		top: 690rpx
	}

	@mixin barrageContent {
		width: 358rpx;
		height: 60rpx;
		box-sizing: border-box;
		padding: 0 17rpx 0 8rpx;
		background: #FEEBCC;
		display: flex;
		align-items: center;
		border-radius: 56rpx;
		animation: fadeIn 12s ease-out infinite forwards;
		z-index: 100;
		opacity: 80%;
		font-size: 22rpx;
		position: absolute;

		image {
			width: 44rpx;
			height: 44rpx;
			border-radius: 100%;
			margin-right: 10rpx;
		}

		view {
			flex: 1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.user_info {
			color: #76521D
		}

		.reword {
			color: #FB5551;
		}
	}

	.barrage1 {
		@include barrageContent;

		left: 208rpx;
		top: 380rpx
	}

	.barrage2 {
		@include barrageContent;
		top: 550rpx;
		left: 58rpx;
	}

	.barrage3 {
		@include barrageContent;
		top: 650rpx;
		right: 40rpx;
	}

	.barrage4 {
		@include barrageContent;
		top: 750rpx;
		left: 38rpx;
	}

	.barrage5 {
		@include barrageContent;
		top: 950rpx;
		left: 220rpx;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			/*初始状态 透明度为0*/
		}

		20% {
			opacity: 1;
		}


		50% {
			opacity: 1;
			/*中间状态 透明度为0*/
		}

		80% {
			opacity: 1;
		}

		100% {
			opacity: 0;
			/*结尾状态 透明度为1*/
		}
	}

	.trunk {
		animation: move 0.5s ease-in 2 forwards;
	}

	.trunk_slow {
		animation: move_slow 0.5s ease-in 2 forwards;
	}

	.trunk_most {
		animation: move_most 0.5s ease-in 2 forwards;
	}

	.swiper_anumation {
		animation: swiper 5s ease-out infinite forwards;
	}

	.swiper_anumation_slow {
		animation: swiper_slow 5s ease-out infinite forwards;
	}

	@keyframes swiper_slow {
		0% {
			transform: translateX(0px) rotate(-2deg);
		}

		50% {
			transform: translateX(3px) rotate(0deg);
		}

		75% {
			transform: translateX(-3px) rotate(2deg);
		}

		100% {
			transform: translateX(0px) rotate(-2deg);
		}
	}

	.swiper_anumation_most {
		animation: swiper_most 5s ease-out infinite forwards;
	}

	@keyframes swiper_most {
		0% {
			transform: translateX(0px) rotate(4deg);
		}

		50% {
			transform: translateX(6px) rotate(0deg);
		}

		75% {
			transform: translateX(-6px) rotate(-4deg);
		}

		100% {
			transform: translateX(0px) rotate(4deg);
		}
	}

	@keyframes swiper {
		0% {
			transform: translateX(0px) rotate(-3deg);
		}

		50% {
			transform: translateX(4px) rotate(0deg);
		}

		75% {
			transform: translateX(-4px) rotate(3deg);
		}

		100% {
			transform: translateX(0px) rotate(-3deg);
		}
	}

	@keyframes move {
		0% {
			transform: translateX(0px);
		}

		40% {
			transform: translateX(8px);
		}

		80% {
			transform: translateX(0px);
		}
	}

	@keyframes move_most {
		0% {
			transform: translateX(0px);
		}

		40% {
			transform: translateX(12px);
		}

		80% {
			transform: translateX(0px);
		}
	}

	@keyframes move_slow {
		0% {
			transform: translateX(0px);
		}

		40% {
			transform: translateX(6px);
		}

		80% {
			transform: translateX(0px);
		}
	}

	.Wobble {
		animation: Wobbles 0.7s ease-in 0.5s 2 forwards;
	}

	.Wobble_move {
		animation: Wobbles_nove 0.7s ease-in 0.5s 2 forwards;
	}

	@keyframes Wobbles {
		0% {
			transform: translate(0px) rotate(0deg) scale(1);
		}

		50% {
			transform: translate(3px) rotate(6deg) scale(1);
		}

		100% {
			transform: translate(0px) rotate(0deg) scale(1);
		}
	}

	@keyframes Wobbles_nove {
		0% {
			transform: translate(0px) rotate(0deg) scale(1);
		}

		50% {
			transform: translate(7px) rotate(6deg) scale(1);
		}

		100% {
			transform: translate(0px) rotate(0deg) scale(1);
		}
	}

	.levl-1 {
		width: 200rpx;
		height: 140rpx;
		position: absolute;
		left: 170rpx;
		top: 320rpx;
		z-index: 20
	}

	.levl-2 {
		width: 540rpx;
		height: 446rpx;
		position: absolute;
		left: 170rpx;
		top: 300rpx;
		z-index: 20;
		// display: none;
	}

	.levl-3 {
		width: 280rpx;
		height: 190rpx;
		top: 428rpx;
		left: 50rpx;
		position: absolute;
		z-index: 30;
	}

	.levl-4 {
		width: 360rpx;
		height: 240rpx;
		top: 560rpx;
		position: absolute;
		z-index: 40;
		left: 22rpx;
	}

	.levl-5 {
		width: 360rpx;
		height: 280rpx;
		position: absolute;
		z-index: 10;
		top: 722rpx;
		left: 10rpx;
	}

	.levl-6 {
		width: 320rpx;
		height: 210rpx;
		position: absolute;
		top: 807rpx;
		left: 230rpx;
		z-index: 10
	}

	.levl-7 {
		width: 220rpx;
		height: 160rpx;
		position: absolute;
		top: 707rpx;
		right: 90rpx;
		z-index: 50;
	}

	.levl-8 {
		width: 340rpx;
		height: 310rpx;
		position: absolute;
		top: 632rpx;
		right: 0rpx;
		z-index: 20
	}

	@mixin hongbao {
		width: 60rpx;
		height: 80rpx;
		position: absolute;
		z-index: 90;
		border-radius: 6rpx;
	}

	.hongbao1 {
		@include hongbao;
		top: 420rpx;
		left: 290rpx;
	}

	.hongbao2 {
		@include hongbao;
		right: 180rpx;
		top: 530rpx;
	}

	.hongbao3 {
		@include hongbao;
		left: 150rpx;
		top: 640rpx;
	}

	.hongbao4 {
		@include hongbao;
		z-index: 0;
		top: 700rpx;
		left: 364rpx;
		z-index: 11;
	}

	.hongbao5 {
		@include hongbao;
		top: 950rpx;
		left: 120rpx;
		z-index: 0;
	}

	.hongbao6 {
		@include hongbao;
		z-index: 90;
		right: 135rpx;
		top: 840rpx;
	}

	.diy_logo {
		width: 150px;
		height: 35px;
	}

	#shareCanvas {
		position: fixed;
		top: -9999999999999px;
		background: #fff;
		width: 260px;
		height: 198px;
		z-index: 999;
	}

	.ad_wrap {
		width: 580upx;
		height: 140upx;
		margin: 40upx auto;
		overflow: hidden;
		background: linear-gradient(137deg, #95ffdc 0%, #ff8944 99%, #ff8944 100%);
		border-radius: 20upx;

		swiper,
		image,
		.swiper-item {
			width: 100%;
			height: 100%;
			border-radius: 20upx;

			image {
				border-radius: 20upx;
			}
		}
	}

	.contactPoup {
		// padding: 40upx;
		text-align: center;

		image {
			padding: 40upx;
			width: 400upx;
			height: 400upx;
		}
	}

	.no_data {
		padding: 40upx 0;
		text-align: center;
		color: #aaa;
		font-size: 30upx;
	}

	.bottom-button-wrap {
		position: fixed;
		background: #e6e6e6;
		z-index: 10;
		width: 100%;
		height: 50px;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;

		.bottom-button-container {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 16px;
		}

		.bottom-setting-wrap {
			display: flex;
			flex-direction: column;
			font-size: 10px;
			color: #666;
			align-items: center;

			.bottom-setting-icon {
				width: 22px;
				height: 22px;
				margin: 0 0 4px;
			}
		}

		.bottom-button-action {
			display: flex;

			.bottom-button-edit {
				text-align: center;
				padding: 4px 12px;
				border: 1px solid #e83d3d;
				color: #e83d3d;
				font-size: 14px;
				margin: 0 12px 0 0;
				border-radius: 20px;
			}

			.bottom-button-share {
				background-color: #e83d3d;
				text-align: center;
				padding: 4px 16px;
				color: #fff;
				font-size: 14px;
				border-radius: 20px;
			}
		}
	}

	.login_poup {
		padding: 54upx 40upx;
		background: #fff;
		border-radius: 24upx 24upx 0px 0px;

		.login_title {
			font-size: 32upx;
			font-weight: 600;
		}

		.sub_title {
			font-size: 30upx;
			font-weight: 400;
			margin-top: 24upx;
		}

		.logint_desc {
			font-weight: 400;
			color: #b2b2b2;
			margin-top: 12upx;
			font-size: 26upx;
		}

		.agreement {
			margin-top: 82upx;
			color: #b2b2b2;
			font-size: 26rpx;

			.protocol {
				color: #0059ff;
				font-size: 26rpx;
			}
		}

		.btns {
			display: flex;
			justify-content: space-around;

			.def_btn {
				width: 240upx;
				height: 80upx;
				line-height: 80upx;
				color: #07c160;
				margin-top: 90upx;
				border-radius: 8upx;
				text-align: center;
				background: rgba(0, 0, 0, 0.05);

				&.active {
					color: #fff;
					margin-left: 32upx;
					background: #07c160;
				}
			}
		}
	}

	.login_content {
		padding: 40upx;

		text-align: center;
	}

	.confirm_login {
		padding: 20upx;
		color: #e83d3d;
		border-top: 1upx solid #f2f2f2;
		text-align: center;
	}

	.share_img_wrap {
		text-align: center;

		image {
			width: 424upx;
			height: 444upx;
			margin-top: 20upx;
		}
	}

	.gift_swiper {
		width: 690upx;
		height: 167upx;
		margin: 0 auto;
		overflow: hidden;
		background: linear-gradient(137deg, #95ffdc 0%, #ff8944 99%, #ff8944 100%);
		border-radius: 24upx;
		margin-bottom: 30rpx;

		swiper,
		image,
		.swiper-item {
			width: 100%;
			height: 100%;

			image {
				border-radius: 24upx;
			}
		}
	}

	.over_popup {
		.over_header {
			height: 186upx;
			background: url(https://static.roi-cloud.com/base/over_bg.png) no-repeat 100%;
			background-position: top;
			background-size: 100% 100%;

			.over_title {
				height: 118upx;
				text-align: center;
				line-height: 118upx;
				color: #fff;
				position: relative;
				text-align: center;

				.icon_close {
					width: 40upx;
					height: 40upx;
					position: absolute;
					right: 40upx;
					top: 40upx;
					display: flex;
					align-items: center;
				}
			}
		}

		.o_avatar {
			width: 122upx;
			height: 122upx;
			border-radius: 50%;
			margin: -61upx auto 0;
			background: #eee;
			overflow: hidden;
		}

		.o_username {
			text-align: center;
			margin-top: 12upx;
			font-weight: 600;
			font-size: 30upx;
		}

		.o_rank {
			font-size: 30upx;
			margin-top: 26upx;
			text-align: center;
			font-weight: 400;

			text {
				font-weight: 600;
			}
		}

		.o_prize {
			background-color: #fefcf1;
			border-radius: 20upx;
			min-height: 152upx;
			align-items: center;
			display: flex;
			width: 540upx;
			margin: 20rpx auto;
			box-sizing: border-box;
			padding: 20rpx 20rpx 20rpx 20rpx;
			align-items: center;
			box-shadow: 0 10rpx 40rpx 0 rgba(0, 0, 0, 0.06);

			image {
				width: 100rpx;
				height: 100rpx;
				margin-right: 30rpx;
				border-radius: 16rpx;
			}

			.o_prize_text {
				display: flex;
				flex-direction: column;

				.ranke_name {
					background: #ff7948;
					border-radius: 21rpx;
					font-size: 26rpx;
					color: #ffffff;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					width: 140rpx;
				}

				.prize_name {
					margin-top: 14rpx;
					font-size: 28rpx;
					color: #333333;
					width: 360rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}

		.svip_end_tips {
			width: 100%;
			margin: 40upx auto 0;
			text-align: center;
			font-size: 24upx;
		}

		.icon_gift_box {
			width: 286upx;
			margin: 0 auto;

			image {
				width: 100%;
				height: 326upx;
			}

			.gift_box_tips {
				width: 242upx;
				text-align: center;
				margin: -68upx auto 0;
				font-size: 24upx;
			}
		}

		.get_goods_wrap {
			padding: 20upx;
			display: flex;
			margin: 30upx 30upx 0;
			border-radius: 16upx;
			background: #fffcf1;
			box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.06);

			.get_img {
				width: 112upx;
				height: 112upx;
				background: #eee;
				border-radius: 16upx;
			}

			.get_right {
				width: 1upx;
				flex: 1;
				margin-left: 30upx;
				padding: 12upx 0;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.get_level {
					font-size: 24upx;
					width: 140upx;
					height: 42upx;
					color: #fff;
					background: #ff7948;
					line-height: 42upx;
					border-radius: 42upx;
					text-align: center;
				}

				.get_title {
					width: 90%;
					font-size: 28upx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		.get_tip {
			width: 434upx;
			font-size: 24upx;
			text-align: center;
			margin: 86upx auto 0;
		}

		.get_btn {
			width: 406upx;
			height: 80upx;
			text-align: center;
			color: #fff;
			margin: 44upx auto 72upx;
			font-size: 34upx;
			font-weight: 600;
			line-height: 80upx;
			background: linear-gradient(180deg, #ff7657 0%, #e93e3d 100%);
			box-shadow: 0 10upx 20upx 0 #f96650;
			border-radius: 51upx;
		}
	}

	.pd-20 {
		padding-bottom: 40rpx;
	}

	.get_out {
		position: relative;
		text-align: center;
		box-sizing: border-box;

		.h-40 {
			height: 80rpx;
		}

		.icon_close {
			width: 40upx;
			height: 40upx;
			position: absolute;
			right: 40upx;
			top: 40upx;
		}

		.icon_dice-3 {
			position: absolute;
			top: 104upx;
			right: -28upx;
			transform: rotate(-30deg);
			width: 70upx;
			height: 70upx;
		}

		.icon_sad {
			width: 104upx;
			height: 104upx;
			margin-top: 90rpx;
		}

		.m_title {
			margin-top: 24upx;
			font-size: 34upx;
			font-weight: 600;
			color: #333333;
		}

		.s_title {
			width: 428upx;
			font-weight: 400;
			color: #333333;
			margin: 8upx auto 0;
			font-size: 28upx;
		}

		.btn_know {
			width: 406upx;
			height: 80upx;
			color: #fff;
			line-height: 80upx;
			margin: 80upx auto 0;
			background: linear-gradient(180deg, #ff7657 0%, #e93e3d 100%);
			box-shadow: 0 10upx 20upx 0 #f96650;
			border-radius: 51upx;
		}

		.bttom_tips {
			width: 372upx;
			margin: 40upx auto 70upx;
			line-height: 40upx;
			font-size: 24upx;
			font-weight: 400;
			color: #333333;

			text {
				color: red;
				margin-left: 10upx;
			}
		}

		.p_bowl {
			width: 400upx;
			height: 400upx;
			margin: -64upx auto 0;
			position: relative;

			.img_bowl {
				width: 100%;
				height: 100%;
			}

			.icon_dice-1 {
				position: absolute;
				top: 142upx;
				left: 84upx;
				width: 106upx;
				height: 106upx;
			}

			.icon_dice-2 {
				position: absolute;
				top: 64upx;
				left: 128upx;
				width: 106upx;
				height: 106upx;
			}

			.icon_dice-5 {
				position: absolute;
				top: 144upx;
				left: 228upx;
				width: 70upx;
				transform: rotate(-15deg);
				height: 70upx;
			}

			.icon_dice-4 {
				position: absolute;
				top: 204upx;
				left: 178upx;
				width: 70upx;
				height: 70upx;
			}
		}
	}

	.mt50 {
		margin-top: 50upx !important;
	}

	.mt100 {
		margin-top: 100upx !important;
	}

	.p_bowl {
		width: 400upx;
		height: 400upx;
		margin: -64upx auto 0;
		position: relative;

		.img_bowl {
			width: 100%;
			height: 100%;
		}

		.icon_dice-1 {
			position: absolute;
			top: 142upx;
			left: 84upx;
			width: 106upx;
			height: 106upx;
		}

		.icon_dice-2 {
			position: absolute;
			top: 64upx;
			left: 128upx;
			width: 106upx;
			height: 106upx;
		}

		.icon_dice-5 {
			position: absolute;
			top: 144upx;
			left: 228upx;
			width: 70upx;
			transform: rotate(-15deg);
			height: 70upx;
		}

		.icon_dice-4 {
			position: absolute;
			top: 204upx;
			left: 178upx;
			width: 70upx;
			height: 70upx;
		}
	}

	.icon_dice {
		position: absolute;
		top: -44upx;
		left: 24upx;
		width: 106upx;
		height: 106upx;
	}

	.assistance_pop,
	.help_other,
	.help_other_faile {
		text-align: center;

		.avatar,
		.help_status_icon {
			width: 160upx;
			height: 160upx;
			border-radius: 50%;
			margin: -80upx auto 28upx;
			background: #eee;
			overflow: hidden;
			border: 4upx solid #fff;

			image {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.help_m_title {
			font-weight: 600;
			color: #333333;
			margin-top: 38upx;
			font-size: 34upx;
		}

		.help_sub_title {
			color: #999999;
			margin-top: 10upx;
		}

		.username {
			margin-top: 76upx;
			color: #333;
			font-size: 32upx;
			margin-bottom: 38upx;
		}

		.ass_m_title {
			font-weight: 600;
			color: #333333;
			font-size: 34upx;
		}

		.mt10 {
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			color: #333333;
			letter-spacing: 0;
			text-align: center;
			margin-top: 20rpx;
		}

		.play_btn {
			width: 338upx;
			margin: 22upx auto 20upx;
			background: #ff4343;
			height: 88upx;
			line-height: 88upx;
			border-radius: 88upx;
			color: #fff;
			margin-top: 22upx;
			text-align: center;
		}

		.g_rank_no {
			font-size: 64upx;
			font-weight: 600;
			color: #333333;
			text-align: center;
			padding: 20upx 0 40upx;
		}

		.g_img {
			.goods_wrap {
				display: flex;
				margin: 40upx 30upx;
				padding: 20upx;
				background: #fff;
				box-shadow: 0 10upx 40upx 0 rgba(0, 0, 0, 0.06);
				border-radius: 16px;

				image {
					width: 112upx;
					height: 112upx;
					border-radius: 16upx;
					margin-right: 30upx;
					border: 2upx solid #f0f0f0;
				}

				.prizeName {
					font-size: 28upx;
					font-weight: 400;
					color: #333333;
					line-height: 58upx;
					width: 1upx;
					flex: 1;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}
	}

	.no_play_num {
		width: 600rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff8dc;
		border-radius: 26rpx;

		.over_title {
			display: flex;
			justify-content: space-between;
			width: 100%;

			.icon_close {
				margin: 20rpx;
			}
		}

		.help_status_icon {
			width: 104rpx;
			height: 104rpx;
		}

		.help_m_title {
			font-size: 34rpx;
			color: #333333;
			letter-spacing: 0.13px;
			margin: 30rpx 0 20rpx;
		}

		.help_sub_title {
			font-size: 28rpx;
			color: #333333;
			letter-spacing: 0.11px;
			text-align: center;
		}

		.share_btn {
			background-image: linear-gradient(180deg, #ff7657 0%, #e93e3d 100%);
			box-shadow: 0 10rpx 20rpx 0 #f96650;
			border-radius: 51rpx;
			width: 406rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			color: #fff;
			margin: 60rpx;
		}
	}

	.pop_share_btn {
		background: none;
		width: 112upx;
		margin: 0 auto;
		padding: 50upx 0;

		&:after {
			border: none;
		}

		image {
			width: 112upx;
			height: 112upx;
		}

		.share_text {
			font-size: 24upx;
			color: #999999;
		}
	}

	.score_menu,
	.help_menu {
		display: flex;
		margin: 0 30upx;
		height: 80upx;
		color: #ff3d3d;
		line-height: 80upx;
		border: 1px solid #ff3d3d;
		border-radius: 16upx;
		overflow: hidden;

		.score_item,
		.help_item {
			flex: 1;
			text-align: center;

			&.active {
				color: #fff;
				background-color: #ff3d3d;
			}
		}
	}

	.score_list {
		margin-top: 18upx;
		max-height: 500upx;
		overflow-y: scroll;

		.score_list_item {
			display: flex;
			min-height: 108upx;
			justify-content: space-between;
			align-items: center;
			margin: 0 60rpx;
			border-bottom: solid 1px #f3eeee;

			.item_left {
				width: 40%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.item_right {
				color: #666666;
				font-size: 24upx;
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.t_blod {
					margin-right: 40upx;
					font-weight: bold;
					font-size: 28upx;
					color: #333333;
					margin-left: 20rpx;
				}

				.item_right_time {
					display: flex;
					flex-direction: column;

					&_date {
						// margin-bottom: 30rpx;
					}
				}
			}
		}
	}

	.bg_level-6 {
		width: 100%;
		height: 186upx;
		margin-top: -126upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.score_detail {
		width: 600rpx;
		border-radius: 16rpx;
		background-color: #fff;
	}

	.help_pop {
		width: 600rpx;
		border-radius: 16rpx;
		background-color: #fff;
	}

	.p_title {
		height: 120upx;
		font-weight: 600;
		line-height: 120upx;
		text-align: center;
		font-size: 34upx;
		position: relative;

		.icon_close {
			height: 40upx;
			width: 40upx;
			position: absolute;
			right: 40upx;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	.f-normal {
		font-weight: normal !important;
	}

	.help_tip {
		margin: 28upx 30upx 0;
		color: #999999;
		font-size: 12px;

		image {
			width: 30upx;
			height: 30upx;
		}
	}

	.dice_result {
		display: flex;
		margin: 46upx 30upx 0;
		align-items: center;
		justify-content: space-between;

		.dice_item {
			width: 80upx;
			height: 80upx;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.award_title {
		padding: 30upx 0;
		font-weight: 600;
		font-size: 34upx;
		text-align: center;
	}

	.goods_wrap {
		display: flex;
		margin: 0 30upx;
		padding: 20upx;
		background: #fffcf1;
		box-shadow: 0 10upx 40upx 0 rgba(0, 0, 0, 0.06);
		border-radius: 16px;

		image {
			width: 112upx;
			height: 112upx;
			border-radius: 16upx;
			margin-right: 30upx;
			border: 2upx solid #f0f0f0;
		}

		.prizeName {
			font-size: 28upx;
			font-weight: 400;
			color: #333333;
			line-height: 58upx;
			width: 1upx;
			flex: 1;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}

	.integral {
		margin: 60upx 0 60upx;
		font-size: 36upx;
		color: #333333;
		font-weight: bold;
		text-align: center;
	}

	.again {
		font-size: 30upx;
		height: 88upx;
		line-height: 88upx;
		text-align: center;
		background: #ff4343;
		color: #fff;
		width: 290upx;
		margin: 0 auto 54upx;
		border-radius: 88upx;
	}

	.help_tips {
		display: flex;
		color: #999999;
		margin-top: 24upx;
		font-size: 24upx;
		padding-bottom: 24upx;
		align-items: center;
		justify-content: center;

		image {
			width: 24upx;
			height: 24upx;
			margin-left: 10upx;
		}
	}

	.bo_center {
		color: #ff4343;
		font-size: 24upx;
		text-align: center;
		padding: 20upx 0 50upx;
	}

	.award_level {
		width: 266upx;
		height: 128upx;
		margin: 0 auto;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.icon_cry {
		width: 182upx;
		height: 156upx;
		margin: 0 auto;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.help_list {
		height: 250px;
		overflow-y: auto;
		padding: 0 30upx;
		box-sizing: border-box;

		.help_list_item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 108upx;
			line-height: 108upx;
			color: #666666;
			font-size: 24upx;
			border-bottom: solid 1px #f3eeee;

			.ml10 {
				margin-left: 10upx;
			}

			.help_left {
				display: flex;
				align-items: center;

				.avatar {
					width: 60upx;
					height: 60upx;
					margin-right: 10upx;
					border-radius: 50%;
					background: #eee;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.username {
					color: #333333;
					margin-left: 10upx;
				}
			}
		}
	}

	page {
		box-sizing: border-box;
		min-height: 100vh;
		background: #ff1500;
	}

	.wrap {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
		overflow-y: auto;
		// height: calc(100vh);
	}

	#main {
		box-sizing: border-box;
		position: relative;
		// display: none;

		.tips {
			color: #fff;
			text-align: center;
			font-size: 24upx;
			margin: 0upx 0 8upx;
			z-index: 21;
			position: relative;
		}

		.bowl_title {
			width: 580upx;
			height: 350upx;
			margin: 0 auto;
			position: relative;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.bowl {
			width: 100%;
			height: 788upx;
			position: relative;

			.rule {
				height: 56upx;
				line-height: 56upx;
				padding: 0 30upx;
				color: #fff;
				position: absolute;
				right: 36upx;
				top: 20upx;
				font-size: 24upx;
				border-radius: 56upx;
				background: rgba($color: #000000, $alpha: 0.3);
			}

			.dice_wrap {
				position: absolute;
				width: 68%;
				height: 57%;
				top: 21%;
				left: 14%;

				.dice {
					width: 70upx;
					height: 70upx;
					transform: rotate(360deg);

					&.playAnimation {
						opacity: 0;
						animation: diceAnimate 0.4s forwards linear;
						transform: translate(0, -800%) rotate(0deg) scale(0.8);
					}

					&.playAnimation:nth-child(1) {
						animation-delay: 0.2s;
					}

					&:nth-child(1) {
						position: absolute;
						left: 160upx;
						top: 113upx;
						animation-delay: 0.2s;
					}

					&.playAnimation:nth-child(2) {
						animation-delay: 0.3s;
						animation: diceAnimate1 0.4s forwards linear;
					}

					&:nth-child(2) {
						position: absolute;
						left: 310upx;
						top: 110upx;
					}

					&.playAnimation:nth-child(3) {
						animation-delay: 0.2s;
					}

					&:nth-child(3) {
						position: absolute;
						left: 120upx;
						top: 240upx;
					}

					&.playAnimation:nth-child(4) {
						animation-delay: 0.1s;
						animation: diceAnimate1 0.6s forwards linear;
					}

					&:nth-child(4) {
						position: absolute;
						left: 210upx;
						top: 330upx;
					}

					&.playAnimation:nth-child(5) {
						animation-delay: 0.3s;
					}

					&:nth-child(5) {
						position: absolute;
						left: 350upx;
						top: 250upx;
					}

					&.playAnimation:nth-child(6) {
						animation-delay: 0.1s;
					}

					&:nth-child(6) {
						position: absolute;
						left: 240upx;
						top: 230upx;
					}
				}
			}

			.icon_bowl {
				width: 100%;
				height: 100%;
			}
		}

		.gift_wrap {
			position: absolute;
			right: 10upx;
			width: 106upx;
			top: -30upx;
			z-index: 99;

			.icon_gift {
				width: 134upx;
				height: 146upx;
				position: absolute;
				left: 50%;
				top: -46%;
				transform: translateX(-50%);
				z-index: 1;
			}

			.shadow {
				width: 106upx;
				height: 106upx;
				line-height: 150upx;
				color: #fff;
				font-size: 20upx;
				text-align: center;
				background: linear-gradient(180deg, #c872d7 0%, #a031d6 100%);
				border-radius: 21upx;
			}
		}

		.chance {
			display: flex;
			align-items: center;
			color: #fff;
			justify-content: center;
			margin-top: 20upx;

			.number {
				background: #b13737;
				padding: 0 10upx;
				height: 48upx;
				margin: 0 14upx;
				line-height: 48upx;
				border-radius: 8upx;
				color: #fff;
			}
		}

		.de_btn {
			width: 406upx;
			height: 80upx;
			border-radius: 50upx;
			margin: 0 auto;
			margin-top: 40upx;
			font-weight: 600;
			line-height: 80upx;
			text-align: center;
			font-size: 34rpx;
			color: #976f1d;
		}

		.zl_btn {
			border: 2px solid #976f1d;
		}

		.btn_primary {
			color: #976f1d;
			background: linear-gradient(180deg, #fff6b1 0%, #ffcf79 100%);
		}

		.recorde_ad_wrap {
			// background-image: linear-gradient(180deg,
			// 		#fecbb7 55%,
			// 		rgba(255, 255, 255, 0) 100%);
			padding: 0rpx 0 0rpx;
		}

		.record_wrap {
			display: flex;
			// color: #976f1d;
			color: #ffffff;
			align-items: center;
			justify-content: center;
			// margin: 50upx auto;
			font-size: 32upx;
			padding: 40rpx 0 70rpx 0;
			box-sizing: border-box;

			.line {
				width: 1upx;
				height: 30upx;
				margin: 0 30px;
				// background-color: #976f1d;
				background-color: #ffffff;
			}
		}

		.swiper_wrap {
			margin: 16upx 30upx;
			background: rgba($color: #000000, $alpha: 0.35);
			color: #fff;
			box-sizing: border-box;
			position: relative;
			border-radius: 60upx;
			z-index: 100;

			.uni-noticebar {
				padding: 8rpx 12rpx !important;
			}
		}

		.rule-wrapper {
			z-index: 100;
		}

		.rank_ad_wrap {
			box-sizing: border-box;
			padding: 0 30rpx 30rpx;
		}

		.rank_wrap {
			position: relative;
			background: #fff4da;
			border-radius: 24rpx;
			box-sizing: border-box;
			// margin: 40rpx 0;
			padding: 30rpx 26rpx 80rpx 30rpx;

			.rule {
				position: absolute;
				right: 30upx;
				top: 0;
				height: 56upx;
				line-height: 56upx;
				padding: 0 30upx;
				color: #fff;
				border-radius: 56upx;
				border: 1upx solid #fff;
			}

			.rank_time {
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 52upx;
				text-align: center;
				background: #ffe2cb;
				font-size: 24rpx;
				width: 440rpx;
				margin: 0 auto;
			}

			.my_rank {
				border-radius: 36upx;
				padding: 40upx 0;
				background: #fff4da;
			}

			.rank_list {
				margin-top: 20upx;

				.rank_box {
					padding: 20upx;
					background: #ffd2ba;
					margin-bottom: 30upx;
					border-radius: 36upx;
					display: flex;
					font-size: 24upx;

					.gift_image {
						width: 108upx;
						height: 108upx;
						border-radius: 16upx;
						background: #aaa;

						image {
							border-radius: 16upx;
						}
					}

					.gift_right {
						display: flex;
						margin-left: 26upx;
						flex-direction: column;
						justify-content: space-around;
					}

					.gift_title {
						display: flex;

						.gift_level {
							padding: 0 30upx;
							height: 42upx;
							line-height: 42upx;
							color: #fff;
							font-size: 26upx;
							background: #ff7948;
							border-radius: 42upx;
						}

						.no_number {
							margin-left: 24upx;
						}
					}
				}

				.border_top {
					margin: 0 30upx;
					border-top: 1upx solid #f25656;
				}

				.mlr30 {
					margin: 0 30upx;
				}

				.box_item {
					display: flex;
					color: #333;
					font-size: 28upx;
					align-items: center;
					padding: 24upx 0;
					justify-content: space-between;

					.box_item_left {
						display: flex;
						align-items: center;

						.no_icon {
							width: 40upx;
							height: 36upx;
							text-align: center;
							margin-right: 10upx;
						}

						.avatar {
							width: 64upx;
							height: 64upx;
							border-radius: 50%;
							margin-right: 44upx;
						}
					}
				}
			}

			.my_rank_top {
				display: flex;
			}

			.share_btn {
				height: 80upx;
				margin: 42upx 0 0 102upx;
				line-height: 80upx;
				background: linear-gradient(180deg, #fd7d57 0%, #fe3c1b 100%);
				box-shadow: 0 10upx 20upx 0 #fea190;
				border-radius: 51upx;
				align-items: center;
				display: flex;
				color: #fff;
				font-weight: 600;
				font-size: 34upx;
				justify-content: center;
				width: 400rpx;

				.icon_wechat {
					width: 34upx;
					height: 34upx;
					margin-right: 10upx;
				}
			}

			.rank_avatar {
				width: 90upx;
				height: 90upx;
				padding-right: 40upx;
				border-right: 1upx solid #e9e2e2;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.my_rank_title {
				font-size: 24upx;
				font-weight: 400;
				color: #666666;
				line-height: 34upx;
			}

			.my_rank_item {
				flex: 1;
				text-align: center;

				.rank_item_number {
					color: #333333;
					font-size: 46upx;
				}
			}

			.rank_title {
				color: #333;
				font-weight: normal;
				font-size: 34rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				margin-bottom: 24rpx;

				.icon_rangk {
					width: 60upx;
					height: 60upx;
					margin-right: 20upx;
					border-radius: 50%;
					background: url(https://static.roi-cloud.com/upload/20220104/60935669143651);
					background-size: 400%;
					background-position: center;
				}

				&_left {
					display: flex;
					align-items: center;

					view {
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>
