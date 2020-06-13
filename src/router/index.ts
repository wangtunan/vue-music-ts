import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
const Recommend = () => import('@/views/recommend/index.vue')
const Singer = () => import('@/views/singer/index.vue')
const Rank = () => import('@/views/rank/index.vue')
const Search = () => import('@/views/search/index.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
