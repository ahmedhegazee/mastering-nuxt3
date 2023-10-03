<template>
  <div>
    <h2>Lesson</h2>
    <p>This is a lesson</p>
    <p>Chapter Slug: {{ $route.params.chapterSlug }}</p>
    <p>Lesson Slug: {{ $route.params.lessonSlug }}</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
