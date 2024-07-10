<script setup lang="ts">
const layout = "custom";
</script>

<template>
  <NuxtLayout :name="layout">
    <div class="h-screen m-0 p-0 grid grid-rows-1">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>
