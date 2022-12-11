<script setup>
  import RiRiding from '~icons/ri/riding-line';
  import RiMail from '~icons/ri/mail-check-fill';
  import RiInfo from '~icons/ri/information-fill';

  const route = useRoute();
  const { rsvp_enabled } = useRuntimeConfig();
  const { getDetails } = useCMS();

  const { data:couple } = await useAsyncData('couple', async () => {
    return await getDetails('couple');
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
          <div class="flex gap-8">
            <NuxtLink to="/page/our-story" class="hidden md:inline">Our Story</NuxtLink>
            <NuxtLink to="/page/wedding-info" class="hidden md:inline">The Wedding</NuxtLink>
            <NuxtLink to="/page/hotels" class="hidden md:inline">Hotels</NuxtLink>
            <NuxtLink to="/page/finger-lakes" class="hidden md:inline">The Finger Lakes</NuxtLink>
            <NuxtLink to="/info" class="inline md:hidden"><RiInfo class='inline' />&nbsp;Info</NuxtLink>
            <NuxtLink v-if="rsvp_enabled && rsvp_enabled === 'true'" to="/rsvp"><RiMail class='inline' />&nbsp;RSVP</NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
  a {
    @apply font-semibold opacity-80 hover:opacity-100;
  }
</style>