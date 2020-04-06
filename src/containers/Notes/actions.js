import {
  CREATE_NOTE,
  CREATE_NOTE_FAILURE,
  CREATE_NOTE_SUCCESS,
  GET_NOTES,
  GET_NOTES_FAILURE,
  GET_NOTES_SUCCESS,
  RESET,
  UPDATE_NOTE,
  UPDATE_NOTE_FAILURE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_IN_LOOKUP,
} from './constants';

// ====================
// CREATE
// ====================
export const createNoteAction = (note) => ({
  note,
  type: CREATE_NOTE,
});

export const createNoteFailure = (error) => ({
  error,
  type: CREATE_NOTE_FAILURE,
});

export const createNoteSuccess = () => ({
  type: CREATE_NOTE_SUCCESS,
});

// ====================
// GET INDEX (MULTIPLE)
// ====================
export const getNotesAction = () => ({
  type: GET_NOTES,
});

export const getNotesFailure = (error) => ({
  error,
  type: GET_NOTES_FAILURE,
});

export const getNotesSuccess = (notesLookup) => ({
  notesLookup,
  type: GET_NOTES_SUCCESS,
});

// ====================
// RESET
// ====================
export const resetAction = () => ({
  type: RESET,
});

// ====================
// UPDATE (with API call)
// ====================
export const updateNoteAction = (note) => ({
  note,
  type: UPDATE_NOTE,
});

export const updateNoteFailure = (error) => ({
  error,
  type: UPDATE_NOTE_FAILURE,
});

export const updateNoteSuccess = () => ({
  type: UPDATE_NOTE_SUCCESS,
});

export const updateNoteInLookupAction = (note) => ({
  note,
  type: UPDATE_NOTE_IN_LOOKUP,
});
