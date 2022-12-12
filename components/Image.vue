<script setup>
  const { getPhotos } = useCMS();

  const props = defineProps({
    dKey: String,
    dId: String,
    dSrc: String,
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

  let src;
  if ( props && props.dSrc ) {
    src = props.dSrc;
  }
  if ( props && props.dId ) {
    src = props.dId;
  }
  else if ( props && props.dKey ) {
    let { data } = await useAsyncData(`photo-id-${props.dKey}`, async () => {
      return await getPhotos(props.dKey);
    });
    src = data.value;
  }
</script>

<template>
  <nuxt-img v-if="src" provider="directus" :src="src" 
    :width="width" :height="height" 
    :fit="fit" :quality="quality" 
    :format="format" />
</template>