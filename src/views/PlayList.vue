<template>
    <div>
        <div class="header">
            <header v-if="detail">
                <div class="mask"
                    :style="{ backgroundImage: `url('${detail?.playlist?.coverImgUrl + '?imageView=1&type=webp&thumbnail=247x0'}'` }">
                </div>
                <div class="thumbImg">
                    <img style="width: 35vw; margin: 10px" class="thumb"
                        :src="detail?.playlist?.coverImgUrl + '?imageView=1&type=webp&thumbnail=247x0'" alt="" />
                    <span class="tag">歌单</span>
                    <span class="listen"><i class="u-erp"></i>{{ getNumber(detail.playlist.playCount) }}</span>
                </div>
                <div class="songInfo">
                    <h3>{{ detail.playlist.name }}</h3>
                    <div class="userInfo">
                        <div class="avatar">
                            <img :src="detail.playlist.creator.avatarUrl | parseImageUrl" alt="">
                            <span class="level"><img
                                    :src="detail.playlist.creator?.avatarDetail?.identityIconUrl | parseImageUrl"
                                    alt=""></span>
                        </div>
                        <span class="nickname">{{ detail.playlist.creator.nickname }}</span>
                    </div>
                </div>
            </header>
            <div class="returnPre">
                <span @click="back">返回</span>
                <span @click="playAll">播放全部</span>
                <span @click="">分享</span>
            </div>
        </div>
        <ListTitle>歌单列表</ListTitle>
        <ul>
            <!-- <SongItem2 v-for="songItem, index in songs" 
            :key="songItem.id" 
            :song="songItem" 
            :index="addZero(index + 1)"
            @updata:currentSong="$emit('updata:currentSong', $event)"
            >
            </SongItem2> -->
            <SongItem v-for="songItem, index in songs" :key="songItem.id" :song="songItem" :index="addZero(index + 1)"
                :currentSongId="currentSongId" :paused="paused" :showNav="showNav" :hot="'gery'" @updata:currentSong="
                    $emit('updata:currentSong', { currentSong: $event, currentPlayList: songs })">
                <!-- @updata:songList="$emit('updata:songList',songs)" -->
            </SongItem>
        </ul>
        <ListTitle>精彩评论</ListTitle>
        <SongComment v-for="com in comment?.hotComments" :key="com.commentId
        " :com="com"></SongComment>
        <ListTitle>最新评论<span v-if="comment?.total">（{{ comment?.total }}）</span></ListTitle>
        <SongComment v-for="com in comment?.comments" :key="com.commentId
        " :com="com"></SongComment>

    </div>
</template>

<script>
// import SongItem2 from '../components/SongItem2.vue';
import SongItem from '../components/SongItem.vue';
import ListTitle from '../components/ListTitle.vue';
import SongComment from '../components/SongComment.vue';
export default {
    name: 'PlayList',
    data() {
        return {
            detail: null,
            comment: null,
            songs: [],
            showNav: 'list'
        }
    },
    props: ["currentSongId", "paused"],
    components: {
        SongItem,
        ListTitle,
        SongComment,
    },
    methods: {
        // 播放全部
        playAll(){
            this.$emit('updata:currentSong',{currentSong:this.songs[0],currentPlayList:this.songs});
        },
        // 获取数量
        getNumber(num) {
            let str = ''
            let yi = 100000000;
            let wan = 10000;
            if (num / yi >= 1) {
                let n = (num / yi);
                if (n.toFixed(1) % n.toFixed(0) > 0) {
                    str = n.toFixed(1) + "亿"
                } else {
                    str = n.toFixed() + "亿"
                }
            } else if (num / wan >= 1) {
                let n = (num / wan);
                if (n.toFixed(1) % n.toFixed() > 0) {
                    str = n.toFixed(1) + "万"
                } else {
                    str = n.toFixed() + "万"
                }
            } else {
                str = num;
            }
            return str;
        },
        addZero(num) {
            return num < 10 ? num.toString().padStart(2, '0') : num;
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
    },
    created() {
        Promise.all([
            this.axios.get("playlist/detail", {
                params: {
                    id: this.$route.query.id,
                },
            }),
            this.axios.get("comment/playlist", {
                params: {
                    id: this.$route.query.id,
                },
            }),
        ]).then(([{ data: detail }, { data: comment }]) => {
            //   console.log('detail==>',detail,'comment==>',comment);
            console.log('detail==>', detail.playlist.tracks[0]);
            // console.log('comment==>', comment);
            this.detail = detail;
            this.songs = detail.playlist.tracks;
            this.comment = comment;
        });
    },
}
</script>

<style lang="less" scoped>
.header{
    header {
    position: relative;
    overflow: hidden;
    display: flex;
    box-sizing: border-box;
    padding: 20px 5px;
    flex-direction: row;

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        z-index: -1;
        filter: blur(30px) brightness(0.8);
        transform: scale(1.2);
    }

    .thumbImg {
        position: relative;

        span.listen {
            display: flex;

            .u-erp {
                width: 12px;
                height: 12px;
                margin-top: 2px;
                margin-right: 2px;
                background: url(../assets/imgs/ear.svg) no-repeat;
            }

            position: absolute;
            font-size: 10px;
            top: 12px;
            right: 12px;
            color: #fff;
            z-index: 3;
            text-shadow: 1px 0 0 rgba(0, 0, 0, .15);
        }

        span.tag {
            position: absolute;
            top: 25px;
            left: 10px;
            color: #fff;
            z-index: 3;
            font-size: 9px;
            text-align: center;
            line-height: 17px;
            padding: 0 8px;
            background-color: rgba(217, 48, 48, .8);
            border-top-right-radius: 17px;
            border-bottom-right-radius: 17px;
            text-shadow: 1px 0 0 rgba(0, 0, 0, .15);
        }
    }


    .songInfo {
        h3 {
            color: #fff;
            width: 200px;
            margin-left: 10px;
            margin-top: 10px;
            display: inline-block;
        }

        .userInfo {
            margin-top: 5px;
            margin-left: 10px;
            display: flex;
            align-items: center;

            .avatar {
                position: relative;
                width: 40px;
                height: 40px;
                margin-right: 5px;

                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }

                .level {
                    img {
                        width: 100%;
                        height: 100%;
                    }

                    position: absolute;
                    bottom: 0px;
                    right: 0px;
                    width: 12px;
                    height: 12px;
                }
            }

            .nickname {
                color: #dcd3ce;
            }
        }

    }

    SongItem2 {
        &::before {
            content: '';
        }
    }

}
display: flex;
flex-direction: column;
.returnPre {
    display: flex;
    padding: 5px 15px;
    justify-content: space-between;
    background-color: #d43b33ed;
    span {
        padding: 5px 15px;
        display: block;
        color: #fff;
        border-radius: 5px;
        border:  #fff 1px solid;
    }
}

}
</style>