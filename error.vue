<template>
  <NuxtLayout>
    <div class="prose">
      <div v-if="error.statusCode === 404">
        <h1>404</h1>
        <p>{{ error.message ?? "Page Not Found" }}</p>
      </div>
      <div v-else>
        <h1>Oops!</h1>
        <p>Something went wrong</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const error: any = useError();
</script>

<style scoped></style>
