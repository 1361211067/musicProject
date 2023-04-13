<template>
    <div class="song-play" :class="{ playing: !paused }" v-if="currentSong" @click.stop="getCommitNav($event)">
        <div class="mask"
            :style="{ backgroundImage: `url('${currentSong?.picUrl || currentSong?.al?.picUrl}?imageView=1&type=webp&thumbnail=247x0'` }">
        </div>
        <!-- 顶部打开评论 :src="" -->
        <div class="topNav">
            <div class="leftBar">
                <span class="userImg"><img :src="commits[0]?.user?.avatarUrl | parseImageUrl"></span>
                <span>你知道这首歌居然被这么评论？</span>
            </div>
            <a href="javascript:;" @click.stop="showCommitNav">打开看看 〉</a>
        </div>
        <!-- 返回 -->
        <div class="returnPre">
            <span @click="back">返回</span>
        </div>
        <!-- 歌曲信息 -->
        <div class="songinfo">
            <div class="songname">
                <span class="name">{{ currentSong.name }}</span> <span v-if="currentSong.al?.name ||
                    currentSong.song?.alias" class="album">({{ currentSong?.al?.name ||
        currentSong?.song?.alias[0] || currentSong?.song?.album?.name }})</span>
                <!-- <span v-for="artist in currentSong?.song?.artists || currentSong?.ar" :key="artist.id">{{ artist.name}}</span> -->

            </div>
            <div class="artists">
                <span class="art">{{ getArts(currentSong?.song?.artists || currentSong?.ar) }}</span>
            </div>
        </div>
        <!-- 唱片把手 -->
        <div class="handlerNav">
            <span :class="{ isplaying: paused }" class="handler">
                <img src="../assets/imgs/needle-ab.png" alt="">
            </span>
        </div>
        <!-- 专辑图片 -->
        <div class="songImg">
            <span v-show="paused" @click="togglePlay" class="stop"></span>
            <img class="thumb" @click="togglePlay" :src="(currentSong?.picUrl || currentSong?.al?.picUrl) | parseImageUrl"
                alt="" />
        </div>
        <!-- 歌词 -->
        <div class="word">
            <PlayLyric :parsedCurrentLyric="parsedCurrentLyric" :currentLyricIndex="currentLyricIndex"></PlayLyric>
        </div>

        <!-- 底部控制器 -->
        <section class="bottomNav">
            <section class="progress">
                <div class="time">
                    <span>{{ getTime(currentTime) }}</span>
                    <span>{{ getTime(duration) }}</span>
                </div>
                <label class="ranger">
                    <input type="range" min="0" :max="duration" step="0.1" :value="currentTimeData"
                        @input="changeValue($event)"
                        @change="$parent.$refs.audio.currentTime = $event.target.value; inputing = false;" />
                    <!-- <div class="outer" :style="`width:${total};`">
                        <div class="inner" :style="`width:($refs.input * duration)/total;`">
                        </div>
                    </div> -->
                </label>
            </section>

            <section class="controls">
                <button @click="
                    let i = modes.findIndex((o) => o.code === mode);
                let newI = i >= modes.length - 1 ? 0 : i + 1;
                $parent.mode = modes[newI].code;">
                    {{ modes.find((o) => o.code === mode).text }}
                </button>
                <button @click="$emit('next-song', 'prev')"><span class="goBtn preImg"></span></button>
                <button v-if="paused" @click="$parent.$refs.audio.play()">▶</button>
                <button class="paused" v-else @click="$parent.$refs.audio.pause()">=</button>
                <button @click="$emit('next-song', 'next')"><span class="goBtn nextImg"></span></button>
                <button @click="$parent.showMyPlayList = true">≡</button>
            </section>
        </section>

        <!-- 评论 -->
        <div ref="comments" class="comments">
            <div class="commentMask"></div>
            <div class="commentsNav">
                <h3 class="commitsTitle"><span>最新评论({{ commitsCount }})</span></h3>
                <SongComment v-for="com in commits" :key="com.commentId
                " :com="com"></SongComment>
            </div>
        </div>
    </div>
</template>

