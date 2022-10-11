<script setup>
  import RiRiding from '~icons/ri/riding-line';
  const { getDetails } = useCMS();
  const couple = await getDetails('couple');
</script>

<template>
  <div>
    <nav class="bg-primary text-white shadow-md">
      <div class="container">
        <div class="h-14 flex justify-between items-center">
          <div class="flex items-center">
            <NuxtLink to="/"><RiRiding class="inline" />&nbsp;&nbsp;{{ couple }}</NuxtLink>  
          </div>
          <div class="flex-grow"></div>
          <NuxtLink to="/rsvp">RSVP</NuxtLink>
        </div>
      </div>
    </nav>
    <Alert />
  </div>
</template>

<style scoped>
  a {
    @apply font-semibold opacity-80 hover:opacity-100;
  }
</style>