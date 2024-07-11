// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      title: "Charles Farquharson - Front-end Developer",
    },
  },

  compatibilityDate: "2024-04-03",
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    plugins: [],
  },

  devtools: { enabled: true },
  modules: ["@nuxt/image"]
});