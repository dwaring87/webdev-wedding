export const useCMS = () => {
  const { getItems } = useDirectusItems();

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


  return {
    getDetails,
    getPhotos
  }
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