<script setup>
  const props = defineProps({
    invitation: Object
  });
  const emit = defineEmits(['cancel']);
  
  function cancel() {
    emit('cancel');
  }
</script>

<template>
  <div>
    <h2>{{ invitation.name }}</h2>

    <div class="m-4 p-4 bg-gray-100 border border-gray-400 rounded-md shadow" v-for="(guest, index) in invitation.guests" :key="guest.id">
      <div class="group">
        <p>Name:</p>
        <input :value="guest.name" />
      </div>
      <div class="group">
        <p>Email:</p>
        <input :value="guest.email" />
        <p class="info">Enter your email to receive updates from us about the wedding</p>
      </div>
      <div class="group">
        <p>RSVP (Friday Welcome Dinner):</p>
        <Toggle :enabled="guest.rsvp_welcome" />
        <p class="info">Will you be attending the Welcome Dinner the Friday evening before the wedding?</p>
      </div>
      <div class="group">
        <p>RSVP (Saturday Ceremony &amp; Reception):</p>
        <Toggle :enabled="guest.rsvp_welcome" />
        <p class="info">Will you be attending the wedding ceremony and reception on Saturday?</p>
      </div>
      <div class="group">
        <p>Dietary Restrictions:</p>
      </div>
      <div class="group">
        <p>Comments:</p>
        <textarea rows="5">{{ guest.notes }}</textarea>
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