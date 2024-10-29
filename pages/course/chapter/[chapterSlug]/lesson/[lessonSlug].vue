<script setup lang="ts">
import type { Chapter, Course, Lesson } from "@/types/Course";
// import { useCourse, useChapter, useLesson } from "@/composables/useCourse";
import useCourse from "@/composables/useCourse";
import VideoPlayer from "~/components/VideoPlayer.vue";
import LessonCompleteButton from "~/components/LessonCompleteButton.client.vue";
import type { RouteLocationNormalized, NavigationGuardNext } from "#vue-router";
const course: Course = await useCourse();
const route = useRoute();
// Supabase password =>RuQs6JU1CQCEhBwK
definePageMeta({
  middleware: ["chapter-validate-middleware"],
  // middleware: function (
  //   to: RouteLocationNormalized,
  //   from: RouteLocationNormalized,
  //   next: NavigationGuardNext
  // ) {
  //   const course: Course = useCourse();
  //   const params = to.params;
  //   const chapter: Chapter | undefined = course.chapters.find(
  //     (chapter) => chapter.slug === params.chapterSlug
  //   );
  //   if (!chapter) {
  //     return false;
  //   }
  //   const lesson: Lesson | undefined = chapter?.lessons.find(
  //     (lesson) => lesson.slug === params.lessonSlug
  //   );
  //   if (!lesson) return false;
  //   next;
  // },
  // validate({ params }): any {
  //   const course: Course = useCourse();
  //   const chapter: Chapter | undefined = course.chapters.find(
  //     (chapter) => chapter.slug === params.chapterSlug
  //   );
  //   if (!chapter) {
  //     return false;
  //     // throw createError({
  //     //   fatal: true,
  //     //   message: `Could not find chapter`,
  //     //   statusCode: 404,
  //     // });
  //   }
  //   const lesson: Lesson | undefined = chapter.lessons.find(
  //     (lesson) => lesson.slug === params.lessonSlug
  //   );
  //   if (!lesson) return false;
  //   // throw createError({
  //   //   message: `Could not find lesson`,
  //   //   statusCode: 404,
  //   // });
  //   return true;
  // },
});
const chapterSlug: string = route.params.chapterSlug as string;
const lessonSlug: string = route.params.lessonSlug as string;
const chapter: Maybe<Chapter> = useChapter(chapterSlug);

// const lesson: Maybe<Lesson> = useLesson(chapterSlug, lessonSlug);
const lesson = (await getLesson(chapterSlug, lessonSlug)) as Lesson;
const title = computed(() => lesson?.title ?? "");
const description = computed(() => lesson?.text ?? "");
useHead({
  title,
  meta: [
    {
      hid: "og:title",
      property: "og:title",
      content: title,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: description,
    },
    {
      hid: "description",
      name: "description",
      content: description,
    },
  ],
});

const progress = useLocalStorage<Array<Array<boolean>>>("progress", []);
const chapterIndex = computed(() =>
  chapter?.number ? chapter?.number - 1 : 0
);
const lessonIndex = computed(() => (lesson?.number ? lesson?.number - 1 : 0));
const isLessonComplete = computed(() => {
  if (!progress.value[chapterIndex.value]) {
    return false;
  }

  if (!progress.value[chapterIndex.value][lessonIndex.value]) {
    return false;
  }
  return progress.value[chapterIndex.value][lessonIndex.value];
});
const toggleComplete = () => {
  // throw createError(`Could not update lesson progress`);
  if (!progress.value[chapterIndex.value])
    progress.value[chapterIndex.value] = [];

  progress.value[chapterIndex.value][lessonIndex.value] =
    !isLessonComplete.value;
};
</script>
<template>
  <!-- <div>
    <h2>Lesson</h2>
    <p>This is a lesson</p>
    <p>Chapter Slug: {{ chapter?.title }}</p>
    <p>Lesson Slug: {{ lesson?.title }}</p>
  </div> -->
  <div>
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter?.number }} - {{ lesson?.number }}
    </p>
    <h2 class="my-0">{{ lesson?.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
        target="_blank"
        v-if="lesson?.sourceUrl"
        class="font-normal text-md text-gray-500"
        :href="lesson?.sourceUrl"
      >
        Download Source Code
      </NuxtLink>
      <NuxtLink
        target="_blank"
        v-if="lesson?.downloadUrl"
        class="font-normal text-md text-gray-500"
        :href="lesson?.downloadUrl"
      >
        Download Video
      </NuxtLink>
    </div>
    <VideoPlayer v-if="lesson?.videoId" :videoId="lesson?.videoId" />
    <!-- <ClientOnly> -->
    <!-- @update:model-value="toggleComplete" -->
    <LessonCompleteButton
      :model-value="isLessonComplete"
      @update:model-value="toggleComplete"
    />
    <!-- </ClientOnly> -->
    <p>{{ lesson?.text }}</p>
  </div>
</template>

<style scoped></style>
