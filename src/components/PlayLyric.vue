<template>
    <div class="playLyric">
        <div class="lyricPage">
            <ul class="lyricList" ref="list" :style="{
                top:
                    listItemHeights[currentLyricIndex - 4] * (-1) +
                    'px',
            }">
                <li v-for="(item, index) in parsedCurrentLyric" :key="index"
                    :class="{ active: index === currentLyricIndex }">{{
                        item.text }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayLyric',
    props: ['parsedCurrentLyric', 'currentLyricIndex'],
    data() {
        return {
            listItemHeights: []
        }
    },
    watch: {
        parsedCurrentLyric: {
            handler: function () {
                this.$nextTick(function () {
                    //   console.log(this.$refs.list.querySelectorAll("li"));
                    this.listItemHeights = [...this.$refs.list.querySelectorAll("li")].map(
                        (el) => el.offsetTop
                    );
                    console.log(this.parsedCurrentLyric);
                });
            },
            immediate: true,
        },
    },
    computed: {
        getActiveTime() {
            console.log();
            return this.parsedCurrentLyric[this.currentLyricIndex + 1].time - this.parsedCurrentLyric[this.currentLyricIndex].time
        }
    }
}
</script>

<style lang="less" scoped>
.lyricList {
    transition: all 0.3s;
    position: absolute;
    top: 0;
    width: 100%;

    li {
        display: flex;
        text-align: center;
        justify-content: center;
        margin: 5px;

        &.active {
            color: #F5E0A3;
            // color: rgba(212, 212, 212, 0.059);
            font-size: 18px;
        }

    }

}
</style>