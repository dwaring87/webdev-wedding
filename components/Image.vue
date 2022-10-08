<script setup>
  import { useRuntimeConfig } from "#app";
  const { getPhotos } = useCMS();
  const config = useRuntimeConfig();

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

  const params = setParams({
    fit: props.fit,
    width: props.width,
    height: props.height,
    quality: props.quality,
    format: props.format,
    access_token: config.directus.token
  });

  const id = props?.dId ? props.dId : props?.dKey ? await getPhotos(props.dKey) : undefined;
  const url = id ? `${config.directus.url}/assets/${id}?${params.toString()}` : undefined;

  function setParams(params) {
    let p = [];
    for ( let key in params ) {
      if ( params.hasOwnProperty(key) ) {
        let value = params[key];
        if ( value && value !== '' ) {
          p.push(`${key}=${value}`);
        }
      }
    }
    return p.join('&');
  }
</script>

<template>
  <nuxt-img v-if="url" :src="url" />
</template>