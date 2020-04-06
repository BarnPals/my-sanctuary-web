// Dependencies
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import uuidv4 from 'uuid/v4';
import each from 'lodash/each';
import find from 'lodash/find';
import get from 'lodash/get';
import pick from 'lodash/pick';
// Externals
import { deriveIDsAndLookupFromSnapshot } from 'utils/helpers';
// Relative
import VALID_FIELDS from './VALID_FIELDS';
import { IDEA } from './TYPES';

export const createChildNodesApi = async (nodes) => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Create the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Derive the batch of transactions to commit.
  const batch = db.batch();

  // Queue up our create node commits.
  each(nodes, (node) => {
    // Derive node properties.
    const id = get(node, 'id');

    // Derive the node ref.
    const nodeRef = db.collection('nodes').doc(id);

    // Derive the formatted node.
    const formattedNode = {
      boardID: get(node, 'boardID', ''),
      childrenIDs: [],
      collapsed: false,
      createdAt: timestamp,
      deleted: false,
      description: '',
      id: get(node, 'id', ''),
      nodeType: get(node, 'nodeType', IDEA),
      parentID: get(node, 'parentID', ''),
      resolved: false,
      status: 'ACTIVE',
      title: get(node, 'title', ''),
      updatedAt: timestamp,
    };

    // Set the node to be created.
    batch.set(nodeRef, formattedNode);
  });

  // Create all nodes.
  batch.commit();
};

export const createBaseNodeApi = async (options) => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Derive the boardID and title.
  const boardID = get(options, 'boardID');
  const title = get(options, 'title');

  // Create the nodeIDs.
  const baseNodeID = uuidv4();

  // Create the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Derive the defaultNodes to create.
  const baseNode = {
    boardID,
    childrenIDs: [],
    collapsed: false,
    createdAt: timestamp,
    deleted: false,
    description: '',
    id: baseNodeID,
    nodeType: IDEA,
    parentID: '',
    resolved: false,
    status: 'ACTIVE',
    title,
    updatedAt: timestamp,
  };

  // Create the node.
  await db
    .collection('nodes')
    .doc(baseNodeID)
    .set(baseNode);

  // Return back the new node.
  return baseNode;
};

export const createNodeApi = async (node) => {
  // Derive the firebase db.
  const db = firebase.firestore();

  // Create a unique ID.
  const nodeID = get(node, 'id') || uuidv4();

  // Create the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Derive node properties.
  const boardID = get(node, 'boardID', '');
  const description = get(node, 'description', '');
  const nodeType = get(node, 'nodeType', '');
  const parentID = get(node, 'parentID', '');
  const title = get(node, 'title', '');

  // Escape early if there is no boardID, parentID, nodeType, and title.
  if (!boardID || !parentID || !nodeType) {
    throw new Error('Cannot create the node because of missing properties.');
  }

  // Derive the new node.
  const newNode = {
    boardID,
    childrenIDs: [],
    collapsed: false,
    createdAt: timestamp,
    deleted: false,
    description,
    id: nodeID,
    nodeType,
    parentID,
    resolved: false,
    status: 'ACTIVE',
    title,
    updatedAt: timestamp,
  };

  // Create the node.
  await db
    .collection('nodes')
    .doc(nodeID)
    .set(newNode);

  // Return back the new node.
  return newNode;
};

export const getNodesApi = async (boardID) => {
  // Escape early if there is no boardID.
  if (!boardID) {
    throw new Error('Cannot fetch nodes without knowing the board.');
  }

  // Derive the firebase db.
  const db = firebase.firestore();

  // Get the snapshot.
  const nodesSnapshot = await db
    .collection('nodes')
    .where('boardID', '==', boardID)
    .where('deleted', '==', false)
    .get();

  // Return the list of ids and the lookup.
  const nodesLookup = deriveIDsAndLookupFromSnapshot(nodesSnapshot.docs, { only: 'lookup' });

  // Derive the baseNodeID.
  const baseNode = find(nodesLookup, ['parentID', '']);
  const baseNodeID = get(baseNode, 'id');

  return [baseNodeID, nodesLookup];
};

export const updateNodeApi = async (node) => {
  // Derive the node' id.
  const id = get(node, 'id');

  // Escape early if there is no id.
  if (!id) {
    throw new Error('Cannot update node without knowing the node ID.');
  }

  // Derive the firebase db.
  const db = firebase.firestore();

  // Derive the server timestamp.
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // Whitelist kv pairs from node to avoid adding unwanted kv pairs.
  const cleanedNode = pick(node, VALID_FIELDS);

  // Update the document.
  await db
    .collection('nodes')
    .doc(id)
    .update({ ...cleanedNode, updatedAt: timestamp });
};
