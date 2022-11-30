import Icons from 'unplugin-icons/vite';

export default defineNuxtConfig({

  typescript: {
    strict: true
  },

  modules: ['@nuxt/image-edge', '@nuxtjs/tailwindcss', 'nuxt-directus'],

  vite: {
    plugins: [
      Icons({
        autoInstall: true
      })
    ]
  },

  directus: {
    url: process.env.DIRECTUS_URL,
    token: process.env.DIRECTUS_TOKEN
  },

  publicRuntimeConfig: {
    rsvp_enabled: process.env.RSVP,
    ga_id: process.env.GA_ID
  }

});
