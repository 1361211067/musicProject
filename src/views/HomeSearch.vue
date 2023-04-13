<template>
    <div class="searchNav">
        <header>
            <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model.trim="text" @focus="focusHandle"
                @keyup.enter="getSearchSongs(text)" />
            <span v-show="text" @click="text = ''"></span>
        </header>
        <section class="loading" v-show="isSuggestLoading || isSeachLoading">
            <img src="data:image/gif;base64,R0lGODlhKAAoAIABANM6Mf///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI2QURFODRFRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI2QURFODRGRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjZBREU4NENGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjZBREU4NERGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJCgABACwAAAAAKAAoAAACeIyPqcvtD6OctNoD8rUZ7Np9VChKZAmdqKOuTOsqcIzMtGHfuaxxfbRrBGu/UfExXCRxxwRsGdg9m0IqpgmVYq1KbnTrMXmnYeAYzCtf1em2E11lf+VkFpxIP+f37td93dfF9zboVwhIaHfItJjoiBd4IzlJWalQAAAh+QQJCgABACwAAAAAKAAoAAACfIyPqcvtD6OctNqLs94WeB55AAiJ5GOeTaoubJu8nBzQGm0zuYF/0l7zIYAxocvIQzqAvVHROVRGoYemgqm0PpfZLjX53YqnV2nVWw5j1ejxkQ1Pc+Nu8FxeD4bJea2uzRf4hidotwJ4RvenmEg42IfoaFioB2N5iZmZUAAAIfkECQoAAQAsAAAAACgAKAAAAn+Mj6nL7Q+jnLRaCPK1GezafVTIaRIJmhE6qpg7sY98wg692g3+egnNm9mAup6C6EslD8hL8zcsGp4I6sI6jS6PWu42EAR3od8wVlyWor1s8m1chV/l2fQ3bm/j33m3n3F2tvfHREdYp1d4p5iIePgYqBbZB2goKIKZqbnJ+VAAACH5BAUKAAEALAAAAAAoACgAAAJ8jI+py+0PIwRUWkbB3Sjz731bKFpkGZ1mJaktm8KX29CT/Ng57ug9XwPeNC/iSLjwBY1DEFKhxDwTLl/0UH1eDVkmlNf9eqng8thqFquX606aTT6/pfJ6OznH5u/cfQBtF8cnSOgWSDcYBmeYqOWniFiod4hSaXmJmWlRAAA7"
                alt="" />
        </section>

        <ul class="suggests" v-show="isNeedSuggest && text">
            <li v-for="(item, index) in suggests" :key="index" @click="suggestClickHandler(item.keyword)">
                <span class="icon"></span>{{ item.keyword }}
            </li>
        </ul>
        <ul class="songs" v-show="!isNeedSuggest && text">
            <SongItem v-for="(item, index) in searchSongs" 
            :key="index" 
            :song="item" 
            :text="text"
            :currentSongId="currentSongId"
            :paused="paused"
            :showNav="showNav"
            @updata:currentSong="
          $emit('updata:currentSong', { currentSong: $event, currentPlayList: [] })"
            ></SongItem>
            <!-- @updata:songList="$emit('updata:songList',[])" -->
        </ul>
        <!-- 热门搜索 -->
        <section class="hotSearch" v-show="!text">
            <h3>热门搜索</h3>
            <ul class="hots">
                <li v-for="(hot, index) in hots" :key="index" @click="
                    suggestClickHandler(hot.first);
                isSuggestLoading = false;
                  ">
                    {{ hot.first }}
                </li>
            </ul>            
            <!-- 历史记录 -->
            <section class="history" v-show="history?.length != 0">
                <ul>
                    <!-- 可用ref="historyLi" -->
                    <li v-for="item,index in history" >
                        <span class="clockIcon"></span>
                        <div class="right">
                            <span class="keyWord" @click="sendSearchSongs(item)">{{ item }}</span>
                            <span class="close" @click="delHistory(index)"></span>
                        </div>
                    </li>
                </ul>
            </section>
        </section>
    </div>
</template>


