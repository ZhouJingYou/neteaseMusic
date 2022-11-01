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
		<view class="clearfix">
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
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		margin: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 150rpx;
		font-size: 36rpx;
		color: #000;
		z-index: 1;

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

			.divider {
				margin: 0 30rpx;
			}

			.iconfont {
				font-size: 36rpx;
			}
		}
	}
</style>
