<template>
	<view class="music">
		<fixedbg :imgUrl="song.al.picUrl"></fixedbg>
		<navbar :title="song.name" color="#fff"></navbar>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="lrc" :style="{transform: `translateY(${380-currentLrcLine*80}rpx)`}">
					<view :class="['lrc-line', currentLrcLine===index && 'active' ]" v-for="(item,index) in lrcArr.lrc"
						:key="index">{{item.lyric}}</view>
				</view>
			</scroll-view>
		</view>
		<view class="playbar">
			<image :src="song.al.picUrl"></image>
			<view class="name">
				<view>
					{{song.name}}
				</view>
				<view>
					{{song.ar[0].name}}
				</view>
			</view>
			<view class="btns">
				<text class="iconfont icon-bofang" @tap="handlePlayOrPausepMusic"></text>
				<text class="iconfont icon-kuaijin"></text>
				<text class="iconfont icon-list"></text>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		ifError
	} from 'assert'
	export default {
		async onLoad(options) {
			const res = await this.$api.songDetail({
				ids: options.id
			})
			if (res.code === 200) {
				this.song = res.songs[0]
			}
			const res2 = await this.$api.songUrl({
				id: options.id
			})
			if (res2.code === 200) {
				this.song.url = res2.data[0].url
			}
			const res3 = await this.$api.lyric({
				id: options.id
			})
			if (res3.code === 200) {
				this.lrcArr = this.parseLyric(res3.lrc.lyric)
			}
			this.initMusiContext()
		},
		data() {
			return {
				song: {
					al: {},
					ar: [{}]
				},
				context: {},
				lrcArr: [],
				currentLrcLine: 0
			}
		},
		methods: {
			initMusiContext() {
				this.context = uni.createInnerAudioContext();
				this.context.src = this.song.url
				this.context.onPlay(() => {
					console.log('开始播放');
				});
				this.context.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				this.context.onTimeUpdate(() => {
					let {
						currentTime
					} = this.context
					console.log("currentTime: ", currentTime);
					for (let i = 0; i < this.lrcArr.lrc.length; i++) {
						if (currentTime > this.lrcArr.lrc[i].time && currentTime < this.lrcArr.lrc[i + 1].time) {
							this.currentLrcLine = i
							break
						}
					}
					console.log("this.currentLrcLine: ", this.currentLrcLine);
				})
			},
			handlePlayOrPausepMusic() {
				if (this.context.paused) {
					this.context.play()
				} else {
					this.context.pause()
				}
			},
			parseLyric(lyric) {
				console.log("lyric: ", lyric);
				const lrcObj = {
					ti: "", //[ar:艺人名]
					ar: "", //[ti:曲名]
					al: "", //[al:专辑名]
					by: "", //[by:编者（指编辑LRC歌词的人）]
					lrc: [], //[offset:时间补偿值] 其单位是毫秒，正值表示整体提前，负值相反。这是用于总体调整显示快慢的。
				};
				const lrcArr = lyric
					.split("\n")
					.filter(function(value) {
						// 1.通过回车去分割歌词每一行,遍历数组，去除空行空格
						return value.trim() !== "";
					})
					.map(function(value) {
						// 2.解析歌词
						const line = parseLyricLine(value.trim());
						if (line.type === "lyric") {
							lrcObj.lrc.push(line.data);
						} else {
							lrcObj[line.type] = line.data;
						}
						return value.trim();
					});

				function parseLyricLine(line) {
					const tiArAlByExp = /^\[(ti|ar|al|by):(.*)\]$/;
					const lyricExp = /^\[(\d{2}):(\d{2}).(\d{2,3})\](.*)/;
					let result;
					if ((result = line.match(tiArAlByExp)) !== null) {
						return {
							type: result[1],
							data: result[2],
						};
					} else if ((result = line.match(lyricExp)) !== null) {
						return {
							type: "lyric",
							data: {
								/* time: {
									m: result[1],
									s: result[2],
									ms: result[3],
								}, */
								time: Number(result[1]) * 60 + Number(result[2]) + Number(result[3]) / 1000,
								lyric: result[4].trim(),
							},
						};
					} else {}
				}
				return lrcObj;
			}

		},


	}
</script>

<style lang="scss" scoped>
	@import "../../common/mixins.scss";



	.music {
		overflow: hidden;

		.container {
			height: calc(100vh - 150rpx - 98rpx);

			.lrc {
				color: #949495;
				transform: translateY(380rpx);
				transition: all .5s;

				.lrc-line {
					text-align: center;
					line-height: 80rpx;
					margin: 0 40rpx;

					&.active {
						color: #fff;
					}
				}
			}

		}

		.playbar {
			width: 100%;
			height: 98rpx;
			background: #fff;
			display: flex;
			align-items: center;
			position: relative;
			min-width: 0;

			image {
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
				position: absolute;
				left: 0;
				bottom: 0;
			}

			.name {
				margin-left: 120rpx;
				flex: 1;
				font-size: 28rpx;

				view:nth-child(1) {
					@include text-overflow(100%, 1);
				}

				view:nth-child(2) {
					color: #888;
					@include text-overflow(100%, 1);
				}
			}

			.btns {
				flex-shrink: 0;

				.iconfont {
					color: red;
					font-size: 70rpx;
					margin: 0 20rpx;
				}
			}
		}
	}
</style>
