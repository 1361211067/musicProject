<template>
    <div class="play-bar" :class="{ playing: !paused }">
        <img class="thumb" 
        :src="(currentSong?.picUrl || currentSong?.al?.picUrl) | parseImageUrl" 
        alt="" />
        <h3>
            <span class="songName"> {{ currentSong.name }}</span>
            <div  class="artist">
                <span>{{ getArts(currentSong?.song?.artists || currentSong?.ar) }}</span>
                <!-- <span v-for="artist in currentSong?.song?.artists || currentSong?.ar||currentSong?.artists" :key="artist.id">{{ artist.name }}</span> -->
            </div>
        </h3>

        <span class="btn play" v-if="paused" @click.stop="$emit('play-song')"></span>
        <span class="btn paused" v-else @click.stop="$parent.$refs.audio.pause()"></span>
        <span class="listBtn">🗨</span>
    </div>
</template>

<script>
export default {
    name: 'PlayBar',
    props: ["currentSong", "paused"],
    methods:{
        getArts(arr) {
            let str ='';
           if(arr){
            for(let i=0;i<arr.length;i++){
                str += arr[i].name;
                if(i<arr.length-1){
                    str += ' / ';
                }
            }
           }else{
                return ;
            }
            return str;
        },
    },
}
</script>


<style lang="less" scoped>
.play-bar {
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100vw;
    background-color: #252525e0;
    display: flex;
    // height: 60px;
    align-items: center;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.263);
    padding: 15px;
    justify-content: space-between;

    .thumb {
        width: 40px;
        border-radius: 50%;
        animation: myrotate 8s linear infinite;
        animation-play-state: paused;
        box-shadow: 0px 0px 5px #a9a9a994;
    }

    h3 {
        margin-left: 10px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        .songName{
            font-size: 16px;
            color: #e0e0e0;
        }
        span{
            color: #999999;
            font-size: 12px;
        }
    }
    .btn{
        width: 40px;
        height: 40px;
        display: block;
        cursor: pointer;
    }
    .play{
        background: url(../assets/imgs/play.png) no-repeat center center;
        background-size: 100%;
    }
    .paused{
        background: url(../assets/imgs/paused.png) no-repeat center center;
        background-size: 100%;
    }

    &.playing {
        .thumb {
            animation-play-state: running;
        }
    }
}
</style>