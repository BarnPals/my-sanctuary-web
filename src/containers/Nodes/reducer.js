// Dependencies
import get from 'lodash/get';
// Relative
import { NODE_NOTES } from './NODE_ITEMS';
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
  UPDATE_NODE_FAILURE,
  UPDATE_NODE_IN_LOOKUP,
  UPDATE_NODE_ROWS,
  UPDATE_NODE_SUCCESS,
  UPDATE_PREVIOUS_SELECTED_NODE_ID,
} from './constants';

const initialState = {
  // Error.
  error: '',
  // In flight.
  creating: false,
  getting: false,
  updating: false,
  // Data.
  baseNodeID: undefined,
  nodeRows: [],
  nodesLookup: {},
  previousSelectedNodeID: undefined,
  selectedNodeID: undefined,
  selectedNodeItem: NODE_NOTES,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHILD_NODES: {
      return { ...state, creating: true, error: '' };
    }
    case CREATE_CHILD_NODES_FAILURE: {
      return { ...state, creating: false, error: action.error };
    }
    case CREATE_CHILD_NODES_SUCCESS: {
      return { ...state, creating: false };
    }
    case CREATE_BASE_NODE: {
      return { ...state, creating: true, error: '' };
    }
    case CREATE_BASE_NODE_FAILURE: {
      return { ...state, creating: false, error: action.error };
    }
    case CREATE_BASE_NODE_SUCCESS: {
      return { ...state, creating: false };
    }
    case CREATE_NODE: {
      return { ...state, creating: true, error: '' };
    }
    case CREATE_NODE_FAILURE: {
      return { ...state, creating: false, error: action.error };
    }
    case CREATE_NODE_SUCCESS: {
      return { ...state, creating: false };
    }
    case GET_NODES: {
      return { ...state, getting: true, error: '' };
    }
    case GET_NODES_FAILURE: {
      return { ...state, getting: false, error: action.error };
    }
    case GET_NODES_SUCCESS: {
      return {
        ...state,
        baseNodeID: action.baseNodeID,
        getting: false,
        nodesLookup: action.nodesLookup,
      };
    }
    case RESET: {
      return { ...initialState };
    }
    case SELECT_NODE: {
      return { ...state, selectedNodeID: action.id };
    }
    case SELECT_NODE_ITEM: {
      return { ...state, selectedNodeItem: action.item };
    }
    case UPDATE_NODE: {
      return { ...state, updating: true, error: '' };
    }
    case UPDATE_NODE_FAILURE: {
      return { ...state, updating: false, error: action.error };
    }
    case UPDATE_NODE_SUCCESS: {
      return { ...state, updating: false };
    }
    case UPDATE_NODE_IN_LOOKUP: {
      // Derive the node properties.
      const node = get(action, 'node');
      const nodeID = get(node, 'id');

      return {
        ...state,
        nodesLookup: {
          ...state.nodesLookup,
          [nodeID]: {
            ...state.nodesLookup[nodeID],
            ...node,
          },
        },
      };
    }
    case UPDATE_NODE_ROWS: {
      return { ...state, nodeRows: action.nodeRows };
    }
    case UPDATE_PREVIOUS_SELECTED_NODE_ID: {
      return { ...state, previousSelectedNodeID: action.previousSelectedNodeID };
    }
    default: {
      return { ...state };
    }
  }
};
