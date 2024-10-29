<template>
  <div
    class="lg:p-12 bg-gray-100 w-full h-full min-h-screen flex flex-col items-center p-2"
  >
    <!-- <div class="prose mb-12">
      <h1> -->
    <div class="mb-4 flex justify-between items-center lg:w-[95ch] w-full">
      <h1 class="text-3xl">
        <span class="font-medium">
          Course:
          <span class="font-bold">Mastering Nuxt 3</span>
        </span>
      </h1>
      <UserCard />
    </div>

    <div class="flex lg:flex-row justify-center flex-grow flex-col w-full">
      <div
        class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] w-90 max-w-full lg:max-w-[30ch] flex flex-col"
      >
        <h3>Chapters</h3>

        <!-- All the lessons for the course listed here -->
        <!-- <ul>
          <li v-for="chapter in course.chapters" :key="chapter.slug">
            {{ chapter.title }}
            <ul>
              <li v-for="lesson in chapter.lessons" :key="lesson.slug">
                <NuxtLink
                  :to="{
                    name: 'course-chapter-chapterSlug-lesson-lessonSlug',
                    params: {
                      chapterSlug: chapter.slug,
                      lessonSlug: lesson.slug,
                    },
                  }"
                  :no-prefetch="true"
                >
                  {{ lesson.title }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul> -->
        <div
          class="space-y-1 mb-4 flex flex-col"
          v-for="chapter in chapters"
          :key="chapter.slug"
        >
          <h4>{{ chapter.title }}</h4>
          <NuxtLink
            v-for="(lesson, index) in chapter.lessons"
            :key="lesson.slug"
            class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1 px-4 -mx-4"
            :to="lesson.path"
            :class="{
              'text-blue-500': $route.path === lesson.path,
              'text-gray-500': $route.path !== lesson.path,
            }"
          >
            <span class="text-gray-500">{{ index + 1 }}.</span>
            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
      </div>

      <div class="prose lg:p-12 bg-white rounded-md lg:w-[65ch] p-2 w-full">
        <NuxtErrorBoundary>
          <!-- ... -->
          <template #error="{ error }">
            <p>An error occurred: {{ error }}</p>
            <button
              class="hover:cursor-pointer bg-gray-500 text-white font-bold py-1 px-3 rounded"
              @click="resetError(error)"
            >
              Reset
            </button>
          </template>
          <!-- it works now as layout for all the pages in course directory -->
          <NuxtPage />
        </NuxtErrorBoundary>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course } from "~/types/Course";
import useCourse from "../composables/useCourse";
definePageMeta({
  middleware: ["auth"],
});
const { chapters } = await useCourse();
const resetError = (error: any) => {
  error.value = null;
};
</script>

<style scoped>
/* .router-link-active {
 color: #009971; 
  @apply text-blue-500;
} */
</style>