<script>
import PlayLyric from '../components/PlayLyric.vue';
import SongComment from '../components/SongComment.vue';
export default {
    name: 'Song',
    data() {
        return {
            // 是否可拖动
            inputing: false,
            // 当前播放时间戳
            currentTimeData: 0,
            modes: [
                { text: '列表', code: 0 },
                { text: '顺序', code: 1 },
                { text: '单曲', code: 2 },
                { text: '随机', code: 3 },
            ],
            // 当前歌曲评论
            commits: [],
            // 评论总数
            commitsCount: 0,
            // showCommit:false,
        }
    },
    components: {
        PlayLyric,
        SongComment,
    },
    props: [
        "currentSong",
        "paused",
        "currentTime",
        "duration",
        'mode',
        'parsedCurrentLyric',
        'currentLyricIndex'],
    created: function () {
        // if (!this.currentSong||!this.currentSong?.picUrl || !this.currentSong?.al?.picUrl) {
        //     this.axios.get(`song/detail?ids=${this.$route.query.id}`).then((res) => {
        //         // console.log('res==>',res);
        //         this.$emit("updata:currentSong", res.data.songs[0]);
        //     });
        // }
        if (!this.currentSong || !this.currentSong?.al?.picUrl || this.currentSong?.picUrl == false) {
            this.axios.get(`song/detail?ids=${this.$route.query.id}`).then((res) => {
                // console.log(res);
                this.$emit("updata:currentSong", { currentSong: res.data.songs[0] });
            });
        }
        this.axios.get(`https://apis.netstart.cn/music/comment/music?id=${this.currentSong.id}`).then((res) => {
            // console.log(res.data.comments);
            this.commits = res.data.comments;
            // 
            this.commitsCount = res.data.total;
        });
    },
    methods: {
        // 关闭评论区
        getCommitNav(e) {
            // console.log(e.target.className);
            if (e.target.className == 'comments') {
                this.$refs.comments.style.height = 0 + 'vh';
                this.$refs.comments.style.bottom = -800 + 'px';
                // this.$refs.comments.style = 60 + 'vh';
            }
        },
        // 显示评论
        showCommitNav() {
            this.$refs.comments.style.height = 100 + 'vh';
            this.$refs.comments.style.bottom = 0 + 'px';
        },
        // 改变模式
        // 获取作者
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
        // 转化时间格式
        getTime(num) {
            let mm = 0;
            let ss = 0;
            mm = parseInt((num % 3600 / 60));
            ss = parseInt((num % 3600) % 60).toFixed(0);
            mm = mm < 10 ? '0' + mm : mm;
            ss = ss < 10 ? '0' + ss : ss;
            return mm + ':' + ss;
        },
        // 点击播放|暂停
        togglePlay() {
            if (this.paused) {
                this.$parent.$refs.audio.play();
            } else {
                this.$parent.$refs.audio.pause();
            }
        },
        // 返回上一页
        back() {
            if (this.$route.path == '/song') {
                this.$router.go(-1);
            } else {
                this.$router.replace('/');
            }
            // console.log(this.$route);
        },
        // 切换进度条
        changeValue(event) {
            this.inputing = true;
            this.currentTimeData = event.target.value;
        },
    },
    watch: {
        currentTime: function (currentTime) {
            if (!this.inputing) {
                this.currentTimeData = currentTime;
            }
        },
    }
}
</script>

