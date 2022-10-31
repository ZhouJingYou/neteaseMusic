<template>
	<view class="navbar">
		{{title}}
	</view>
</template>

<script>
	export default {
		data() {
			return
		},
		props: {
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 150rpx;
		font-size: 36rpx;
		color: #000;
	}
</style>
