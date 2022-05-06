<script setup>
import Logo from "../components/Logo";
import {useData} from "../composables/useData";
import IconHeart from "../components/IconHeart";
const { data } = await useAsyncData('cms-data', () => useData().getData());
</script>

<template>
  <div data-theme="night" class="min-h-screen flex flex-col">
    <div class="fixed w-full bg-base-100 z-10">
      <div class="navbar h-[6.25rem] px-5 sm:px-10">
        <div class="navbar-start w-auto">
          <div class="w-[2.626rem]">
            <logo  title="Cydrick Nonog" desc="Cydrick Nonog Brand" cColor="fill-primary" nColor="fill-current"></logo>
          </div>
        </div>
        <div class="navbar-end grow w-auto">
          <ul class="hidden sm:flex menu menu-horizontal gap-4">
            <li><a class="p-0 hover:text-primary hover:bg-transparent">
              <span class="text-primary">01:</span> About</a>
            </li>
            <li><a class="p-0 hover:text-primary hover:bg-transparent">
              <span class="text-primary">02:</span> Experience</a>
            </li>
            <li><a class="p-0 hover:text-primary hover:bg-transparent">
              <span class="text-primary">03:</span> Work</a>
            </li>
            <li><a class="p-0 hover:text-primary hover:bg-transparent">
              <span class="text-primary">04:</span> Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <slot></slot>
    <div class="text-center p-8 mt-10 text-sm">
      <a class="block p-2">
        <p>Made with <icon-heart class="inline"></icon-heart> by {{ data.author.name }}</p>
        <div>
          <client-only></client-only>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>

</style>