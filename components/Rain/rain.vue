<template>
	<view v-if="visible" class="red-envelope-popup" :style="{
      background: `url(${'https://static.roi-cloud.com/upload/20220302/60935669151852'}) no-repeat`,
      backgroundSize: '100%',
    }">
		<view class="container flex-center">
			<view @touchmove="handleScrollTouch" class="close-bg"></view>
			<block>
				<view v-if="showStatus === 1">
					<view class="reminder-wrapper flex-column-center">
						<view class="ready_title" :style="{
                background: `url(${'https://static.roi-cloud.com/upload/20220302/60935669145706'}) no-repeat`,
                backgroundSize: '100% 100%',
              }">
							彩蛋时间
						</view>

						<view class="ready_chunlian">
							<view class="chunlian" :style="{
                  background: `url(${'https://static.roi-cloud.com/upload/20220302/60935669152724'}) no-repeat`,
                  backgroundSize: '100% 100%',
                }"><text>天降红包雨</text></view>
							<view class="ready_time">{{ readyTime }}</view>
							<view class="chunlian" :style="{
                  background: `url(${'https://static.roi-cloud.com/upload/20220302/60935669152724'}) no-repeat`,
                  backgroundSize: '100% 100%',
                }"><text>好运在等你</text></view>
						</view>
						<!-- <image @click="handleReady" class="ready_button"
							src="https://static.roi-cloud.com/upload/20220125/60935669104718" mode="aspectFit">
						</image> -->
						<!-- <view @click="handleReady" class="ready_button_text">
							立即抢红包
						</view> -->
					</view>
				</view>
				<block v-if="showStatus === 2">
					<view class="rain-wrapper flex-column">
						<view class="time-info">
							<view class="flex-row">
								<view class="flex-column-reserve">
									<view class="tip">
										<text class="time"> {{ showRainTotalTime }}s </text>
									</view>
									<!-- <view class="progress-wrapper">
										<view class="progress" :animation="progressAni"></view>
									</view> -->
									<!-- :style="{ width: progressWidth }" -->
									<!-- <view class="box animate">
										<text :animation="progressAni">
											<text></text>
										</text>
									</view> -->
								</view>
							</view>
							<view class="jinbi-wrapper">
								<image class="jinbi" src="https://static.roi-cloud.com/upload/20220307/60935669143303"
									mode="aspectFill"></image>
								<view class="total-score">{{ showScore }}</view>
							</view>
						</view>
						<view class="canvas-wrapper">
							<view class="score-change" :animation="scoreAni" v-show="isShowScore">
								<text v-if="add">+{{ showChangeScore }}</text>
								<text v-else>-{{ showChangeScore }}</text>
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
								<view class="result-title">
									<text>成绩揭晓</text>
									<image @click="handleClose({ close: true })"
										src="https://static.roi-cloud.com/upload/20220308/60935669161932"
										mode="aspectFit"></image>
								</view>
								<view class="ready-wrapper flex-column-center">
									<!-- <text class="money">{{ showScore }}</text> -->
									<view class="name-wrapper flex-column-center">
										<image :src="user.avatar" class="user-thumb"></image>
										<view class="name">{{ user ? user.nickname : '' }}</view>
										<view>恭喜你获得</view>
										<!-- 	<view class="flex-end-start">
											<image class="jinbi"
												src="https://static.roi-cloud.com/upload/20220124/60935669154508"
												mode="aspectFill"></image>
											<text class='exchange_text'>直接换奖品，累计冲排名</text>
										</view> -->
										<image class="money-image"
											src="https://static.roi-cloud.com/upload/20220308/60935669164902"
											mode="aspectFill"></image>
										<view class="money">{{ showScore }}</view>
									</view>
									<view class="result-btn" @click="handleClose({close:false})">点我去兑换</view>
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
	import {
		rainStart
	} from '@/rest/api.js'
	const APP = getApp()
	let readyTimer = null
	let rainTimer = null
	let redEnvelopes = []
	let animation = null
	let curIndex = 0
	const minWidth = 45 //红包图片最小宽度
	const maxWidth = 55 //红包图片最大宽度

	export default {
		name: 'rain',
		data() {
			return {
				user: null,
				showRainTotalTime: this.time, // 红包雨时间
				showStatus: 0, // 红包雨状态：1:准备倒计时，2:正在红包雨，3:红包雨结束
				windowWidth: '',
				windowHeight: '',
				rainResult: {},
				loading: false,
				showScore: 0,
				showChangeScore: 0,
				scoreStyle: '',
				progressAni: null,
				scoreAni: null,
				openEnvelopeImg: '',
				redEnvelopeImg: '',
				crab: '',
				lobster: '',
				fish: '',
				bomb: '',
				bombClick: '',
				codeArray: [],
				integralName: '积分',
				redEnvelopeAudio: null,
				bombAudio: null,
				animalAudio: null,
				bgAudio: null,
				bgEndAudio: null,
				caluAudio: null,
				add: null,
				isShowScore: true,
				gameInfo: {},
				temDeleteIndex: [],
			}
		},
		computed: {
			progressWidth() {
				const width = (this.showRainTotalTime / this.time) * 100
				return `${width}%`
			},
		},
		destroyed() {
			if (this.bgAudio) {
				this.bgAudio.stop()
			}
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
			this.showStatus = 1
			this.user = this.$storage.getUser()
			this.gameInfo = this.$storage.get('gameInfo')
			const _this = this
			const gameInfo = this.$storage.get('gameInfo')
			if (gameInfo.integral_name) {
				this.integralName = gameInfo.integral_name
			}
			uni.getSystemInfo({
				success: function(res) {
					_this.windowHeight = res.windowHeight
					_this.windowWidth = res.windowWidth
				},
			})
			redEnvelopes = []
			clearTimeout(readyTimer)
			clearTimeout(rainTimer)
			this.cancelCustomAnimationFrame(animation)
			// 开始准备倒计时
			if (this.bgAudio) {
				this.bgAudio.stop()
			}
			if (!_this.caluAudio) {
				_this.caluAudio = uni.createInnerAudioContext()
				_this.caluAudio.autoplay = false
				_this.caluAudio.src =
					'https://static.roi-cloud.com/upload/yaoyaoshu/rain_count_down_v2.0.m4a'
				_this.caluAudio.play()
			} else {
				_this.caluAudio.play()
			}
			this.initRain()
			this.cultdown()
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
			// 开始准备倒计时
			cultdown: function() {
				let _this = this

				readyTimer = setInterval(function() {
					_this.$emit('reduceTime')
					if (_this.readyTime <= 1) {
						clearInterval(readyTimer)
						const gameId = _this.$storage.get('gameId')
						rainStart({
							game_id: gameId,
						}).then((res) => {
							if (res.errno == '1') {
								uni.showModal({
									title: '提示',
									content: `${res.errmsg}`,
									showCancel: false,
								})
								_this.handleClose({
									close: true
								})
								return
							}
							// 显示红包雨
							//背景音乐
							if (!_this.bgAudio) {
								_this.bgAudio = uni.createInnerAudioContext()
								_this.bgAudio.autoplay = false
								_this.bgAudio.src =
									'https://static.roi-cloud.com/upload/yaoyaoshu/rain_background.mp3'
								_this.bgAudio.loop = true
								_this.bgAudio.play()
							} else {
								_this.bgAudio.play()
							}
							const {
								openEnvelopeImg,
								redEnvelopeImg,
								crab,
								lobster,
								fish,
								bomb,
								bombClick
							} = _this
							if (openEnvelopeImg &&
								redEnvelopeImg &&
								crab &&
								lobster &&
								fish &&
								bomb &&
								bombClick) {
								_this.showRain()
							}

						})
					}
				}, 1000)
			},
			// 展示红包雨界面
			showRain: function() {
				let _this = this
				// 显示红包雨
				this.showStatus = 2
				setTimeout(
					function() {
						_this.initRainDrops() // 音效
						_this.audioOfClick()
					}.bind(_this),
					300
				)
				// 初始化红包雨
				// this.initRain()

				// 倒计时进度条
				// 红包雨倒计时
				let showRainTotalTime = this.time

				rainTimer = setInterval(function() {
					if (--showRainTotalTime <= 0) {
						clearInterval(rainTimer)
						if (animation) {
							// 结束
							_this.cancelCustomAnimationFrame(animation)
							_this.showRainResult()
						}
					}
					_this.showRainTotalTime = showRainTotalTime
				}, 1000)
			},
			// 倒计时进度条
			ininProgress() {
				const time = this.time
				const animation = uni.createAnimation({
					duration: time * 1000,
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
			handleClose: function({
				close
			}) {
				this.$emit('closeRain', {
					toExchange: close ? false : true,
				})
			},
			// 显示结果
			showRainResult: function() {
				// 结束动画
				// this.$emit('finishRain', this.showScore)
				setTimeout(
					function() {
						this.cancelCustomAnimationFrame(animation)
						this.showStatus = 3
						this.$emit('finishRain', this.showScore)
						this.bgEndAudio.play()
						this.bgAudio.stop()
					}.bind(this),
					200
				)
			},
			// 红包下落函数
			customRequestAnimationFrame: function(e) {
				let _this = this
				let timer = setTimeout(function() {
					e.call(_this), clearTimeout(timer)
				}, 1000 / 120)
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
				for (let n = 0; n < redEnvelopes.length; n += 1) {
					const i = redEnvelopes[n] // 红包
					const {
						x,
						y,
						vx,
						vy,
						width,
						height,
						open,
						isRedEnvelope,
						animal
					} = i

					let img = ''
					if (isRedEnvelope) {
						if (open) {
							img = this.openEnvelopeImg
						} else {
							img = this.redEnvelopeImg
						}
					} else if (animal) {
						if (animal === 'crab') {
							img = this.crab
						} else if (animal === 'fish') {
							img = this.fish
						} else {
							img = this.lobster
						}
					} else {
						if (open) {
							img = this.bombClick
						} else {
							img = this.bomb
						}
					}
					const imgWidth = open ? width + 20 : width
					const imgHeight = open ? height + 25 : height
					context.drawImage(img, x, y, imgWidth, imgHeight)
					i.x += vx
					i.y += vy
					if (i.y >= windowHeight) {
						const {
							startX,
							vy,
							score,
							width,
							height
						} = this.initItemProps()
						const item = this.getItem({
							startX,
							vy,
							score,
							width,
							height,
						})
						redEnvelopes.splice(n, 1, item)
					}
					i.x + width <= 0 && ((i.x = windowWidth - width), (i.open = false))
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
			getItemType() {
				const radomVal = Math.ceil(Math.random() * 10)
				const redPackage = [3, 4, 5, 6, 7, 8, 9]
				const animal = [1, 2]
				if (redPackage.indexOf(radomVal) !== -1) {
					return 1
				}
				if (animal.indexOf(radomVal) !== -1) {
					return 2
				}
				return 3
			},
			getAnimalType() {
				const radomVal = Math.ceil(Math.random() * 10)
				const crab = [1, 2, 3]
				const lobster = [5, 6, 7]
				if (crab.indexOf(radomVal) !== -1) {
					return 1
				}
				if (lobster.indexOf(radomVal) !== -1) {
					return 2
				}
				return 3
			},
			getItem({
				startX,
				vy,
				score,
				width,
				height
			}) {
				const result = this.getItemType()
				const pre = curIndex
				curIndex = curIndex + 1
				switch (result) {
					case 1:
						return {
							x: startX,
								y: 0,
								vx: 0, // x轴速度
								vy: vy, // y轴速度
								score: score,
								width: width,
								height: height,
								open: false,
								click: false,
								isRedEnvelope: true,
								index: pre,
						}

						case 2:
							return {
								x: startX,
									y: 0,
									vx: 0, // x轴速度
									vy: vy, // y轴速度
									score: score,
									width: width,
									height: height,
									open: false,
									click: false,
									animal:
									this.getAnimalType() === 1 ?
									'crab' :
									this.getAnimalType() === 2 ?
									'lobster' :
									'fish',
									index: pre,
							}
							default:
								return {
									x: startX,
										y: 0,
										vx: 0, // x轴速度
										vy: vy, // y轴速度
										score: score,
										width: width,
										height: height,
										open: false,
										click: false,
										bomb: true,
										index: pre,
								}
				}
			},

			initItemProps() {
				const {
					windowWidth,
					windowHeight,
					createSpeed,
					max,
					min
				} = this
				const startX = Math.floor(Math.random() * (windowWidth - 50))
				const startY = Math.floor(Math.random() * windowHeight)
				// 红包图片宽度大小30~40
				const width = 60
				// 宽度为红包高度的百分之八十
				const height = Math.floor(width / 0.8)
				// 速度
				const score = this.radnScore(min, max + 1)
				let vy = 1 * Math.random() + createSpeed
				return {
					startX,
					vy,
					score,
					width,
					height,
				}
			},

			// 准备红包雨下落
			initRainDrops: function() {
				const {
					startX,
					vy,
					score,
					width,
					height
				} = this.initItemProps()
				//红包的概率
				const item = this.getItem({
					startX,
					vy,
					score,
					width,
					height,
				})
				redEnvelopes.push(item)
				let timer = null
				const _this = this
				timer = setInterval(function() {
					if (redEnvelopes.length < 8) {
						const {
							startX,
							vy,
							score,
							width,
							height
						} = _this.initItemProps()
						//红包的概率
						const item = _this.getItem({
							startX,
							vy,
							score,
							width,
							height,
						})
						redEnvelopes.push(item)
					} else {
						clearInterval(timer)
					}
				}, 300)

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
						gapY = touchY - rainY,
						open = i.open
					if (
						!i.click &&
						gapX >= -20 &&
						gapX <= width + 20 &&
						gapY >= -20 &&
						gapY <= height + 20
					) {
						_this.animationOfScore(rainX, rainY - 20)
						_this.temDeleteIndex.push(i.index)
						if (i.isRedEnvelope) {
							this.redEnvelopeAudio.play()
						} else if (i.bomb) {
							this.bombAudio.play()
						} else if (i.animal) {
							this.animalAudio.play()
						}
						i.open = true
						i.click = true
						if (i.isRedEnvelope || i.bomb) {
							_this.isShowScore = true
							_this.showScore = i.isRedEnvelope ?
								_this.showScore + i.score.value :
								_this.showScore - i.score.value * 5

							if (
								Number(_this.showScore) >= Number(_this.gameInfo.max_award_point)
							) {
								_this.showScore = _this.gameInfo.max_award_point
							} else if (Number(_this.showScore) <= 0) {
								_this.showScore = 0
							}
							i.isRedEnvelope ? (_this.add = true) : (_this.add = false)
							_this.codeArray.push(i.score.code)
							_this.showChangeScore = i.isRedEnvelope ?
								i.score.value :
								i.score.value * 5
						} else {
							_this.isShowScore = false
						}

						setTimeout(function() {
							const newArray = redEnvelopes.filter(
								(item) => _this.temDeleteIndex.indexOf(item.index) === -1
							)

							redEnvelopes = newArray
							// tem.forEach((item, index) => {
							// 	_this.temDeleteIndex.forEach(value => {
							// 		if (item.index === value) {
							// 			redEnvelopes.splice(index, 1)
							// 		}
							// 	})
							// })

							const {
								startX,
								vy,
								score: cScore,
								width,
								height,
							} = _this.initItemProps()
							const item = _this.getItem({
								startX,
								vy,
								score: cScore,
								width,
								height,
							})
							redEnvelopes.push(item)
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
				uni
					.getImageInfo({
						src: 'https://static.roi-cloud.com/upload/20220307/60935669155703',
					})
					.then((res) => {
						console.log('openEnvelopeImg', res)
						_this.openEnvelopeImg = res[1].path
						return uni.getImageInfo({
							src: 'https://static.roi-cloud.com/upload/20220307/60935669150830',
						})
					})
					.then((res) => {
						console.log('redEnvelopeImg', res)
						_this.redEnvelopeImg = res[1].path
						return uni.getImageInfo({
							src: 'https://static.roi-cloud.com/upload/20220307/60935669154939',
						})
					})
					.then((res) => {
						console.log('crab', res)
						_this.crab = res[1].path
						return uni.getImageInfo({
							src: 'https://static.roi-cloud.com/upload/20220307/60935669155027',
						})
					})
					.then((res) => {
						console.log('lobster', res)
						_this.lobster = res[1].path
						return uni.getImageInfo({
							src: 'https://static.roi-cloud.com/upload/20220307/60935669155119',
						})
					})
					.then((res) => {
						console.log('fish', res)
						_this.fish = res[1].path
						return uni.getImageInfo({
							src: 'https://static.roi-cloud.com/upload/20220307/60935669163736',
						})
					})
					.then((res) => {
						console.log('bomb', res)
						_this.bomb = res[1].path
						return uni.getImageInfo({
							src: 'https://static.roi-cloud.com/upload/20220307/60935669174045',
						})
					})
					.then((res) => {
						console.log('bombClick', res)
						_this.bombClick = res[1].path
					})
					.catch((err) => {
						console.log(err, "下载图片错误")
						uni.showModal({
							title: "提示",
							content: "下载素材图片失败！请推出小程序重新进入",
							showCancel: false,
							success() {
								_this.handleClose({
									close: true
								})
							}
						})
					})
			},
			handleScrollTouch: function() {},
			audioOfClick() {
				//点击红包音效
				if (!this.redEnvelopeAudio) {
					this.redEnvelopeAudio = uni.createInnerAudioContext()
					this.redEnvelopeAudio.autoplay = false
					this.redEnvelopeAudio.src =
						'https://www.sunniejs.cn/static/weapp/dianji.mp3'
				}

				//点击炸弹音效
				if (!this.bombAudio) {
					this.bombAudio = uni.createInnerAudioContext()
					this.bombAudio.autoplay = false
					this.bombAudio.src =
						'https://static.roi-cloud.com/upload/yaoyaoshu/click_bomb.mp3'
				}

				//点击小动物音效
				if (!this.animalAudio) {
					this.animalAudio = uni.createInnerAudioContext()
					this.animalAudio.autoplay = false
					this.animalAudio.src =
						'https://static.roi-cloud.com/upload/yaoyaoshu/click_animal.wav'
				}

				//结束背景音乐
				if (!this.bgEndAudio) {
					this.bgEndAudio = uni.createInnerAudioContext()
					this.bgEndAudio.autoplay = false
					this.bgEndAudio.src =
						'https://static.roi-cloud.com/upload/yaoyaoshu/ending_rain.mp3'
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/flex.scss';

	// @font-face {
	// 	font-family: 'iconfont';
	// 	src: url('~@/static/iconfont/iconfont.ttf');
	// 	// src: url('https://at.alicdn.com/t/font_865816_17gjspmmrkti.ttf') format('truetype');
	// }

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
				width: 420rpx;
				height: 110rpx;
				position: absolute;
				top: 180rpx;
				text-align: center;
				font-family: 'iconfont' !important;
				font-size: 60rpx;
				color: #000;
				line-height: 110rpx;
			}

			.ready_chunlian {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100vw;
				position: absolute;
				top: 360rpx;
				box-sizing: border-box;
				padding: 0 30rpx;

				.ready_time {
					font-size: 240rpx;
					font-weight: bold;
					// animation: scaleTime 1.3s linear infinite;
				}

				// @keyframes scaleTime {
				// 	0% {
				// 		-webkit-transform: translateY(0) rotateX(0) scale(1);
				// 		transform: translateY(0) rotateX(0) scale(1);
				// 		-webkit-transform-origin: 50% 0%;
				// 		transform-origin: 50% 0%;
				// 	}

				// 	50% {
				// 		-webkit-transform: translateY(-50%) rotateX(-90deg) scale(2);
				// 		transform: translateY(-50%) rotateX(-90deg) scale(2);
				// 		-webkit-transform-origin: 50% 50%;
				// 		transform-origin: 50% 50%;
				// 	}

				// 	100% {
				// 		-webkit-transform: translateY(0) rotateX(0) scale(1);
				// 		transform: translateY(0) rotateX(0) scale(1);
				// 		-webkit-transform-origin: 50% 0%;
				// 		transform-origin: 50% 0%;
				// 	}
				// }

				.chunlian {
					font-family: 'iconfont';
					font-size: 80rpx;
					color: #000;
					width: 180rpx;
					height: 660rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					text {
						width: 90rpx;
					}
				}
			}

			.ready_button {
				width: 415rpx;
				height: 98rpx;
				position: absolute;
				top: 800rpx;
			}

			.ready_button_text {
				color: #fff6e2;
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
			background-image: url('https://static.roi-cloud.com/upload/20220307/60935669135939');
			background-size: 100% 100%;
			background-repeat: no-repeat;

			.time-info {
				box-sizing: border-box;
				padding-right: 80rpx;
				position: absolute;
				top: 200rpx;
				left: 46rpx;
				font-size: 24rpx;
				color: #fff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;

				.tip {
					margin-top: 8rpx;
					font-size: 28rpx;
					width: 80rpx;
					height: 80rpx;
					box-sizing: border-box;
					border: 4rpx solid #fff;
					border-radius: 50%;
					font-size: 30rpx;
					font-weight: bold;
					display: flex;
					justify-content: center;
					align-items: center;

					.time {}
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
					min-width: 160rpx;
					height: 54rpx;
					background-color: #fadfcd;
					border-radius: 50rpx;
					align-items: center;
					justify-content: center;

					.jinbi {
						width: 36rpx;
						height: 36rpx;
					}

					.total-score {
						font-size: 30rpx;
						color: #ff0000;
						margin-top: -10rpx;
						margin-left: 10rpx;
					}
				}
			}

			.canvas-wrapper {
				position: relative;

				.score-change {
					font-size: 80rpx !important;
					position: absolute;
					width: 50rpx;
					height: 50rpx;
					font-size: 80rpx !important;
					color: #fff;
					opacity: 0;
					font-family: NotoSansSC-Black;
				}
			}
		}

		.result-wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			position: relative;

			.group-content {
				position: relative;
				width: 550rpx;
				height: 900rpx;
				background-image: url('https://static.roi-cloud.com/upload/20220308/60935669161407');
				background-size: 100% 100%;
				background-repeat: no-repeat;

				.result-title {
					margin-top: 40rpx;
					font-size: 34rpx;
					color: #fff;
					box-sizing: border-box;

					image {
						width: 40rpx;
						height: 40rpx;
						position: absolute;
						top: 40rpx;
						right: 40rpx;
					}
				}

				.name-wrapper {
					color: #333;
					font-size: 30rpx;
					margin-top: 36rpx;

					.user-thumb {
						border-radius: 100%;
						width: 122rpx;
						height: 122rpx;
						background: #fff;
					}

					.name {
						margin: 12rpx 0 32rpx 20rpx;
					}

					.money {
						color: #e13421;
						font-size: 60rpx;
					}

					.money-image {
						width: 460rpx;
						height: 230rpx;
						margin-top: 16rpx;
					}
				}

				.result-btn {
					margin-top: 48rpx;
					width: 440rpx;
					height: 80rpx;
					text-align: center;
					line-height: 75rpx;
					border-radius: 40rpx;
					font-size: 34rpx;
					color: #fff;
					font-weight: bold;
					background: linear-gradient(#fe7556, #e93f3d);
				}
			}
		}
	}
</style>
