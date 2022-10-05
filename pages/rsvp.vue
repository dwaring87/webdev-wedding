<script setup>
  const { getDetails } = useCMS();
  const email = await getDetails("contact_email");
</script>

<template>
  <div class="max-w-5xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div class="relative bg-white border-2 border-gray-100 rounded-md shadow-xl">
        <div class="grid grid-cols-1 lg:grid-cols-3">
          
          <!-- RSVP Instructions -->
          <div class="relative overflow-hidden bg-emerald-800 py-10 px-6 sm:px-10 xl:p-12 rounded-t-md lg:rounded-tr-none lg:rounded-tl-md lg:rounded-bl-md">
            <h1 class="text-white">RSVP</h1>
            <div class="instructions mt-6 max-w-3xl text-base text-emerald-100">
              <p>
                To RSVP:
                <ol class="list-decimal pl-8">
                  <li>Find the unique invite code from the invitation insert.  This will be a code like <code class="font-bold">fuzzy-purple-emu</code>.</li>
                  <li>Enter the code</li>
                  <li>RSVP for each of the guests associated with the invitation</li>
                </ol>
              </p>
              <p>You can come back and update any of the information later.</p>
              <p>Don't know your invite code? Have any questions?<br />Email us at: <a :href="`mailto:${email}?subject=[Contact] RSVP Help`">{{ email }}</a></p>
            </div>
          </div>

          <!-- Contact form -->
          <div class="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
            <RSVPLookup />
          </div>
        </div>
      </div>
  </div>
</template>

<style scoped>
  .instructions p {
    @apply my-4 !important;
  }
</style>