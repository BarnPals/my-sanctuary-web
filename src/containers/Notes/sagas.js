// Dependencies
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import uuidv4 from 'uuid/v4';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
// Externals
import { getNodesAction } from 'containers/Nodes/actions';
import { handleSagaError } from 'utils/helpers/sagaHelpers';
import { updateNodeApi } from 'containers/Nodes/api';
// Relative
import { CREATE_NOTE, GET_NOTES, UPDATE_NOTE } from './constants';
import { createNoteApi, getNotesApi, updateNoteApi } from './api';
import {
  createNoteFailure,
  createNoteSuccess,
  getNotesAction,
  getNotesFailure,
  getNotesSuccess,
  updateNoteFailure,
  updateNoteSuccess,
} from './actions';

export function* createNoteSaga({ note }) {
  // Derive the note properties.
  const nodeID = get(note, 'nodeID');
  const noteID = uuidv4();

  // Derive the node properties.
  const nodesLookup = yield select((state) => state.nodesReducer.nodesLookup);
  const node = get(nodesLookup, `[${nodeID}]`);
  const noteIDs = cloneDeep(get(node, 'noteIDs', []));

  // Add the new noteID at the beginning of the parent note's noteIDs array.
  noteIDs.unshift(noteID);

  // Derive the updated node.
  const updatedNode = {
    id: nodeID,
    noteIDs,
  };

  try {
    // Create the new note first (so it's ready for the UI).
    yield call(createNoteApi, { ...note, id: noteID });

    // Update the node's noteIDs.
    yield call(updateNodeApi, updatedNode);

    // Refetch our notes and nodes.
    yield all([put(createNoteSuccess()), put(getNotesAction()), put(getNodesAction())]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [createNoteFailure] });
  }
}

export function* getNotesSaga() {
  try {
    // Derive the boardID.
    const selectedBoardID = yield select((state) => state.boardsReducer.selectedBoardID);

    // Escape early if there is no boardID.
    if (!selectedBoardID) {
      yield put(getNotesSuccess({}));
      return;
    }

    // Fetch the notesLookup.
    const notesLookup = yield call(getNotesApi, selectedBoardID);

    // Store the notesLookup in our Redux store.
    yield put(getNotesSuccess(notesLookup));
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [getNotesFailure] });
  }
}

export function* updateNoteSaga({ note }) {
  try {
    yield call(updateNoteApi, note);
    yield all([put(getNotesAction()), put(updateNoteSuccess())]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [updateNoteFailure] });
  }
}

export default [
  takeLatest(CREATE_NOTE, createNoteSaga),
  takeLatest(GET_NOTES, getNotesSaga),
  takeLatest(UPDATE_NOTE, updateNoteSaga),
];
