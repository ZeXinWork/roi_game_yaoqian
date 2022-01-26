<template>
	<view v-if="visible" class="red-envelope-popup" :style="{
      background: `url(${'https://static.roi-cloud.com/upload/20220121/60935669154200'}) no-repeat`,
      backgroundSize: '100%',
    }">
		<view class="container flex-center">
			<view @touchmove="handleScrollTouch" class="close-bg"></view>
			<block>
				<view v-if="!readyOk && showStatus === 1">
					<view class="reminder-wrapper flex-column-center">
						<image class="ready_title" src="https://static.roi-cloud.com/upload/20220125/60935669102534"
							mode="aspectFill">
						</image>
						<image @click="handleReady" class="ready_button"
							src="https://static.roi-cloud.com/upload/20220125/60935669104718" mode="aspectFit">
						</image>
						<view @click="handleReady" class="ready_button_text">
							立即抢红包
						</view>
					</view>
				</view>
				<block v-if="showStatus === 1">
					<view class="reminder-wrapper flex-column-center">
						<image v-if="readyOk" class="title"
							src="https://static.roi-cloud.com/upload/20220121/60935669144811" mode="aspectFill">
						</image>
						<view class="time" v-if="readyOk">{{ readyTime }}</view>
						<image class="bottom-img" src="https://static.roi-cloud.com/upload/20220121/60935669153646"
							mode="aspectFill"></image>
					</view>
				</block>
				<block v-if="showStatus === 2">
					<view class="rain-wrapper flex-column">
						<view class="time-info">
							<view class="flex-row">
								<view class="flex-column-reserve">
									<view class="tip">剩余时间
										<text class="time"> {{ showRainTotalTime }} s </text>
									</view>
									<!-- <view class="progress-wrapper">
										<view class="progress" :animation="progressAni"></view>
									</view> -->
									<!-- :style="{ width: progressWidth }" -->
									<view class="box animate">
										<text :animation="progressAni">
											<text></text>
										</text>
									</view>
								</view>
							</view>
							<view class="jinbi-wrapper">
								<image class="jinbi" src="https://static.roi-cloud.com/upload/20220124/60935669154508"
									mode="aspectFill"></image>
								<view class="total-score">元宝：{{ showScore }}</view>
							</view>
						</view>
						<view class="canvas-wrapper">
							<view class="score-change" :animation="scoreAni">
								+{{ showChangeScore }}
							</view>
							<canvas disable-scroll @error="canvasIdErrorCallback" @touchstart="handleClickRain"
								canvas-id="rain-canvas" style="width: 100vw; height: 100vh; z-index: 9999999"></canvas>
						</view>
					</view>
				</block>
				<block v-if="showStatus === 3">
					<view class="result-wrapper flex-column-center">
						<block>
							<view class="group-content flex-column-center">
								<view class="result-title">恭喜您获得</view>
								<view class="ready-wrapper flex-column-center">
									<view class="money-wrapper flex-row">
										<view>
											<text class="money">{{ showScore }}</text>
											<text class="unit">元宝</text>
										</view>
										<view class="flex-end-start">
											<image class="jinbi"
												src="https://static.roi-cloud.com/upload/20220124/60935669154508"
												mode="aspectFill"></image>
											<text class='exchange_text'>直接换奖品，累计冲排名</text>
										</view>

									</view>
									<view class="result-btn" @click="handleClose">我知道了</view>
								</view>
							</view>
						</block>
					</view>
				</block>
			</block>
		</view>
	</view>
</template>

