// Dependencies
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import join from 'lodash/join';
import last from 'lodash/last';
import reduce from 'lodash/reduce';
import slice from 'lodash/slice';

// =====================
// Inject query params into our URL.
// =====================
const addQueryParams = (url, queryParams) => {
  // No query params? Give them back the url they gave us.
  if (isEmpty(queryParams)) {
    return url;
  }

  // Inject the query params into the url.
  let modifiedURL = reduce(
    queryParams,
    (urlWithParams, value, key) => {
      // Do not add empty query params.
      if (!value) {
        return urlWithParams;
      }
      // Add query param key-value pair to URL.
      return `${urlWithParams}${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
    },
    `${url}?`,
  );

  // Remove trailing '&' or '?' if it is at the end.
  if (last(modifiedURL) === '&' || last(modifiedURL) === '?') {
    modifiedURL = join(slice(modifiedURL, 0, -1), '');
  }

  // Return back the modified URL with injected query params.
  return modifiedURL;
};

// =====================
// Ensure we return undefined and not null to avoid `null` being saved into our Redux store.
// =====================
const nullCheck = (parsedResponse) => {
  if (parsedResponse === null) {
    return undefined;
  }
  return parsedResponse;
};

// =====================
// Status 204 or 205? Do not try to parse since there's nothing sent over.
// =====================
const cleanEmptyResponse = (response) => {
  if (response.status === 204 || response.status === 205) {
    return undefined;
  }
  return response.data;
};

// =====================
// Main request util.
// =====================
const request = (url, options = {}) => {
  // Clean common `body` instead of `data` mistake.
  if (options.body) {
    options.data = options.skipParsingBody ? options.body : JSON.parse(options.body);
  }

  // Make the request.
  return axios({
    ...options,
    url,
  })
    .then(cleanEmptyResponse)
    .then(nullCheck);
};

// Export main request func and helper funcs.
export default request;
export { addQueryParams };
