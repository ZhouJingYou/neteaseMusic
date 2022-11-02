<template>
	<view class="fixedbg" :style="`background-image:url(${imgUrl})`"></view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			imgUrl: {
				type: String,
				default: ''
			},
		},
	}
</script>

<style lang="scss" scoped>
	.fixedbg {
		width: 100%;
		height: 100vh;
		position: fixed;
		background-position: center 0;
		filter: blur(10px);
		transform: scale(1.2);
		background-size: cover;
	}
</style>
