module.exports = {

  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | Legister',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Consulte el contenido de la normativa aplicable a la registración de automotores - Legislación Técnico Registral' }
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
    base: '/app/',
    middleware: ['sesiones-simultaneas','auth', 'init'],
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
      routes.push({
        name: 'nueva-clave',
        path: '/nueva-clave/:token',
        component: resolve(__dirname, 'pages/nueva-clave.vue')
      })
    }
  },

  modules: [
   '~/modules/mercadopago',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  mercadopago: {
    public_key: 'TEST-3fbb4c1c-0fc8-4e26-8519-043ab9bcd868'
  },

  axios: {
    baseURL: 'https://fucer.com.ar/app/api/'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'https://www.fucer.com.ar/app/api/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: 'https://www.fucer.com.ar/app/api/auth/logout', method: 'post' },
          user: { url: 'https://www.fucer.com.ar/app/api/auth/user', method: 'get', propertyName: 'user' },
          refreshToken: { url: 'https://www.fucer.com.ar/app/api/auth/refresh-token', method: 'get', propertyName: 'token' }
        },
        redirect: {
          login: '/login',
          logout: '/',
          callback: '/login',
          user: '/'
        },
        refresh_token_key: 'refresh_token'
      }
    }
  },

  plugins: [
    '~/plugins/filtros',
    '~/plugins/vue-validate',
    { src: '~plugins/actualizar-datos-usuario', ssr: false }
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
