<script setup>
  import RiCheck from '~icons/ri/checkbox-circle-line';
  import RiCheckBlank from '~icons/ri/checkbox-blank-circle-line';

  const props = defineProps({
    code: String,
    label: String,
    enabled: Boolean
  });
  const emit = defineEmits(['check']);

  const state = ref(props.enabled);
  watch(state, (newState) => {
    emit('check', newState);
  });
</script>

<template>
  <button :data-code="code" :data-label="label" :data-enabled="state" @click="state = !state" :class="{'border-cyan-700': state, 'border-gray-100': !state}" class="flex flex-row items-center gap-2 p-4 rounded-md shadow-md bg-white cursor-pointer border-2 w-full sm:w-fit hover:bg-gray-50">
    <RiCheck class="text-cyan-800" v-if="state" />
    <RiCheckBlank class="text-cyan-800" v-else />
    <p :class="{'text-cyan-800 font-bold': state}">{{ label }}</p>
  </button>
</template>