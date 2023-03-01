<script setup>
  import RiMap from '~icons/gis/map-search';
</script>

<template>
  <div class="container mb-24">
    <div class="well max-w-xl w-fit mx-auto">
      <div class="flex items-center mb-4">
        <RiMap class="text-4xl text-gray-400 mx-2 sm:mx-4 md:mx-8 min-w-[30px]" />
        <p class="font-semibold text-lg md:text-xl flex-grow mx-4">What is there to do in the Finger Lakes?</p>
      </div>
      <div class="flex flex-wrap sm:flex-nowrap items-center gap-4">
        <Image d-key="flx" class="max-h-[200px] rounded-md shadow-md mx-auto mt-4" height="200px" />
        <div>
          <p class="lead">
            Trumansburg is located in the heart of the Finger Lakes region, between Cayuga and Seneca Lakes,  
            and is close to Ithaca and Watkins Glen.  The area is known for its gorges, waterfalls, wineries, 
            and cideries.  If you have time, make sure to 
            <NuxtLink to="/page/finger-lakes">check out some of our favorites spots in the area!</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  a {
    @apply text-emerald-800 font-semibold underline;
  }
</style>