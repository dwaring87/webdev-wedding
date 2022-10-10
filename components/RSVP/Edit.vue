<script setup>
  const { updateGuest } = useCMS();
  const props = defineProps({
    invitation: Object
  });
  const emit = defineEmits(['cancel', 'updated']);

  const DIET = {
    vegan: "Vegan",
    vegetarian: "Vegetarian",
    gluten: "Gluten Free",
    soy: "Soy Allergy",
    nut: "Nut Allergy",
    dairy: "Dairy Allergy",
    other: "Other"
  }
  
  function cancel() {
    emit('cancel');
  }

  const saving = ref(false);
  const errors = ref([]);
  function save() {
    saving.value = true;
    errors.value = [];
    let guests = props.invitation.guests;

    guests.forEach(async (guest) => {
      let id = guest.id;
      let container = document.getElementById(id);
      let name = container.getElementsByClassName('guest-name')[0].value;
      let email = container.getElementsByClassName('guest-email')[0].value;
      let rsvp_welcome = container.getElementsByClassName('guest-rsvp-welcome')[0].dataset.enabled === 'true';
      let rsvp = container.getElementsByClassName('guest-rsvp')[0].dataset.enabled === 'true';
      let diet = [];
      let diet_els = container.getElementsByClassName('guest-diet');
      for ( let i = 0; i < diet_els.length; i++ ) {
        if ( diet_els[i].dataset.enabled && diet_els[i].dataset.enabled === 'true' ) diet.push(diet_els[i].dataset.code);
      }
      let notes = container.getElementsByClassName('guest-notes')[0].value;

      let success = await updateGuest(id, name, email, rsvp_welcome, rsvp, diet, notes);
      if ( !success ) {
        errors.value.push(`<strong>ERROR:</strong> Could not update Guest <em>${name}</em>.  Please try again later.`);
      }
    });

    saving.value = false;
    if ( !errors.value || errors.value.length === 0 ) {
      emit('updated');
    }
  }
</script>

<template>
  <div>
    <h2>{{ invitation.name }}</h2>

    <div class="mx-4 mt-4 mb-8 px-4 bg-gray-100 border border-gray-400 rounded-md shadow" :id="guest.id" v-for="(guest, index) in invitation.guests" :key="guest.id">
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
      <button class="btn-dark" @click="save" :disabled="saving">Save</button>
    </div>

    <div class="alert" v-if="errors && errors.length > 0">
      <p v-for="error in errors" v-html="error"></p>
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