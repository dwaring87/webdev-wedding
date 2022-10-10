<script setup>
  import RiAlert from '~icons/ri/alert-fill';
  import RiClose from '~icons/ri/close-circle-fill';
  const { getAlert } = useCMS();
  const alert = await getAlert();
  const displayAlert = ref(true);
</script>

<template>
  <div v-if="alert && displayAlert" class="m-0 w-full md:my-4 md:mx-auto md:max-w-xl md:shadow-xl">
    <div class="alert rounded-none">
      <div class="flex gap-4 items-center">
        <RiAlert class="w-12" />
        <div>
          <div class="flex border-b border-gray-50/30 mb-2">
            <p class="flex-grow"><strong>{{ alert.title }}</strong></p>
            <RiClose @click="displayAlert = false" class="relative -top-3 -right-6 w-12 hover:cursor-pointer" />
          </div>
          <div v-html="alert.message"></div>
        </div>
      </div>
    </div>
  </div>
</template>