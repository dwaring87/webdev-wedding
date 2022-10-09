export const useCMS = () => {
  const { getItems, updateItem } = useDirectusItems();

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
        fields: ['name', 'invite_code', 'guests.id', 'guests.name', 'guests.email', 'guests.rsvp_welcome', 'guests.rsvp', 'guests.dietary_restrictions', 'guests.notes'],
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
   * @param id Guest ID
   * @param name Guest Name
   * @param email Guest Email
   * @param rsvp_welcome Guest RSVP to Welcome Dinner
   * @param rsvp Guest RSVP to Wedding
   * @param dietary_restrictions String of Guest's Dietary Restrictions
   * @param notes Guest Notes
   * @returns success flag
   */
  const updateGuest = async(id: string, name: string, email: string, rsvp_welcome: boolean, rsvp: boolean, dietary_restrictions: String[], notes: string): Promise<boolean> => {
    try {
      const guest: Guest = {
        id,
        name,
        email,
        rsvp_welcome,
        rsvp,
        dietary_restrictions,
        notes
      }
      await updateItem<Guest>({
        collection: "guests",
        id: guest.id,
        item: guest,
      });
      return true;
    } catch (e) {
      console.log("ERROR: Could not update Guest!");
      console.log(e);
      return false;
    }
  }


  return {
    getDetails,
    getPhotos,
    getInvitation,
    updateGuest
  }
}


/**
 * A Guest
 */
type Guest = {
  id: string,
  name: string,
  email: string,
  rsvp_welcome: boolean,
  rsvp: boolean,
  dietary_restrictions: String[],
  notes: string
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
  Detail,
  Photo
}