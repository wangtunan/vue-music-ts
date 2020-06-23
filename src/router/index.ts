import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
const Recommend = () => import('@/views/recommend/index.vue')
const RecommendDetail = () => import('@/views/recommend-detail/detail.vue')
const Singer = () => import('@/views/singer/index.vue')
const SingerDetail = () => import('@/views/singer-detail/detail.vue')
const Rank = () => import('@/views/rank/index.vue')
const RankDetail = () => import('@/views/rank-detail/detail.vue')
const Search = () => import('@/views/search/index.vue')
const User = () => import('@/views/user/index.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    children: [
      { path: ':id', component: RecommendDetail }
    ]
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer,
    children: [
      { path: ':id', component: SingerDetail }
    ]
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank,
    children: [
      { path: ':id', component: RankDetail }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/user',
    name: 'User',
    component: User
  }
]

const router = new VueRouter({
  routes
})

export default router
