<script setup>
  const loaded = ref(false);
  const invitation = ref();
  const code = ref();

  const onGetInvitation = (i) => {
    invitation.value = i;
    history.replaceState(history.state, null, '?invite=' + i.invite_code);
    window.scrollTo(0, 0);
    useHead({ title: `RSVP - ${i.name}` });
    useTrackEvent('RSVP', { props: { code: i.invite_code, name: i.name } });
  }

  const onCancel = () => {
    invitation.value = undefined;
    code.value = undefined;
    history.replaceState(history.state, null, "?");
    window.scrollTo(0, 0);
    useHead({ title: 'RSVP' });
  }

  onMounted(async () => {
    let urlParams = new URLSearchParams(window.location.search);
    if ( urlParams.has('invite') ) {
      code.value = urlParams.get('invite');
    }
    loaded.value = true;
  });

  useHead({ title: 'RSVP' });
</script>

<template>
  <div class="page">
      <div class="relative bg-white border-2 border-gray-100 rounded-md shadow-xl">
        <div class="grid grid-cols-1 lg:grid-cols-3">
          <RSVPInstructions :invitationFound="!!invitation" class="relative overflow-hidden" />
          <div v-if="loaded" class="py-10 px-4 md:px-8 sm:px-10 lg:col-span-2 xl:p-12">
            <RSVPEdit v-if="invitation" :invitation="invitation" @cancel="onCancel" />
            <RSVPLookup v-else :code="code" @getInvitation="onGetInvitation" />
          </div>
        </div>
      </div>
  </div>
</template>