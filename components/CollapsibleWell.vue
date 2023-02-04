<script setup>
  import RiArrowUp from '~icons/ri/arrow-up-s-fill';
  import RiArrowDown from '~icons/ri/arrow-down-s-fill';

  const props = defineProps({
    title: String
  });
  
  const visible = ref(false);
</script>

<template>
  <div class="well">
    <div class="w-full cursor-pointer flex justify-between items-center" @click="visible = !visible">
      <h3>{{ title }}</h3>
      <RiArrowUp v-if="!visible" class="text-2xl text-gray-600" />
      <RiArrowDown v-else class="text-2xl text-gray-600" />
    </div>
    <Transition name="slide-fade">
      <div v-if="visible">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
  .slide-fade-enter-active {
    transition: all 0.5s ease-out;
  }
  .slide-fade-leave-active {
    transition: all 0.3s ease-in;
  }
  .slide-fade-enter-from, .slide-fade-leave-to {
    transform: translateY(-50px);
    opacity: 0;
  }
</style>