// Dependencies
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import find from 'lodash/find';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
// Externals
import history from 'store/history';
import { CREATE_BOARD_FEARS, CREATE_BOARD_TITLE } from 'containers/CreateBoardWizard/STEPS';
import { collapseNavAction } from 'containers/Dashboard/actions';
import {
  createBaseNodeAction,
  getNodesAction,
  resetAction as resetNodesAction,
  updatePreviousSelectedNodeIDAction,
} from 'containers/Nodes/actions';
import { getMotivationsAction, resetAction as resetMotivationsAction } from 'containers/Motivations/actions';
import { getNotesAction, resetAction as resetNotesAction } from 'containers/Notes/actions';
import { handleSagaError } from 'utils/helpers/sagaHelpers';
import { selectBottomBarItemAction } from 'containers/BottomBar/actions';
import { selectCreateBoardStepAction } from 'containers/CreateBoardWizard/actions';
import { updateAccountAction } from 'containers/Account/actions';
import { updateModalIDAction } from 'containers/Modal/actions';
// Relative
import { GET_BOARDS, CREATE_BOARD, DELETE_BOARD, UPDATE_BOARD, SELECT_BOARD } from './constants';
import { createBoardApi, deleteBoardApi, getBoardsApi, updateBoardApi } from './api';
import {
  createBoardFailure,
  createBoardSuccess,
  deleteBoardFailure,
  deleteBoardSuccess,
  getBoardsAction,
  getBoardsFailure,
  getBoardsSuccess,
  selectBoardAction,
  updateBoardFailure,
  updateBoardSuccess,
} from './actions';

export function* createBoardSaga({ board }) {
  // Derive the boards.
  const boardIDs = yield select((state) => state.boardsReducer.boardIDs);

  // Derive the organizationID.
  const organizationsLookup = yield select((state) => state.organizationsReducer.organizationsLookup);
  const organization = find(organizationsLookup, ['organizationType', 'PERSONAL']);
  const organizationID = get(organization, 'id');

  try {
    // Create the new board.
    const newBoard = yield call(createBoardApi, { ...board, organizationID });

    // Derive the new board properties.
    const newBoardID = get(newBoard, 'id');
    const newBoardName = get(newBoard, 'name');

    yield all([
      put(createBoardSuccess()),
      // Create base node.
      put(createBaseNodeAction({ boardID: newBoardID, title: newBoardName })),
      // Select the new board.
      put(selectBoardAction(newBoardID)),
      // Refetch boards.
      put(getBoardsAction()),
      // Proceed to the next create board step.
      put(selectCreateBoardStepAction(CREATE_BOARD_FEARS, { showWelcome: isEmpty(boardIDs) })),
    ]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [createBoardFailure] });
  }
}

export function* deleteBoardSaga({ board }) {
  try {
    yield call(deleteBoardApi, board);
    yield all([
      call(history.push, '/boards'),
      put(deleteBoardSuccess()),
      put(getBoardsAction()),
      put(updateModalIDAction()),
    ]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [deleteBoardFailure] });
  }
}

export function* getBoardsSaga({ options }) {
  try {
    // Derive options.
    const navigateToMainBoard = get(options, 'navigateToMainBoard');

    // Fetch boardIDs and boardsLookup.
    const [boardIDs, boardsLookup] = yield call(getBoardsApi);
    yield put(getBoardsSuccess(boardIDs, boardsLookup));

    // Navigate to Create a Board if they don't have one.
    if (isEmpty(boardIDs) || isEmpty(boardsLookup)) {
      yield put(selectCreateBoardStepAction(CREATE_BOARD_TITLE, { showWelcome: true }));
      yield call(history.push, '/boards/create');
      return;
    }

    // Navigate to their main board if they passed the option.
    if (navigateToMainBoard) {
      // Derive the primary boardID.
      const account = yield select((state) => state.accountsReducer.account);
      const primaryBoardID = get(account, 'primaryBoardID');

      // Navigate to the board and select it.
      yield all([call(history.push, '/dashboard'), put(selectBoardAction(primaryBoardID))]);
    }
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [getBoardsFailure] });
  }
}

export function* selectBoardSaga({ id }) {
  // Reset nodes/notes/motivations/bottomBar + collapse side nav.
  yield all([
    put(collapseNavAction()),
    put(resetMotivationsAction()),
    put(resetNodesAction()),
    put(resetNotesAction()),
    put(selectBottomBarItemAction()),
    put(updatePreviousSelectedNodeIDAction()),
  ]);

  // Fetch nodes/notes/motivations.
  yield all([
    put(getNodesAction({ selectBaseNode: true, updateNodeRows: true })),
    put(getNotesAction()),
    put(getMotivationsAction()),
  ]);

  // Update account's primaryBoardID to the new selectedBoardID.
  yield put(updateAccountAction({ primaryBoardID: id }));
}

export function* updateBoardSaga({ board }) {
  try {
    // Update the board.
    yield call(updateBoardApi, board);

    yield all([
      put(updateBoardSuccess()),
      // Refetch the boards.
      put(getBoardsAction()),
    ]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [updateBoardFailure] });
  }
}

export default [
  takeLatest(CREATE_BOARD, createBoardSaga),
  takeLatest(DELETE_BOARD, deleteBoardSaga),
  takeLatest(GET_BOARDS, getBoardsSaga),
  takeLatest(SELECT_BOARD, selectBoardSaga),
  takeLatest(UPDATE_BOARD, updateBoardSaga),
];
