<script setup>
  const { getPhotos } = useCMS();

  const props = defineProps({
    dKey: String,
    dId: String,
    dSrc: String,
    fit: String,
    width: String,
    height: String,
    sizes: String,
    quality: {
      type: Number,
      default: 90,
    },
    format: {
      type: String,
      default: "png"
    },
    modifiers: Object
  });

  let id = props.dId;
  let w = props.width;
  let h = props.height;
  let fi = props.fit;
  let fo = props.format;
  let q = props.q;

  // Parse parameters from src URL
  if ( props && props.dSrc ) {
    const re_id = "assets\/([^\/?]+)";
    const re_width = "width=([^&]+)";
    const re_height = "height=([^&]+)";
    const re_fit = "fit=([^&]+)";
    const re_format = "format=([^&]+)";
    const re_quality = "quality=([^&]+)";

    const m_id = props.dSrc.match(re_id);
    const m_width = props.dSrc.match(re_width);
    const m_height = props.dSrc.match(re_height);
    const m_fit = props.dSrc.match(re_fit);
    const m_format = props.dSrc.match(re_format);
    const m_quality = props.dSrc.match(re_quality);

    id = m_id ? m_id[1] : undefined;
    w = m_width ? m_width[1] : props.width;
    h = m_height ? m_height[1] : props.height;
    fi = m_fit ? m_fit[1] : props.fit;
    fo = m_format ? m_format[1] : props.format;
    q = m_quality ? m_quality[1] : props.quality;
  }

  // Lookup ID using provided key
  else if ( props && props.dKey ) {
    const data = await getPhotos(props.dKey);
    id = data.value;
  }
</script>

<template>
  <nuxt-img v-if="id" provider="directus" :src="id" 
    :width="w" :height="h" :sizes="sizes"
    :fit="fi" :format="fo" :quality="q" 
    :modifiers="modifiers" preload />
</template>