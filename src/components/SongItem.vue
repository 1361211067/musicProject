<template>
    <li class="songItem" @click.stop="playCurrentSong" :class="{
        active: currentSongId === song.id,
        playing: !paused && currentSongId === song.id,
    }">
        <!-- 默认 -->
        <div v-if="showNav != 'search' && !hot" class="songInfo">
            <h3>{{ song.name }}<span class="alias" v-if="song?.song?.alias?.length">({{ song?.song?.alias[0] }})</span>
            </h3>
            <i v-show="song?.song?.sqMusic" class="sq"></i>
            <span class="art" v-if="song?.song?.artists">{{ getArts(song?.song?.artists) || getArts(song.artists) }}</span>
            <span class="album">{{ song?.song?.album?.name }}</span>
        </div>
        <!-- 查询结果 -->
        <div v-if="showNav == 'search'" class="songInfo">
            <h3><span v-html='getHightLine(song.name, text)'></span><span v-html="getHightLine(song.alias[0], text)"
                    class='alias' v-if='song.alias?.length != 0'></span></h3>
            <div class="row">
                <i v-show="song?.sqMusic" class="sq"></i>
                <span class="art" v-html="getHightLine(getArts(song.artists), text)"></span>
                <span class="album" v-html="getHightLine(song.album.name, text)"></span>
            </div>
        </div>
        <!-- 热门 -->
        <span v-if="hot && showNav == 'list'" class="number" :class="hot">{{ index }}</span>
        <div v-if="hot && showNav == 'list'" class="songInfo">
            <h3>{{ song.name }}
                <span class="alias" v-if="song?.alia?.length">({{ song.alia[0] }})</span>
                <span class="alias" v-else-if="song?.song?.alias.length">(1{{ song?.song?.alias[0] }})</span>
                <span class="alias" v-else></span>
            </h3>
            <i v-if="song?.sq" class="sq"></i>
            <i v-else="song?.song?.sqMusic" class="sq"></i>
            <span v-if="song?.ar" class="art">{{ getArts(song.ar) }}</span>
            <span class="art" v-else>{{ getArts(song?.song?.artists) || getArts(song?.artists) }}</span>
            <span v-if="song?.al?.name" class="album">{{ song.al.name }}</span>
            <span v-else class="album">{{ song?.song?.album?.name }}</span>
        </div>
        <div class="playBtn">
            <a class="play"></a>
        </div>
    </li>
</template>

<script>
export default {
    name: 'SongItem',
    props: ['song', "currentSongId", "paused", 'text', 'showNav', 'index', 'hot'],
    data() {
        return {
        }
    },
    methods: {
        getArts(arr) {
            let str = '';
            for (let i = 0; i < arr.length; i++) {
                str += arr[i].name;
                if (i < arr.length - 1) {
                    str += ' / ';
                }
            }
            return str;
        },
        playCurrentSong() {
            // console.log(this.song);
            // 跳转路由
            // this.$router.push({ path: '/song', query: { id: this.song.id } });

            // 跳转路由
            if (this.$route.path === "/song") {
                this.$router.replace({
                    path: "/song",
                    query: {
                        id: this.song.id,
                    },
                });
            } 
            // else {
            //     this.$router.push({
            //         path: "/song",
            //         query: {
            //             id: this.song.id,
            //         },
            //     });
            // }

            // 传递id到app
            // 搜索结果的数据有缺失需要替换数据
            if (!this.song?.picUrl || !this.song?.al?.picUrl) {
                this.axios.get(`song/detail?ids=${this.song.id}`).then((res) => {
                    // console.log('res==>',res);
                    this.$emit("updata:currentSong", res.data.songs[0]);
                });
            } else {
                this.$emit('updata:currentSong', this.song);
                // this.$emit('updata:songList');
            }
        },
        getHightLine(str, text) {
            return str.replaceAll(text, `<span class='highlight'>${text}</span>`);
        },
    }
}

</script>

<style lang="less" scoped>
.songItem {
    margin-left: 10px;
    border-bottom: 1px solid #f2f2f3;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .number {
        color: #888;
    }

    .red {
        color: #df3436;
    }

    &.active {
        .songInfo {
            h3 {
                color: #d43c33;
            }

            .alias {
                color: #d43c33;
            }

            span.art {
                color: #d43c33;
            }

            span.album {
                color: #d43c33;
            }
        }

        .playBtn {
            .play {
                background: url(../assets/imgs/pausing.png) no-repeat;
                background-size: 100%;
            }
        }

        &.playing {
            .playBtn {
                .play {
                    background: url(../assets/imgs/playing.png) no-repeat;
                    background-size: 100%;
                }
            }
        }
    }

    .songInfo {
        padding: 6px;
        width: 323px;

        h3 {
            color: #333;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 17px;

            .alias {
                color: #888;
            }
        }

        i.sq {
            display: inline-block;
            width: 12px;
            height: 8px;
            margin-right: 4px;
            background: url(../assets/imgs/icon_2x.png) no-repeat;
            background-size: 166px 97px;
        }

        span.art {
            color: #888;
            font-size: 12px;
            margin: 0 2px;

            .line {
                margin-right: 4px;
            }
        }

        span.album {
            font-size: 12px;
            color: #888;

            &::before {
                margin: 0 5px 0 3px;
                content: '-';
            }
        }

    }

    .playBtn {
        width: 42px;
        height: 55px;
        padding: 0 10px;
        display: flex;
        align-items: center;

        .play {
            width: 22px;
            height: 22px;
            display: inline-block;
            background: url(../assets/imgs/icon_2x.png) no-repeat;
            background-position: -24px 0;
            background-size: 166px 97px;
        }
    }


}
</style>
<style lang="less">
.highlight {
    color: #507daf;
}</style>