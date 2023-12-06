export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'my-quiz-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/http', 

  ],
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
        },
      },
    },
  },
  http: {
    baseURL: 'http://localhost:3001', // Substitua pela URL do seu servidor de autenticação
  },

  build: {
    dir: 'dist',
    quiet: false,
    optimizeCSS: true,
    minimize: true,
    extractCSS: true,
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
  },
  mode: 'universal',

  server: {
    host: '0.0.0.0', 
    port: process.env.PORT || 3000,
  },


  router: {
    middleware: ['auth'], 
  
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'login',
          path: '/login',
          component: resolve(__dirname, 'pages/login.vue'),
        },
        {
          name: 'register',
          path: '/register',
          component: resolve(__dirname, 'pages/register.vue'),
        },
        {
          name: 'quiz',
          path: '/quiz',
          component: resolve(__dirname, 'pages/quiz.vue'),
          meta: { requiresAuth: true } 
        },
        {
          name: 'feedbacks',
          path: '/feedbacks',
          component: resolve(__dirname, 'pages/feedbacks.vue'), 
        },
        {
          name: 'my-feedbacks',
          path: '/my-feedbacks',
          component: resolve(__dirname, 'pages/MyFeedbacks.vue'),
        },
      );
    },
  },
  
  
};
