<script setup>
  const loaded = ref(false);
  const invitation = ref();
  const code = ref();
  const updated = ref(false);

  function onGetInvitation(i) {
    invitation.value = i;
    history.replaceState(history.state, null, '?invite=' + i.invite_code);
    window.scrollTo(0, 0);
    gtag('event', 'rsvp', {code: i.invite_code, name: i.name});
  }

  function onCancel() {
    invitation.value = undefined;
    code.value = undefined;
    history.replaceState(history.state, null, "?");
    window.scrollTo(0, 0);
  }

  function onUpdated() {
    onCancel();
    updated.value = true;
  }

  onMounted(async () => {
    let urlParams = new URLSearchParams(window.location.search);
    if ( urlParams.has('invite') ) {
      code.value = urlParams.get('invite');
    }
    loaded.value = true;
  });

  useHead({
    title: "RSVP"
  });
</script>

<template>
  <div class="page">
      <div class="relative bg-white border-2 border-gray-100 rounded-md shadow-xl">
        <div class="grid grid-cols-1 lg:grid-cols-3">
          <RSVPInstructions class="relative overflow-hidden" />
          <div v-if="loaded" class="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
            <RSVPUpdated v-if="updated" />
            <RSVPEdit v-else-if="invitation" :invitation="invitation" @cancel="onCancel" @updated="onUpdated" />
            <RSVPLookup v-else :code="code" @getInvitation="onGetInvitation" />
          </div>
        </div>
      </div>
  </div>
</template>