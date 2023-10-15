// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    '@pinia/nuxt',
    // "@nuxtjs/supabase",
  ],
  runtimeConfig: {
    public: {
      FB_API_KEY: process.env.NUXT_FB_API_KEY,
      FB_AUTH_DOMAIN: process.env.NUXT_FB_AUTH_DOMAIN,
      FB_PROJECT_ID: process.env.NUXT_FB_PROJECT_ID,
      FB_STORAGE_BUCKET: process.env.NUXT_FB_STORAGE_BUCKET,
      FB_MESSAGING_SENDER_ID: process.env.NUXT_FB_MESSAGING_SENDER_ID,
      FB_APP_ID: process.env.NUXT_FB_APP_ID,
      FB_MEASUREMENT_ID: process.env.NUXT_FB_MEASUREMENT_ID,
      SUPABASE_URL: process.env.NUXT_SUPABASE_URL,
      SUPABASE_KEY: process.env.NUXT_SUPABASE_KEY,
    },
  },
})