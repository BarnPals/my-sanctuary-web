// Dependencies
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import uuidv4 from 'uuid/v4';
import get from 'lodash/get';
import pick from 'lodash/pick';
// Externals
import { deriveIDsAndLookupFromSnapshot } from 'utils/helpers';
// Relative
import VALID_FIELDS from './VALID_FIELDS';

export const createMotivationApi = async (motivation) => {
  // Escape early if there is no boardID.
  if (!get(motivation, 'boardID')) {
    throw new Error('Cannot create an motivation without it being tied to a board.');
  }
  // Derive the firebase db.
  const db = firebase.firestore();

  // Create a unique ID.
  const id = uuidv4();

  // Create the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Derive the new motivation.
  const newMotivation = {
    boardID: get(motivation, 'boardID', ''),
    createdAt: timestamp,
    deleted: false,
    description: get(motivation, 'description', ''),
    id,
    source: get(motivation, 'source', ''),
    status: 'ACTIVE',
    title: get(motivation, 'title', ''),
    updatedAt: timestamp,
  };

  // Create the snapshot.
  await db
    .collection('motivations')
    .doc(id)
    .set(newMotivation);

  // Return the new motivation.
  return newMotivation;
};

export const getMotivationsApi = async (boardID) => {
  // Escape early if there is no boardID.
  if (!boardID) {
    throw new Error('Cannot fetch motivations without knowing the board.');
  }

  // Derive the firebase db.
  const db = firebase.firestore();

  // Get the snapshot.
  const motivationsSnapshot = await db
    .collection('motivations')
    .where('boardID', '==', boardID)
    .where('deleted', '==', false)
    .orderBy('createdAt', 'desc')
    .get();

  // Return the list of ids and the lookup.
  return deriveIDsAndLookupFromSnapshot(motivationsSnapshot.docs);
};

export const updateMotivationApi = async (motivation) => {
  // Derive the motivation' id.
  const id = get(motivation, 'id');

  // Escape early if there is no id.
  if (!id) {
    throw new Error('Cannot update motivation without knowing the motivation ID.');
  }

  // Derive the firebase db.
  const db = firebase.firestore();

  // Derive the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Whitelist kv pairs from motivation to avoid adding unwanted kv pairs.
  const cleanedMotivation = pick(motivation, VALID_FIELDS);

  // Update the document.
  await db
    .collection('motivations')
    .doc(id)
    .update({ ...cleanedMotivation, updatedAt: timestamp });
};
