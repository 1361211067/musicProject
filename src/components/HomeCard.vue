<template>
    <li class="home-card" @click="$router.push({ path: '/playlist', query: { id: item.id } })">
        <div class="thumb">
            <img :src="item.picUrl + '?imageView=1&type=webp&thumbnail=247x0'" alt="">
            <span><i class="u-erp"></i>{{ getNumber(item.playCount) }}</span>
        </div>
        <p class="text">{{ item.name }}</p>
    </li>
</template>

<script>
export default {
    name: 'HomeCard',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        getNumber(num) {
            let str = ''
            let yi = 100000000;
            let wan = 10000;
            if (num / yi >= 1) {
                let n = (num / yi);
                if(n.toFixed(1) % n.toFixed(0) > 0){
                    str = n.toFixed(1)  + "亿"
                }else{
                    str = n.toFixed()  + "亿"
                }
            } else if (num / wan >= 1) {
                let n = (num / wan);
                if(n.toFixed(1) % n.toFixed() > 0){
                    str = n.toFixed(1)  + "万"
                }else{
                    str = n.toFixed()  + "万"
                }
            } else {
                str = num;
            }
            return str;
        }
    }
};
</script>

<style lang="less" scoped>
.home-card {
    width: 30%;
    flex-grow: 1;
    margin-bottom: 10px;

    //  每行三个，取中间的
    &:nth-child(3n+2) {
        margin: 0 3px;
    }

    .thumb {
        position: relative;
        span {
            display: flex;
            .u-erp {
                width: 14px;
                height: 14px;
                margin-top: 1px;
                margin-right: 2px;
                background: url(../assets/imgs/ear.svg) no-repeat;
            }
            position: absolute;
            font-size: 12px;
            top: 2px;
            right: 4px;
            color: #fff;
            z-index: 3;
            text-shadow: 1px 0 0 rgba(0, 0, 0, .15);
        }
    }

    .text {
        color: #333;
        font-size: 13px;
        padding: 6px 4px 0 6px;
        overflow: hidden;
        /* 纯英文换行 */
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        /* 这里是超出几行省略 */
        -webkit-line-clamp: 2;
    }
}</style>