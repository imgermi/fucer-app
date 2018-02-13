module.exports = {

  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | Fucer app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Fucer App' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' }
    ]
  },
  css: [
    'sass/main.sass',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#224B8E', height: '4px' },

  router: {
    base: '/app/',
    middleware: ['auth'],
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'normativa',
        path: '/normativa/:id/:slug?',
        component: resolve(__dirname, 'pages/normativa/_id.vue')
      })
    }
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  auth: {
    endpoints: {
      login: { url: 'http://www.fucer.com.ar/app/api/auth/login', method: 'post', propertyName: 'token' },
      logout: { url: 'http://www.fucer.com.ar/app/api/auth/logout', method: 'post' },
      user: { url: 'http://www.fucer.com.ar/app/api/auth/user', method: 'get', propertyName: 'user' }
    },
    redirect: {
      login: '/login',
      home: '/inicio'
    }
  },

  plugins: [
    '~/plugins/filtros',
    '~/plugins/vue-validate'
  ],

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
    }
  }
}
