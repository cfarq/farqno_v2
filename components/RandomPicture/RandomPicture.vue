<template>
  <div>
    <div v-if="imageUrl">
      <img class="w-full md:w-[600px]" :src="imageUrl" alt="Random Image" />
    </div>
    <div v-else class="my-6 flex justify-center">
      <Loader />
    </div>
    <div class="flex justify-center mt-8">
      <button @click="fetchRandomImage" class="bg-green-300 py-2 px-4 rounded">
        Get Random Image
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const imageUrl = ref(null);
const currentImage = ref(null);

onMounted(() => {
  fetchRandomImage();
});

async function fetchRandomImage() {
  try {
    // Fetch a new random image URL excluding the current image
    const currentImageUrl = imageUrl.value;
    const response = !imageUrl
      ? await fetch("/api/random-image")
      : await fetch(
          `/api/random-image?currentImageUrl=${encodeURIComponent(
            currentImageUrl
          )}`
        );
    const newImageUrl = await response.text();
    imageUrl.value = newImageUrl;
  } catch (error) {
    console.error("Error fetching random image:", error);
  }
}
</script>
