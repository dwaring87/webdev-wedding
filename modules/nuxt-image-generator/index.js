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
    const cache = resolve(nuxt.options.rootDir, ".static_images.txt");
    nuxt.options.runtimeConfig.public.nuxt_image_generator = {
      is_static: nuxt.options._generate,
      root_dir: nuxt.options.rootDir,
      cache,
      output_dir,
      image_dir
    };

    // Remove existing cache file
    fs.rm(cache, { force: true });

    // Set Close Hook (generate local images)
    nuxt.hook('close', generateImages);

  }
});


/**
 * Generate images that were set using the composable function
 */
const generateImages = async (nuxt) => {

  // Get runtime options
  const { is_static, root_dir, cache, output_dir, image_dir } = nuxt.options.runtimeConfig.public.nuxt_image_generator;

  // Generate the during nuxt static generation
  if ( is_static ) {

    // Read cache file and parse into images object
    const images = {};
    const cache_contents = await fs.readFile(cache, 'utf-8');
    const lines = cache_contents.split(/\r?\n/);
    lines.forEach((line) => {
      const [hash, url, image_name] = line.split('\t');
      if ( hash && hash !== '' && url && image_name ) {
        images[hash] = { url, image_name };
      }
    });

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