<script>
	const innerAudioContext = wx.createInnerAudioContext()
	const APP = getApp()
	let readyTimer = null
	let rainTimer = null
	let redEnvelopes = []
	let animation = null
	const minWidth = 30 // 红包图片最小宽度
	const maxWidth = 40 // 红包图片最大宽度
	export default {
		name: 'rain',
		data() {
			return {
				showRainTotalTime: 30, // 红包雨时间
				showStatus: 1, // 红包雨状态：1:准备倒计时，2:正在红包雨，3:红包雨结束
				windowWidth: 375,
				windowHeight: 555,
				rainResult: {},
				loading: false,
				showScore: 0,
				showChangeScore: 0,
				scoreStyle: '',
				progressAni: null,
				scoreAni: null,
				openEnvelopeImg: '',
				redEnvelopeImg: '',
				codeArray: [],
				readyOk: false
			}
		},
		computed: {
			progressWidth() {
				const width = (this.showRainTotalTime / this.time) * 100
				return `${width}%`
			},
		},
		props: {
			visible: {
				type: Boolean,
				default: false,
			},
			// 游戏时间
			time: {
				type: Number,
				default: 10,
			},
			// 倒计时单位秒
			readyTime: {
				type: Number,
				default: 3,
			},
			//  速度
			createSpeed: {
				type: Number,
				default: 5,
			},
			// 单个最小金额
			min: {
				type: Number,
				default: 0,
			},
			// 单个最大金额
			max: {
				type: Number,
				default: 3,
			},
			dataTem: {
				type: Object,
				required: true,
				default: {},
			},
		},
		onReady() {
			const _this = this
			redEnvelopes = []
			clearTimeout(readyTimer)
			clearTimeout(rainTimer)
			this.cancelCustomAnimationFrame(animation)
			// 开始准备倒计时
			// this.cultdown()
			uni.getSystemInfo({
				success: function(res) {
					_this.windowWidth = res.windowWidth
					_this.windowWidth - res.windowHeight
				},
			})
		},
		onUnload() {
			readyTimer && clearInterval(readyTimer)
			rainTimer && clearInterval(rainTimer)
			animation && this.cancelCustomAnimationFrame(animation)
		},
		methods: {
			handleReady() {
				this.readyOk = true
				this.cultdown()
			},
			// 开始准备倒计时
			cultdown: function() {
				let _this = this
				readyTimer = setInterval(function() {
					_this.$emit('reduceTime')
					if (_this.readyTime <= 0) {
						clearInterval(readyTimer)
						// 显示红包雨
						_this.showRain()
					}
				}, 1000)
			},
			// 展示红包雨界面
			showRain: function() {
				let _this = this
				// 显示红包雨
				this.showStatus = 2
				// 初始化红包雨
				this.initRain()

				// 倒计时进度条
				// 红包雨倒计时
				let showRainTotalTime = this.time
				rainTimer = setInterval(function() {
					if (--showRainTotalTime <= 0) {
						clearInterval(rainTimer)
						if (animation) {
							// 结束
							_this.showRainResult()
							_this.cancelCustomAnimationFrame(animation)
						}
					}
					_this.showRainTotalTime = showRainTotalTime
				}, 1000)
			},
			// 倒计时进度条
			ininProgress() {
				const time = this.time
				const animation = uni.createAnimation({
					duration: time * 1000
				})
				animation.translateX(-180).step()
				this.progressAni = animation.export()
			},
			//分数动画
			//分数动画
			animationOfScore(x, y) {
				const _this = this
				const position = uni.createAnimation({
					duration: 0,
				})
				position.left(x).top(y).step()

				this.scoreAni = position.export()
				const animation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease',
				})
				animation.opacity(1).step()
				setTimeout(
					function() {
						animation.opacity(0).step()
						this.scoreAni = animation.export()
					}.bind(this),
					10
				)
			},
			// 关闭
			handleClose: function() {
				this.$emit('finishRain', this.codeArray)
			},
			// 显示结果
			showRainResult: function() {
				// 结束动画
				this.cancelCustomAnimationFrame(animation)
				this.showStatus = 3
				this.rainResult = {
					amount: 100,
				}
			},
			// 红包下落函数
			customRequestAnimationFrame: function(e) {
				let _this = this
				let timer = setTimeout(function() {
					e.call(_this), clearTimeout(timer)
				}, 1000 / 60)
				return timer
			},
			// 清除红包下落函数
			cancelCustomAnimationFrame: function(e) {
				e && (clearTimeout(e), (animation = null))
			},
			// 开始下落
			doDrawRain: function() {
				const context = this.context
				this.ininProgress()
				const {
					windowWidth,
					windowHeight
				} = this
				context.clearRect(0, 0, windowWidth, windowHeight)
				// let index = 0
				// setInterval(function() {
				// 	const i = redEnvelopes[index] // 红包
				// 	const {
				// 		x,
				// 		y,
				// 		vx,
				// 		vy,
				// 		width,
				// 		height,
				// 		open,
				// 	} = i
				// 	const img = open ? this.openEnvelopeImg : this.redEnvelopeImg
				// 	const imgWidth = open ? width + 20 : width
				// 	const imgHeight = open ? height + 25 : height

				// 	context.drawImage(img, x, y, imgWidth, imgHeight)
				// 	i.x += vx
				// 	i.y += vy
				// 	i.y >= windowHeight && (i.y = 0, i.open = false)
				// 	i.x + width <= 0 && (i.x = windowWidth - width, i.open = false)
				// 	index = index + 1
				// 	if(index=10){}
				// }, 200)
				for (let n = 0; n < redEnvelopes.length; n += 1) {
					const i = redEnvelopes[n] // 红包
					const {
						x,
						y,
						vx,
						vy,
						width,
						height,
						open
					} = i
					const img = open ? this.openEnvelopeImg : this.redEnvelopeImg
					const imgWidth = open ? width + 20 : width
					const imgHeight = open ? height + 25 : height
					context.drawImage(img, x, y, imgWidth, imgHeight)
					i.x += vx
					i.y += vy
					i.y >= windowHeight && (i.y = 0, i.open = false)
					i.x + width <= 0 && (i.x = windowWidth - width, i.open = false)
				}
				context.draw()
				// 下落函数
				animation = this.customRequestAnimationFrame(this.doDrawRain)
			},
			// 随机数
			randNum: function(min, max) {
				return Math.floor(min + Math.random() * (max - min))
			},
			radnScore(min, max) {
				const radomDta = Math.floor(min + Math.random() * (max - min))
				let result = null
				for (let i in this.dataTem) {
					if (this.dataTem[i] == radomDta) {
						result = {
							code: i,
							value: radomDta,
						}
					}
				}
				return result
			},
			// 准备红包雨下落
			initRainDrops: function() {
				const {
					windowWidth,
					windowHeight,
					createSpeed,
					max,
					min
				} = this
				for (let n = 0; n < 6; n += 1) {
					const startX = Math.floor(Math.random() * (windowWidth - 50))
					const startY = Math.floor(Math.random() * windowHeight)
					// 红包图片宽度大小30~40
					const width = this.randNum(minWidth, maxWidth)
					// 宽度为红包高度的百分之八十
					const height = Math.floor(width / .8)
					// 速度
					const radomVal = Math.ceil(Math.random() * 10)
					let vy = ""
					if (radomVal === 3 || radomVal === 4 || radomVal === 5 || radomVal === 6) {
						vy = 1 * Math.random() + 6
					} else {
						vy = 1 * Math.random() + createSpeed
					}

					// 红包金额
					const score = this.radnScore(min, max + 1)
					redEnvelopes.push({
						x: startX,
						y: 0,
						vx: 0, // x轴速度
						vy: vy, // y轴速度
						score: score,
						width: width,
						height: height,
						open: false,
						click: false,
					})
				}
				this.doDrawRain()
			},
			// 点击红包事件
			handleClickRain: function(e) {
				let touch = e.touches[0]
				let touchX = touch.x
				let touchY = touch.y
				let _this = this
				const {
					windowWidth,
					windowHeight,
					createSpeed,
					max,
					min
				} = this
				for (let o = 0; o < redEnvelopes.length; o += 1) {
					let i = redEnvelopes[o],
						rainX = i.x,
						rainY = i.y,
						width = i.width,
						height = i.height,
						gapX = touchX - rainX,
						gapY = touchY - rainY
					if (
						!i.click &&
						gapX >= -20 &&
						gapX <= width + 20 &&
						gapY >= -20 &&
						gapY <= height + 20
					) {
						_this.animationOfScore(touchX, touchY)
						innerAudioContext.play()
						i.open = true
						i.click = true
						let score = _this.showScore + i.score.value
						_this.codeArray.push(i.score.code)
						_this.showScore = score
						_this.showChangeScore = i.score.value
						setTimeout(function() {
							redEnvelopes.splice(o, 1)
							const startX = Math.floor(Math.random() * (windowWidth - 50))
							const startY = Math.floor(Math.random() * windowHeight)
							// 红包图片宽度大小30~40
							const width = _this.randNum(minWidth, maxWidth)
							// 宽度为红包高度的百分之八十
							const height = Math.floor(width / .8)
							// 速度
							const radomVal = Math.ceil(Math.random() * 10)
							let vy = ""
							if (radomVal === 3 || radomVal === 4 || radomVal === 5 || radomVal === 6) {
								vy = 1 * Math.random() + 6
							} else {
								vy = 1 * Math.random() + createSpeed
							}
							// 红包金额
							const score = _this.radnScore(min, max + 1)
							redEnvelopes.push({
								x: startX,
								y: 0,
								vx: 0, // x轴速度
								vy: vy, // y轴速度
								score: score,
								width: width,
								height: height,
								open: false,
								click: false,
							})
						}, 100)
						break
					}
				}
			},
			// 初始化 canvas
			initRain: function() {
				this.context = uni.createCanvasContext('rain-canvas', this)
				const _this = this
				// 初始化红包雨
				// https://static.roi-cloud.com/upload/20220124/60935669160410
				uni.getImageInfo({
					src: 'https://static.roi-cloud.com/upload/20220125/60935669111345',
					success(res) {
						_this.openEnvelopeImg = res.path
						uni.getImageInfo({
							src: 'https://static.roi-cloud.com/upload/20220125/60935669111314',
							success(res) {
								_this.redEnvelopeImg = res.path
								_this.initRainDrops() // 音效
								_this.audioOfClick()
							},
						})
					},
				})
			},
			handleScrollTouch: function() {},
			audioOfClick() {
				innerAudioContext.autoplay = false
				innerAudioContext.src = 'https://www.sunniejs.cn/static/weapp/dianji.mp3'
				innerAudioContext.onPlay(() => {})
				innerAudioContext.onError((res) => {})
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/flex.scss';

	.box {
		position: relative;
		background: #333;
		border-radius: 48rpx;
		width: 360rpx;
		height: 48rpx;
		border: 10rpx solid #342f36;
		box-sizing: border-box;
		overflow: hidden;
	}

	.box>text {
		display: block;
		width: 360rpx;
		height: 100%;
		border-radius: 48rpx;
		background-image: -webkit-gradient(linear,
				left bottom,
				left top,
				color-stop(0, #f61c1f),
				color-stop(1, #f96c54));
		-webkit-box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
			inset 0 -2px 6px rgba(0, 0, 0, 0.4);
		position: relative;
		overflow: hidden;
	}

	.animate>text>text {
		content: '';
		width: 360rpx;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-image: -webkit-gradient(linear,
				0 0,
				100% 100%,
				color-stop(0.25, rgba(255, 255, 255, 0.2)),
				color-stop(0.25, transparent),
				color-stop(0.5, transparent),
				color-stop(0.5, rgba(255, 255, 255, 0.2)),
				color-stop(0.75, rgba(255, 255, 255, 0.2)),
				color-stop(0.75, transparent),
				to(transparent));
		z-index: 2;
		-webkit-border-radius: 48rpx;
		overflow: hidden;
		-webkit-background-size: 40px;

	}


	.animate>text text {
		content: '';
		width: 360rpx;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-image: -webkit-gradient(linear,
				0 0,
				100% 100%,
				color-stop(0.25, rgba(255, 255, 255, 0.2)),
				color-stop(0.25, transparent),
				color-stop(0.5, transparent),
				color-stop(0.5, rgba(255, 255, 255, 0.2)),
				color-stop(0.75, rgba(255, 255, 255, 0.2)),
				color-stop(0.75, transparent),
				to(transparent));
		z-index: 2;
		-webkit-background-size: 40px;
		-webkit-animation: move 2s linear infinite;
		-webkit-border-top-right-radius: 8px;
		-webkit-border-bottom-right-radius: 8px;
		-webkit-border-top-left-radius: 20px;
		-webkit-border-bottom-left-radius: 20px;
		overflow: hidden;
	}

	@-webkit-keyframes move {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: 50px 50px;
		}
	}

	.red-envelope-popup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999999999;

		.close-bg {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}

		.reminder-wrapper {
			position: relative;
			width: 100vw;
			height: 100vh;
			color: #fff;
			box-sizing: border-box;

			.ready_title {

				height: 740rpx;
				position: absolute;
				top: 160rpx;
			}

			.ready_button {
				width: 415rpx;
				height: 98rpx;
				position: absolute;
				top: 800rpx;
			}

			.ready_button_text {
				color: #FFF6E2;
				font-size: 36rpx;
				position: absolute;
				top: 820rpx;
			}

			.title {
				font-size: 60rpx;
				color: #fffdc5;
				width: 600rpx;
				height: 280rpx;
				position: absolute;
				top: 550rpx;
			}

			.time {
				margin-top: 100rpx;
				font-size: 240rpx;
				color: #fffdc5;
				position: absolute;
				font-size: 88rpx;
				top: 590rpx;
				left: 345rpx;
				color: #6e5927;
			}

			.bottom-img {
				height: 500rpx;
				width: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
			}
		}

		.rain-wrapper {
			width: 100%;
			height: 100%;
			background-image: url('https://static.roi-cloud.com/upload/20220121/60935669154200');
			background-size: 100% 100%;
			background-repeat: no-repeat;

			.time-info {
				box-sizing: border-box;
				padding-right: 80rpx;
				position: absolute;
				top: 200rpx;
				left: 32rpx;
				font-size: 24rpx;
				color: #fff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;

				.tip {
					margin-top: 8rpx;
					font-size: 28rpx;
					color: #ffce59 !important;

					.time {
						margin-left: 10rpx;
					}
				}

				.progress-wrapper {
					position: relative;
					height: 16rpx;
					width: 240rpx;
					margin-left: 20rpx;
					margin-right: 20rpx;
					border-radius: 16rpx;
					background: #fff;
					overflow: hidden;

					.progress {
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						width: 240rpx;
						border-radius: 16rpx;
						background: #fe2e00;
						z-index: 1;
					}
				}

				.jinbi-wrapper {
					display: flex;
					flex-direction: column;
					align-items: flex-end;

					.jinbi {
						width: 48rpx;
						height: 50rpx;
					}

					.total-score {
						font-size: 40rpx;
						color: #FFCE59;
						font-size: 28rpx;
						margin-top: 8rpx;
					}

				}

			}

			.canvas-wrapper {
				position: relative;

				.score-change {
					position: absolute;
					width: 50rpx;
					height: 50rpx;
					font-size: 40rpx;
					color: #fffdc5;
					opacity: 0;
				}
			}
		}

		.result-wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;

			.group-content {
				position: relative;
				width: 550rpx;
				height: 700rpx;
				background-image: url('https://static.roi-cloud.com/upload/20220125/60935669113010');
				background-size: 100% 100%;
				background-repeat: no-repeat;

				.result-title {
					margin-top: 68rpx;
					font-size: 40rpx;
					color: #76521D;
				}

				.money-wrapper {
					color: #fff;
					display: flex;
					flex-direction: column;

					.money {
						color: #fa4542;
						font-size: 120rpx;
					}

					.jinbi {
						width: 48rpx;
						height: 50rpx;
						margin-right: 6rpx;
					}

					.exchange_text {
						color: #BF9B66;
						font-size: 24rpx;

					}

					.unit {
						position: relative;
						font-size: 32rpx;
						color: #fa4542
					}
				}

				.result-btn {
					margin-top: 158rpx;
					width: 440rpx;
					height: 100rpx;
					background-color: #f1daae;
					text-align: center;
					line-height: 100rpx;
					border-radius: 40rpx;
					font-size: 40rpx;
					color: #76521D;
				}
			}
		}
	}
</style>
