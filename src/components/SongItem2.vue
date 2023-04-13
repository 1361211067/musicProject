<template>
    <li class="songItem" @click="playCurrentSong()">
        <span class="number" :class="hot">{{ index }}</span>
        <div class="songInfo">
            <h3>{{ song.name }}<span class="alias" v-if="song.alia.length != 0">({{ song.alia[0] }})</span></h3>
            <i v-if="hot"  class="sq"></i>
            <span class="art">{{ getArts(song.ar) }}</span>
            <span class="album">{{ song.al.name }}</span>
        </div>
        <div class="playBtn">
            <a class="play"></a>
        </div>
    </li>
</template>

<script>
export default {
    name: 'SongItem2',
    props:['song','index','hot'],
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
        playCurrentSong(){
            console.log(this.song);
            // 跳转路由
            this.$router.push({ path: '/song', query: { id: this.song.id } });
            // 传递id到app
            this.$emit('updata:currentSong',this.song);
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

    .number {
        color: #888;
    }
    .red{
        color: #df3436;
    }

    .songInfo {
        margin-left: 0.4rem;
        padding: 6px;
        width: 300px;

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