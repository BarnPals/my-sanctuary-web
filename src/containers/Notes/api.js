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

export const createNoteApi = async (note) => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Create a unique ID.
  const noteID = get(note, 'id') || uuidv4();

  // Create the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Derive note properties.
  const boardID = get(note, 'boardID', '');
  const nodeID = get(note, 'nodeID', '');
  const title = get(note, 'title', '');

  // Escape early if there are missing properties.
  if (!boardID || !nodeID || !title) {
    throw new Error('Cannot create the note because of missing properties.');
  }

  // Derive the new note.
  const newNote = {
    boardID,
    createdAt: timestamp,
    deleted: false,
    id: noteID,
    nodeID,
    title,
    updatedAt: timestamp,
  };

  // Create the note.
  await db
    .collection('notes')
    .doc(noteID)
    .set(newNote);

  // Return back the new note.
  return newNote;
};

export const getNotesApi = async (boardID) => {
  // Escape early if there is no boardID.
  if (!boardID) {
    throw new Error('Cannot fetch notes without knowing the board.');
  }

  // Derive the firebase db.
  const db = firebase.firestore();

  // Get the snapshot.
  const notesSnapshot = await db
    .collection('notes')
    .where('boardID', '==', boardID)
    .where('deleted', '==', false)
    .get();

  // Return the list of ids and the lookup.
  return deriveIDsAndLookupFromSnapshot(notesSnapshot.docs, { only: 'lookup' });
};

export const updateNoteApi = async (note) => {
  // Derive the note' id.
  const id = get(note, 'id');

  // Escape early if there is no id.
  if (!id) {
    throw new Error('Cannot update note without knowing the note ID.');
  }

  // Derive the firebase db.
  const db = firebase.firestore();

  // Derive the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Whitelist kv pairs from note to avoid adding unwanted kv pairs.
  const cleanedNote = pick(note, VALID_FIELDS);

  // Update the document.
  await db
    .collection('notes')
    .doc(id)
    .update({ ...cleanedNote, updatedAt: timestamp });
};
