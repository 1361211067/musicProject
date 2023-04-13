<template>
    <section class="home">
        <div class="topBar">
            <div class="topNav">
                <span>
                    <img src="../assets/imgs/small_logo.png" alt="">
                    网易云音乐
                </span>
                <div><a class="download" href="">下载APP</a></div>
            </div>
            <nav class="topMenu">
                <router-link to="/">推荐音乐</router-link>
                <router-link to="/hot">热歌榜</router-link>
                <router-link to="/search">搜索</router-link>
            </nav>
        </div>
        <router-view 
        :currentSongId="currentSong?.id"
        :paused="paused" 
        @updata:currentSong="$emit('updata:currentSong', $event)"
        ></router-view>
        <!-- @updata:songList="$emit('updata:songList', $event)" -->
    </section>
</template>

<script>

export default {
    name: 'HomeNav',
    props: ["currentSong", "paused"],
    data() {
        return {

        }
    },

}
</script>

<style lang="less" scoped>
a {
    text-decoration: none;
}

.topBar {
    width: 100vw;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999;
}
// .home{
//     margin-top: 128px;
// }

.topNav {
    padding: 0 10px;
    display: flex;
    background-color: #d43c33;
    flex-direction: row;
    justify-content: space-between;
    height: 84px;
    line-height: 84px;

    span {
        display: flex;
        align-items: center;
        img {
            display: block;
            width: 40px;
            height: 40px;
            margin-right: 10px;
        }

        font-size: 18px;
        letter-spacing: 0.1em;
        color: #fff;
    }

    .download {
        background-color: #fff;
        border-radius: 18px;
        padding: 8px 18px;
        color: #d43c33;
    }

}


.topMenu {
    display: flex;
    justify-content: space-around;
    box-shadow: 0 0 0 1px #ebebeb;
    height: 40px;
    background-color: #fff;

    a {
        color: #333;
        text-decoration: none;
        line-height: 40px;

        &.router-link-exact-active {
            color: #d43c33;
            border-bottom: 3px solid #d43c33;
        }
    }
}</style>