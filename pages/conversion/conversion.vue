<template>
  <view>
    <navbar
      :params="{
        lefTitle: 'test',
        back: true,
        backColor: '#fff',
        titleColor: '#fff',
        navColor: '#E83D3D',
        slot: true,
        title: gameInfo.logoInfo ? '' : '我的奖品',
      }"
      class=""
    >
      <view
        v-if="gameInfo.logoInfo.img"
        class="diy_logo"
        :style="
          'background:url(' +
          gameInfo.logoInfo.img +
          ') no-repeat;background-size:contain'
        "
      >
      </view>
    </navbar>
    <view id="main">
      <view class="card">
        <view class="main_title">奖品兑换</view>
        <view class="sub_title">
          <view>兑奖截止时间： {{ gameInfo.redeemEndTime }}</view>
          <view>数量有限，兑完即止</view>
        </view>
        <view class="userinfo">
          <view class="user_left">
            <view class="avatar">
              <image :src="user_info.avatar" mode=""></image>
            </view>
            <view class="user_score">
              <view class="">可兑积分</view>
              <view class="number">{{ gameInfo.integral || 0 }}</view>
            </view>
          </view>
          <navigator :url="'../prize/prize?gameId=' + gameId" class="user_right"
            >我的奖品</navigator
          >
        </view>
      </view>
      <view v-if="prizeList.length > 0">
        <view class="btn_part" @click="orderPrizeList">
          <text>所需积分</text>
          <uni-icons
            class="arrow"
            :type="points == 'DESC' ? 'arrowup' : 'arrowdown'"
            color="#fff"
          ></uni-icons>

          <!-- <uni-icons v-if="points==DESC" class="arrow" type="arrowup" color="#fff"></uni-icons>
					<uni-icons v-else class="arrow" type="arrowdown" color="#fff"></uni-icons> -->
        </view>
        <view
          v-for="item in prizeList"
          :key="item"
          :class="[
            'card',
            'exchange_part',
            { fade: Math.floor((item.left_num / item.prize_num) * 100) == 0 },
          ]"
        >
          <view class="exchange_left" @click="showDetail(item)">
            <view class="goods_info">
              <view class="goods_img">
                <image :src="item.prize_url" mode=""></image>
              </view>
              <view class="goods_title">
                <text>{{ item.prize_name }}</text>
              </view>
            </view>
            <view class="godds_progress">
              <view class="progress">
                <view
                  class="line"
                  :style="{
                    width:
                      Math.floor((item.left_num / item.prize_num) * 100) + '%',
                  }"
                >
                </view>
              </view>
              <text
                >剩余{{
                  Math.floor((item.left_num / item.prize_num) * 100)
                }}%</text
              >
            </view>
          </view>
          <view class="exchange_right">
            <view class="score_title">需积分</view>
            <view class="number">{{ item.prize_point }}</view>
            <view class="conversion_btn" @click="exchangePrisePoupShow(item)"
              >兑换</view
            >
          </view>
        </view>
        <view class="tips"> 奖品数量有限，早兑早拥有! </view>
      </view>

      <view class="award" v-if="advertList.length > 0">
        <swiper
          :circular="true"
          :autoplay="true"
          :interval="3000"
          :duration="1000"
        >
          <swiper-item v-for="item in advertList" :key="item">
            <view class="swiper-item">
              <image :src="item.uploadImgInfo.img" mode="aspectFill"></image>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <popup ref="exchange" class="exchange_poup" width="640" left="56" top="336">
      <view class="content">
        是否确认使用 {{ exchangeGoddsInfo.prize_point }} 积分 兑换
        {{ exchangeGoddsInfo.prize_name }}
      </view>
      <view class="action_part">
        <view class="action_btn" @click="$refs.exchange.hide()">取消</view>
        <view
          class="action_btn active"
          open-type="getPhoneNumber"
          @getphonenumber="confirmExchange"
          @click="confirmExchange"
          >是</view
        >
      </view>
    </popup>
    <popup ref="finish" class="finish_poup" width="640" left="56" top="336">
      <view class="finish_content">
        <view class="title">兑换成功</view>
        <view class="sub_title"
          >使用 {{ exchangeGoddsInfo.prize_point }} 积分兑换了</view
        >
        <image
          class="goods_img"
          :src="exchangeGoddsInfo.prize_url"
          mode="aspectFit"
        ></image>
        <view class="goods_info">{{ exchangeGoddsInfo.prize_name }}</view>
        <view class="btn active" @click="toGetAward">找商家领奖</view>
        <view class="btn" @click="$refs.finish.hide()">继续兑换</view>
      </view>
    </popup>
    <uni-popup :maskClick="false" type="dialog" ref="dialog">
      <view class="phone-wrap">
        <view class="phone-container">
          <image
            @click="onClose"
            src="https://static.roi-cloud.com/base/close.png"
            class="phone-close"
          />
          <view class="phone-title">
            <text>请留手机号</text>
          </view>
          <view class="phone-subtitle">
            <text>作为兑奖备用联系方式，我们会保护你的隐私</text>
          </view>
          <view class="phone-input-wrap" v-if="phone != ''">
            <input
              :value="phone"
              cursor-spacing="10"
              @input="changePhone"
              class="phone-input"
              placeholder="填写手机号"
              disabled="true"
            />
          </view>
          <button
            v-else
            open-type="getPhoneNumber"
            @getphonenumber="getphonenumber"
            type="primary"
            class="phone_button"
            :disabled="false"
          >
            微信手机号登录
          </button>
          <view v-if="codeError" class="phone-error-msg"
            ><text>{{ codeError }}</text></view
          >

          <view v-if="agreeError" class="agree-error-msg"
            ><text>{{ agreeError }}</text></view
          >
          <view
            v-if="phone != ''"
            :class="['phone-button', { 'button-disabled': !phone }]"
            @click="savePhone"
          >
            <text>保存</text>
          </view>
        </view>
      </view>
    </uni-popup>
    <popup
      ref="prizeInfoDetail"
      class="prizeInfoDetail"
      width="640"
      left="56"
      top="336"
    >
      <view class="p_header">
        <image
          @click="hideDetail"
          class="icon_close"
          src="https://static.roi-cloud.com/base/close.png"
          mode=""
        ></image>
      </view>
      <view class="g_info">
        <image :src="curr_show_item.prize_url" mode="aspectFill"></image>
        <view class="g_info_name">
          {{ curr_show_item.prize_name }}
        </view>
      </view>
      <view class="g_content">
        <view class="m_content">{{
          curr_show_item.prize_details || "暂无详细说明"
        }}</view>
        <view class="g_btn" @click="hideDetail">我知道了</view>
      </view>
    </popup>
  </view>
