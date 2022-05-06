import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        authorId: '',
        graphCmsUrl: '',
        useGraphCms: 0,
    },
    css: ['~/assets/css/main.css'],
    build: {
        postcss: {
            postcssOptions: require( /* @vite-ignore */ './postcss.config.js'),
        },
    }
})
