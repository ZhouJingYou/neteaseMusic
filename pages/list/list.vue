<template>
	<view class="list">
		<fixedbg :imgUrl="playlist.coverImgUrl"></fixedbg>
		<navbar title="歌单" color="#fff"></navbar>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="list-top">
					<view class="list-top-l">
						<image :src="playlist.coverImgUrl"></image>
						<text class="iconfont icon-yousanjiao">{{playlist.playCount}}</text>
					</view>
					<view class="list-top-r">
						<text class="title">{{playlist.name}}</text>
						<view class="icon">
							<image :src="playlist.creator.avatarUrl"></image>
							<text>{{playlist.creator.nickname}}</text>
						</view>
						<text>{{playlist.description}}</text>
					</view>
				</view>
				<view class="list-cont">
					<view class="list-cont-header">
						<text class="iconfont icon-arrow-"></text>
						<text>播放全部</text>
						<text>(共{{playlist.trackCount}}首)</text>
					</view>
					<view class="list-cont-item" @tap="handleToMusic(item)" v-for="(item,index) in playlist.tracks"
						:key="index">
						<view class="list-cont-item-l">
							<text>{{index+1}}</text>
						</view>
						<view class="list-cont-item-r">
							<view>{{item.name}}</view>
							<view class="song">
								<image src="../../static/sq.png" v-if="item.sq"></image>
								<text>{{item.ar[0].name}} - {{item.name}}</text>
							</view>
						</view>
						<view class="iconfont icon-bofang">
						</view>
					</view>

				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				playlist: {
					creator: {}
				}
			}
		},
		async onLoad(options) {
			let {
				code,
				playlist
			} = await this.$api.playlistDetail({
				id: options.id
			})
			if (code === 200) {
				this.playlist = playlist
			}
			console.log("this.playlist: ", this.playlist);
		},
		methods: {
			handleToMusic(params) {
				uni.navigateTo({
					url: `/pages/music/music?id=${params.id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/mixins.scss";

	.list {


		&-top {
			display: flex;
			margin: 30rpx;
			line-height: 1.6;

			&-l {
				margin-right: 40rpx;
				position: relative;

				image {
					width: 260rpx;
					height: 260rpx;
				}

				.iconfont {
					position: absolute;
					right: 6rpx;
					top: 2rpx;
					color: #fff;
					font-size: 28rpx;
				}
			}

			&-r {

				flex: 1;
				font-size: 24rpx;
				color: #c3d1e3;

				.title {
					font-size: 34rpx;
					color: #fff;
				}

				.icon {
					display: flex;
					align-items: center;

					margin: 20rpx 0;

					image {
						width: 55rpx;
						height: 55rpx;
						border-radius: 50%;
						margin-right: 10rpx;
					}
				}

			}
		}

		&-cont {

			background-color: #fff;
			border-radius: 50rpx;
			overflow: hidden;
			;

			&-header {
				display: flex;
				align-items: center;
				height: 140rpx;

				.iconfont {
					margin: 0 30rpx;
					font-size: 60rpx;
				}

				text:nth-child(2) {
					font-size: 34rpx;
					margin-right: 6rpx;
				}

				text:nth-child(3) {
					font-size: 28rpx;
					color: #b2b2b2;

				}
			}

			&-item {
				display: flex;
				align-items: center;
				margin: 20rpx 10rpx 60rpx 10rpx;
				position: relative;



				&-l {
					width: 100rpx;
					text-align: center;
					color: #979797;
					font-size: 28rpx;
					flex-shrink: 0;
				}

				&-r {
					flex: 1;
					margin-right: 80rpx;
					min-width: 0;

					view:nth-child(1) {
						font-size: 30rpx;
						@include text-overflow(100%, 1);
					}

					/* text:nth-child(2) {
						font-size: 24rpx;
						color: #a2a2a2;
						@include text-overflow(100%, 1);
					} */

					.song {
						font-size: 24rpx;
						color: #a2a2a2;
						@include text-overflow(100%, 1);
					}

					image {
						width: 34rpx;
						height: 22rpx;
						margin-right: 8rpx;
					}
				}

				.iconfont {
					position: absolute;
					right: 0;
					font-size: 50rpx;
					color: #c8c8c8;
					margin-right: 30rpx;
				}

			}
		}
	}
</style>
