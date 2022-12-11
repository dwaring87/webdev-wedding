<script setup>
  const { getPhotos } = useCMS();

  const props = defineProps({
    dKey: String,
    dId: String,
    fit: String,
    width: String,
    height: String,
    quality: {
      type: Number,
      default: 90,
    },
    format: {
      type: String,
      default: "png"
    }
  });

  let id;
  if ( props && props.dId ) {
    id = props.dId;
  }
  else if ( props && props.dKey ) {
    let { data } = await useAsyncData(`photo-id-${props.dKey}`, async () => {
      return await getPhotos(props.dKey);
    });
    id = data.value;
  }
</script>

<template>
  <nuxt-img v-if="id" provider="directus" :src="id" 
    :width="width" :height="height" 
    :fit="fit" :quality="quality" 
    :format="format" />
</template>