<template>
    <!-- 热歌榜 -->
    <div class="hotlist">
        <div class="topNav">
            <div class="mask"></div>
            <div class="left">
                <span class="Btext"></span>
                <span class="time">更新日期：{{ time }}</span>
            </div>
        </div>
        <ul v-for="song,index in hots" :key="index">
            <!-- <SongItem2 
            :song="song" 
            :index="addZero(index+1)" 
            v-if="index<3" 
            class="red" 
            :hot="'red'"
            @updata:currentSong="$emit('updata:currentSong', $event)"
            >
        </SongItem2>
            <SongItem2 
            :song="song" 
            :index="addZero(index+1)" 
            v-else 
            class="gery" 
            :hot="'gery'"
            @updata:currentSong="$emit('updata:currentSong', $event)"></SongItem2> -->
            <SongItem 
            :song="song" 
            :index="addZero(index+1)" 
            v-if="index<3" 
            class="red" 
            :hot="'red'"
            :currentSongId="currentSongId"
            :paused="paused"
            :showNav="showNav"
            @updata:currentSong="
          $emit('updata:currentSong', { currentSong: $event, currentPlayList: hots })"
            >
            <!-- @updata:songList="$emit('updata:songList',hots)" -->
        </SongItem>
            <SongItem 
            :song="song" 
            :index="addZero(index+1)" 
            v-else 
            class="gery" 
            :hot="'gery'"
            :currentSongId="currentSongId"
            :paused="paused"
            :showNav="showNav"
            @updata:currentSong="
          $emit('updata:currentSong', { currentSong: $event, currentPlayList: hots })"
            ></SongItem>
            <!-- @updata:songList="$emit('updata:songList',hots)" -->
        </ul>
    </div>
</template>

<script>
// import SongItem2 from '../components/SongItem2.vue';
import SongItem from '../components/SongItem.vue';
export default {
    name: 'HomeHot',
    props: ["currentSongId", "paused"],
    data() {
        return {
            hots: [],
            time: '',
            showNav:'list',
            // hot:'',
        }
    },
    components: {
        // SongItem2,
        SongItem
    },
    methods: {
        addZero(num){
            return num<10 ? num.toString().padStart(2,'0') : num;
        },
        getDate(number) {
            let date = new Date(number);
            let m = this.addZero(date.getMonth() + 1)+'月';
            let d = this.addZero(date.getDate())+'日';
            return m + d;
        }
    },
    created() {
        // 获取热门搜索
        this.axios.get("https://apis.netstart.cn/music/playlist/detail?id=3778678").then((res) => {
            console.log(res.data);
            //   .slice(0, 20)
            this.time = this.getDate(res.data.playlist.updateTime);
            this.hots = res.data.playlist.tracks.slice(0, 20);
        });
    },
}
</script>

<style lang="less" scoped>
.hotlist {
    // margin-top: 124px;
    .topNav {
        position: relative;
        height: 145px;
        .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(../assets/imgs/hot_music_bg_2x.jpg) no-repeat center center;
            background-size: 100%;
            background-position: center;
            filter:brightness(0.8);
        z-index: 1;
    }

        .left {
            display: flex;
            color: #fff;
            flex-direction: column;
            position: absolute;
            top: 20px;
            z-index: 3;
            left: 15px;

            .Btext {
                width: 142px;
                height: 67px;
                background: url(../assets/imgs/icon_2x.png);
                background-position: -24px -30px;
                background-size: 166px 97px;
            }

            .time {
                margin-top: 10px;
                font-size: 12px;
                color: #ffffffcc;
            }
        }
    }
}
</style>