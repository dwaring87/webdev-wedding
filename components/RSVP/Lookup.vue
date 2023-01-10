<script setup>
  const { getInvitation, getDetails } = useCMS();
  const { sleep } = useSleep();

  const props = defineProps({
    code: String
  });
  const emit = defineEmits(['getInvitation']);

  const email = await getDetails("contact_email");

  const invite_code = ref('');
  watch(invite_code, (new_invite_code) => {
    new_invite_code = new_invite_code.toLowerCase();
    new_invite_code = new_invite_code.replace(/[^a-z]/g, "-");
    new_invite_code = new_invite_code.replace(/-+/g, "-");
    invite_code.value = new_invite_code;
  });

  const error = ref();
  const looking = ref(false);
  const lookup = async () => {
    if ( invite_code.value && invite_code.value !== '' ) {
      error.value = undefined;
      looking.value = true;

      let invitation = await getInvitation(invite_code.value);
      await sleep(500);

      if ( invitation && invitation.value ) {
        looking.value = false;
        emit('getInvitation', invitation.value);
      }
      else {
        error.value = `Invitation Not Found.<br /><br />The invite code <strong><code>${invite_code.value}</code></strong> does not exist.  Double check and make sure the spelling is correct.<br /><br />If you don't know your invite code, reach out to us directly or email us at <a style="text-decoration: underline" href="mailto:${email.value}?subject=[Contact] RSVP Help">${email.value}</a>.`;
        useTrackEvent('RSVP Not Found', { props: { code: invite_code.value } });
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
      :error="error"
      @cancel="looking=false" 
    />

    <div v-else class="flex flex-wrap gap-4 p-8">
      <p><strong>Invite Code:</strong></p>
      <input type="text" v-model="invite_code" placeholder="fuzzy-purple-emu" @keyup.enter="lookup" autofocus />
      <button class="btn-dark w-full" @click="lookup">Find Invitation</button>
    </div>
  </div>
</template>