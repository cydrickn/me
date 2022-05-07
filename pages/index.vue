<script setup>
import { gql } from 'graphql-request';
import { useData } from "../composables/useData";
import showdown from 'showdown';
import dayjs from 'dayjs';

const { data } = await useAsyncData('cms-data', () => useData().getData());
const converter = new showdown.Converter();

const jobStatuses = {
  FullTime: 'Full-Time',
  PartTime: 'Part-Time'
};

const author = ref(data.value.author);
const mostUseStacks = ref(data.value.mostUseStacks);
const stacks = ref(data.value.stacks);
const experiences = computed(() => {
  return data.value.experiences.map((experience) => {
    const exp = experience;
    const startDate = dayjs(exp.startDate);

    exp.present = true;
    exp.startMonth = startDate.format('MMMM');
    exp.startYear = startDate.format('YYYY');

    if (exp.endDate) {
      const endDate = dayjs(exp.endDate);
      exp.endMonth = endDate.format('MMMM');
      exp.endYear = endDate.format('YYYY');
      exp.present = false;
    }

    exp.deschtml = converter.makeHtml(exp.description);

    return exp;
  });
});

const currentSelectedExperience = ref(0);
</script>

<template>
  <NuxtLayout>
    <Head>
      <Title>{{ author.name }}</Title>
      <Meta name="description" :content="author.intro" />
    </Head>
    <div class="max-w-5xl mx-auto w-full px-5 md:px-24">
      <div class="container mx-auto">
        <div class="hero min-h-screen">
          <div class="hero-content justify-start w-full p-0">
            <div class="">
              <p class="py-6">Hi, my name is</p>
              <h1 class="text-5xl font-bold text-primary">{{ author.name }}</h1>
              <p v-if="author.subTitle" class="py-6">{{ author.subTitle }}</p>
              <div class="py-6 max-w-lg" v-html="converter.makeHtml(author.intro)"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mx-auto py-24">
        <div class="flex gap-4 mt-2.5 mb-10">
          <h2 class="numbered-heading">About Me</h2>
          <div class="divider grow max-w-[300px]"></div>
        </div>
        <div class="flex">
          <div>
            <div class="markup" v-html="converter.makeHtml(author.bio)"></div>
          </div>
        </div>
        <div class="mt-24">
          <div class="text-center mb-10">
            <h3 class="text-2xl font-medium">Technologies</h3>
          </div>
          <div class="flex flex-wrap gap-2 lg:gap-4 justify-center max-w-2xl mx-auto">
            <div v-for="(stack, key) in stacks" :key="key"
                 class="flex items-center justify-center gap-4 technology py-2 px-4 bg-base-200 shadow-md">
              <div v-html="stack.logo.svg" class="h-10 w-10 flex items-center justify-center"></div>
              <div>
                <p class="text-base font-medium text-base-content whitespace-nowrap">{{ stack.name }}</p>
                <p class="text-sm text-primary">{{ stack.level }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="false" class="mt-24">
          <div class="text-center">
            <h3 class="text-2xl font-medium">Skills</h3>
          </div>
        </div>
      </div>
      <div class="container mx-auto py-24">
        <div class="flex gap-4 mb-10">
          <h2 class="numbered-heading">Where I've Worked?</h2>
          <div class="divider grow max-w-[300px]"></div>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="overflow-x-auto sm:overflow-unset mb-5 sm:mb-0 grow">
            <ul class="menu menu-horizontal sm:menu-vertical max-w-[180px] w-full">
              <li v-for="(experience, key) in experiences" :key="key" :class="{ 'text-primary': currentSelectedExperience === key }" @click="currentSelectedExperience = key">
                <span class="text-sm">{{ experience.companyTag }}</span>
              </li>
            </ul>
          </div>
          <div class="sm:ml-5">
            <div v-for="(experience, key) in experiences"
                 :key="key"
                 :class="{ block: key === currentSelectedExperience, hidden: key !== currentSelectedExperience }"
                 class="px-1"
            >
              <h3 class="text-base mb-2 font-medium">
                <span><template v-if="experience.jobStatus !== 'FullTime'">{{ jobStatuses[experience.jobStatus] }}&nbsp;</template>{{ experience.role }}</span>
                <span class="text-primary">&nbsp;@&nbsp;<a :href="experience.website" target="_blank">{{ experience.company }}</a></span>
              </h3>
              <p class="text-sm mb-6">
                {{ experience.startMonth }} <template v-if="experience.startYear !== experience.endYear">{{ experience.startYear }}</template>
                - <template v-if="!experience.present">{{ experience.endMonth }} {{ experience.endYear }}</template><template v-else>Present</template>
              </p>
              <div class="markup text-base" v-html="experience.deschtml"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mx-auto py-24">
        <div class="flex gap-4 mb-10">
          <h2 class="numbered-heading">What did I built?</h2>
          <div class="divider grow max-w-[300px]"></div>
        </div>
      </div>
      <div class="container mx-auto py-24 text-center max-w-xl">
        <p class="numbered-heading-sm py-6">What's Next?</p>
        <h2 class="text-5xl font-bold mb-10">Get in Touch</h2>
        <p>
          Although I’m not currently looking for any new opportunities, my inbox is always open.
          Whether you have a question or just want to say hi, I’ll try my best to get back to you!
        </p>
        <div class="pt-20">
          <a :href="`mailto:${author.email}`" class="btn btn-outline btn-primary px-20">Say Hello</a>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
body {
  counter-reset: heading-counter;
}
.technology svg {
  @apply max-h-full max-w-full;
}
.numbered-heading {
  @apply text-3xl font-medium;
}
.numbered-heading:before {
  counter-increment: heading-counter 1;
  content: "0" counter(heading-counter) ": ";
  @apply mr-2.5 text-xl text-primary font-normal;
}
.numbered-heading-sm {
  @apply text-base;
}
.numbered-heading-sm:before {
  counter-increment: heading-counter 1;
  content: "0" counter(heading-counter) ": ";
  @apply mr-1 text-sm text-primary font-normal;
}
</style>