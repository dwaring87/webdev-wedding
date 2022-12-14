<script setup>
  const { getInvitation } = useCMS();
  const { sleep } = useSleep();
  const emit = defineEmits(['loading', 'getInvitation']);
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
      await sleep(500);

      if ( invitation ) {
        looking.value = false;
        emit('getInvitation', invitation);
      }
      else {
        not_found.value = true;
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

    <RSVPLoading v-if="looking" 
      loading="Finding Invitation..." 
      :error="not_found ? `Invitation Not Found.  The invite code <code>${invite_code}</code> does not exist.` : undefined"
      @cancel="looking=false" 
    />

    <div v-else class="flex flex-wrap gap-4 p-8">
      <p><strong>Invite Code:</strong></p>
      <input type="text" v-model="invite_code" placeholder="fuzzy-purple-emu" @keyup.enter="lookup" autofocus />
      <button class="btn-dark w-full" @click="lookup">Find Invitation</button>
    </div>
  </div>
</template>