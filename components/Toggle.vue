<script setup>
  const props = defineProps({
    enabled: {
      type: Boolean,
      default: false
    },
    label: String,
    displayValue: {
      type: Boolean,
      default: true
    }
  });
</script>

<template>
  <div class="flex gap-4">
    <button type="button" @click="enabled = !enabled" :class="{'bg-cyan-800': enabled, 'bg-gray-200': !enabled}" class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2" role="switch" aria-checked="false">
      <span :class="{'translate-x-5': enabled, 'translate-x-0': !enabled}" class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out">
        <span :class="{'opacity-0': enabled, 'ease-out': enabled, 'duration-100': enabled, 'opacity-100': !enabled, 'ease-in': !enabled, 'duration-200': !enabled}" class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true">
          <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
            <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span :class="{'opacity-100': enabled, 'ease-in': enabled, 'duration-200': enabled, 'opacity-0': !enabled, 'ease-out': !enabled, 'duration-100': !enabled}" class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true">
          <svg class="h-3 w-3 text-cyan-800" fill="currentColor" viewBox="0 0 12 12">
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
    </button>
    <p v-if="displayValue && enabled">YES</p>
    <p v-if="displayValue && !enabled">No</p>
  </div>
</template>