<template>
  <div class="flex flex-col w-full min-h-screen">
    <Toolbar class="fixed top-0 left-0 w-full z-30" />
    <main class="pt-14">
      <slot />
    </main>
    <Footer class="mt-auto" />
  </div>
</template>

<style src="@/assets/default.css"></style>