<style lang="less" scoped>
.song-play {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    justify-content: space-between;
    position: relative;

    // align-items: center;
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        z-index: -1;
        filter: blur(30px) brightness(0.45);
        transform: scale(1.2);
    }

    .topNav {
        display: flex;
        justify-content: space-between;
        padding: 8px 10px;
        height: 50px;
        color: #f9f9fa;
        margin: 0 5px;
        align-items: center;
        font-size: 13px;
        border-bottom: 1px solid #94a0abc6;
        .leftBar{
            display: flex;
            width: 58%;
            justify-content: space-between;
            align-items: center;
            .userImg{
            display: block;
            width: 25px;
            height: 25px;
            img{
                border-radius: 50%;
                width: 100%;
                height: 100%;
            }
        }
        }
        
        a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: #f7f7f7;
            padding: 5px 10px;
            text-align: center;
            border-radius: 15px;
            border: 1px solid #f9f9fa91;
        }
    }

    .returnPre {
        margin: 10px;
        color: #fefefe;
    }

    .handlerNav {
        width: 100vw;
        height: 40px;
        position: relative;

        .handler {
            width: 70px;
            top: 0px;
            left: 50%;
            z-index: 6;
            position: absolute;

            &.isplaying {
                img {
                    transform: translate(-15px, -10px) rotate(-50deg);
                    width: 100%;
                }
            }

            img {
                transition: transform 0.8s linear;
                transform-origin: top;
                transform: rotate(-13deg);
                width: 100%;
            }
        }
    }

    .songImg {
        margin: 0 auto;
        width: 300px;
        height: 45vh;
        background: url(../assets/imgs/songBorder.png) no-repeat center center;
        background-size: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .thumb {
            width: 65%;
            border-radius: 50%;
            animation: myrotate 8s linear infinite;
            animation-play-state: paused;
        }

        .stop {
            position: absolute;
            z-index: 3;
            width: 60px;
            height: 60px;
            background: url(../assets/imgs/play.png) center center;
            background-size: 100%;
        }
    }

    &.playing {
        .thumb {
            animation-play-state: running;
        }
    }

    .songinfo {
        display: flex;
        margin: 5px 0;
        flex-direction: column;
        align-items: center;

        .songname {
            font-size: 20px;
            color: #fefefe;
            display: flex;

            // justify-content: center;
            .name {
                // flex: 1.5;
                text-align: center;
            }

            .album {
                // flex: 1;
                // display: block;
                max-width: 250px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }

        .artists {
            margin-top: 5px;
            color: #e1e1e1dd;
        }
    }

    .word {
        display: flex;
        color: #fff;
        height: 30vh;
        width: 100vw;
        overflow-x: hidden;
        overflow-y: scroll;
        position: relative;
    }

    .bottomNav {
        position: sticky;
        bottom: 0;
        width: 100vw;
        color: #f9f9fa;
        padding-top: 10px;
        background-color: #252525e1;

        .time {
            width: 92vw;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            // margin: 0 10px;
        }

        .ranger {
            width: 100vw;
            display: flex;
            justify-content: center;

            input {
                width: 94%;
            }
        }

        .outer {
            width: 97vw;
            height: 5px;
            background-color: aliceblue;
            margin: 0 auto;
            border-radius: 2px;
            overflow: hidden;

            // position: relative;
            .inner {
                // position: absolute;
                // z-index: 3;
                border-radius: 2px;
                background-color: #3f55e9;
                width: 50%;
                height: 100%;
            }
        }

        .controls {
            width: 100%;
            margin-top: 15px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;

            .goBtn {
                display: block;
                width: 30px;
                height: 30px;

                &.preImg{
                background: url(../assets/imgs/pre.png) no-repeat center center;
                background-size: 100%;
                }
                &.nextImg{
                background: url(../assets/imgs/next.png) no-repeat center center;
                background-size: 100%;
                }
            }

            button {
                background-color: #d43c33;
                color: #fefefe;
                border: none;
                outline: none;
                font-size: 18px;
                padding: 5px 15px;
                border-radius: 5px;

                &.paused {
                    transform: rotate(90deg);
                }

                &:nth-of-type(3) {
                    padding: 15px;
                    // padding: 25px;
                    width: 80px;
                    text-align: center;
                    height: 80px;
                    font-size: 45px;
                    border-radius: 50%;
                }
            }
        }
    }

    .comments {
        position: absolute;
        bottom: -700px;
        height: 0;
        // overflow: hidden;
        // display: none;
        width: 100vw;
        // margin-top: 40px;
        background-color: transparent;
        transition: all 0.8s linear;

        .commentsNav {
            // display: none;
            position: absolute;
            bottom: -20px;
            width: 100vw;
            height: 80vh;
            overflow-x: hidden;
            overflow-y: scroll;
            z-index: 20;
            // padding-top: 20px;
            background-color: #fff;
            border-radius: 20px 20px 0 0;
            transition: all 0.8s linear;

            .commitsTitle {
                position: sticky;
                top: 0px;
                font-size: 20px;
                text-align: center;
                background-color: #fff;
                padding-top: 20px;
                width: 100vw;

                span {
                    font-weight: 600;
                    padding-top: 5px;
                    border-top: 2px solid #d43c33;
                }
            }
        }
    }


}
</style>
<style>
@keyframes myrotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
