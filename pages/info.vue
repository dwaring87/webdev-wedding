<script setup>
  useHead({
    title: "More Information"
  });
</script>

<template>
  <div class="container wedding-info py-8">
    <h1 class="text-center mb-8">More Information</h1>

    <div class="m-8 flex flex-wrap md:flex-nowrap items-center justify-center gap-8">
      <div class="w-full max-w-lg">
        <Image d-key="info-1" class="rounded-md shadow-md border-2 border-white" width="600" />
      </div>
      <div class="w-full">
        <h2>Our Story</h2>
        <p>Want to know how we met?  Curious about bike tours in Killarney National Park?</p>
        <NuxtLink to="/page/our-story"><button class='btn-dark'>Read Our Story</button></NuxtLink>

        <h2>Wedding Details</h2>
        <p>More details about the Welcome Dinner on Friday and the Wedding Ceremony and Reception on Saturday</p>
        <NuxtLink to="/page/wedding-info"><button class="btn-dark">Wedding Information</button></NuxtLink>
      </div>
    </div>

    <div class="m-8 flex flex-wrap md:flex-nowrap items-center justify-center gap-8">
      <div class="w-full">
        <h2>Hotels</h2>
        <p>Information about hotel blocks and places to stay in and around Ithaca</p>
        <NuxtLink to="/page/hotels"><button class="btn-dark">Hotel Information</button></NuxtLink>

        <h2>The Finger Lakes</h2>
        <p>Information about exploring the Finger Lakes Region &mdash; home to <em>gorge-ous</em> State Parks, wineries, and cideries</p>
        <NuxtLink to="/page/finger-lakes"><button class="btn-dark">Explore the Finger Lakes</button></NuxtLink>
      </div>
      <div class="w-full max-w-lg">
        <Image d-key="info-2" class="rounded-md shadow-md border-2 border-white" width="600" />
      </div>
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