<template>
    <div class="recommend">
        <HomeTitle>编辑推荐</HomeTitle>
        <ul class="personalizeds">
            <HomeCard v-for="item in personalizeds.slice(0, 6)" :key="item.id" :item="item" />
        </ul>
        <HomeTitle>最新音乐</HomeTitle>
        <ul>
            <SongItem 
            v-for="songItem in newsongs" 
            :key="songItem.id" 
            :song="songItem" 
            :currentSongId="currentSongId"
            :paused="paused"
            @updata:currentSong="
          $emit('updata:currentSong', { currentSong: $event, currentPlayList: newsongs })"
            ></SongItem>
            <!-- @updata:currentSong="$emit('updata:currentSong', $event)" -->
            <!-- @updata:songList="$emit('updata:songList',newsongs)" -->
        </ul>
        <!-- <div class="logoNav">
            <div class="centerLogo">
                <img src="../assets/imgs/big_logo.png" alt="">
                <h3>网易云音乐</h3>
            </div>
            <div class="downloadAppBtn">
                <a href="">打开APP,发现更多好音乐 ></a>
            </div>
        </div> -->
    </div>
</template>

<script>
import HomeCard from '../components/HomeCard.vue';
import HomeTitle from '../components/HomeTitle.vue';
import SongItem from '../components/SongItem.vue';
export default {
    name: 'HomeRecommend',
    props: ["currentSongId", "paused"],
    data() {
        return {
            personalizeds: [],
            newsongs: [],
        }
    },
    components: {
        HomeTitle,
        HomeCard,
        SongItem,
    },
    created() {
        Promise.all([
            this.axios.get("personalized"),
            this.axios.get("personalized/newsong"),
        ]).then(
            ([
                {
                    data: { result: personalizeds },
                },
                {
                    data: { result: newsongs },
                },
            ]) => {
                // console.log(personalizeds, newsongs);
                // console.log( newsongs);
                console.log( newsongs);
                this.personalizeds = personalizeds.sort(()=> Math.random()-0.5);
                this.newsongs = newsongs;
            }
        );
    }
}
</script>

<style lang="less" scoped>
    // .recommend{
    //     margin-top: 140px;
    // }
    .personalizeds{
        display: flex;
        flex-wrap: wrap;
    }
    .logoNav{
        margin-top: 2px;
        width: 375px;
        height: 200px;
        display: flex;
        flex-direction: column;
        
        background: url(../assets/imgs/recommand_bg_2x.png) no-repeat center center;
        .centerLogo{
            display: flex;
            width: 100%;
            height: 55%;
            justify-content: center;
            align-items: center;
            img{
               width: 44px; 
               height: 44px;
            }
            h3{
                color: #333;
                font-size: 32px;

            }
        }
        .downloadAppBtn{
            border: 1px solid #dd001b;
            // width: 75%;
            border-radius: 150px;
            margin: 0 auto;
            a{
                text-align: center;
                color: #dd001b;
                text-decoration: none;
                padding: 15px 55px;
                display: block;
            }
        }
    }
</style>