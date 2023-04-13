<template>
  <div class="my-play-list" @click="$parent.showMyPlayList = false">
    <ul class="list">
      <div class="titleNav">
        <span class="title">当前歌单</span>
      </div>
      <SongItem v-for="songItem, index in currentPlayList" :key="songItem.id" :song="songItem"
        :currentSongId="currentSongId" :paused="paused" :showNav="'list'" :hot="'gery'" @updata:currentSong="
          $emit('updata:currentSong', { currentSong: $event })"></SongItem>

    </ul>
  </div>
</template>

<script>
import SongItem from "./SongItem.vue";
export default {
  name: 'PlayList',
  props: ["currentPlayList", "currentSongId", "paused"],
  components: {
    SongItem
  }
}
</script>

<style lang="less" scoped>
.my-play-list {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.319);
  z-index: 999;

  .list {
    position: relative;

    .titleNav {
      position: sticky;
      top: 0;
      background-color: #fff;

      .title {
        padding: 5px 0;
        color: #333;
        font-weight: bold;

        font-size: 20px;
        display: block;
        text-align: center;
      }
    }
    border-radius: 15px 15px 0 0;
    // background: lightcoral;
    background-color: #fff;
    height: 70vh;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-top: 30vh;
    // margin-bottom: 10vh;
  }
}</style>