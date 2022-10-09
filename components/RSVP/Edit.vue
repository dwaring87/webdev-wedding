<script setup>
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
  
  function cancel() {
    emit('cancel');
  }
</script>

<template>
  <div>
    <h2>{{ invitation.name }}</h2>

    <div class="mx-4 mt-4 mb-8 p-4 bg-gray-100 border border-gray-400 rounded-md shadow" :id="guest.id" v-for="(guest, index) in invitation.guests" :key="guest.id">
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
        <Toggle class="guest-rsvp-welome" :enabled="guest.rsvp_welcome" />
        <p class="info">Will you be attending the Welcome Dinner the Friday evening before the wedding?</p>
      </div>
      <div class="group">
        <p>RSVP (Saturday Ceremony &amp; Reception):</p>
        <Toggle class="guest-rsvp" :enabled="guest.rsvp_welcome" />
        <p class="info">Will you be attending the wedding ceremony and reception on Saturday?</p>
      </div>
      <div class="group">
        <p>Dietary Restrictions:</p>
        <div class="flex flex-wrap gap-2">
          <Check class="guest-diet" v-for="(value, key) in DIET" :code="key" :label="value" :enabled="guest.dietary_restrictions && guest.dietary_restrictions.includes(key)" />
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
      <button class="btn-dark">Save</button>
    </div>
    
  </div>
</template>

<style scoped>
  .group {
    @apply flex flex-col gap-2 pb-8;
  }
  .group p {
    @apply font-bold;
  }
  .group p.info {
    @apply font-normal italic text-gray-600;
  }
</style>