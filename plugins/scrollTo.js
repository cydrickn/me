// import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.$router.options.scrollBehavior = (to, from, savedPosition) => {
        if (to.hash) {
            const top = document.getElementById('mainNav').clientHeight;
            return { el: to.hash, behavior: 'smooth', top: top }
        }
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0, behaviour: "smooth" };
    };
});
