<script setup>
  const props = defineProps({
    title: String
  })
</script>

<template>
  <div class="bg-gradient-to-b from-white to-gray-100 my-8 mx-1 sm:mx-2 md:mx-8 border border-white shadow-md rounded-md">
    <div v-if="title" class="bg-gradient-to-b from-emerald-700 to-emerald-800 opacity-90 p-4 rounded-t-md">
      <h3 class="text-white">{{ title }}</h3>
    </div>
    <div class="p-4">
      <slot></slot>
    </div>
  </div>
</template>