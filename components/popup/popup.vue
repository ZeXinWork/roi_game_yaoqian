<template>
	<view class="my_popup" :style="{height:phoneHeight+'px'}" v-if="showPopup" @tap="hide">
		<view class="my_popup_box" :style="{
			width:width+'rpx',
			borderRadius:radius+'rpx',
			backgroundColor:bgColor,
			}" @tap.stop="stop">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneHeight: '',
				showPopup: false
			};
		},
		created() {
			uni.getSystemInfo({
				success: (res) => {
					this.phoneHeight = res.screenHeight
				}
			})
		},
		props: {
			width: {
				width: Number,
				default: 500
			},
			radius: {
				radius: Number,
				default: 16
			},
			bgColor: {
				bgColor: String,
				default: '#ffffff'
			},
			left: {
				left: Number,
				default: 125
			},
			top: {
				top: Number,
				default: 300
			},
			canClose: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			hide() {
				if (this.canClose) {
					this.showPopup = false
				}
				this.$emit('hide')
			},
			close: function() {
				this.showPopup = false
			},
			stop() {
				return
			},
			show() {
				this.showPopup = true
			},
		}
	}
</script>

<style>
	.my_popup {
		width: 750rpx;
		background-color: rgba(0, 0, 0, .36);
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef MP-WEIXIN */
		height: 100vh;
		z-index: 500;
		/* #endif */
	}

	.my_popup_box {
		position: fixed;
		/* #ifdef MP-WEIXIN */
		z-index: 2000;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		animation: fade .2s;
		/* #endif */
	}

	@keyframes fade {
		from {
			opacity: 0;
			transform: translate(-50%,-50%) scale(.6);
		}

		to {
			opacity: 1;
			transform: translate(-50%,-50%) scale(1);
		}
	}
</style>
