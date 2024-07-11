<template>
  <div>
    <div v-if="imageUrl" class="overflow-hidden rounded-lg shadow-lg">
      <img class="w-full md:w-[600px]" :src="imageUrl" alt="Random Image" />
    </div>
    <div v-else class="my-6 flex justify-center">
      <Loader />
    </div>
    <div class="flex justify-center mt-8">
      <button
        :disabled="isDisabled"
        @click="fetchRandomImage"
        class="bg-green-500 hover:bg-green-400 transition py-4 px-4 rounded disabled:bg-gray-500 w-full md:max-w-[200px]"
      >
        New image
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  route: String,
});

const isDisabled = ref(false);
const imageUrl = ref(null);

onMounted(() => {
  fetchRandomImage();
});

async function fetchRandomImage() {
  isDisabled.value = true;
  try {
    const currentImageUrl = imageUrl.value;
    const response = !imageUrl
      ? await fetch(`/api/random-image?route=${props.route}`)
      : await fetch(
          `/api/random-image?route=${
            props.route
          }&currentImageUrl=${encodeURIComponent(currentImageUrl)}`
        );
    const newImageUrl = await response.text();
    imageUrl.value = newImageUrl;
  } catch (error) {
    console.error("Error fetching random image:", error);
  } finally {
    isDisabled.value = false;
  }
}
</script>
