<script setup>
  const props = defineProps({
    title: String,
    content: String,
    updated: {
      type: String,
      required: false
    }
  });
  const updated_string = props.updated ? new Date(props.updated).toLocaleString() : '';
</script>

<template>
  <div class='content'>
    <h1>{{ title }}</h1>
    <ContentBody :html="content" />
    <div class="mt-14 border-t border-gray-200 text-gray-400 text-center md:text-right">
      <p>Last Updated<br />{{ updated_string }}</p>
    </div>
  </div>
</template>

<style>
  .content .body {
    @apply max-w-3xl mx-auto;
  }
  .content h1 {
    @apply text-center pb-8 text-4xl lg:text-5xl;
  }
  .content h2 {
    @apply mt-8 mb-4;
  }
  .content p {
    @apply my-4 font-sans;
  }
  .content img {
    @apply mx-auto my-2 max-w-[90%] md:max-w-[650px] lg:my-8 rounded-md shadow-md border border-gray-200;
  }
  .content a {
    @apply text-emerald-800 underline;
  }
</style>
