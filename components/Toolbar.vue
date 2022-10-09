<script setup>
  import RiRiding from '~icons/ri/riding-line';
  import RiAlert from '~icons/ri/alert-fill';
  import RiClose from '~icons/ri/close-circle-fill';
  const { getDetails, getAlert } = useCMS();
  const couple = await getDetails('couple');
  const alert = await getAlert();
  const displayAlert = ref(true);
</script>

<template>
  <div>
    <nav class="bg-emerald-800 text-emerald-100">
      <div class="container">
        <div class="h-14 flex justify-between items-center">
          <div class="flex items-center font-bold opacity-80 hover:opacity-100">
            <NuxtLink to="/"><RiRiding class="inline" />&nbsp;&nbsp;{{ couple }}</NuxtLink>
          </div>
        </div>
      </div>
    </nav>
    <div v-if="alert && displayAlert" class="m-0 w-full md:my-4 md:mx-auto md:max-w-xl">
      <div class="alert rounded-none">
        <div class="flex gap-4 items-center">
          <RiAlert class="w-12" />
          <div>
            <p><strong>{{ alert.title }}</strong></p>
            <div v-html="alert.message"></div>
          </div>
          <div class="flex-grow"></div>
          <RiClose @click="displayAlert = false" class="w-12 hover:cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>