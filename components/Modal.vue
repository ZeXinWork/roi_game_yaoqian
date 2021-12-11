<template>
	<uni-popup :maskClick="maskClick" ref="dialog" type="dialog">
		<view class="dialog-wrap">
			<view class="dialog-container">
				<view class="dialog-body">
					<slot name="header">
						<view v-if="title" class="dialog-title">
							<text>{{ title }}</text>
						</view>
						<view class="dialog-content">
							<text>{{ content }}</text>
						</view>
					</slot>
				</view>
				<slot name="footer">
					<view class="dialog-footer">
						<view class="dialog-footer-cancel" @click="onCancel">
							<text>{{ cancelText }}</text>
						</view>
						<view class="dialog-footer-close" @click="onClose">
							<text>{{ closeText }}</text>
						</view>
					</view>
				</slot>
			</view>
		</view>
	</uni-popup>
</template>

<style lang="scss">
	.dialog-wrap {
		width: 100vw;
		
		.dialog-container {
			margin: 0 24px;
			background-color: #fff;
			border-radius: 8px;
			min-height: 30px;
			
			.dialog-body {
				padding: 24px;
				border-bottom: 1px solid #e5e5e5;
				
				.dialog-title {
					text-align: center;
					color: #000000;
					font-weight: bold;
					fong-size: 16px;
					margin: 0 0 16px;
				}
				
				.dialog-content {
					text-align: center;
					color: rgba(#000000, 0.5);
					line-height: 24px;
					font-weight: bold;
					font-size: 14px;
				}
			}
			
			.dialog-footer {
				display: flex;
				height: 50px;
				
				.dialog-footer-cancel {
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 16px;
					color: #000000;
					flex: 1;
					border-right: 1px solid #e5e5e5;
				}
				
				.dialog-footer-close {
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 16px;
					color: #576B95;
					flex: 1;
				}
			}
		}
	}
</style>

<script>
	export default {
		props: {
			title: String,
			content: String,
			maskClick: {
				type: [Boolean, String],
				default: true,
			},
			cancelText: {
				type: String,
				default: '取消',
			},
			closeText: {
				type: String,
				default: '关闭',
			},
		},
		methods: {
			open: function() {
				this.$refs.dialog.open();
			},
			close: function() {
				this.$refs.dialog.close();
			},
			onCancel: function() {
				this.$emit('cancel');
				this.$refs.dialog.close();
			},
			onClose: function() {
				this.$emit('close');
				this.$refs.dialog.close();
			}
		}
	}
</script>