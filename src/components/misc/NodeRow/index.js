// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import get from 'lodash/get';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
// Externals
import Node from 'components/misc/Node';
import { FEAR, IDEA } from 'containers/Nodes/TYPES';
import { NODE_CREATE } from 'containers/BottomBar/ITEMS';
import { deriveCreateNodeQuestion, deriveNodeSecondaryColor } from 'utils/helpers/nodes';
import { selectBottomBarItemAction } from 'containers/BottomBar/actions';
import { selectNodeAction, updateNodeAction, updateNodeInLookupAction } from 'containers/Nodes/actions';
// Relative
import { StyledQuestionWrapper, StyledQuestionText, StyledPlusButton, Wrapper, Nodes } from './styles';

const SortableItem = sortableElement(({ nodeID }) => <Node nodeID={nodeID} />);

const SortableContainer = sortableContainer(({ children }) => <Nodes>{children}</Nodes>);

class NodeRow extends Component {
  static propTypes = {
    darkenBackground: PropTypes.bool.isRequired,
    nodeRow: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nodeIDs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      nodeType: PropTypes.string.isRequired,
      parentNodeID: PropTypes.string.isRequired,
    }).isRequired,
    // From mapStateToProps.
    selectedNodeID: PropTypes.string.isRequired,
    // From mapDispatchToProps.
    selectBottomBarItem: PropTypes.func.isRequired,
    selectNode: PropTypes.func.isRequired,
    updateNode: PropTypes.func.isRequired,
    updateNodeInLookup: PropTypes.func.isRequired,
  };

  onSortStart = () => {
    document.activeElement.blur();
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { nodeRow, updateNodeInLookup, updateNode } = this.props;

    // Derive the parent node.
    const parentNodeID = get(nodeRow, 'parentNodeID');
    const nodeIDs = get(nodeRow, 'nodeIDs');

    // Derive the updated node.
    const updatedNodeIDs = arrayMove(nodeIDs, oldIndex, newIndex);
    const updatedNode = { id: parentNodeID, childrenIDs: updatedNodeIDs };

    // Update our state immediately.
    updateNodeInLookup(updatedNode, { updateNodeRows: true });

    // Make the request to update the parent node.
    updateNode(updatedNode);
  };

  onQuestionClick = () => {
    const { nodeRow, selectBottomBarItem, selectNode, selectedNodeID } = this.props;

    // Derive node row properties.
    const parentNodeID = get(nodeRow, 'parentNodeID');

    // Select the parent node if it's not already selected.
    if (parentNodeID !== selectedNodeID) {
      selectNode(parentNodeID);
    }

    // Show the node create bottom bar.
    selectBottomBarItem(NODE_CREATE);
  };

  render() {
    const { onSortStart, onSortEnd, onQuestionClick } = this;
    const { darkenBackground, nodeRow, selectedNodeID } = this.props;

    // Derive node row properties.
    const nodeIDs = get(nodeRow, 'nodeIDs');
    const nodeType = get(nodeRow, 'nodeType');
    const parentNodeID = get(nodeRow, 'parentNodeID');

    // Derive the opposite node type.
    const oppositeNodeType = nodeType === FEAR ? IDEA : FEAR;

    // Derive if this is the node row in question.
    const isParentSelected = parentNodeID === selectedNodeID;

    return (
      <Wrapper darkenBackground={darkenBackground}>
        {/* Row Question */}
        <StyledQuestionWrapper
          onClick={onQuestionClick}
          style={{
            background: isParentSelected ? deriveNodeSecondaryColor(oppositeNodeType) : undefined,
            opacity: isParentSelected ? '1' : '0.3',
          }}
        >
          <StyledQuestionText>{deriveCreateNodeQuestion(oppositeNodeType)}</StyledQuestionText>
          <StyledPlusButton />
        </StyledQuestionWrapper>

        {/* Nodes */}
        {!isEmpty(nodeIDs) && (
          <SortableContainer axis="xy" distance={1} onSortEnd={onSortEnd} onSortStart={onSortStart}>
            {map(nodeIDs, (nodeID, index) => (
              <SortableItem disabled={window.innerWidth < 650} key={nodeID} index={index} nodeID={nodeID} />
            ))}
          </SortableContainer>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedNodeID: state.nodesReducer.selectedNodeID,
});

const mapDispatchToProps = (dispatch) => ({
  selectBottomBarItem: (item) => dispatch(selectBottomBarItemAction(item)),
  selectNode: (id) => dispatch(selectNodeAction(id)),
  updateNode: (node) => dispatch(updateNodeAction(node)),
  updateNodeInLookup: (node, options) => dispatch(updateNodeInLookupAction(node, options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeRow);
