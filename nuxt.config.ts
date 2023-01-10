import Icons from 'unplugin-icons/vite';

export default defineNuxtConfig({

  modules: ['@nuxt/image-edge', '@nuxtjs/tailwindcss', '@nuxtjs/plausible', 'nuxt-directus', 'nuxt-runtime-compiler', './modules/nuxt-image-generator'],

  vite: {
    plugins: [
      Icons({
        autoInstall: true
      })
    ]
  },

  plausible: {
    domain: process.env.PLAUSIBLE_DOMAIN,
    apiHost: process.env.PLAUSIBLE_HOST,
    autoPageviews: true,
    hashMode: true,
    trackLocalhost: true
  },

  directus: {
    url: process.env.DIRECTUS_URL,
    token: process.env.DIRECTUS_TOKEN
  },

  image: {
    providers: {
      directus: {
        provider: '~/providers/directus',
        options: {
          baseURL: process.env.DIRECTUS_URL,
          token: process.env.DIRECTUS_TOKEN
        }
      }
    }
  },

  runtimeConfig: {
    public: {
      rsvp_enabled: process.env.RSVP,
      ga_id: process.env.GA_ID
    }
  }

});
