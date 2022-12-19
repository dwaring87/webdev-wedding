import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addImportsDir } from '@nuxt/kit'

import fs from 'fs/promises';

export default defineNuxtModule({
  meta: {
    name: 'nuxt-image-generator',
    configKey: 'nuxt-image-generator',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    output_dir: ".output/public/",
    image_dir: "_images/"
  },
  async setup({ output_dir, image_dir }, nuxt) {

    // Add composable to Nuxt
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url));
    addImportsDir(resolve(runtimeDir, 'composables'));

    // Set runtime options
    nuxt.options.runtimeConfig.public.nuxt_image_generator = { root_dir: nuxt.options.rootDir, output_dir, image_dir };
    nuxt.options.image.static_images = { };

    // Set Close Hook (generate local images)
    nuxt.hook('close', generateImages);

  }
});


/**
 * Generate images that were set using the composable function
 */
const generateImages = async (nuxt) => {

  // Get runtime options
  const { root_dir, output_dir, image_dir } = nuxt.options.runtimeConfig.public.nuxt_image_generator;
  const images = nuxt.options.image.static_images;

  // Generate the during nuxt static generation
  if ( nuxt.options._generate && Object.keys(images).length > 0 ) {
    console.log("Generating " + Object.keys(images).length + " static images...");
    const full_path_image_dir = (`${root_dir}/${output_dir}/${image_dir}`).replaceAll('//', '/');

    // Create image directory, if it doesn't exist
    try {
      let f = await fs.open(full_path_image_dir);
      f.close();
    }
    catch (err) {
      await fs.mkdir(full_path_image_dir);
    }

    // Generate each image
    for ( const hash in images ) {
      if ( images.hasOwnProperty(hash) ) {
        const { url, image_name } = images[hash];
        const full_path_image = (`${full_path_image_dir}/${image_name}`).replaceAll('//', '/');

        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        await fs.writeFile(full_path_image, new Buffer.from(buffer));
      }
    }
  }

}