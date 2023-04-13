<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <PlaySongList
    class="playSongList"
    v-if="showMyPlayList"
      @updata:currentSong="updataCurrentSong"
      :currentPlayList="currentPlayList"
      :currentSongId="currentSong?.id"
      :paused="paused"
    ></PlaySongList>
    <router-view 
    :class="{ 'show-play-bar': currentSong && !$route.meta.hidePlayBar }"
    @updata:currentSong="updataCurrentSong" 
    :currentSong="currentSong" 
    :paused="paused" 
    :duration="duration"
    :currentTime="currentTime" 
    :parsedCurrentLyric="parsedCurrentLyric"
    :currentLyricIndex="currentLyricIndex"
    :currentSongId="currentSong?.id"
    @next-song="nextSong"
    :mode="mode"
    />

    <!-- 
      controls
    -->
    <audio style="display: none" v-if="currentSong"
      :src="`https://music.163.com/song/media/outer/url?id=${currentSong?.id}.mp3`" 
      ref="audio" 
      autoplay
      @play="paused = false"
      @pause="paused = true" 
      @durationchange="duration = $event.target.duration"
      @timeupdate="currentTime = $event.target.currentTime"
      @ended="kownModel"
      >
    </audio>

    <PlayBar v-if="currentSong && !$route.meta.hidePlayBar" 
    @click.native="
      $router.push({
        path: '/song',
        query: {
          id: currentSong?.id,
        },
      })
    " :currentSong="currentSong" @play-song="$refs.audio.play()" :paused="paused" />

  </div>
</template>
<script>
import PlayBar from "@/components/PlayBar.vue";
import PlaySongList from "@/components/PlaySongList.vue";
export default {
  data() {
    return {
      // 传歌曲id
      currentSong: JSON.parse(window.localStorage.getItem("currentSong")) || null,
      // 是否暂停
      paused: true,
      // 总时长
      duration: 0,
      // 当前时长
      currentTime: 0,
      // 歌词
      currentLyric:JSON.parse(window.localStorage.getItem("currentLyric")) || null,
      // 当前播放列表
      currentPlayList:JSON.parse(window.localStorage.getItem("currentPlayList")) || [],
      // 当前模式
      mode: JSON.parse(window.localStorage.getItem("mode")) || 0,
      showMyPlayList:false,
    }
  },
  components: {
    PlayBar,
    PlaySongList
  },
  created() {
    // console.log('route==>', this.$route);
  },
  methods: {
    // 下一曲
    kownModel(){
      if(this.mode === 2){
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play();
      }else{
        this.nextSong('next');
        this.$refs.audio.currentTime = 0
      }
    },
    // 更换当前歌曲
    updataCurrentSong: function ({ currentSong, currentPlayList }) {
      this.currentSong = currentSong;
      // console.log(currentPlayList);
      if (currentPlayList) {
        this.currentPlayList = currentPlayList;
      }
    },

    // 切换歌曲
    nextSong: function (action) {
      // console.log(index);

      if (this.mode === 3) {
        // console.log("随机");
        let others = this.currentPlayList.filter((o) => o.id !== this.currentSong.id);

        this.currentSong = others[Math.floor(Math.random() * others.length)];
      }

      // if (this.mode === 2) {
      //   this.$refs.audio.currentTime = 0;
      // }

      if (this.mode === 0 || this.mode === 2) {
        let index = this.currentPlayList.findIndex((o) => o.id === this.currentSong.id);
        let newIndex;
        switch (action) {
          case "next":
            newIndex = index >= this.currentPlayList.length - 1 ? 0 : index + 1;
            break;
          case "prev":
            newIndex = index <= 0 ? this.currentPlayList.length - 1 : index - 1;
            break;
        }
        this.currentSong = this.currentPlayList[newIndex];
      }
      // $refs.audio.play();
    },
    
  },
  watch: {
    // 保存当前歌曲到本地存储
    currentSong: function (currentSong) {
      window.localStorage.setItem("currentSong", JSON.stringify(currentSong));

      // 先置空
      this.currentLyric = null;
      // 获取对应歌词
      this.axios
        .get("lyric", {
          params: {
            id: currentSong?.id,
          },
        })
        .then((res) => {
          // console.log(res);
          this.currentLyric = res.data;
        });
    },
    // 保存列表到本地存储
    currentPlayList:function(currentPlayList){
      window.localStorage.setItem("currentPlayList", JSON.stringify(currentPlayList));
    },

    // 将当前歌词本地存储
    currentLyric: function (currentLyric) {
      window.localStorage.setItem("currentLyric", JSON.stringify(currentLyric));
    },
  },
  computed: {
    // 处理歌词
    parsedCurrentLyric: function () {
      if (!this.currentLyric) {
        return [];
      }else{
        return this.currentLyric.lrc.lyric
          .split("\n")
          .filter((o) => o)
          .map((str) => {
            var match = str.match(/\[(?<mm>\d{2}):(?<ss>\d{2}\.\d{2,3})\](?<text>.*)/);
            return {
              time: (match?.groups.mm * 60 + match?.groups.ss * 1).toFixed(3),
              text: match?.groups.text.trim() || "~~~",
            };
          });
      }
    },
    // 高亮歌词
    currentLyricIndex:function(){
      return this.parsedCurrentLyric.findLastIndex(o=>o.time <= this.currentTime);
    }
  }
}
</script>
<style lang="less">
@import url("./assets/css/minireset.css");


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  .playSongList{
    transition: all 0.5s linear;
  }
}
</style>
