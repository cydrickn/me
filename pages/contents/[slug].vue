<script setup>
import { useData } from "../../composables/useData";

const route = useRoute();
const slug = route.params.slug;

const { data } = await useAsyncData('post', () => useData().getPost(slug));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toDateString() || '';
}

</script>

<template>
  <div class="max-w-3xl mx-auto w-full px-5 md:px-24 xl:px-5 mt-[100px] grow py-24">
    <Head>
      <Title>{{ data.post.title }}</Title>
      <Meta name="description" :content="data.post.excerpt" />
    </Head>
    <div class="container mx-auto">
      <h1 class="text-3xl font-medium pt-4 pb-6">{{ data.post.title }}</h1>
      <div class="flex w-full gap-4 items-center">
        <div class="w-[50px] bg-neutral-focus">
          <img :src="data.post.author.picture.url" :alt="`${data.post.author.name}'s profile picture`" />
        </div>
        <div>
          <h3 class="font-medium">{{ data.post.author.name }}</h3>
          <p class="prose max-w-none">
            Published on {{ formatDate(data.post.date) }}
          </p>
        </div>

      </div>
      <div class="py-4">
        <img v-if="data.post.coverImage"
             :src="data.post.coverImage.url"
             :alt="data.post.title"
             class="object-center object-cover w-full aspect-video"
             :class="{ 'max-w-none max-h-full': data.post.coverImage.width > data.post.coverImage.height }"
        />
      </div>
      <div class="prose max-w-none pt-8" v-html="data.post.content.html"></div>
    </div>
  </div>
</template>
