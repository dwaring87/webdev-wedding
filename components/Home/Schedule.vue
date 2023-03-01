<script setup>
  import RiCalendar from '~icons/ri/calendar-event-fill';
</script>

<template>
  <div class="container">
    <div class="max-w-2xl mx-auto bg-gray-50 shadow-sm">

      <hr class="w-full h-[2px] bg-gray-300 mt-24 mb-12" />

      <h3 class="text-center mb-12 text-2xl">Schedule</h3>

      <div class="flex flex-wrap justify-between items-center gap-4 px-4">
        <div class="flex-grow text-center">
          <p class="text-lg font-bold text-emerald-800">Friday, September 15th</p>
          <p class="font-bold">Welcome Dinner</p>
          <p class="font-semibold text-cyan-800">Everyone is invited!</p>
          <p>5PM until dark</p>
          <p>Taughannock Falls State Park</p>
          <p>Trumansburg, NY</p>
        </div>
        <Image d-key="location-welcome-dinner" class="max-w-[300px] mx-auto rounded-md shadow-md" width="300px" />
      </div>

      <br />

      <div class="flex flex-wrap justify-between items-center gap-4 px-4">
        <div class="flex-grow text-center">
          <p class="text-lg font-bold text-emerald-800">Saturday, September 16th</p>
          <p class="font-bold">Ceremony &amp; Reception</p>
          <p>4PM until late</p>
          <p>Silver Queen Farm</p>
          <p>Trumansburg, NY</p>
        </div>
        <Image d-key="location-ceremony-reception" class="max-w-[300px] mx-auto rounded-md shadow-md" width="300px" />
      </div>

      <br />

      <div class="mx-8">
        <NuxtLink to="/page/wedding-info">
          <button class="btn btn-dark mx-auto">More Information</button>
        </NuxtLink>
      </div>

      <hr class="w-full h-[2px] bg-gray-300 mt-12 mb-24" />
    </div>
  </div>
</template>