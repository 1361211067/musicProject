<template>
    <li class="songItem" @click="playCurrentSong()">
        <div class="songInfo">
            <!--  -->
            <h3><span v-html='getHightLine(song.name,text)'></span><span v-html="getHightLine(song.alias[0],text)" class='alias' v-if='song.alias.length != 0'></span></h3>
            <div class="row">
                <i class="sq"></i>
                <span class="art" v-html="getHightLine(getArts(song.artists),text)"></span>
                <span class="album" v-html="getHightLine(song.album.name,text)"></span>
            </div>
        </div>
        <div class="playBtn">
            <a class="play"></a>
        </div>
    </li>
</template>

<script>
export default {
    name: 'SongItem3',
    props: {
        song: {
            type: Object
        },
        text:{
            String
        }
    },
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
        getHightLine(str,text){
            return str.replaceAll(text,`<span class='highlight'>${text}</span>`);
        },
        playCurrentSong(){
            console.log('this.song==>',this.song);
            // 跳转路由
            this.$router.push({ path: '/song', query: { id: this.song.id } });
            // 传递id到app
            // this.axios.get(`song/detail?ids=${this.song.id}`).then((res) => {
            //     console.log('res==>',res);
            //     this.$emit("updata:currentSong", res.data.songs[0]);
            // });
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



        .row {
            display: flex;
            align-items: center;
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
                display:inline-block;
            }

            span.album {
                font-size: 12px;
                color: #888;
                display:inline-block;
                max-width: 230px;
                /* 强制代码一行显示 */
                white-space: nowrap;
                /* 溢出部分内容隐藏 */
                overflow: hidden;
                /* 溢出部分内容使用省略号代码 */
                text-overflow: ellipsis;

                &::before {
                    margin: 0 5px 0 3px;
                    content: '-';
                }
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


}</style>
<style lang="less">
    .highlight{
        color: #507daf;
    }
</style>