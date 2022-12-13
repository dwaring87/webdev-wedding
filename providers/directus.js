import { joinURL, withQuery } from 'ufo';
import { createOperationsGenerator } from '#image';

// TEMP: used for the ad-hoc image generation
import crypto from 'crypto';
import fs from 'fs/promises';

// TEMP: The full path to the project's root directory
const root_dir = import.meta.url.substring(0, import.meta.url.indexOf('.nuxt'));

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

export const getImage = (src, { 
    modifiers = {}, 
    baseURL, 
    token, 
    output_dir = '.output/public/', 
    image_dir = '_images/'
} = {}) => {
  
  // Base URL is a required provider option (set in nuxt.config file)
  if ( !baseURL || baseURL === '' ) {
    throw "[ERROR] Directus image provider baseURL option is required!";
  }

  // Build URL with query params
  const { width, height, format, quality, fit, ...providerModifiers } = modifiers;
  const params = operationsGenerator({ width, height, format, quality, fit });
  const transforms = transformsGenerator(providerModifiers);
  const url = withQuery(joinURL(baseURL, 'assets', src, params ? '?' + params : ''), { transforms, access_token: token});

  // TEMP: Generate the images when run on the server during prerendering
  if ( process.server && process.env.prerender ) {
    const delta = Math.floor((new Date().getTime() - (process.uptime()*1000))/10);
    const hash = crypto.createHash('md5').update(url + '|' + delta).digest("hex");
    const image_name = `${hash}.${modifiers.format}`;
    const local_path_image = _normalize(`/${image_dir}/${image_name}`);                 // absolute path for the web page to the image file
    const full_path_image_dir = _normalize(`${root_dir}/${output_dir}/${image_dir}`);   // absolute path on the server to the image directory
    const full_path_image = _normalize(`${full_path_image_dir}/${image_name}`);         // absolute path on the server to the image file

    // This is a problem: getImage can't be run as async and issues can occur 
    // if the function returns before the image generation is complete
    _generate(url, full_path_image_dir, full_path_image)
      .catch((err) => {
        console.log("--> [ERROR] " + hash + " = " + url);
        console.log(err);
      });

    return { url: local_path_image }
  }
  else {
    return { url }
  }
}

// Convert the Directus-specific modifiers into the required transforms format
// https://docs.directus.io/reference/files.html#advanced-transformations
function transformsGenerator(transforms) {
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

// TEMP: Generate local static images for the specified remote URL
function _generate(url, full_path_image_dir, full_path_image) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    // Make image directory, if not created
    try {
      let f = await fs.open(full_path_image_dir);
      f.close();
    }
    catch (err) {
      await fs.mkdir(full_path_image_dir);
    }

    // Write the image, if it doesn't already exist
    try {
      let f = await fs.open(full_path_image);
      f.close();
    }
    catch (err) {
      try {
        await fs.writeFile(full_path_image, new Buffer.from(buffer));
      }
      catch (err2) {
        return reject(err2);
      }
    }

    return resolve();
  });
}

// TEMP: normalize file URLs
function _normalize(url) {
  url = url.replace(/(https?:\/\/)|(\/)+/g, "$1$2");
  url = url.replace('file:/', '/', url);
  return url;
}