<script setup>
import {useData} from "../composables/useData";
const { data } = await useAsyncData('cms-data', () => useData().getData());
const socialMedias = reactive(data.value.socials);
</script>

<template>
  <div data-theme="night" class="min-h-screen flex flex-col">
    <div id="mainNav" class="fixed w-full bg-base-100 z-20">
      <div class="navbar h-[6.25rem] px-5 sm:px-10 shadow-md">
        <div class="navbar-start w-auto">
          <div class="w-[2.626rem]">
            <logo title="Cydrick Nonog" desc="Cydrick Nonog Brand" cColor="fill-primary" nColor="fill-current"></logo>
          </div>
        </div>
        <div class="navbar-end grow w-auto">
          <ul class="hidden sm:flex menu menu-horizontal gap-4">
            <li>
              <nuxt-link to="/#about" class="p-0 hover:text-primary hover:bg-transparent">
                <span class="text-primary">01:</span> About
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/#experience" class="p-0 hover:text-primary hover:bg-transparent">
                <span class="text-primary">02:</span> Experience
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/#works" class="p-0 hover:text-primary hover:bg-transparent">
                <span class="text-primary">03:</span> Work
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/#contents" class="p-0 hover:text-primary hover:bg-transparent">
                <span class="text-primary">04:</span> Contents
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/#contact" class="p-0 hover:text-primary hover:bg-transparent">
                <span class="text-primary">05:</span> Contact
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <slot></slot>
    <div class="text-center p-8 mt-10 text-sm">
      <ul class="flex flex-row md:flex-col gap-4 justify-center mb-4 md:mb-0 md:fixed sm:bottom-0 md:left-5">
        <li v-for="(socialMedia, key) in socialMedias" :key="key">
          <a :href="socialMedia.url" :aria-label="socialMedia.name" rel="noopener noreferrer" target="_blank" class="p-2 block">
            <div v-if="socialMedia.iconAsSvg" v-html="socialMedia.icon" class="hover:text-primary h-5 w-5 m-auto"></div>
            <component v-else :is="socialMedia.icon" class="hover:text-primary h-5 w-5"></component>
          </a>
        </li>
        <li class="divider divider-horizontal h-20 hidden md:flex mt-5 w-full mx-auto"></li>
      </ul>
      <ul class="hidden md:flex flex-col fixed bottom-0 md:right-5 w-9 gap-4">
        <li class="p-2"><a :href="`mailto:${data.author.email}`" class="block m-auto writing-vertical-rl hover:text-primary">{{ data.author.email }}</a></li>
        <li class="divider divider-horizontal h-20 flex mt-5  w-full mx-auto"></li>
      </ul>
      <a class="block p-2 hover:text-primary" :href="data.author.repository" target="_blank">
        <p>Made with <icons-heart class="inline"></icons-heart> by {{ data.author.name }}</p>
        <div>
          <client-only></client-only>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>

</style>
