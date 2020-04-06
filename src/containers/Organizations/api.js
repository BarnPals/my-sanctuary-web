// Dependencies
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import uuidv4 from 'uuid/v4';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import pick from 'lodash/pick';
// Externals
import { deriveIDsAndLookupFromSnapshot } from 'utils/helpers';
// Relative
import VALID_FIELDS from './VALID_FIELDS';

export const createOrganizationApi = async (organization) => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Derive the firebase auth.
  const auth = firebase.auth();

  // Derive the current user properties.
  const currentUser = get(auth, 'currentUser');
  const accountID = get(currentUser, 'uid');

  // Create a unique ID for the organization.
  const organizationID = uuidv4();

  // Create the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Derive the new organization.
  const newOrganization = {
    createdAt: timestamp,
    id: organizationID,
    imageURL: get(
      organization,
      'imageURL',
      'https://firebasestorage.googleapis.com/v0/b/my-sanctuary-barnpals-prod.appspot.com/o/public%2Fimages%2Forganizations%2Forg1.jpg?alt=media',
    ),
    name: get(organization, 'name', ''),
    organizationType: get(organization, 'organizationType', ''),
    updatedAt: timestamp,
  };

  // Create the organization.
  await db
    .collection('organizations')
    .doc(organizationID)
    .set(newOrganization);

  // Create a unique ID for the organization.
  const accountOrganizationID = uuidv4();

  // Derive the new account organization.
  const newAccountOrganization = {
    accountID,
    createdAt: timestamp,
    id: accountOrganizationID,
    organizationID,
    updatedAt: timestamp,
  };

  // Create the account organization.
  await db
    .collection('accountsOrganizations')
    .doc(accountOrganizationID)
    .set(newAccountOrganization);

  // Return back the new organization.
  return newOrganization;
};

export const getOrganizationsApi = async () => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Derive the firebase auth.
  const auth = firebase.auth();

  // Derive the current user properties.
  const currentUser = get(auth, 'currentUser');
  const accountID = get(currentUser, 'uid');

  // Derive the account organizations' snapshot.
  const accountOrganizationsSnapshot = await db
    .collection('accountsOrganizations')
    .where('accountID', '==', accountID)
    .where('deleted', '==', false)
    .get();

  // Derive the organizationIDs.
  const organizationIDs = map(accountOrganizationsSnapshot.docs, (doc) => {
    const accountOrganization = doc.data();
    return get(accountOrganization, 'organizationID');
  });

  // Escape early if there is no fearID.
  if (isEmpty(organizationIDs)) {
    // Return the lookup and list of ids.
    return [[], {}];
  }

  // Get the snapshot.
  // @WARNING: This is making individual requests PER organization, need to update this to batch get in a single transaction.
  const organizationsSnapshot = await Promise.all(
    map(organizationIDs, (id) =>
      db
        .collection('organizations')
        .doc(id)
        .get(),
    ),
  );

  // Iterate over each item and add it to our lookup table.
  return deriveIDsAndLookupFromSnapshot(organizationsSnapshot);
};

export const updateOrganizationApi = async (organization) => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Derive the organization' id.
  const id = get(organization, 'id');

  // Derive the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Whitelist kv pairs from organization to avoid adding unwanted kv pairs.
  const cleanedOrganization = pick(organization, VALID_FIELDS);

  // Update the document.
  await db
    .collection('organizations')
    .doc(id)
    .update({ ...cleanedOrganization, updatedAt: timestamp });
};
