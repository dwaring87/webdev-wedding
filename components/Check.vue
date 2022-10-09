<script setup>
  import RiCheck from '~icons/ri/checkbox-circle-line';
  import RiCheckBlank from '~icons/ri/checkbox-blank-circle-line';

  defineProps({
    code: String,
    label: String,
    enabled: Boolean
  });
</script>

<template>
  <button :data-code="code" :data-label="label" :data-enabled="enabled" @click="enabled = !enabled" :class="{'border-cyan-700': enabled, 'border-gray-100': !enabled}" class="flex flex-row items-center gap-2 p-4 rounded-md shadow-md bg-white cursor-pointer border-2 w-full sm:w-fit hover:bg-gray-50">
    <RiCheck class="text-cyan-800" v-if="enabled" />
    <RiCheckBlank class="text-cyan-800" v-else />
    {{ label }}
  </button>
</template>