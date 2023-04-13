import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeNav from '../views/HomeNav.vue'
import HomeRecommend from '../views/HomeRecommend.vue'
import HomeHot from '../views/HomeHot.vue'
import HomeSearch from '../views/HomeSearch.vue'
import PlayList from "../views/PlayList.vue";
import Song from "../views/Song.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeNav,
    children:[
      {path:'',component:HomeRecommend,},
      {path:'hot',component:HomeHot,},
      {path:'search',component:HomeSearch,},
    ]
  },
  {
    path: "/playlist",
    component: PlayList,
  },
  {
    path: "/song",
    component: Song,
    meta:{hidePlayBar:true},
  },
]

const router = new VueRouter({
  routes
})

export default router
