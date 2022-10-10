<script setup>
  const { getDetails } = useCMS();
  const email = await getDetails("contact_email");
</script>

<template>
  <div class="bg-secondary py-4 px-6 sm:px-10 lg:py-12 rounded-t-md lg:rounded-tr-none lg:rounded-tl-md lg:rounded-bl-md">
    <h1 class="text-white">RSVP</h1>
    <div class="instructions mt-6 max-w-3xl text-base text-slate-100">
      <p>To RSVP:</p>
      <ol class="list-decimal pl-8">
        <li>Find the unique invite code from the invitation insert.  This will be a code like <code class="font-bold">fuzzy-purple-emu</code>.</li>
        <li>Enter the code</li>
        <li>RSVP for each of the guests associated with the invitation</li>
      </ol>
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