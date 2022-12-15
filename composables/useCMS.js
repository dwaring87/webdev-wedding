export const useCMS = () => {
  const { getItems, getSingletonItem, updateItem } = useDirectusItems();

  /**
   * Get the currently set Alert from the database
   * @returns The title and message of an Alert
   */
  const getAlert = async () => {
    const alert = await getSingletonItem({
      collection: 'alert',
      params: {
        fields: ['title', 'message']
      }
    });
    if ( alert && alert.title && alert.message ) {
      return alert;
    }
  }

  /**
   * Get the metadata (title and slug) for all Pages
   * @returns The metadata of all Pages
   */
  const getPages = async () => {
    const { data } = await useAsyncData('pages', async () => {
      return await getItems({
        collection: 'pages',
        params: {
          fields: ['slug', 'title']
        }
      });
    });
    return data;
  }

  /**
   * Get all information for the specified Page
   * @param slug The page slug
   * @returns The properties of a Page
   */
  const getPage = async (slug) => {
    const { data } = await useAsyncData(`page-${slug}`, async () => {
      const pages = await getItems({
        collection: 'pages',
        params: {
          fields: ['slug', 'title', 'content', 'date_updated'],
          filter: {
            slug: { "_eq": slug }
          }
        }
      })
      if ( pages && pages.length === 1 ) {
        return pages[0];
      }
    });
    return data;
  }

  /**
   * Get the key/value pairs of the requested details
   * @param keys The array of keys to get (return all details, if not defined)
   * @returns The value or an object of key/value pairs
   */
  const getDetails = async (keys) => {
    keys = typeof keys === 'string' ? [keys] : keys;
    const { data } = await useAsyncData(`details-${keys ? keys.sort().join('|') : ''}`, async () => {
      const details = await getItems({
        collection: 'details',
        params: {
          fields: ['key', 'value'],
          filter: {
            key: keys ? { "_in": keys } : undefined
          }
        }
      });

      if ( details && details.length === 1 ) {
        return details[0].value;
      }
      else if ( details && details.length > 1 ) {
        let rtn = {};
        details.forEach((detail) => {
          rtn[detail.key] = detail.value;
        });
        return rtn;
      }
      else {
        return {};
      }
    });
    return data;
  }

  /**
   * Get the key/image id pairs of the requested photos
   * @param keys The array of keys to get (return all photos, if not defined)
   * @returns The image id or an object of key/image id pairs
   */
  const getPhotos = async (keys) => {
    keys = typeof keys === 'string' ? [keys] : keys;
    const { data } = await useAsyncData(`photos-${keys ? keys.sort().join('|') : ''}`, async () => {
      const photos = await getItems({
        collection: 'photos',
        params: {
          fields: ['key', 'image'],
          filter: {
            key: keys ? { "_in": keys } : undefined
          }
        }
      });

      if ( photos && photos.length === 1 ) {
        return photos[0].image;
      }
      else if ( photos && photos.length > 1 ) {
        let rtn = {};
        photos.forEach((photo) => {
          rtn[photo.key] = photo.image;
        });
        return rtn;
      }
      else {
        return {};
      }
    });
    return data;
  }
  

  /**
   * Get the invitation name and associated Guests of the specified Invitation
   * @param code Invite Code
   * @returns Invitation and Guests
   */
  const getInvitation = async (code) => {
    const { data } = useAsyncData(`invitation-${code}`, async () => {
      const invitations = await getItems({
        collection: 'invitations',
        params: {
          fields: ['name', 'invite_code', 'guests.id', 'guests.name', 'guests.email', 'guests.rsvp_welcome', 'guests.rsvp', 'guests.transportation', 'guests.dietary_restrictions', 'guests.notes'],
          filter: {
            invite_code: { '_eq': code }
          }
        }
      });
      if ( invitations && invitations.length === 1 ) {
        return invitations[0];
      }
    });
    return data;
  }

  
  /**
   * Update the Guest Properties
   * @param id The Guest ID
   * @param properties The Updated Guest Properties
   * @returns success flag
   */
  const updateGuest = async (id, properties) => {
    try {
      if ( !id || id === '' ) {
        console.log("ERROR: Guest ID is required!");
        return false;
      }

      for ( const key in properties ) {
        if ( properties.hasOwnProperty(key) ) {
          let value = properties[key];
          if ( typeof value === 'undefined' ) {
            delete properties[key];
          }
        }
      }

      console.log("UPDATE GUEST PROPERTIES:");
      console.log(properties);
      return true;

      await updateItem<Guest>({
        collection: "guests",
        id: id,
        item: properties,
      });
      return true;
    } 
    catch (e) {
      console.log("ERROR: Could not update Guest!");
      console.log(e);
      return false;
    }
  }


  return {
    getAlert,
    getPages,
    getPage,
    getDetails,
    getPhotos,
    getInvitation,
    updateGuest
  }
}