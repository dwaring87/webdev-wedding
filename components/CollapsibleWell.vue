<script setup>
  import RiExpand from '~icons/ri/add-circle-fill';
  import RiCollapse from '~icons/ri/indeterminate-circle-fill';

  const props = defineProps({
    title: String
  });
  
  const visible = ref(false);
</script>

<template>
  <div class="well">
    <div class="w-full cursor-pointer flex justify-between items-center text-emerald-800/60 hover:text-emerald-800/80" @click="visible = !visible">
      <h3>{{ title }}</h3>
      <div class="relative h-full">
        &nbsp;
        <Transition name="fade">
          <RiExpand v-if="!visible" class="absolute top-1 right-2 text-xl" />
          <RiCollapse v-else class="absolute top-1 right-2 text-xl" />
        </Transition>
      </div>
    </div>
    <Transition name="slide-fade">
      <div v-if="visible">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

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