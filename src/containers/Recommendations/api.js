// Dependencies
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import uuidv4 from 'uuid/v4';
import get from 'lodash/get';
import pick from 'lodash/pick';
// Externals
import { deriveIDsAndLookupFromSnapshot } from '../../utils/helpers';
// Relative
import VALID_FIELDS from './VALID_FIELDS';

export const createRecommendationApi = async (recommendation) => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Derive the firebase auth.
  const auth = firebase.auth();

  // Derive the user properties.
  const currentUser = get(auth, 'currentUser');
  const accountID = get(currentUser, 'uid');

  // Create a unique ID.
  const recommendationID = get(recommendation, 'id') || uuidv4();

  // Create the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Derive recommendation properties.
  const boardID = get(recommendation, 'boardID', '');
  const parentNodeID = get(recommendation, 'parentNodeID', '');

  // Escape early if there are missing properties.
  if (!boardID || !parentNodeID) {
    throw new Error('Cannot create the recommendation because of missing properties.');
  }

  // Derive the new recommendation.
  const newRecommendation = {
    boardID,
    creatorAccountID: accountID,
    createdAt: timestamp,
    id: recommendationID,
    parentNodeID,
    status: 'REVIEW',
    title: '',
    updatedAt: timestamp,
  };

  // Create the recommendation.
  await db
    .collection('recommendations')
    .doc(recommendationID)
    .set(newRecommendation);

  // Return back the new recommendation.
  return newRecommendation;
};

export const getRecommendationsApi = async () => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Get the snapshot.
  const recommendationsSnapshot = await db
    .collection('recommendations')
    .orderBy('createdAt', 'desc')
    .get();

  // Return the list of ids and the lookup.
  return deriveIDsAndLookupFromSnapshot(recommendationsSnapshot.docs);
};

export const updateRecommendationApi = async (recommendation) => {
  // Derive the recommendation' id.
  const id = get(recommendation, 'id');

  // Escape early if there is no id.
  if (!id) {
    throw new Error('Cannot update recommendation without knowing the recommendation ID.');
  }

  // Derive the firebase db.
  const db = firebase.firestore();

  // Derive the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Whitelist kv pairs from recommendation to avoid adding unwanted kv pairs.
  const cleanedRecommendation = pick(recommendation, VALID_FIELDS);

  // Update the document.
  await db
    .collection('recommendations')
    .doc(id)
    .update({ ...cleanedRecommendation, updatedAt: timestamp });
};
