<script setup>
const props = defineProps({
  items: Array,
  itemClass: String
})
</script>

<template>
  <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
    <li v-for="(project, key) in items" :key="key">
      <div class="item" :class="itemClass">
        <slot name="header" :item="project">
          <header class="flex justify-between items-center mb-9">
            <div class="w-10 h-10">
              <slot name="header:icon">
                <icons-folder class="text-primary w-full"></icons-folder>
              </slot>
            </div>
            <div class="flex">
              <a v-if="project.sourceCode" :href="project.sourceCode" class="relative z-10 block p-1 hover:text-primary" target="_blank"><icons-github class="w-5 h-5"></icons-github></a>
              <a v-if="project.link" :href="project.link" class="relative z-10 block p-1 hover:text-primary" target="_blank"><icons-link class="w-5 h-5"></icons-link></a>
            </div>
          </header>
        </slot>
        <div>
          <slot :item="project">
            <h3 class="project-title text-xl font-semibold mb-2.5">
              <a :href="project.link ?? project.sourceCode" target="_blank" rel="noopener noreferrer" class="item-link">
                {{ project.name ?? project.title }}
              </a>
            </h3>
            <p v-html="project.description"></p>
          </slot>
        </div>
        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "BlockList"
}
</script>

<style scoped>
.item:hover h3 {
  @apply text-primary;
}

.item-link:before {
  content: '';
  @apply absolute w-full h-full top-0 left-0;
}
</style>
