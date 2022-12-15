<script setup>
  import RiRiding from '~icons/ri/riding-line';
  import RiMail from '~icons/ri/mail-check-fill';
  import RiInfo from '~icons/ri/information-fill';

  const route = useRoute();
  const { rsvp_enabled } = useRuntimeConfig();
  const { getDetails, getPages } = useCMS();

  const { data:couple } = await useAsyncData('couple', async () => {
    return await getDetails('couple');
  });
  const { data:pages } = await useAsyncData('pages', async () => {
    return await getPages();
  });
</script>

<template>
  <div v-if="route.path !== '/'">
    <nav class="bg-primary text-white shadow-md">
      <div class="container">
        <div class="h-14 flex justify-between items-center">
          <div class="flex items-center">
            <NuxtLink to="/"><RiRiding class="inline" />&nbsp;&nbsp;{{ couple }}</NuxtLink>
          </div>
          <div class="flex-grow"></div>
          <div class="flex gap-4">
            <NuxtLink v-for="(page) in pages" :to="`/page/${page.slug}`" class="hidden md:inline" :class="{active: route.path.includes(page.slug)}">{{ page.title }}</NuxtLink>
            <NuxtLink v-if="rsvp_enabled && rsvp_enabled === 'true'" to="/rsvp"><RiMail class='inline' />&nbsp;RSVP</NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
  a {
    @apply font-semibold opacity-70 hover:opacity-100 px-1;
  }
  .active {
    @apply border-b-2 border-gray-100 border-opacity-30 opacity-90 hover:opacity-100 !important;
  }
</style>