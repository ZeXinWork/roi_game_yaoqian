<template>
  <uni-popup
    ref="prizeDetail"
    class="prizeDetail"
    width="640"
    left="56"
    top="336"
  >
    <view class="p_body">
      <view class="p_body_mid">
        <view class="p_body_mid_title">恭喜您抽到奖品啦</view>
        <view class="p_body_mid_prize">
          <view class="p_body_mid_prize_item">奖品1</view>
          <view class="p_body_mid_prize_item">奖品2</view>
        </view>
      </view>
      <view class="p_body_top">
        <view class="p_body_top_red">
          <image
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzExIiBoZWlnaHQ9IjEzMiIgdmlld0JveD0iMCAwIDMxMSAxMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMxMC4wMSAwbC0uMDA1IDExNS43MThjMCA4LjgzNy03LjE2MyAxNi0xNiAxNmgtMjc4Yy04LjgzNiAwLTE2LTcuMTYzLTE2LTE2TDAgMGM0NS40NTkgMjAuMTU3IDk4LjQ0IDMxLjcxOCAxNTUuMDA1IDMxLjcxOCA1Ni41NjYgMCAxMDkuNTQ3LTExLjU2MSAxNTUuMDA1LTMxLjcxOHoiIGZpbGw9IiNFQTM1MkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
          ></image>
        </view>
        <view class="p_body_top_pink">
          <image
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzExIiBoZWlnaHQ9IjE0MSIgdmlld0JveD0iMCAwIDMxMSAxNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMxMC4wMSAwbC0uMDA1IDEyNC43MThjMCA4LjgzNy03LjE2MyAxNi0xNiAxNmgtMjc4Yy04LjgzNiAwLTE2LTcuMTYzLTE2LTE2TDAgMGM0NS40NTkgMjAuMTU3IDk4LjQ0IDMxLjcxOCAxNTUuMDA1IDMxLjcxOCA1Ni41NjYgMCAxMDkuNTQ3LTExLjU2MSAxNTUuMDA1LTMxLjcxOHoiIGZpbGw9IiNGMUE0OUEiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
          ></image>
        </view>
        <view class="p_body_top_button"> 这是个按钮 </view>
      </view>
    </view>
    <view class="p_bottom">
      <image
        @click="$refs.prizeDetail.close()"
        class="icon_close"
        src="https://static.roi-cloud.com/base/close.png"
        mode=""
      ></image>
    </view>
  </uni-popup>
</template>

<script>
export default {
    methods:{
        open(){
            this.$refs.prizeDetail.open()
        },
        close() {
            this.$refs.prizeDetail.close()
        }
    }
};
</script>

<style  lang="scss">
.prizeDetail {
  .p_body {
    width: 600upx;
    min-height: 700upx;
    border-radius: 32upx;
    background-image: linear-gradient(#eba278, #ff2626);
    position: relative;
    .p_body_mid {
      width: 510upx;
      position: absolute;
      min-height: 780upx;
      border-radius: 32upx;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background-image: linear-gradient(#fcf4b9, #e3d36d);
      .p_body_mid_title {
        text-align: center;
        padding: 30upx;
        font-size: 34upx;
        font-weight: 600;
      }
      .p_body_mid_prize {
        display: flex;
        flex-direction: column;
        .p_body_mid_prize_item {
          background-color: #fefcf1;
          border-radius: 20upx;
          min-height: 152upx;
          text-align: center;
          align-items: center;
          display: flex;
          width: 540upx;
          margin-left: -15upx;
          margin-top: 10upx;
          margin-bottom: 10upx;
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
        background-color: #f7eeb2;
        border-radius: 80rpx;
        text-align: center;
        line-height: 80rpx;
        left: 0;
        right: 0;
        bottom: 50rpx;
        margin: auto;
      }
    }
  }
  .p_bottom {
    position: absolute;
    left: 40%;
    padding: 40upx;

    .icon_close {
      width: 40upx;
      height: 40upx;
    }
  }
}
</style>