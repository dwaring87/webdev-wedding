<script setup>
  const { getPages } = useCMS();

  const pages = await getPages();

  useHead({
    title: "More Information"
  });
</script>

<template>
  <div class="container wedding-info py-8">
    <h1 class="text-center mb-8">More Information</h1>

    <div class="w-full max-w-lg mx-auto px-4">
      <Image d-key="info-1" class="rounded-md shadow-md border-2 border-white" width="600" />
    </div>

    <div class="mx-auto m-8 flex flex-wrap gap-8 justify-center">
      <div class="max-w-md px-8" v-for="(page) in pages" :key="page.slug">
        <h2>{{ page.title}}</h2>
        <p>{{ page.description }}</p>
        <NuxtLink :to="`/page/${page.slug}`"><button class="btn-dark">{{ page.title }}</button></NuxtLink>
      </div>
    </div>

    <div class="w-full max-w-lg mx-auto px-4">
      <Image d-key="info-2" class="rounded-md shadow-md border-2 border-white" width="600" />
    </div>
  </div>
</template>

<style scoped>
  .wedding-info button {
    margin-top: 15px !important;
    margin-bottom: 40px;
    min-width: 50% !important;
  }
</style>