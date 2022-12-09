<script setup>
  const route = useRoute();
  const { getPage } = useCMS();
  
  let slug = route.params.slug;
  const { data:page } = await useAsyncData(`page-${slug}`, async () => {
    return await getPage(slug);
  });

  if ( !page || !page.value ) {
    showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
  useHead({
    title: page.value.title
  });
</script>

<template>
  <div>
    <Content v-if="page" class="page" :title="page.title" :content="page.content" :updated="page.date_updated" />
  </div>
</template>