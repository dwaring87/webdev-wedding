<script setup>
  import RiMail from '~icons/ri/mail-check-fill';

  const { rsvp_enabled } = useRuntimeConfig();
  const { getPages } = useCMS();

  const pages = await getPages();
</script>

<template>
  <div class="py-4 sm:mt-8 bg-gradient-to-b from-emerald-700 to-emerald-800 sm:from-transparent sm:to-transparent sm:border-b-2 border-emerald-800 border-opacity-40 max-w-full sm:max-w-2xl mx-auto">
    <div class="flex flex-wrap md:flex-nowrap items-baseline justify-center gap-8">
      <NuxtLink v-for="(page) in pages" :to="`/page/${page.slug}`" class="info-link">{{ page.title }}</NuxtLink>
      <NuxtLink v-if="rsvp_enabled && rsvp_enabled === 'true'" to="/rsvp" class="hidden sm:inline info-link"><RiMail class='inline' />&nbsp;RSVP</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
  .info-link {
    @apply font-medium text-gray-200 hover:text-white sm:text-emerald-800 sm:hover:text-emerald-900;
  }
</style>