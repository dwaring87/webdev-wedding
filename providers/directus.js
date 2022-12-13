import { joinURL, withQuery } from 'ufo';
import { createOperationsGenerator } from '#image';

// TEMP: used for the ad-hoc image generation
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

export const getImage = (
  src, 
  { 
    modifiers = {}, 
    baseURL, 
    token, 
    output_dir = '.output/public/', 
    image_dir = '_images/'
  } = {}
) => {
  
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
  if ( process.env.NODE_ENV === 'development' ) {
    return { url }
  }

  // During Production: return the generated local path
  else {

    // Set paths to generated image
    const hash = _md5(url);
    const image_name = `${hash}.${modifiers.format}`;
    const local_path_image = _normalize(`/${image_dir}/${image_name}`);                 // absolute path for the web page to the image file
    const full_path_image_dir = _normalize(`${root_dir}/${output_dir}/${image_dir}`);   // absolute path on the server to the image directory
    const full_path_image = _normalize(`${full_path_image_dir}/${image_name}`);         // absolute path on the server to the image file

    // During Pre-render: Download the image to the server
    if ( process.env.prerender ) {

      // This is a problem: getImage can't be run as async and issues can occur 
      // if the function returns before the image generation is complete
      _generate(url, full_path_image_dir, full_path_image)
        .catch((err) => {
          console.log("--> [ERROR] " + hash + " = " + url);
          console.log(err);
        });

    }

    return { url : local_path_image }

  }

}

// TEMP: Create an md5 hash of the URL for the local image name
function _md5(inputString) {
  var hc="0123456789abcdef";
  function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
  function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
  function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
  function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
  function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
  function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
  function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
  function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
  function sb(x) {
      var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
      for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
      blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
  }
  var i,x=sb(inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
  for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
      a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
      b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
      c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
      d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
      a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
      b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
      c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
      d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
      a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
      b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
      c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
      d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
      a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
      b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
      c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
      d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
      a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
      b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
      c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
      d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
      a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
      b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
  }
  return rh(a)+rh(b)+rh(c)+rh(d);
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