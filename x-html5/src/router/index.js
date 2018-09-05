import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index'

import css from '@/components/css/css'
import css_font from '@/components/css/css_font'
import css_font_baiyu from '@/components/css/css_font_baiyu'
import css_loading from '@/components/css/css_loading'
import css_ribbon from '@/components/css/css_ribbon'
import css_imgs from '@/components/css/css_imgs'
import css_buttons from '@/components/css/css_buttons'
import css_biantiezhi from '@/components/css/css_biantiezhi'

import animation from '@/components/animation/animation'
import animation_cluster from '@/components/animation/animation_cluster'

import comp from '@/components/comp/comp'
import comp_nav from '@/components/comp/comp_nav'

import node from '@/components/node/node'
import node_module from '@/components/node/node_module'
import node_mongoose from '@/components/node/node_mongoose'



Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: index,
    },

    {path: '/css', component: css},
    {path: '/css/font', component: css_font},
    {path: '/css/font_baiyu', component: css_font_baiyu},
    {path: '/css/loading', component: css_loading},
    {path: '/css/ribbon', component: css_ribbon},
    {path: '/css/imgs', component: css_imgs},
    {path: '/css/buttons', component: css_buttons},
    {path: '/css/biantiezhi', component: css_biantiezhi},

    {path: '/animation', component: animation},
    {path: '/animation/cluster', component: animation_cluster},

    {path: '/comp', component: comp},
    {path: '/comp/nav', component: comp_nav},

    {path: '/node', component: node},
    {path: '/node/module', component: node_module},
    {path: '/node/mongoose', component: node_mongoose},
  ]
})
