import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import css3 from '@/components/css3/css3'
import css3_font from '@/components/css3/css3_font'
import css3_loading from '@/components/css3/css3_loading'
import css3_ribbon from '@/components/css3/css3_ribbon'
import css3_imgs from '@/components/css3/css3_imgs'

import animation from '@/components/animation/animation'
import animation_cluster from '@/components/animation/animation_cluster'

import comp from '@/components/comp/comp'
import comp_nav from '@/components/comp/comp_nav'



Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    {path: '/css3', component: css3},
    {path: '/css3/font', component: css3_font},
    {path: '/css3/loading', component: css3_loading},
    {path: '/css3/ribbon', component: css3_ribbon},
    {path: '/css3/imgs', component: css3_imgs},

    {path: '/animation', component: animation},
    {path: '/animation/cluster', component: animation_cluster},

    {path: '/comp', component: comp},
    {path: '/comp/nav', component: comp_nav},
  ]
})
