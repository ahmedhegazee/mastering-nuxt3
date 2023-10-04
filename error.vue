<template>
  <div class="prose">
    <div v-if="error.statusCode === 404">
      <h1>404</h1>
      <p>Page not found</p>
    </div>
    <div v-else>
      <h1>Oops!</h1>
      <p>Something went wrong</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const error: any = useError();
</script>

<style scoped></style>
