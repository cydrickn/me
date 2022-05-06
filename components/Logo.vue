<script setup>
defineProps({
  title: String,
  desc: String,
  cColor: String,
  nColor: String,
});
</script>

<template>
  <svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
    <title>{{ title }}</title>
    <desc>{{ desc }}</desc>
    <g stroke="#000" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" class="layer">
      <path :class="cColor" d="M0 239.411L239.411 0l37.408 37.408L74.816 239.411l164.595 164.595 202.003-202.003 37.408 37.408-239.41 239.412L0 239.41z"/>
      <path :class="nColor" d="M99.755 239.411L239.41 379.068l37.408-37.408-102.247-102.25 216.966-12.47 37.408-37.407L289.29 49.877 253.265 88.67l100.864 100.864-216.966 12.47-37.408 37.407z"/>
    </g>
  </svg>
</template>
