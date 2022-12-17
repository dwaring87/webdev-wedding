import { defineNuxtModule } from '@nuxt/kit';
import fs from 'fs/promises';

export default defineNuxtModule({
  meta: {
    name: 'nuxt-image-generator',
    configKey: 'nuxt-image-generator',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {},
  async setup(moduleOptions, nuxt) {
    nuxt.options.image.providers.directus.options._images = {};

    nuxt.hook('close', async (nuxt) => {
      const full_path_image_dir = nuxt.options.image.providers.directus.options._image_dir;
      const images = nuxt.options.image.providers.directus.options._images;
      if ( Object.keys(images).length > 0 ) {
        console.log("Generating Static Images...");

        // Make image directory, if not created
        try {
          let f = await fs.open(full_path_image_dir);
          f.close();
        }
        catch (err) {
          await fs.mkdir(full_path_image_dir);
        }

        // Download each image
        for ( const hash in images ) {
          if ( images.hasOwnProperty(hash) ) {
            const { url, full_path_image } = images[hash];
            console.log("... " + url + " -> " + full_path_image);
            const response = await fetch(url);
            const buffer = await response.arrayBuffer();
            await fs.writeFile(full_path_image, new Buffer.from(buffer));
          }
        }

      }
    });
  }
})