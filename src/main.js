import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

/*
 <!-- 接口地址
  
  推荐歌单 https://apis.netstart.cn/music/personalized
  最新歌曲 https://apis.netstart.cn/music/personalized/newsong

  歌单详情 https://apis.netstart.cn/music/playlist/detail?id=596729952
  歌单评论 https://apis.netstart.cn/music/comment/playlist?id=596729952

  所有榜单 https://apis.netstart.cn/music/toplist
  榜单详情 https://apis.netstart.cn/music/playlist/detail?id=排行榜id
  热歌榜 https://apis.netstart.cn/music/playlist/detail?id=3778678

  热门搜索 https://apis.netstart.cn/music/search/hot
  搜索建议 https://apis.netstart.cn/music/search/suggest?keywords=%E4%BB%96&type=mobile
  搜索单曲 https://apis.netstart.cn/music/search?keywords=%E4%BB%96%E4%B8%8D%E6%87%82
  搜索专辑和歌手 https://apis.netstart.cn/music/search/multimatch?keywords=%E4%BB%96%E4%B8%8D%E6%87%82
  
   -->
*/


Vue.filter("parseImageUrl", function (url) {
  return url ? url + "?imageView=1&type=webp&thumbnail=247x0" : "";
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
