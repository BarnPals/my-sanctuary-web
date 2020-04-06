// Dependencies
import uuidv4 from 'uuid/v4';
import get from 'lodash/get';
import size from 'lodash/size';
// Externals
import CircleFearIcon from 'components/primitives/CircleFearIcon';
import CircleIdeaIcon from 'components/primitives/CircleIdeaIcon';
import FearIcon from 'components/primitives/FearIcon';
import IdeaIcon from 'components/primitives/IdeaIcon';
import theme from 'assets/theme';
import { FEAR, IDEA } from 'containers/Nodes/TYPES';

export const deriveNodePrimaryColor = (nodeType, options = {}) => {
  // Derive the color type.
  const colorType = get(options, 'colorType', 'normal');

  // Return idea color.
  if (nodeType === IDEA) {
    return theme.main.colors.blue[colorType];
  }

  // Return fear color.
  if (nodeType === FEAR) {
    return theme.main.colors.red[colorType];
  }
};

export const deriveNodeSecondaryColor = (nodeType, options = {}) => {
  // Derive the color type.
  const colorType = get(options, 'colorType', 'tint');

  // Return idea color.
  if (nodeType === IDEA) {
    return theme.main.colors.yellow[colorType];
  }

  // Return fear color.
  if (nodeType === FEAR) {
    return theme.main.colors.brown[colorType];
  }
};

export const deriveNodeFontSize = (title) => {
  const titleLength = size(title);

  // Larger font if less than 10 chars.
  if (titleLength <= 10) {
    return theme.main.fontSizes.normal;
  }

  // Large font if less than 40 chars.
  if (titleLength <= 40) {
    return theme.main.fontSizes.normal;
  }

  // Normal font.
  return theme.main.fontSizes.normal;
};

export const deriveNodeCircleIcon = (nodeType) => {
  // Render the idea icon.
  if (nodeType === IDEA) {
    return CircleIdeaIcon;
  }

  // Render the fear icon.
  if (nodeType === FEAR) {
    return CircleFearIcon;
  }

  // Do not render an icon if we're here.
  return null;
};

export const deriveNodeIcon = (nodeType) => {
  // Render the idea icon.
  if (nodeType === IDEA) {
    return IdeaIcon;
  }

  // Render the fear icon.
  if (nodeType === FEAR) {
    return FearIcon;
  }

  // Do not render an icon if we're here.
  return null;
};

export const deriveCreateNodeQuestion = (nodeType) => {
  // Return idea row title.
  if (nodeType === IDEA) {
    return "What's holding you back from this idea?";
  }

  // Return fear row title.
  if (nodeType === FEAR) {
    return 'What could you do about this hurdle?';
  }

  // Return blank row title.
  return '';
};

const deriveAllNodeRows = (nodesLookup, nodeRows, id) => {
  // Stop recursing when we've hit the parent node.
  if (!id) {
    return nodeRows;
  }

  // Derive the parent node.
  const node = get(nodesLookup, `[${id}]`);
  const childrenIDs = get(node, 'childrenIDs');
  const nodeType = get(node, 'nodeType');
  const parentID = get(node, 'parentID');

  // Derive the opposite node type.
  const oppositeNodeType = nodeType === IDEA ? FEAR : IDEA;

  // Add the new row to the beginning.
  nodeRows.unshift({
    id: uuidv4(),
    nodeIDs: childrenIDs,
    nodeType: oppositeNodeType,
    parentNodeID: id,
  });

  // Continue building our node rows recursively.
  return deriveAllNodeRows(nodesLookup, nodeRows, parentID);
};

export const deriveNodeRows = (nodesLookup, selectedNodeID) => {
  // Begin with empty node rows.
  const nodeRows = [];

  // Escape early if there is no selectedNodeID.
  if (!selectedNodeID) {
    return nodeRows;
  }

  // Derive the selected node properties.
  const selectedNode = get(nodesLookup, `[${selectedNodeID}]`);
  const childrenIDs = get(selectedNode, 'childrenIDs');
  const parentID = get(selectedNode, 'parentID');
  const selectedNodeType = get(selectedNode, 'nodeType');

  // Derive the opposite node type.
  const oppositeNodeType = selectedNodeType === IDEA ? FEAR : IDEA;

  // Add the last row.
  nodeRows.push({
    id: uuidv4(),
    nodeIDs: childrenIDs,
    nodeType: oppositeNodeType,
    parentNodeID: selectedNodeID,
  });

  // Derive all the other node rows.
  return deriveAllNodeRows(nodesLookup, nodeRows, parentID);
};

export const deriveNodePlaceholder = (nodeType) => {
  // Fear placeholder.
  if (nodeType === FEAR) {
    return 'What worries you about this idea?';
  }

  // Idea placeholder.
  if (nodeType === IDEA) {
    return 'How could you resolve it?';
  }

  // No placeholder if no nodeType is passed.
  return '';
};
