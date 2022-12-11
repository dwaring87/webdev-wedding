export function getImage(src, { modifiers, baseURL, token } = {}) {
  const { width, height, format, fit, quality, ...providerModifiers } = modifiers
  const params = _setParams({width, height, format, fit, quality});
  
  let url = `${baseURL}/assets/${src}?access_token=${token}&${params}`;
  url = url.replace(/([^:])(\/\/+)/g, '$1/');
  console.log("==> GET IMAGE: " + src + " --> " + url);
  
  return { url }
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