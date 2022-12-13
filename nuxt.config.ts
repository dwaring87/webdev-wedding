import Icons from 'unplugin-icons/vite';

export default defineNuxtConfig({

  typescript: {
    strict: true
  },

  modules: ['@nuxt/image-edge', '@nuxtjs/tailwindcss', 'nuxt-directus', 'nuxt-runtime-compiler'],

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

  image: {
    providers: {
      directus: {
        provider: '~/providers/directus',
        options: {
          baseURL: process.env.DIRECTUS_URL,
          token: process.env.DIRECTUS_TOKEN,
          output_dir: '.output/public/',
          image_dir: '_images/'
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
