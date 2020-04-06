import {
  CREATE_CHILD_NODES,
  CREATE_CHILD_NODES_FAILURE,
  CREATE_CHILD_NODES_SUCCESS,
  CREATE_BASE_NODE,
  CREATE_BASE_NODE_FAILURE,
  CREATE_BASE_NODE_SUCCESS,
  CREATE_NODE,
  CREATE_NODE_FAILURE,
  CREATE_NODE_SUCCESS,
  GET_NODES,
  GET_NODES_FAILURE,
  GET_NODES_SUCCESS,
  RESET,
  SELECT_NODE,
  SELECT_NODE_ITEM,
  UPDATE_NODE,
  UPDATE_NODE_ROWS,
  UPDATE_NODE_FAILURE,
  UPDATE_NODE_IN_LOOKUP,
  UPDATE_NODE_SUCCESS,
  UPDATE_PREVIOUS_SELECTED_NODE_ID,
} from './constants';

// ====================
// CREATE CHILD NODES
// ====================
export const createChildNodesAction = (nodes, parentID) => ({
  nodes,
  parentID,
  type: CREATE_CHILD_NODES,
});

export const createChildNodesFailure = (error) => ({
  error,
  type: CREATE_CHILD_NODES_FAILURE,
});

export const createChildNodesSuccess = () => ({
  type: CREATE_CHILD_NODES_SUCCESS,
});

// ====================
// CREATE DEFAULT NODES
// ====================
export const createBaseNodeAction = (options) => ({
  options,
  type: CREATE_BASE_NODE,
});

export const createBaseNodeFailure = (error) => ({
  error,
  type: CREATE_BASE_NODE_FAILURE,
});

export const createBaseNodeSuccess = () => ({
  type: CREATE_BASE_NODE_SUCCESS,
});

// ====================
// CREATE
// ====================
export const createNodeAction = (node) => ({
  node,
  type: CREATE_NODE,
});

export const createNodeFailure = (error) => ({
  error,
  type: CREATE_NODE_FAILURE,
});

export const createNodeSuccess = () => ({
  type: CREATE_NODE_SUCCESS,
});

// ====================
// GET INDEX (MULTIPLE)
// ====================
export const getNodesAction = (options) => ({
  options,
  type: GET_NODES,
});

export const getNodesFailure = (error) => ({
  error,
  type: GET_NODES_FAILURE,
});

export const getNodesSuccess = (baseNodeID, nodesLookup) => ({
  baseNodeID,
  nodesLookup,
  type: GET_NODES_SUCCESS,
});

// ====================
// RESET
// ====================
export const resetAction = () => ({
  type: RESET,
});

// ====================
// SELECT
// ====================
export const selectNodeAction = (id) => ({
  id,
  type: SELECT_NODE,
});

export const selectNodeItemAction = (item) => ({
  item,
  type: SELECT_NODE_ITEM,
});

// ====================
// UPDATE (with API call)
// ====================
export const updateNodeAction = (node) => ({
  node,
  type: UPDATE_NODE,
});

export const updateNodeFailure = (error) => ({
  error,
  type: UPDATE_NODE_FAILURE,
});

export const updateNodeSuccess = () => ({
  type: UPDATE_NODE_SUCCESS,
});

export const updateNodeInLookupAction = (node, options) => ({
  node,
  options,
  type: UPDATE_NODE_IN_LOOKUP,
});

export const updateNodeRowsAction = (nodeRows) => ({
  nodeRows,
  type: UPDATE_NODE_ROWS,
});

export const updatePreviousSelectedNodeIDAction = (previousSelectedNodeID) => ({
  previousSelectedNodeID,
  type: UPDATE_PREVIOUS_SELECTED_NODE_ID,
});