<script>
import SongItem from '../components/SongItem.vue';
// import SongItem3 from '../components/SongItem3.vue';
export default {
    components: {
        // SongItem3,
        SongItem,
    },
    props: ["currentSongId", "paused"],
    data: function () {
        return {
            hots: [],
            text: "",
            showNav:'search',
            suggests: [],
            isNeedSuggest: false,
            searchSongs: [],
            isSuggestLoading: false,
            isSeachLoading: false,
            history: JSON.parse(window.localStorage.getItem("historys")) || [
            // '薛之谦','毛不易'
            ],
        };
    },
    created() {
        // 获取热门搜索
        this.axios.get("https://apis.netstart.cn/music/search/hot").then((res) => {
            // console.log(res);
            this.hots = res.data.result.hots;
        });

    },

    methods: {
        //点击处理历史事件
        sendSearchSongs(text){
            // console.log(text);
            this.text = text;
            this.getSearchSongs(text);
        },
        // 删除历史记录
        delHistory(index){
            // console.log(index);
            // console.log(this.$refs.historyLi);
            // console.log(this.$refs.historyLi[index]);
            this.history = this.history.filter((item,i)=>{
                return i != index;
            })
        },
        // 聚焦事件
        focusHandle: function () {
            this.isNeedSuggest = true;
            this.searchSongs = [];
            this.text && this.getSuggests(this.text);
        },
        // 点击建议触发事件
        suggestClickHandler: function (text) {
            //   console.log(text);
            //   隐藏建议
            this.isNeedSuggest = false;
            //   清空建议
            this.suggests = [];
            //   文字上屏
            this.text = text;
        },
        // 获取建议
        getSuggests: function (text) {
            //   console.log(this.isSuggestLoading);
            this.isSuggestLoading = true;
            this.axios
                .get("https://apis.netstart.cn/music/search/suggest", {
                    params: {
                        keywords: text,
                        type: "mobile",
                    },
                })
                .then((res) => {
                    console.log('getSuggests res', res);
                    if (this.text === text) {
                        this.suggests = res.data.result.allMatch;
                    }
                })
                .finally(() => {
                    this.isSuggestLoading = false;
                });
        },
        // 获取结果
        getSearchSongs: function (text) {
            // 置空
            this.isNeedSuggest = false;
            this.suggests = [];
            this.searchSongs = [];
            this.isSeachLoading = true;
            if(this.history.indexOf(text) == -1){
                this.history = [text,...this.history];
                // this.history=this.history;
            }
            // console.log(1111);
            this.axios
                .get("https://apis.netstart.cn/music/search", {
                    params: {
                        keywords: text,
                    },
                })
                .then((res) => {

                    //   console.log(res);
                    console.log('searchSongs res', res.data.result.songs);
                    this.searchSongs = res.data.result.songs;
                })
                .finally(() => {
                    this.isSeachLoading = false;
                });
        },
    },
    watch: {
        text: function (text) {
            //   console.log(text);

            if (text) {
                if (this.isNeedSuggest) {
                    this.getSuggests(text);
                    this.searchSongs = [];
                } else {
                    this.getSearchSongs(text);
                }
            } else {
                this.suggests = [];
            }
        },
        history:function(newValue){
            window.localStorage.setItem("historys", JSON.stringify(newValue));
        }
    },
};
</script>

<style lang="less" scoped>

header {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==");
    background-repeat: no-repeat;
    background-size: auto 40%;
    background-position: 10px center;
    background-color: rgba(228, 228, 228, 0.619);
    padding-left: 30px;
    padding-right: 10px;
    border-radius: 40px;
    height: 30px;
    margin: 15px;
    display: flex;
    //   justify-content: ;
    align-items: center;

    input {
        width: 100%;
        line-height: 30px;
        border: none;
        outline: none;
        background-color: transparent;
    }

    span {
        width: 15px;
        height: 15px;
        display: block;
        margin-left: 20px;
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==") no-repeat;
        background-size: 100%;
    }
}

.loading {
    border-top: 1px solid #f4f5f6;
    display: flex;
    justify-content: center;
}

.hotSearch {
    border-top: 1px solid #f4f5f6;
    padding: 0 5px;
    padding-top: 10px;

    h3 {
        color: #666;
        font-size: 12px;
        margin-bottom: 5px;
    }

    .hots {
        display: flex;
        flex-wrap: wrap;

        li {
            border: 1px solid #e7e8eb;
            padding: 8px 10px;
            text-align: center;
            margin: 5px;
            border-radius: 50px;
        }
    }
}

.suggests {
    li {
        display: flex;
        border-top: 1px solid #f4f5f6;
        line-height: 45px;
        align-items: center;
        padding-right: 10px;
        font-size: 15px;
        color: #333;

        .icon {
            background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==") no-repeat;
            width: 15px;
            height: 15px;
            display: block;
            margin: 5px;
            margin-left: 10px;
        }
    }
}

.history {
    width: 100%;
    margin-top: 10px;
    li {
        display: flex;
        height: 45px;
        // background-color: aqua;
        align-items: center;
        .clockIcon {
            width: 15px;
            height: 15px;
            margin: 0 10px;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+);
        }
        .right{
            height: 45px;
            border-bottom: 1px solid #f4f5f6;
            display: flex;
            align-items: center;
            width: 85%;
            justify-content: space-between;
        .keyWord{
            font-size: 14px;
            color: #333;
            width: 100%;
            margin-right: 10px;
        }
        .close{
            display:block;
            width: 12px;
            height: 12px;
            margin-left: 2px;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=);
        }
       }

    }
}</style>