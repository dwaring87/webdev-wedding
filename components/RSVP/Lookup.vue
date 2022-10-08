<script setup>
  const input_code = ref('');
  watch(input_code, (new_input_code) => {
    new_input_code = new_input_code.toLowerCase();
    new_input_code = new_input_code.replace(/\s/g, "-");
    input_code.value = new_input_code;
  });
</script>

<template>
  <div class="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
    <h2>Find Your Invitation</h2>
    <div class="flex flex-wrap gap-4 p-8">
      <p><strong>Invite Code:</strong></p>
      <input type="text" v-model="input_code" placeholder="fuzzy-purple-emu" />
      <a id="invite-lookup" class="btn-dark w-full">Find Invitation</a>
    </div>
  </div>
</template>