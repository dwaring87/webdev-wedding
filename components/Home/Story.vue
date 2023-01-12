<script setup>
  import RiQuestion from '~icons/ri/riding-fill';
</script>

<template>
  <div class="container mb-24">
    <div class="well max-w-xl w-fit mx-auto">
      <div class="flex items-center mb-4">
        <RiQuestion class="text-4xl text-gray-400 mx-2 sm:mx-4 md:mx-8" />
        <p class="font-semibold flex-grow mx-4">Bike tours in Killarney?</p>
      </div>
      <div class="flex flex-wrap sm:flex-nowrap items-center gap-4">
        <p class="lead">Wondering what bike tours in Killarney National Park have to do with our wedding? 
          <NuxtLink to="/page/our-story">Read Our Story</NuxtLink> to see how David proposed 
          to Marissa while on a bike tour around Ireland's first National Park and how 
          <code>killarneybicycletours.com</code> came to be!
        </p>
        <Image d-key="question" class="max-h-[200px] rounded-md shadow-md mx-auto mt-4" height="200px" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  a {
    @apply text-emerald-800 font-semibold underline;
  }
</style>