<script setup>
const route = useRoute();

useHead({
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
