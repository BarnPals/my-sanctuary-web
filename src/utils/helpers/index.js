// Dependencies
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import reduce from 'lodash/reduce';

// ================
// !!!!! WAIT !!!!!
// ================
// Before you put a module in here,
// can you put it in a current helper file?
// Can you create a new helper file for it?
// If you answered no to both of these questions, proceed.
// ==============

// Detects if the given element is in the viewport: .
export const isElementInViewport = (element) => {
  // Escape early if no element was passed.
  if (!isObject(element)) {
    return;
  }

  // Derive the element's boundaries.
  const rect = element.getBoundingClientRect();

  // Determine if the element is visible.
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  );
};

// Derives a list of ids and a lookup table from a snapshot.
export const deriveIDsAndLookupFromSnapshot = (snapshot, options) => {
  // Initialize the lookup table.
  const lookup = {};

  // Derive the list of ids.
  const ids = reduce(
    snapshot,
    (ids, doc) => {
      // Derive the item and its id.
      const item = doc.data();
      const id = get(doc, 'id');

      // Escape early if there is no item.
      if (!item) {
        if (window.FS) {
          window.FS.log('warn', 'Failed to fetch item.', id);
        }
        return ids;
      }

      // Add the item to our lookup.
      lookup[id] = item;

      // Add the id to our list.
      ids.push(id);
      return ids;
    },
    [],
  );

  // Escape early if they only want the lookup table.
  if (get(options, 'only') === 'lookup') {
    return lookup;
  }

  // Escape early if they only want the list of ids.
  if (get(options, 'only') === 'ids') {
    return ids;
  }

  // Return back both the ids and the lookup table.
  return [ids, lookup];
};
