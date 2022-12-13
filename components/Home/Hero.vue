<script setup>
  import RiMail from '~icons/ri/mail-check-fill';
  const { rsvp_enabled } = useRuntimeConfig();
  const { getDetails } = useCMS();
  
  const { data:details } = await useAsyncData('details', async () => {
    return await getDetails();
  });
</script>

<template>
  <div class="max-w-7xl mx-auto sm:my-12 sm:px-6 lg:px-8">
    <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
      <div class="absolute inset-0">
        <Image d-key="hero" :modifiers="{blur: 3}" class="h-full w-full object-cover" />
        <div class="absolute inset-0 bg-gray-500 mix-blend-multiply"></div>
      </div>
      <br />
      <div class="relative h-full text-center px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
        <p class="hero-white">{{ details.couple }}</p>
        <p class="hero-color">{{ details.date }}</p>
        <p class="hero-white">{{ details.venue_name }}</p>
        <p class="hero-white">{{ details.venue_town }}</p>
      </div>
      <br />
      <div class="relative w-full p-4">
        <div class="flex justify-end gap-4">
          <NuxtLink v-if="rsvp_enabled && rsvp_enabled === 'true'" class="btn" to="/rsvp">&nbsp;&nbsp;<RiMail class="inline" />&nbsp;RSVP&nbsp;&nbsp;</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .hero {
    @apply py-2 text-4xl font-extrabold tracking-normal md:tracking-wide sm:text-5xl lg:text-6xl drop-shadow-lg;
  }
  .hero-white {
    @apply hero text-white;
  }
  .hero-color {
    @apply hero text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-cyan-500;
  }
</style>