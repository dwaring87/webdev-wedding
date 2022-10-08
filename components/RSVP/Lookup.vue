<script setup>
  const { getInvitation } = useCMS();
  const emit = defineEmits(['getInvitation']);

  const input_code = ref('');
  watch(input_code, (new_input_code) => {
    new_input_code = new_input_code.toLowerCase();
    new_input_code = new_input_code.replace(/\s/g, "-");
    input_code.value = new_input_code;
  });

  const not_found = ref(false);
  const looking = ref(false);
  async function lookup() {
    if ( input_code.value && input_code.value !== '' ) {
      not_found.value = false;
      looking.value = true;
      
      let invitation = await getInvitation(input_code.value);
      
      looking.value = false;
      not_found.value = invitation === undefined;

      if ( invitation ) {
        emit('getInvitation', invitation);
      }
    }
  }
</script>

<template>
  <div>
    <h2>Find Your Invitation</h2>
    <div class="flex flex-wrap gap-4 p-8">
      <p><strong>Invite Code:</strong></p>
      <input type="text" v-model="input_code" placeholder="fuzzy-purple-emu" @keyup.enter="lookup" />
      <button class="btn-dark w-full" @click="lookup" :disabled="looking">
        Find Invitation
      </button>
    </div>
    <div class="alert mx-8" v-if="not_found">
      Invitation Not Found
    </div>
  </div>
</template>