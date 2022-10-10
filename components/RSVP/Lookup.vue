<script setup>
  const { getInvitation } = useCMS();
  const emit = defineEmits(['getInvitation']);
  const props = defineProps({
    code: String
  });

  const invite_code = ref('');
  watch(invite_code, (new_invite_code) => {
    new_invite_code = new_invite_code.toLowerCase();
    new_invite_code = new_invite_code.replace(/\s/g, "-");
    invite_code.value = new_invite_code;
  });

  const not_found = ref(false);
  const looking = ref(false);
  async function lookup() {
    if ( invite_code.value && invite_code.value !== '' ) {
      not_found.value = false;
      looking.value = true;

      let invitation = await getInvitation(invite_code.value);

      looking.value = false;
      not_found.value = invitation === undefined;

      if ( invitation ) {
        emit('getInvitation', invitation);
      }
    }
  }

  if ( props.code ) {
    invite_code.value = props.code;
    lookup();
  }
</script>

<template>
  <div>
    <h2>Find Your Invitation</h2>
    <div class="flex flex-wrap gap-4 p-8">
      <p><strong>Invite Code:</strong></p>
      <input type="text" v-model="invite_code" placeholder="fuzzy-purple-emu" @keyup.enter="lookup" autofocus />
      <button class="btn-dark w-full" @click="lookup" :disabled="looking">
        Find Invitation
      </button>
    </div>
    <div class="alert mx-8" v-if="not_found">
      Invitation Not Found
    </div>
  </div>
</template>