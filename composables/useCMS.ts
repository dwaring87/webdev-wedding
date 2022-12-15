export const useCMS = () => {
  const { getItems, getSingletonItem, updateItem } = useDirectusItems();

  /**
   * Get the currently set Alert from the database
   * @returns The title and message of an Alert
   */
  const getAlert = async(): Promise<Alert|undefined> => {
    const alert: Alert = await getSingletonItem({
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
   * Get a Page
   * @returns The properties of a Page
   */
  const getPage = async(slug: string): Promise<Page|undefined> => {
    let pages: Page[] = await getItems({
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
  }

  /**
   * Get the key/value pairs of the requested details
   * @param keys The array of keys to get (return all details, if not defined)
   * @returns The value or an object of key/value pairs
   */
  const getDetails = async (keys?: string|string[]): Promise<string|Details> => {
    keys = typeof keys === 'string' ? [keys] : keys;
    const details: Detail[] = await getItems({
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
      let rtn: Details = {};
      details.forEach((detail) => {
        rtn[detail.key] = detail.value;
      });
      return rtn;
    }
    else {
      return {};
    }
  }

  /**
   * Get the key/image id pairs of the requested photos
   * @param keys The array of keys to get (return all photos, if not defined)
   * @returns The image id or an object of key/image id pairs
   */
  const getPhotos = async(keys?: string|string[]): Promise<string|Photos> => {
    keys = typeof keys === 'string' ? [keys] : keys;
    const photos: Photos[] = await getItems({
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
      let rtn: Photos = {};
      photos.forEach((photo) => {
        rtn[photo.key] = photo.image;
      });
      return rtn;
    }
    else {
      return {};
    }
  }
  

  /**
   * Get the invitation name and associated Guests of the specified Invitation
   * @param code Invite Code
   * @returns Invitation and Guests
   */
  const getInvitation = async(code: string): Promise<Invitation|undefined> => {
    const invitations: Invitation[] = await getItems({
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
  }

  
  /**
   * Update the Guest Properties
   * @param guest The Guest to Update, with new properties set (id is required)
   * @returns success flag
   */
  const updateGuest = async(id: string, properties: Guest): Promise<boolean> => {
    try {
      if ( !id || id === '' ) {
        console.log("ERROR: Guest ID is required!");
        return false;
      }

      let key: keyof Guest;
      for ( key in properties ) {
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
    getPage,
    getDetails,
    getPhotos,
    getInvitation,
    updateGuest
  }
}


/**
 * An Alert
 */
type Alert = {
  title: string,
  message: string
}

/**
 * A Page
 */
type Page = {
  slug: string,
  title: string,
  content: string,
  date_updated: Date
}

/**
 * A Guest
 */
type Guest = {
  id?: string,
  name?: string,
  email?: string,
  rsvp_welcome?: boolean,
  rsvp?: boolean,
  transportation?: boolean,
  dietary_restrictions?: String[],
  notes?: string
}

/**
 * An Invitation and its associated Guests
 */
type Invitation = {
  name: string,
  invite_code: string,
  guests: Guest[]
}

/**
 * A key/value pair from the Details collection
 */
type Detail = {
  key: string,
  value: string
}

/**
 * A collection of Details (key/value pairs)
 */
type Details = {
  [key: Detail["key"]]: Detail["value"];
}

/**
 * A key/id pair from the Photos collection
 */
type Photo = {
  key: string,
  id: string
}

/**
 * A collection of Photos (key/id pairs)
 */
type Photos = {
  [key: Photo["key"]]: Photo["id"];
}

export type { 
  Guest,
  Invitation,
  Page,
  Detail,
  Photo
}