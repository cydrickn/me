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
const levels =  ['Expert', 'Advance', 'Intermediate', 'Beginner', null];

const currentSelectedExperience = ref(0);
const currentStackCategory = ref('All');

const author = ref(data.value.author);
const projects = ref(data.value.projects);
const stacks = computed(() => {
  const newStacks = data.value.stacks.map((stack) => {
    const newStack = { ...stack };
    newStack.categories = newStack.stackCategories.map((category) => {
      return category.name;
    });

    newStack.visible = currentStackCategory.value === 'All' || newStack.categories.includes(currentStackCategory.value);

    return newStack;
  });

  newStacks.sort((next, current) => {
    return levels.indexOf(next.level) - levels.indexOf(current.level);
  });

  return newStacks;
});

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

const categories = computed(() => {
  let stackCategories = [];
  stacks.value.forEach((stack) => {
    stackCategories = stackCategories.concat(stack.categories);
  });

  return ['All', ...new Set(stackCategories)];
});

</script>

<template>
  <NuxtLayout>
    <Head>
      <Title>{{ author.name }}</Title>
      <Meta name="description" :content="author.intro" />
    </Head>
    <div class="max-w-5xl mx-auto w-full px-5 md:px-24 xl:px-5">
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
          <a id="about"></a>
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
          <div class="mb-10">
            <ul class="menu menu-horizontal w-full flex-wrap justify-center">
              <li v-for="(category, key) in categories" :key="key" class="whitespace-nowrap" :class="{'text-primary': currentStackCategory === category}" @click="currentStackCategory = category">
                <span class="text-sm">{{ category }}</span>
              </li>
            </ul>
          </div>
          <div class="flex flex-wrap gap-2 lg:gap-4 justify-center mx-auto">
            <template v-for="(stack, key) in stacks" :key="key">
              <div v-if="stack.visible" class="stack flex items-center justify-center gap-4 technology py-2 px-4 bg-base-200 shadow-md">
                <div v-html="stack.logo.svg" class="h-10 w-10 flex items-center justify-center"></div>
                <div>
                  <p class="text-base font-medium text-base-content whitespace-nowrap">{{ stack.name }}</p>
                  <p class="text-sm text-primary">{{ stack.level }}</p>
                </div>
              </div>
            </template>
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
          <a id="experience"></a>
          <h2 class="numbered-heading">Where I've Worked?</h2>
          <div class="divider grow max-w-[300px]"></div>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="overflow-x-auto sm:overflow-unset mb-5 sm:mb-0">
            <ul class="menu menu-horizontal sm:menu-vertical max-w-[180px] w-full">
              <li v-for="(experience, key) in experiences" :key="key" :class="{ 'text-primary': currentSelectedExperience === key }" @click="currentSelectedExperience = key">
                <span class="text-sm">{{ experience.companyTag }}</span>
              </li>
            </ul>
          </div>
          <div class="sm:ml-5 grow">
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
          <a id="works"></a>
          <h2 class="numbered-heading">What did I built?</h2>
          <div class="divider grow max-w-[300px]"></div>
        </div>
        <div>
          <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            <li v-for="(project, key) in projects" :key="key">
              <div class="flex flex-col py-8 px-7 project hover:cursor-pointer relative bg-primary-content shadow-lg rounded h-full">
                <header class="flex justify-between items-center mb-9">
                  <div class="w-10 h-10"><icons-folder class="text-primary w-full"></icons-folder></div>
                  <div class="flex">
                    <a v-if="project.sourceCode" :href="project.sourceCode" class="relative z-10 block p-1 hover:text-primary" target="_blank"><icons-github class="w-5 h-5"></icons-github></a>
                    <a v-if="project.link" :href="project.link" class="relative z-10 block p-1 hover:text-primary" target="_blank"><icons-link class="w-5 h-5"></icons-link></a>
                  </div>
                </header>
                <div>
                  <h3 class="project-title text-xl font-semibold mb-2.5"><a :href="project.link ?? project.sourceCode" target="_blank" rel="noopener noreferrer" class="project-link">{{ project.name }}</a></h3>
                  <p v-html="project.description"></p>
                </div>
                <footer></footer>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="container mx-auto py-24 text-center max-w-xl">
        <a id="contact"></a>
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

.project:hover h3 {
  @apply text-primary;
}

.project-link:before {
  content: '';
  @apply absolute w-full h-full top-0 left-0;
}
</style>
