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
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700,900' }
    ]
  },
  css: [
    'sass/main.sass',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#4ECDC4', height: '4px' },

  router: {
    base: '/',
    mode : 'hash',
    middleware: ['auth', 'init'],
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'normativa',
        path: '/normativa/:id/:slug?',
        component: resolve(__dirname, 'pages/normativa/_id.vue')
      })
      routes.push({
        name: 'activar-cuenta',
        path: '/activar-cuenta/:token',
        component: resolve(__dirname, 'pages/activar-cuenta.vue')
      })
    }
  },

  modules: [
   '~/modules/mercadopago',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  mercadopago: {
    public_key: 'TEST-3683240c-494f-4a4b-b6d4-6f82b73c1952'
  },

  axios: {
    baseURL: 'https://fucer.com.ar/app/api/'
  },

  auth: {
    endpoints: {
      login: { url: 'https://www.fucer.com.ar/app/api/auth/login', method: 'post', propertyName: 'token' },
      logout: { url: 'https://www.fucer.com.ar/app/api/auth/logout', method: 'post' },
      user: { url: 'https://www.fucer.com.ar/app/api/auth/user', method: 'get', propertyName: 'user' }
    },
    redirect: {
      login: '/login',
      home: '/'
    }
  },

  plugins: [
    '~/plugins/filtros',
    '~/plugins/vue-validate',
    '~/plugins/axios',
    { src: '~plugins/actualizar-datos-usuario', ssr: false }
  ],

  /*
  ** Build configuration
  */
  build: {

    publicPath : '/nuxt/',

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