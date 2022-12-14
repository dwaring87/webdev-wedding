<script setup>
  const { updateGuest } = useCMS();
  const { sleep } = useSleep();

  const props = defineProps({
    invitation: Object
  });
  const emit = defineEmits(['cancel']);

  const DIET = {
    vegan: "Vegan",
    vegetarian: "Vegetarian",
    gluten: "Gluten Free",
    soy: "Soy Allergy",
    nut: "Nut Allergy",
    dairy: "Dairy Allergy",
    other: "Other"
  }
  
  const cancel = () => {
    emit('cancel');
  }

  const finish = async () => {
    await navigateTo('/page/wedding-info');
  }

  const saving = ref(false);
  const error = ref();
  const success = ref();
  const save = async () => {
    saving.value = true;
    error.value = undefined;
    success.value = undefined;
    let guests = props.invitation.guests;
    window.scrollTo(0, 0);

    let errors = [];
    for ( const guest of guests ) {
      let id = guest.id;
      let container = document.getElementById(`guest-container-${id}`);

      let name = container.getElementsByClassName('guest-name')[0].value;
      let email = container.getElementsByClassName('guest-email')[0].value;
      let rsvp_welcome = container.getElementsByClassName('guest-rsvp-welcome')[0].dataset.enabled === 'true';
      let rsvp = container.getElementsByClassName('guest-rsvp')[0].dataset.enabled === 'true';
      let transportation = container.getElementsByClassName('guest-transportation')[0].dataset.enabled === 'true';
      let dietary_restrictions = [];
      let diet_els = container.getElementsByClassName('guest-diet');
      for ( let i = 0; i < diet_els.length; i++ ) {
        if ( diet_els[i].dataset.enabled && diet_els[i].dataset.enabled === 'true' ) dietary_restrictions.push(diet_els[i].dataset.code);
      }
      let notes = container.getElementsByClassName('guest-notes')[0].value;

      let success = await updateGuest(id, {
        name: name !== guest.name ? name : undefined, 
        email: email !== guest.email ? email : undefined,
        rsvp_welcome: rsvp_welcome !== guest.rsvp_welcome ? rsvp_welcome : undefined,
        rsvp: rsvp !== guest.rsvp ? rsvp : undefined,
        transportation: transportation !== guest.transportation ? transportation : undefined,
        dietary_restrictions: 
          !guest.dietary_restrictions || 
          dietary_restrictions.length !== guest.dietary_restrictions.length || 
          !dietary_restrictions.every((v, i) => v === guest.dietary_restrictions[i]) 
            ? dietary_restrictions 
            : undefined,
        notes: notes !== guest.notes ? notes : undefined
      });
      await sleep(500);

      if ( !success ) {
        errors.push(`<strong>ERROR:</strong> Could not update Guest <em>${name}</em>.  Please try again later.`);
      }
    }

    if ( errors.length > 0 ) {
      error.value = errors.join('<br />');
    }
    else {
      success.value = "Guest Information Updated &mdash; Thank you!!";
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
      @cancel="saving=false" 
      @continue="finish"
    />

    <div v-show="!saving">
      <div class="mx-4 mt-4 mb-8 px-4 bg-gray-100 border border-gray-400 rounded-md shadow" :id="`guest-container-${guest.id}`" v-for="(guest) in invitation.guests" :key="guest.id">
        <div class="group">
          <p>Name:</p>
          <input class="guest-name" :value="guest.name" />
        </div>
        <div class="group">
          <p>Email:</p>
          <input class="guest-email" :value="guest.email" />
          <p class="info">Enter your email to receive updates from us about the wedding</p>
        </div>
        <div class="group">
          <p>RSVP (Friday Welcome Dinner):</p>
          <FormToggle class="guest-rsvp-welcome" :enabled="guest.rsvp_welcome" />
          <p class="info">Will you be attending the welcome dinner (potluck) the Friday evening before the wedding?</p>
        </div>
        <div class="group">
          <p>RSVP (Saturday Ceremony &amp; Reception):</p>
          <FormToggle class="guest-rsvp" :enabled="guest.rsvp_welcome" />
          <p class="info">Will you be attending the wedding ceremony and reception on Saturday?</p>
        </div>
        <div class="group">
          <p>Transportation:</p>
          <FormToggle class="guest-transportation" :enabled="guest.transportation" label_no="Not Interested" label_yes="Interested" />
          <p class="info">Are you interested in transportation to and from the wedding venue?  We are looking into hiring a bus to bring guests to and from Ithaca.  Please let us know (for each person) if you're interested so we know how many seats we would need.  We'll reach out to those that are interested with the details.</p>
        </div>
        <div class="group">
          <p>Dietary Restrictions:</p>
          <div class="flex flex-wrap gap-2">
            <FormCheck class="guest-diet" v-for="(value, key) in DIET" :code="key" :label="value" :enabled="guest.dietary_restrictions && guest.dietary_restrictions.includes(key)" />
          </div>
        </div>
        <div class="group">
          <p>Comments:</p>
          <textarea class="guest-notes" rows="5">{{ guest.notes }}</textarea>
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