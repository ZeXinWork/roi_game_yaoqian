<!-- 垂直滚动区域 -->
<template>
	<scroll-view scroll-y class="scroll-container" :refresher-triggered="triggered"
		:refresher-threshold="100" refresher-background="lightgreen" @refresherpulling="onPulling"
		@refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort"
		@scrolltolower="scrollLower">
		<view>
				<slot></slot>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: "ActivityList",
		data() {
			return {
				triggered: false,
				_freshing: false,
			};
		},
		onLoad() {
			this._freshing = false;
			setTimeout(() => {
				this.triggered = true;
			}, 1000);
		},
		methods: {
			onPulling(e) {
				// console.log("onpulling", e);
			},
			onRefresh(e) {
				// console.log("onRefresh", e);

				if (this._freshing) return;

				this._freshing = true;

				//界面下拉触发，triggered可能不是true，要设为true
				if (!this.triggered) {
					this.triggered = true;
				}

				setTimeout(() => {
					// console.log("onRefresh-setTimeout", e);

					//触发onRestore，并关闭刷新图标
					this.triggered = false;
					this._freshing = false;

					this.$emit("refreshHandler");
				}, 3000);
			},
			onRestore(e) {
				// console.log("onRestore", this.triggered, e);

				// 需要重置
				this.triggered = "restore";
			},
			onAbort(e) {
				// console.log("onRestore", this.triggered, e);

				this.$emit("refreshHandler");
			},
			scrollLower() {
				console.log("handleScrollLowerhandleScrollLower")
				this.$emit("handleScrollLower");
			},
		},
	};
</script>

<style lang="scss">
	.scroll-container {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
