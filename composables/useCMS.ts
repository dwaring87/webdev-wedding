export const useCMS = () => {
  const { getItems, getSingletonItem } = useDirectusItems();
  const { getFiles, getThumbnail } = useDirectusFiles();

  /**
   * Get the key/value pairs of the requested details
   * @param keys The array of keys to get (return all details, if not defined)
   * @returns The value
   */
  const getDetails = async (keys?: string|string[]): Promise<string|Details> => {
    keys = typeof keys === 'string' ? [keys] : keys;
    const properties: Detail[] = await getItems({
      collection: 'details',
      params: {
        fields: ['key', 'value'],
        filter: {
          key: keys ? { "_in": keys } : undefined
        }
      }
    });

    if ( properties && properties.length === 1 ) {
      return properties[0].value;
    }
    if ( properties && properties.length > 1 ) {
      let rtn: Details = {};
      properties.forEach((prop) => {
        rtn[prop.key] = prop.value;
      });
      return rtn;
    }
    else {
      return {};
    }
  }


  return {
    getDetails
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