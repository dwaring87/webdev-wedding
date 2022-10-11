<script setup>
  const props = defineProps({
    error: Object
  });
</script>

<template>
  <div class="page text-center">
    <span class="inline-flex items-center rounded-md bg-red-100 px-2.5 py-0.5 text-lg font-medium text-red-800">
      {{ error.statusCode }}
    </span>
    <h1>{{ error.statusMessage }}</h1>
    <p>It looks like Quercus ran away with this page.</p>
    <br />
    <NuxtLink to="/"><button class="btn-dark mx-auto">Return Home</button></NuxtLink>
    <br /><br />
    <Image d-key="page-not-found" class="rounded-md border-2 w-full max-w-xl border-gray-400 object-cover object-left-top mx-auto" />
  </div>
</template>

<style src="@/assets/default.css"></style>