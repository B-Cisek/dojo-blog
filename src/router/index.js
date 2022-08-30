import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailsView from "@/views/DetailsView"
import CreateView from "@/views/CreateView";
import TagView from "@/views/TagView";
import RealTimeView from "@/views/RealTimeView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/posts/:id',
    name: 'details',
    component: DetailsView,
    props: true
  },
  {
    path: '/create',
    name: 'create',
    component: CreateView
  },
  {
    path: '/tags/:tag',
    name: 'tag',
    component: TagView,
    props: true
  },
  {
    path: '/realtime',
    name: 'realTime',
    component: RealTimeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
