export default {
  ssr: true,

  target: "static",

  components: true,

  modern: true,

  generate: {
    fallback: "404.html",
    devtools: true,
  },

  /*
   ** Headers of the page
   */
  head: {
    title: "La normativa registral, en una base de datos única en el país",
    titleTemplate: "%s | FucerNet",
    htmlAttrs: {
      lang: "es",
    },
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "FucerNet es una herramienta digital en la que encontrará el texto completo de las principales Disposiciones complementarias y Circulares aclaratorias del Digesto, con un breve resumen del contenido de las mismas, y diversos artículos de doctrina y jurisprudencia.",
      },
      { name: "msapplication-TileColor", content: "#2b5797" },
    ],
    link: [
      /* eslint-disable-next-line sonarjs/no-duplicate-string */
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://api-js.mixpanel.com" },
      { rel: "preconnect", href: "https://cdn.jsdelivr.net" },
    ],
  },

  css: ["sass/main.sass"],

  loading: { color: "#4ECDC4", height: "4px" },

  // https://github.com/Developmint/nuxt-webfontloader
  webfontloader: {
    custom: {
      families: ["Lora:n4,n7", "Lato:n4,n7,n9"],
      urls: [
        "https://fonts.googleapis.com/css?family=Lora:400,700&display=swap",
        "https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap",
      ],
    },
  },

  pwa: {
    // https://pwa.nuxtjs.org/modules/manifest.html
    manifest: {
      theme_color: "#204A42",
      lang: "es",
    },

    // https://pwa.nuxtjs.org/modules/meta.html
    meta: {
      theme_color: "#204A42",
      lang: "es",
    },

    // https://pwa.nuxtjs.org/modules/icon.html
    icons: {},

    // https://pwa.nuxtjs.org/modules/workbox.html
    workbox: {
      pagesURLPattern: "/|offline",
      runtimeCaching: [
        {
          urlPattern: "(?!/api/auth/.*)(^/api/.*)",
          handler: "networkFirst",
          strategyOptions: {
            cacheName: "fucer-api",
            networkTimeoutSeconds: 4,
            cacheExpiration: {
              maxEntries: 250,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern:
            "^https://((www.)?fucer.com.ar/app|net.fucer.com.ar)/cms/.*",
          handler: "cacheFirst",
          strategyOptions: {
            cacheName: "fucer-cms",
            cacheExpiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 10,
              purgeOnQuotaError: true,
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: "^https://fonts.googleapis.com",
          handler: "staleWhileRevalidate",
          strategyOptions: {
            cacheName: "google-fonts-stylesheets",
          },
        },
        {
          urlPattern: "^https://fonts.gstatic.com",
          handler: "cacheFirst",
          strategyOptions: {
            cacheName: "google-fonts-webfonts",
            cacheExpiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 365,
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
      routingExtensions: "@/plugins/workbox-routing-extension.js",
    },
  },

  router: {
    base: "/",
    mode: "history",
    middleware: ["sesiones-simultaneas", "auth"],
    extendRoutes(routes) {
      routes.splice(
        0,
        routes.length,
        ...routes.map((route) => {
          switch (route.name) {
            case "normativa-id":
              return {
                ...route,
                name: "normativa",
                path: "/normativa/:id/:slug?",
              };

            case "activar-cuenta":
              return {
                ...route,
                path: "/activar-cuenta/:token",
              };

            case "nueva-clave":
              return {
                ...route,
                path: "/nueva-clave/:token",
              };
            default:
              return route;
          }
        })
      );
    },
  },

  buildModules: [
    // "~/modules/pwa-extension.js",
    "@nuxtjs/pwa",
  ],

  modules: ["@nuxtjs/auth", "@nuxtjs/axios", "nuxt-webfontloader"],

  axios: {
    baseURL: `${
      process.env.DEPLOY_PRIME_URL || "https://net.fucer.com.ar"
    }/api/`,
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/auth/login", method: "post", propertyName: "token" },
          logout: { url: "/auth/logout", method: "post" },
          user: { url: "/auth/user", method: "get", propertyName: "user" },
          refreshToken: {
            url: "/auth/refresh-token",
            method: "get",
            propertyName: "token",
          },
        },
        refresh_token_key: "refresh_token",
      },
    },
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/login",
      home: "/inicio",
    },
    cookie: {
      options: {
        domain: process.env.DEPLOY_PRIME_URL
          ? process.env.DEPLOY_PRIME_URL.replace("https://", "")
          : "net.fucer.com.ar",
        secure: process.env.NODE_ENV === "production",
        samesite: process.env.NODE_ENV !== "production" ? "None" : "Strict",
      },
    },
    plugins: ["~/plugins/auth.js", "~/plugins/workbox.js"],
  },

  plugins: [
    "~/plugins/axios",
    "~/plugins/api",
    "~/plugins/focus",
    { src: "~/plugins/announcer", mode: "client" },
    "~/plugins/filtros",
    "~/plugins/vue-validate",
    "~/plugins/sentry",
    { src: "~/plugins/utils", mode: "client" },
    // { src: "~/plugins/axe", mode: "client" },
    "~plugins/actualizar-datos-usuario",
    "~/plugins/mixpanel",
  ],

  /*
   ** Build configuration
   */
  build: {
    devtools: true,

    transpile: ["vee-validate"],
    /*
     ** Run ESLint on save
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
