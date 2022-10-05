<script setup>
  const { getDetails } = useCMS();
  const couple = await getDetails('couple');
</script>

<template>
  <nav class="bg-emerald-800 text-emerald-100">
    <div class="container">
      <div class="h-14 flex justify-between items-center">
        <div class="flex items-center font-bold opacity-80 hover:opacity-100">
          <NuxtLink to="/">{{ couple }}</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>