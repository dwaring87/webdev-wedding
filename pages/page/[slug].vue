<script setup>
  const route = useRoute();
  const { getPage } = useCMS();
  
  let slug = route.params.slug;
  const page = await getPage(slug);
</script>

<template>
  <Content v-if="page" class="page" :title="page.title" :content="page.content" :modified="page.date_modified" />
  <NotFound v-else />
</template>