<script setup>
  const { updateGuest, getDetails } = useCMS();
  const { sleep } = useSleep();

  const props = defineProps({
    invitation: Object
  });
  const emit = defineEmits(['cancel']);
  const guests = ref(JSON.parse(JSON.stringify(props.invitation.guests)));

  const email = await getDetails("contact_email");
  const DIET = {
    vegan: "Vegan",
    vegetarian: "Vegetarian",
    gluten: "Gluten Free",
    soy: "Soy Allergy",
    nut: "Nut Allergy",
    dairy: "Dairy Allergy",
    other: "Other"
  }
  const updateDietaryRestriction = (guest, key, enabled) => {
    if ( enabled ) {
      if ( guest.dietary_restrictions ) {
        guest.dietary_restrictions.push(key);
      }
      else {
        guest.dietary_restrictions = [key];
      }
    }
    else {
      guest.dietary_restrictions = guest.dietary_restrictions.filter((item) => item !== key);
    }
  }
  
  const cancel = () => {
    emit('cancel');
  }

  const finish = async () => {
    await navigateTo('/page/wedding-info');
  }

  const saving = ref(false);
  const error = ref();
  const success = ref(false);
  const attending = ref(false);
  const save = async () => {
    saving.value = true;
    error.value = undefined;
    success.value = false;
    attending.value = false;
    let errors = [];

    window.scrollTo(0, 0);

    for ( let i = 0; i < guests.value.length; i++ ) {
      const guest = guests.value[i];
      const original = props.invitation.guests[i];
      const updated_guest_props = {
        name: guest.name !== original.name ? guest.name : undefined,
        email: guest.email !== original.email ? guest.email : undefined,
        rsvp_welcome: guest.rsvp_welcome !== original.rsvp_welcome ? guest.rsvp_welcome : undefined,
        rsvp: guest.rsvp !== original.rsvp ? guest.rsvp : undefined,
        dietary_restrictions: JSON.stringify(guest.dietary_restrictions) !== JSON.stringify(original.dietary_restrictions) ? guest.dietary_restrictions : undefined,
        notes: guest.notes !== original.notes ? guest.notes : undefined
      }
      if ( guest.rsvp || guest.rsvp_welcome ) {
        attending.value = true;
      }

      useTrackEvent('RSVP Submit', { props: { code: props.invitation.invite_code, guest: guest.name, ...updated_guest_props } });
      let { success, error } = await updateGuest(guest.id, updated_guest_props);
      await sleep(500);
      if ( !success ) {
        errors.push(`Could not update Guest <strong><em>${guest.name}</em></strong> [${error}].`);
        useTrackEvent('RSVP Error', { props: { code: props.invitation.invite_code, guest: guest.name, error } });
      }
    };

    if ( errors.length > 0 ) {
      error.value = errors.join(`<br />`);
      error.value += `<br /><br />Please try again later.  If the issue persists, please reach out to us directly or email us at <a style="text-decoration: underline" href="mailto:${email.value}?subject=[Contact] RSVP Errors">${email.value}</a>.`;
    }
    else {
      useTrackEvent('RSVP Success', { props: { code: props.invitation.invite_code, name: props.invitation.name } });
      success.value = true;
    }
  }
</script>

<template>
  <div>
    <h2>{{ invitation.name }}</h2>

    <RSVPLoading v-if="saving"
      loading="Updating Guest Information..."
      :error="error"
      :success="success"
      :attending="attending"
      continueLabel="Wedding Information"
      @continue="finish"
      @cancel="saving=false"
    />

    <div v-show="!saving">
      <div class="mx-1 sm:mx-2 md:mx-4 mt-4 mb-8 px-4 bg-gray-100 border border-gray-400 rounded-md shadow" :id="`guest-container-${guest.id}`" v-for="(guest) in guests" :key="guest.id">
        <div class="group">
          <p>Name:</p>
          <input class="guest-name" v-model="guest.name" @input="onInput" />
        </div>
        <div class="group">
          <p>Email:</p>
          <input class="guest-email" v-model="guest.email" />
          <p class="info">Enter your email to receive updates from us about the wedding</p>
        </div>
        <div class="group">
          <p>RSVP (Friday Welcome Dinner):</p>
          <FormToggle class="guest-rsvp-welcome" :enabled="guest.rsvp_welcome" @toggle="(s) => guest.rsvp_welcome = s" />
          <p class="info">Will you be attending the welcome dinner (potluck) the Friday evening before the wedding?</p>
        </div>
        <div class="group">
          <p>RSVP (Saturday Ceremony &amp; Reception):</p>
          <FormToggle class="guest-rsvp" :enabled="guest.rsvp" @toggle="(s) => guest.rsvp = s" />
          <p class="info">Will you be attending the wedding ceremony and reception on Saturday?</p>
        </div>
        <div class="group">
          <p>Dietary Restrictions:</p>
          <div class="flex flex-wrap gap-2">
            <FormCheck class="guest-diet" v-for="(value, key) in DIET" :key="key" :code="key" :label="value" 
              :enabled="guest.dietary_restrictions && guest.dietary_restrictions.includes(key)"
              @check="(s) => updateDietaryRestriction(guest, key, s)" />
          </div>
        </div>
        <div class="group">
          <p>Comments:</p>
          <textarea class="guest-notes" v-model="guest.notes" rows="5"></textarea>
          <p class="info">Any other information we should know?</p>
        </div>
      </div>

      <div class="m-4 flex gap-4 justify-between">
        <button class="btn" @click="cancel">Cancel</button>
        <button class="btn-dark" @click="save">Save</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .group {
    @apply flex flex-col gap-2 py-5;
  }
  .group p {
    @apply font-bold;
  }
  .group p.info {
    @apply text-sm font-normal italic text-gray-500;
  }
</style>