<template>
    <div class="SongComment">
        <div class="userImg">
            <img :src="com.user.avatarUrl| parseImageUrl" alt="">
        </div>
        <div class="content">
            <span class="userName">{{ com.user.nickname }}</span>
            <span class="date">{{ getDate(com?.time) }}</span>
            <p class="text">{{ com.content }}</p>
        </div>
        <div>
            <span class="like">
                <span>{{ com.likedCount }}</span>
                <div class="good">
                    <svg class="u-svg u-svg-unzancmt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path fill="#999" d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"></path></svg>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
    export default{
        name:'SongComment',
        props:['com'],
        methods:{
            getDate(number){
                let date = new Date(number);
                let y = date.getFullYear()+'年';
                let m = date.getMonth()+1+'月';
                let d = date.getDate()+'日';
                // console.log(y+m+d);
                return y+m+d;
            }
        }
    }
</script>

<style lang="less" scoped>
    .SongComment{
        display: flex;
        justify-content: space-around;
        // align-items: center;
        border-bottom: 1px #f5f5f5 solid;
        padding: 0 10px 11px 0;
        .userImg{
            width: 35px;
            margin: 4px 6px;
            img{
                width: 100%;

                border-radius: 50%;
            }
        }
        .content{
            width: 75%;
            display: flex;
            flex-direction: column;
            .userName{
                color: #666;
                font-size: 14px;
            }
            .date{
                color: #999;
                font-size: 12px;
            }
            .text{
                color: #333;
                font-size: 15px;
            }
        }
        .like{
            margin-top: 5px;
            display: flex;
            align-items:first baseline;
            color: #888;
            .good{
                margin-left: 5px;
                width: 20px;
                height: 20px;
            }
        }
    }
</style>