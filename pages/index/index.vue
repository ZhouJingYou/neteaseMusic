<template>
	<view class="index">
		<navbar title="网易云音乐"></navbar>
		<view class="loginbar">
			<view class="loginbar-l">
				<image src="../../static/user.png"></image>
				<text>未登录</text>
			</view>
			<view class="loginbar-r">立即登录</view>
		</view>
		<view class="searchbar">
			<view class="iconfont icon-Magnifier"></view>
			<text>搜索歌曲</text>
		</view>
		<view class="toplist">
			<view class="toplist-item" v-for="(item,index) in topList" :key="index">
				<view class="toplist-item-l">
					<image :src="item.coverImgUrl" mode="aspectFill"></image>
					{{item.name}}
					<text class="updateFrequency">{{item.updateFrequency}}</text>
				</view>
				<view class="toplist-item-r">
					<view class="song" v-for="(item2,index) in item.tracks">
						{{index+1}}.{{item2.first}} - {{item2.second}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '../../components/navbar/navbar.vue'
	export default {
		data() {
			return {
				topList: []
			}
		},
		async onLoad() {
			let {
				code,
				list
			} = await this.$api.topList()
			if (code === 200) {
				this.topList = list.slice(0, 4)
				console.log(this.topList, 'asdasd');
			}
		},
		components: {
			navbar
		},
		methods: {

		}
	}
</script>
<style lang="scss" scoped>
	@import "../../common/mixins.scss";

	.index {
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;
		height: calc(100vh - '150rpx');

		.loginbar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #888;
			font-style: 14rpx;

			&-l {
				display: flex;
				align-items: center;

				image {
					width: 80rpx;
					height: 80rpx;
					padding-right: 20rpx;
				}
			}

			&-r {
				padding: 10rpx 20rpx;
				border: 1px solid #ddd;
				border-radius: 20px;
				color: #353535;
			}

		}

		.searchbar {
			display: flex;
			align-items: center;
			background-color: #f7f7f7;
			border-radius: 40rpx;
			height: 80rpx;
			margin: 30rpx 0;
			padding: 0 30rpx;
			font-size: 16px;
			color: #888;

			.icon-Magnifier {
				font-size: 40rpx;
				margin-right: 20rpx;
			}
		}

		.toplist {
			&-item {
				display: flex;
				margin-bottom: 20rpx;

				&-l {
					position: relative;
					width: 230rpx;
					height: 230rpx;
					text-align: center;
					line-height: 230rpx;
					font-size: 50rpx;
					margin-right: 20rpx;
					flex-shrink: 0;
					border-radius: 15rpx;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}

					.updateFrequency {
						font-size: 12rpx;
						position: absolute;
						bottom: 0;
						left: 0;
						line-height: 50rpx;
						padding-left: 12rpx;
						color: #fff;
					}
				}

				&-r {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					;
					font-size: 12px;

					.song {
						@include text-overflow(100%, 1);
					}
				}
			}
		}
	}
</style>
