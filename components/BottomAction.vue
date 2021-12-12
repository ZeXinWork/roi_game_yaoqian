<template>
	<uni-popup :maskClick="maskClick" type="share" ref="popup">
		<view class="action-wrap">
			<slot name="header">
				<view v-if="title" class="action-title" @click="onAction">
					<text>{{ title }}</text>
				</view>
			</slot>
			<slot name="body">
				<view v-for="(action, index) in actions" :key="index" class="action" @click="onAction(action)">
					<text>{{ action.name }}</text>
				</view>
			</slot>
			<slot name="footer">
				<view class="action-wink"></view>
				<view class="action-cancel" @click="cancel">
					<text>取消</text>
				</view>
			</slot>
		</view>
	</uni-popup>
</template>

<style lang="scss" scoped>
.action-wrap {
	background-color: #fff;
	font-size: 17px;
	color: #000;
	font-weight: normal;
	border-radius: 12px 12px 0 0;
	overflow: hidden;
	
	.action-title {
		text-align: center;
		padding: 15px 0;
		border-bottom: 1px solid #f5f5f5;
		color: rgba(#000000, 0.5);
		font-size: 14px;
	}
	
	.action {
		text-align: center;
		padding: 15px 0;
		border-bottom: 1px solid #f5f5f5;
		
		&:last-child {
			border: none;
		}
	}
	
	
	.action-wink {
		height: 8px;
		background-color: #F2F2F2;
	}
	
	.action-cancel {
		text-align: center;
		color: rgba(#000, 0.9);
		padding: 15px 0;
	}
}
</style>

<script>
	export default {
		props: {
			title: String,
			maskClick: {
				type: [Boolean, String],
				default: true,
			},
			actions: {
				type: Array,
				default: () => [],
			}
		},
		methods: {
			open: function() {
				this.$refs.popup.open();
			},
			close: function() {
				this.$refs.popup.close();
			},
			onAction: function(action) {
				this.$emit('onAction', action);
				this.$refs.popup.close();
			},
			cancel: function() {
				this.$refs.popup.close();
			},
		}
	}
</script>