</template>

<script>
import "@/static/css/game.scss";
import {
  exchangeGamePrizeList,
  userInfo,
  apiGetMinSetting,
  addExchangeGamePrize,
  smsBindUserVerifyCode,
  updateUserPhone,
  apiGetGameInfo,
  userGame,
  apiGetAdvert,
  getPhone,
  userLogin,
} from "@/rest/api.js";
import { validPhone, relativePath } from "@/utils/tool.js";
import moment from "moment";
import popup from "@/components/popup/popup.vue";
import navbar from "../../components/Navbar.vue";
export default {
  components: {
    navbar,
    popup,
  },
  data() {
    return {
      exchangeGoddsInfo: {},
      phone: "",
      gameId: "",
      prizeList: [],
      user_info: {},
      setting: {},
      verifyCode: "",
      verifyCodeText: "发送验证码",
      verifyCodeTime: 0,
      codeError: "",
      verifyCodeResult: {},
      phoneError: "",
      gameInfo: {},
      advertList: [],
      userPlayInfo: {},
      points: "DESC",
      page: 1,
      curr_show_item: {},
    };
  },
  onLoad(options) {
    this.gameId = options.gameId;
    this.getPrizeList();
    this.getUserInfo();
    this.getGameInfo();

    // this.getUserPlayInfo()
    // this.getAdvert()
  },
  onReachBottom() {
    if (this.more) {
      this.page++;
      this.getPrizeList();
    }
  },
  methods: {
    getUserPlayInfo() {
      this.$loading.show();
      userGame({
        gameId: this.gameId,
      }).then((res) => {
        this.userPlayInfo = res;
        this.$loading.hide();
      });
    },
    toGetAward() {
      uni.navigateTo({
        url: "/pages/prize/prize?gameId=" + this.gameId,
      });
    },
    getAdvert() {
      apiGetAdvert({
        gameId: this.gameId,
      }).then((res) => {
        this.advertList = res;
      });
    },
    showDetail(item) {
      this.curr_show_item = item;
      this.$refs.prizeInfoDetail.show();
    },
    hideDetail() {
      this.$refs.prizeInfoDetail.hide();
    },
    orderPrizeList() {
      this.points == "DESC" ? (this.points = "ASC") : (this.points = "DESC");
      this.page = 1;
      this.getPrizeList();
    },
    changePhone: function (e) {
      this.phone = e.detail.value;
    },
    changeVerifyCode: function (e) {
      this.verifyCode = e.detail.value;
    },
    sendCode: function () {
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
    savePhone() {
      uni.showToast({
        title: "保存成功",
      });
      this.$refs.dialog.close();
    },
    getPrizeList() {
      this.$loading.show();
      let params = {
        page: this.page,
        gameId: this.gameId,
        pageSzie: 20,
        points: this.points,
      };
      exchangeGamePrizeList(params).then((res) => {
        this.$loading.hide();
        this.prizeList = res;
        // if(params.page == 1) this.prizeList = res
        // else this.prizeList = [...this.prizeList,...res]
        // if (res.pageCount == params.page) {
        // 	this.more = false
        // } else {
        // 	this.more = true
        // }
      });
    },
    getGameInfo() {
      apiGetGameInfo({
        game_id: this.gameId,
        template_id: "2021110901",
      }).then((res) => {
        res.redeemEndTime = moment(res.last_receive_time * 1000).format(
          "YYYY年MM月DD日"
        );
        this.gameInfo = res;
        // this.gameInfo.integral = res.integral.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      });
    },
    onClose: function () {
      clearInterval(this.timer);
      this.$refs.dialog.close();
    },
    confirmExchange(e) {
      try {
        this.$refs.exchange.hide();
        if (this.user_info.phone) {
          this.exchangePrise();
        } else {
          const _this = this;
          uni.login({
            success(res) {
              const params = {
                avatarUrl: _this.user_info.avatar,
                nickName: _this.user_info.nickname,
                platform: "yaoyaoshu",
                code: res.code,
              };
              userLogin(params).then((res) => {
                if (res.errno === "1") {
                  uni.showToast({
                    title: `请求异常！`,
                    icon: "error",
                  });
                  return;
                }
                const user = _this.$storage.getUser();

                _this.$storage.setUser({
                  ...user,
                  ...res,
                });
              });
            },
          });
          this.$refs.dialog.open();
        }
      } catch (e) {
        this.$toast.error(e);
      }
    },
    getphonenumber(e) {
      // 不允许授权
      if (e.detail.errMsg !== "getPhoneNumber:ok") {
        uni.showToast({
          title: "请授权！",
          icon: "error",
        });
        return;
      }

      const user = this.$storage.getUser();
      const params = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        agreement_id: this.user_info.agreement_id,
        privacy_clause_id: this.user_info.privacy_clause_id,
        platform: "yaoyaoshu",
      };
      getPhone(params)
        .then((res) => {
          user.phone = res.phoneNumber;
          this.phone = res.phoneNumber;
          this.$storage.setUser(user);
        })
        .catch((err) => {
          uni.showToast({
            title: "出错啦",
            icon: "error",
          });
        });
      this.user_info = user;
    },
    exchangePrise() {
      this.$loading.show();
      addExchangeGamePrize({
        gameId: this.gameId,
        gameAwardId: this.exchangeGoddsInfo.game_award_id,
      }).then((res) => {
        console.log(res, "resssss");
        if (res.errno) {
          this.$loading.hide();
          uni.showToast({
            title: res.errmsg,
            icon: "error",
          });
          return;
        }
        this.getGameInfo();
        this.getPrizeList();
        this.$loading.hide();
        this.$refs.finish.show();
      });
    },
    getAdvert() {
      apiGetAdvert({
        gameId: this.gameId,
      }).then((res) => {
        this.advertList = res;
      });
    },
    getUserInfo() {
      this.user_info = this.$storage.getUser();
      this.phone = this.user_info.phone;
      console.log(this.user_info);
    },
    exchangePrisePoupShow(item) {
      try {
        if (Number(item.prize_point) > Number(this.gameInfo.integral)) {
          this.$toast.error("积分不足");
        } else {
          this.exchangeGoddsInfo = item;
          this.$refs.exchange.show();
        }
      } catch (e) {
        this.$toast.error(e);
      }
    },
  },
};
</script>

<style lang="scss">
.prizeInfoDetail {
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
.diy_logo {
  width: 150px;
  height: 35px;
}

page {
  background: #e83d3d;
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

.phone_button {
  border-radius: 92upx;
  // width: 480upx;
  height: 80upx;
  line-height: 80upx;
  margin: 40upx;
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
    overflow: hidden;
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

#main {
  padding: 46upx 30upx 0;

  .card {
    background: #fff;
    padding: 30upx;
    border-radius: 36rpx;

    .main_title {
      font-size: 34upx;
      font-weight: bold;
      color: #333333;
    }

    .sub_title {
      margin-top: 12upx;
      font-size: 26upx;
      color: #666666;
    }

    .userinfo {
      height: 146upx;
      padding-top: 36upx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .user_left {
        display: flex;
        height: 100%;
        align-items: center;

        .avatar {
          width: 80upx;
          height: 80upx;
          border-radius: 50%;
          background: #eee;
          overflow: hidden;
          margin-right: 20upx;

          image {
          }
        }

        .user_score {
          color: #999999;
          font-size: 24upx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .number {
            color: #333;
            font-weight: 600;
            font-size: 48upx;
          }
        }
      }

      .user_right {
        color: #e83d3d;
        font-size: 28upx;
        height: 56upx;
        padding: 0 26upx;
        border-radius: 56upx;
        line-height: 56upx;
        border: 1upx solid #e83d3d;
      }
    }
  }

  .btn_part {
    width: 284upx;
    height: 68upx;
    display: flex;
    color: #fff;
    font-size: 30upx;
    margin: 30upx auto;
    justify-content: center;
    border: 1upx solid #fff;
    border-radius: 68upx;
    line-height: 68upx;

    .arrow {
      margin-left: 10upx;
    }
  }

  .tips {
    color: #fff;
    padding: 52upx 0 28upx;
    text-align: center;
  }

  .award {
    height: 167upx;
    background: linear-gradient(137deg, #95ffdc 0%, #ff8944 99%, #ff8944 100%);
    border-radius: 24upx;
    margin-bottom: 116upx;
    overflow: hidden;

    swiper,
    image,
    .swiper-item {
      width: 100%;
      height: 100%;
    }
  }

  .exchange_part {
    display: flex;
    margin-top: 30upx;

    &.fade {
      background: url(http://juzhuzhu.top/bobing/chance_over.png) #fff no-repeat;
      background-position: right bottom;
      background-size: 206upx 156upx;

      .goods_info {
        opacity: 0.3;
      }

      .exchange_right {
        opacity: 0.3;

        .conversion_btn {
          display: none;
        }
      }
    }

    .exchange_left {
      width: 1upx;
      flex: 1;

      .godds_progress {
        margin-top: 40upx;
        display: flex;
        align-items: center;
        color: #999999;
        font-size: 24upx;

        .progress {
          width: 300upx;
          height: 20upx;
          margin-right: 10upx;
          background: #efefef;
          border-radius: 20upx;
          position: relative;

          .line {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            border-radius: 20upx;
            background: $uni-color-primary;
          }
        }
      }
    }

    .exchange_right {
      width: 206upx;
      text-align: center;
      border-left: 1upx solid #f5f5f5;

      .score_title {
        color: #999999;
        font-size: 20upx;
      }

      .number {
        color: #333333;
        font-size: 40upx;
      }

      .conversion_btn {
        font-size: 30upx;
        width: 138upx;
        color: #fff;
        border-radius: 56upx;
        margin: 30upx auto 0;
        background: $uni-color-primary;
        text-align: center;
        height: 56upx;
        line-height: 56upx;
      }
    }

    .goods_info {
      display: flex;

      .goods_img {
        width: 88upx;
        height: 88upx;
        border-radius: 16upx;
        margin-right: 20upx;
        overflow: hidden;

        image {
          width: 110upx;
          height: 110upx;
          object-fit: cover;
          border-radius: 16rpx;
        }
      }

      .goods_title {
        flex: 1;
        font-size: 28upx;
        margin-left: 10upx;
        height: 88upx;
        line-height: 44upx;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        width: 1upx;
      }
    }
  }
}
</style>
