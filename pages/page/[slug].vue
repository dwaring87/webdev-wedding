<script setup>
  const route = useRoute();
  const { getPage } = useCMS();
  
  let slug = route.params.slug;
  const page = await getPage(slug);
  if ( !page ) {
    showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
</script>

<template>
  <div>
    <Content v-if="page" class="page" :title="page.title" :content="page.content" :updated="page.date_updated" />
  </div>
</template>