import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        authorId: '',
        graphCmsUrl: '',
        useGraphCms: 0,
    },
    components: {
        global: true,
        dirs: ['~/components', '~/components/icons']
    },
    css: ['~/assets/css/main.css'],
    build: {
        postcss: {
            postcssOptions: require( /* @vite-ignore */ './postcss.config.js'),
        },
    }
})
