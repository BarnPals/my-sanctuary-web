// Dependencies
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import uuidv4 from 'uuid/v4';
import get from 'lodash/get';
import pick from 'lodash/pick';
import sample from 'lodash/sample';
// Externals
import { deriveIDsAndLookupFromSnapshot } from 'utils/helpers';
// Relative
import IMAGE_URLS from './IMAGE_URLS';
import VALID_FIELDS from './VALID_FIELDS';

export const createBoardApi = async (board) => {
  // Derive the firebase auth.
  const auth = firebase.auth();

  // Derive the current user properties.
  const currentUser = get(auth, 'currentUser');
  const accountID = get(currentUser, 'uid');

  // Derive the firebase db.
  const db = firebase.firestore();

  // Create a unique ID.
  const boardID = uuidv4();

  // Create the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Derive the new board.
  const newBoard = {
    createdAt: timestamp,
    creatorAccountID: accountID,
    deleted: false,
    id: boardID,
    imageURL: get(board, 'imageURL', sample(IMAGE_URLS)),
    name: get(board, 'name', ''),
    organizationID: get(board, 'organizationID', ''),
    status: 'ACTIVE',
    updatedAt: timestamp,
  };

  // Create the board.
  await db
    .collection('boards')
    .doc(boardID)
    .set(newBoard);

  // Create a unique ID for the board.
  const accountBoardID = uuidv4();

  // Derive the new account board.
  const newAccountBoard = {
    accountID,
    boardID,
    createdAt: timestamp,
    id: accountBoardID,
    status: 'ACTIVE',
    updatedAt: timestamp,
  };

  // Create the account board.
  await db
    .collection('accountsBoards')
    .doc(accountBoardID)
    .set(newAccountBoard);

  // Return back the new board.
  return newBoard;
};

export const deleteBoardApi = async (board) => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Derive the boardID.
  const boardID = get(board, 'id');

  // Delete the board.
  await db
    .collection('boards')
    .doc(boardID)
    .delete();
};

export const getBoardsApi = async () => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Get the snapshot.
  // @WARNING: This is making individual requests PER board, need to update this to batch get in a single transaction.
  const boardsSnapshot = await db
    .collection('boards')
    .orderBy('createdAt', 'desc')
    .get();

  // Iterate over each item and add it to our lookup table.
  return deriveIDsAndLookupFromSnapshot(boardsSnapshot.docs);
};

export const updateBoardApi = async (board) => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Derive the board properties.
  const id = get(board, 'id');
  const imageURL = get(board, 'imageURL');

  // Attempt to upload the imageURL.
  const uploadedImageURL = await uploadImageApi(imageURL, id);

  // Derive the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Whitelist kv pairs from board to avoid adding unwanted kv pairs.
  const cleanedBoard = pick(board, VALID_FIELDS);

  // Add the uploaded imageURL if provided.
  if (uploadedImageURL) {
    cleanedBoard.imageURL = uploadedImageURL;
  }

  // Update the document.
  await db
    .collection('boards')
    .doc(id)
    .update({ ...cleanedBoard, updatedAt: timestamp });
};

const uploadImageApi = async (imageURL, boardID) => {
  // Escape early if there is no image URL.
  if (!imageURL) {
    return;
  }

  // Derive the firebase storage.
  const storageRef = firebase.storage().ref();

  // Derive the image ref.
  const imageRef = storageRef.child(`boardImages/${boardID}.jpg`);

  // Create upload task.
  await imageRef.put(imageURL, { contentType: 'image/jpeg' });

  // Fetch the downloadURL.
  const downloadURL = await imageRef.getDownloadURL();

  // Return the downloadURL.
  return downloadURL;
};
