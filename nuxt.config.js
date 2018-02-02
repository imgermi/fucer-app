module.exports = {
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
  loading: { color: '#3B8070' },
  /*
  ** VueRouter
  */
  router: {
    routes: [
      { path: '/inicio', name: 'inicio' },
      { path: '/buscar', name: 'buscar' },
      { path: '/favoritas', name: 'favoritas' },
      { path: '/configuracion', name: 'configuracion' },
      { path: '/', name: 'index' },
      { path: '/confirme-su-email', name: 'confirme-su-email' },
      { path: '/login', name: 'login' },
      { path: '/registro', name: 'registro' },
      { path: '/bienvenido', name: 'bienvenido' },
      { path: '/normativa', name: 'normativa' },
    ]
  },
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
