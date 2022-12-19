import { joinURL, withQuery } from 'ufo';
import { createOperationsGenerator } from '#image';

// TEMP: remove this composable when nuxt image supports static image generation
const { setImage } = useNuxtImageGenerator();

const operationsGenerator = createOperationsGenerator({
  keyMap: {
    width: 'width',
    height: 'height',
    format: 'format',
    quality: 'quality',
    fit: 'fit'
  },
  valueMap: {
    fit: {
      cover: 'cover',
      contain: 'contain',
      fill: 'fill',
      inside: 'inside',
      outside: 'outside'
    },
    format: {
      jpg: 'jpg',
      jpeg: 'jpg',
      png: 'png',
      webp: 'webp',
      tiff: 'tiff'
    }
  },
  joinWith: '&',
  formatter: (key, value) => `${key}=${value}`
});

// Convert the Directus-specific modifiers into the required transforms format
// https://docs.directus.io/reference/files.html#advanced-transformations
const transformsGenerator = (transforms) => {
  let rtn = [];
  if ( transforms && typeof transforms === 'object' ) {
    for ( const key in transforms ) {
      if ( transforms.hasOwnProperty(key) ) {
        let value = transforms[key];
        rtn.push([key, value])
      }
    }
  }
  return rtn.length > 0 ? JSON.stringify(rtn) : undefined;
}

export const getImage = (src, { modifiers = {}, baseURL, token } = {}) => {

  // Base URL is a required provider option (set in nuxt.config file)
  if ( !baseURL || baseURL === '' ) {
    throw "[ERROR] Directus image provider baseURL option is required!";
  }

  // Build URL with query params
  const { width, height, format, quality, fit, ...providerModifiers } = modifiers;
  const params = operationsGenerator({ width, height, format, quality, fit });
  const transforms = transformsGenerator(providerModifiers);
  const url = withQuery(
    joinURL(baseURL, 'assets', src) + (params ? '?' + params : ''), 
    { transforms, access_token: token }
  );

  // During Development: return the original remote URL
  // otherwise return the generated local path
  return {
    url: process.env.NODE_ENV === 'development' ? url : setImage(url, format)
  }

}