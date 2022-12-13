import crypto from 'crypto';
import fs from 'fs/promises';

const root_dir = import.meta.url.substring(0, import.meta.url.indexOf('.nuxt'));

export function getImage(src, { modifiers, baseURL, token, output_dir, image_dir } = {}) {
  const nuxtApp = useNuxtApp();
  const { width, height, format, fit, quality, ...providerModifiers } = modifiers
  const params = _setParams({width, height, format, fit, quality});
  
  let url = src.indexOf('http') === 0 ? src : _normalize(`${baseURL}/assets/${src}?access_token=${token}&${params}`);

  // Only generate the images when run on the server during prerendering
  if ( nuxtApp.payload.prerenderedAt && typeof window === 'undefined' ) {
    const delta = Math.floor((new Date().getTime() - (process.uptime()*1000))/10);
    const hash = crypto.createHash('md5').update(url + '|' + delta).digest("hex");
    const image_name = `${hash}.${format}`;
    const local_path_image = _normalize(`/${image_dir}/${image_name}`);                 // absolute path for the web page to the image file
    const full_path_image_dir = _normalize(`${root_dir}/${output_dir}/${image_dir}`);   // absolute path on the server to the image directory
    const full_path_image = _normalize(`${full_path_image_dir}/${image_name}`);         // absolute path on the server to the image file

    _generate(url, full_path_image_dir, full_path_image)
      .catch((err) => {
        console.log("--> [ERROR] " + hash + " = " + url);
        console.log(err);
      });

    url = local_path_image;
  }

  return { url }
}


function _generate(url, full_path_image_dir, full_path_image) {
  console.log("--> FETCHING IMAGE: " + url + " -> " + full_path_image);
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


function _normalize(url) {
  url = url.replace(/(https?:\/\/)|(\/)+/g, "$1$2");
  url = url.replace('file:/', '/', url);
  return url;
}

function _setParams(params) {
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