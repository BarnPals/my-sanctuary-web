// Dependencies
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import uuidv4 from 'uuid/v4';
import cloneDeep from 'lodash/cloneDeep';
import concat from 'lodash/concat';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
// Externals
import history from 'store/history';
import { NODE_UPDATE } from 'containers/BottomBar/ITEMS';
import { deriveNodeRows } from 'utils/helpers/nodes';
import { getNotesAction } from 'containers/Notes/actions';
import { handleSagaError } from 'utils/helpers/sagaHelpers';
import { selectBottomBarItemAction } from 'containers/BottomBar/actions';
// Relative
import {
  CREATE_BASE_NODE,
  CREATE_CHILD_NODES,
  CREATE_NODE,
  GET_NODES,
  SELECT_NODE,
  UPDATE_NODE,
  UPDATE_NODE_IN_LOOKUP,
} from './constants';
import { createChildNodesApi, createBaseNodeApi, createNodeApi, getNodesApi, updateNodeApi } from './api';
import {
  createBaseNodeFailure,
  createBaseNodeSuccess,
  createChildNodesFailure,
  createChildNodesSuccess,
  createNodeFailure,
  createNodeSuccess,
  getNodesAction,
  getNodesFailure,
  getNodesSuccess,
  selectNodeAction,
  updateNodeFailure,
  updateNodeRowsAction,
  updateNodeSuccess,
} from './actions';

export function* createBaseNodeSaga({ options }) {
  try {
    yield call(createBaseNodeApi, options);
    yield all([put(createBaseNodeSuccess()), put(getNodesAction({ selectBaseNode: true }))]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [createBaseNodeFailure] });
  }
}

export function* createChildNodesSaga({ nodes, parentID }) {
  // Escape early if no parentID is present.
  if (!parentID) {
    console.error('Must pass along a parentID to createChildNodesAction.');
    return;
  }

  // Escape early if no parentID is present.
  if (isEmpty(nodes)) {
    console.error('Must pass along a nodes array to createChildNodesAction.');
    return;
  }

  // Derive the nodeIDs.
  const nodeIDs = map(nodes, (node) => get(node, 'id'));

  // Derive the parent node properties.
  const nodesLookup = yield select((state) => state.nodesReducer.nodesLookup);
  const parentNode = get(nodesLookup, `[${parentID}]`);
  const childrenIDs = get(parentNode, 'childrenIDs', []);

  // Derive the updated children IDs.
  const updatedChildrenIDs = concat(childrenIDs, nodeIDs);

  // Derive the updated parent node.
  const updatedParentNode = {
    childrenIDs: updatedChildrenIDs,
    id: parentID,
  };

  try {
    // Create the new nodes first (so it's ready for the UI).
    yield call(createChildNodesApi, nodes);

    // Update the parent node's childrenIDs.
    yield call(updateNodeApi, updatedParentNode);

    // Derive the first child node (the most important).
    const firstChildNodeID = get(nodes, '[0].id');

    // Refetch our nodes and select the top fear.
    yield all([put(createChildNodesSuccess()), put(getNodesAction({ selectNodeID: firstChildNodeID }))]);

    // Navigate to the dashboard.
    yield call(history.push, '/dashboard');
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [createChildNodesFailure] });
  }
}

export function* createNodeSaga({ node }) {
  // Derive the node properties.
  const parentID = get(node, 'parentID');
  const nodeID = uuidv4();

  // Derive the parent node properties.
  const nodesLookup = yield select((state) => state.nodesReducer.nodesLookup);
  const parentNode = get(nodesLookup, `[${parentID}]`);
  const childrenIDs = cloneDeep(get(parentNode, 'childrenIDs', []));

  // Add the new nodeID at the beginning of the parent node's childrenIDs array.
  childrenIDs.unshift(nodeID);

  // Derive the updated parent node.
  const updatedParentNode = {
    childrenIDs,
    id: parentID,
  };

  // Derive the account and their primary boardID.
  const selectedBoardID = yield select((state) => state.boardsReducer.selectedBoardID);

  try {
    // Create the new node first (so it's ready for the UI).
    yield call(createNodeApi, { ...node, id: nodeID, boardID: selectedBoardID });

    // Update the parent node's childrenIDs.
    if (parentID) {
      yield call(updateNodeApi, updatedParentNode);
    }

    // Refetch our nodes and select the new node.
    yield all([put(createNodeSuccess()), put(getNodesAction({ updateNodeRows: true }))]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [createNodeFailure] });
  }
}

