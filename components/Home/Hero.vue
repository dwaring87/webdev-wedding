<script setup>
  const { getDetails } = useCMS();
  const details = await getDetails();
</script>

<template>
  <div class="max-w-7xl mx-auto sm:my-12 sm:px-6 lg:px-8">
    <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
      <div class="absolute inset-0">
        <img class="h-full w-full object-cover" src="/images/beach1.jpg" alt="Dundag Beach" />
        <div class="absolute inset-0 bg-gray-500 mix-blend-multiply" />
      </div>
      <br /><br /><br />
      <div class="relative h-full px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
        <h1 class="text-center text-4xl drop-shadow-lg font-extrabold sm:text-5xl lg:text-6xl">
          <span class="block text-white py-2">{{ details.couple }}</span>
          <span class="block text-emerald-500 py-2">{{ details.date }}</span>
          <span class="block text-white py-2">{{ details.venue_name }}</span>
          <span class="block text-white py-2">{{ details.venue_town }}</span>
        </h1>
      </div>
      <br /><br /><br />
      <div class="relative w-full px-4">
        <div class="flex justify-end gap-4">
          <!-- <NuxtLink class="btn" to="/rsvp">RSVP</NuxtLink> -->
        </div>
      </div>
    </div>
  </div>
</template>