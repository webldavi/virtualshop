// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiSecret: process.env.SECRET_KEY,
    public: {
      brandName: process.env.APP_BRAND_NAME,
    },
  },
  css: [
    "primevue/resources/themes/aura-light-blue/theme.css",
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  modules: ["@pinia/nuxt", "nuxt-primevue"],
  primevue: {
    unstyled: true
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
