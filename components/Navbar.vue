<template>
	<view>
		<view class="navbar-fixed" :style="{background: params.navColor}">
			<!-- 状态栏小程序撑起高度 -->
			<view :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="cu_bar" :style="{ height:navBarHeight + 'px'}">
				<uni-icons v-if="params.back" class="action_back" type="arrowleft" size="24" :color="params.backColor"
					@click="returnPage()"></uni-icons>
				<view class="content">
					<text v-if="params.title" :style="{color:params.titleColor || '#333'}">{{ params.title }}</text>
					<slot></slot>
				</view>
			</view>
		</view>
		<view v-if="params.slot" :style="{ height: statusBarHeight + navBarHeight + 'px' }"></view>
	</view>
</template>

<script>
	export default {
		/*  导航的背景色，左侧图标的文字
			params.navColor  导航的背景颜色
			params.lefTitle  左侧图标的文字
			params.title    导航的标题
		*/
		props: {
			params: {
				type: Object,
				default: {}
			},
			isBack: {
				type: [Boolean, String],
				default: true,
			},
		},
		data() {
			return {
				statusBarHeight: 20 /* 状态栏高度 */ ,
				navBarHeight: 45 /* 导航栏高度 */ ,
				windowWidth: 375 /* 窗口宽度 */ ,
				/* 设定状态栏默认高度 */
				val: '' /* 导航栏搜索框的值 */
			};
		},
		created() {
			this.statusBarHeight = getApp().globalData.statusBarHeight
			this.navBarHeight = getApp().globalData.navBarHeight
			this.windowWidth = getApp().globalData.windowWidth
		},
		methods: {
			returnPage() {
				if (this.isBack) {
					uni.navigateBack();
				} else {
					this.$emit('forward');
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.navbar-fixed {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 199;
		width: 100%;
		background-color: #000;
		box-sizing: border-box;
		overflow: hidden
	}

	.navbar-fixed:before {
		content: '';
		width: 100%;
		background: inherit;
		position: absolute;
		left: -50rpx; //giving minus -25px left position
		right: 0;
		top: -50rpx; //giving minus -25px top position 
		bottom: 0;
		box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.9);
		filter: blur(10px)
	}

	.action_back {
		position: absolute;
		left: 10upx;
		top: 50%;
		transform: translateY(-50%);
	}

	.cu_bar {
		height: 100%;
		position: relative;
		align-items: center;
		min-height: 0;

		.content {
			width: 60%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
