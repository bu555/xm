module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel: 'stylesheet', href:   '/css/common.css'},
      {rel: 'stylesheet', href:   '/css/element-index.css'},
      {rel: 'stylesheet', href:   '/css/bootstrap.min.css'},
    ],
    script: [
      {type: 'text/javascript', src:'/js/jquery.min.js'},
      {type: 'text/javascript', src:'/js/wangEditor.js'},
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  css: [
    // 'element-ui/lib/theme-chalk/display.css'
  ],

  
  // mode:'spa', // or universal


  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
　　vendor: [
      '~/plugins/axios', 
      '~/plugins/utils',
      // '~/plugins/wangEditor',
      '~/plugins/vue-cropper',
      '~/plugins/element-ui',
    ],
  },
　plugins: [
    { src: '~/plugins/axios'},
    { src: '~/plugins/utils'},
    { src: '~/plugins/element-ui',ssr:false},
    // { src: '~/plugins/wangEditor', ssr: false },
    { src: '~/plugins/vue-cropper', ssr: false },
    // { src: '~/plugins/jquery'},
    // { src: '~/plugins/editor'},
    // { src: '~/plugins/moment',ssr:false},
    { src: '~/plugins/font-awesome',ssr:false},
  ],




  
  
  modules: [
    // Simple usage
    // '@nuxtjs/axios',
     '@nuxtjs/proxy',
  ],
  axios:{
    proxy: true
  },
  proxy: {
      '/apis': {
        target: 'https://stage.oopsdaily.com',
        pathRewrite: { '^/apis': '' },
        // changeOrigin: true
      },
  },



}
