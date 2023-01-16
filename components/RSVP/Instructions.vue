<script setup>
  import RiMail from '~icons/ri/mail-check-fill';

  const { getDetails } = useCMS();
  const email = await getDetails("contact_email");
  const props = defineProps({
    invitationFound: Boolean
  });
</script>

<template>
  <div class="bg-secondary py-4 px-6 sm:px-10 lg:py-12 rounded-t-md lg:rounded-tr-none lg:rounded-tl-md lg:rounded-bl-md">
    <h1 class="text-white"><RiMail class="inline" />&nbsp;&nbsp;RSVP</h1>
    <div class="instructions mt-6 max-w-3xl text-base text-slate-100">

      <!-- Instructions for filling out the RSVP -->
      <div v-if="invitationFound">
        <p class="font-semibold">To RSVP:</p>
        <ol>
          <li>Make sure to RSVP for each person</li>
          <li>RSVP for both the Friday Welcome Dinner and the Saturday Ceremony &amp; Reception</li>
          <li>Add any dietary restrictions</li>
          <li>Click the <strong>Save</strong> button at the bottom</li>
        </ol>
      </div>

      <!-- Instructions for Finding the Invitation -->
      <div v-else>
        <p class="font-semibold">To Find Your Invitation:</p>
        <ol>
          <li>Find the unique invite code from the invitation RSVP insert.  This will be a code like <code class="font-bold">fuzzy-purple-emu</code>.</li>
          <li>Enter the invite code</li>
          <li>Click the <strong>Find Invitation</strong> button</li>
        </ol>
      </div>

      <p>You can come back and update any of the information later.</p>
      <p>Don't know your invite code? Have any questions?<br />Email us at: <a :href="`mailto:${email}?subject=[Contact] RSVP Help`">{{ email }}</a></p>
    </div>
  </div>
</template>

<style scoped>
  .instructions p {
    @apply my-4 !important;
  }
</style>