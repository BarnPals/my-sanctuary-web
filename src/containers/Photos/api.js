// Externals
import request, { addQueryParams } from 'utils/helpers/request';

export const fetchPhotosApi = async (queryParams) => {
  // Create options.
  const options = {
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
    },
    method: 'GET',
  };

  // Construct the URL.
  const URL = addQueryParams('https://api.unsplash.com/collections/1368747/photos', queryParams);

  // Make request.
  return request(URL, options);
};
