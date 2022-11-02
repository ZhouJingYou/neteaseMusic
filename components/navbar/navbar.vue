<template>
	<view>
		<view class="navbar-wrap" :style="{color:color}">
			<view class="navbar" v-if="currentPage!=='pages/index/index'">
				<view class="iconfont icon-Rectangle" @tap="handleBack">
				</view>
				<text class="divider">|</text>
				<view class="iconfont icon-icon-shouye" @tap="handleToIndex">
				</view>
			</view>
			{{title}}
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentPage: ''
			}
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: ''
			},
		},
		methods: {
			handleBack() {
				uni.navigateBack()
			},
			handleToIndex() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			}
		},
		mounted() {
			this.currentPage = this.$utils.getCurrentPage()
		}
	}
</script>

<style lang="scss" scoped>
	.clearfix {
		height: 150rpx;
	}

	.navbar-wrap {
		position: relative;
		margin: 0 30rpx;
		text-align: center;
		line-height: 150rpx;
		font-size: 36rpx;
		color: #000;
		height: 150rpx;

		.navbar {
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			display: flex;
			align-items: center;
			border-radius: 30rpx;
			background: rgba(0, 0, 0, .3);
			color: #fff;
			padding: 8rpx 30rpx;
			height: 50rpx;

			.divider {
				margin: 0 30rpx;
			}

			.iconfont {
				font-size: 36rpx;
			}
		}
	}
</style>