export function* getNodesSaga({ options }) {
  try {
    // Derive the boardID to fetch its nodes.
    const selectedBoardID = yield select((state) => state.boardsReducer.selectedBoardID);

    // Derive all options.
    const boardID = get(options, 'boardID', selectedBoardID);
    const selectNodeID = get(options, 'selectNodeID');
    const selectBaseNode = get(options, 'selectBaseNode');
    const updateNodeRows = get(options, 'updateNodeRows');

    // Escape early if there is no boardID.
    if (!boardID) {
      yield put(getNodesSuccess('', {}, []));
      return;
    }

    // Fetch the baseNodeID and nodesLookup.
    const [baseNodeID, nodesLookup] = yield call(getNodesApi, boardID);

    // Store the baseNodeID and nodesLookup in our Redux store.
    yield put(getNodesSuccess(baseNodeID, nodesLookup));

    // Refetch our notes.
    yield put(getNotesAction());

    // Select the selectNodeID if the option is passed.
    if (selectNodeID) {
      yield put(selectNodeAction(selectNodeID));
    }

    // Select the baseNodeID if the option is passed.
    if (selectBaseNode) {
      yield put(selectNodeAction(baseNodeID));
    }

    // Derive the current selectedNodeID.
    const selectedNodeID = yield select((state) => state.nodesReducer.selectedNodeID);

    // Update node rows if the option is passed.
    if (updateNodeRows) {
      // Derive the new nodeRows.
      const nodeRows = deriveNodeRows(nodesLookup, selectedNodeID);

      // Update the nodeRows.
      yield put(updateNodeRowsAction(nodeRows));
    }
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [getNodesFailure] });
  }
}

export function* selectNodeSaga({ id }) {
  // Derive nodesLookup.
  const nodesLookup = yield select((state) => state.nodesReducer.nodesLookup);

  // Derive the new nodeRows.
  const nodeRows = deriveNodeRows(nodesLookup, id);

  // Update the node rows and select the bottom bar item to be Node.
  yield all([put(updateNodeRowsAction(nodeRows)), put(selectBottomBarItemAction(NODE_UPDATE))]);
}

export function* updateNodeSaga({ node }) {
  try {
    // Update the node.
    yield call(updateNodeApi, node);

    // Only update the nodeRows if they are updating the childrenIDs of the node.
    const updateNodeRows = get(node, 'childrenIDs');

    yield all([
      put(updateNodeSuccess()),
      // Refetch nodes.
      put(getNodesAction({ updateNodeRows: !!updateNodeRows })),
    ]);
  } catch (error) {
    yield call(handleSagaError, error, { actionCreators: [updateNodeFailure] });
  }
}

export function* updateNodeInLookupSaga({ options }) {
  // Derive options.
  const updateNodeRows = get(options, 'updateNodeRows');

  // Update node rows if the option is passed.
  if (updateNodeRows) {
    // Derive nodesLookup and selectedNodeID.
    const nodesLookup = yield select((state) => state.nodesReducer.nodesLookup);
    const selectedNodeID = yield select((state) => state.nodesReducer.selectedNodeID);

    // Derive the new nodeRows.
    const nodeRows = deriveNodeRows(nodesLookup, selectedNodeID);

    // Update the nodeRows.
    yield put(updateNodeRowsAction(nodeRows));
  }
}

export default [
  takeLatest(CREATE_BASE_NODE, createBaseNodeSaga),
  takeLatest(CREATE_CHILD_NODES, createChildNodesSaga),
  takeLatest(CREATE_NODE, createNodeSaga),
  takeLatest(GET_NODES, getNodesSaga),
  takeLatest(SELECT_NODE, selectNodeSaga),
  takeLatest(UPDATE_NODE, updateNodeSaga),
  takeLatest(UPDATE_NODE_IN_LOOKUP, updateNodeInLookupSaga),
];
