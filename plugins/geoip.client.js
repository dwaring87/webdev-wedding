export default defineNuxtPlugin(() => {
  const { public:config } = useRuntimeConfig();

  // Log the request to the geoip server
  useLazyFetch(
    config.geoip_api, 
    { 
      query: { 
        d: encodeURIComponent(config.geoip_domain),
        u: encodeURIComponent(window.location.pathname)
      }
    }
  );
  
});