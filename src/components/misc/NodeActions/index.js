// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';
// Externals
import { NODE_DELETE } from 'containers/Modal/MODALS';
import { NODE_NOTES } from 'containers/Dashboard/ITEMS';
import { deriveNodeCircleIcon } from 'utils/helpers/nodes';
import { selectItemAction } from 'containers/Dashboard/actions';
import { updateModalIDAction } from 'containers/Modal/actions';
import { updateNodeAction, updateNodeInLookupAction } from 'containers/Nodes/actions';
// Relative
import { Actions, Wrapper, Item, ResolvedIcon, StyledCounter, NotesIcon, DeleteIcon } from './styles';

class NodeActions extends Component {
  static propTypes = {
    // From mapStateToProps.
    baseNodeID: PropTypes.string,
    nodesLookup: PropTypes.object.isRequired,
    selectedItem: PropTypes.string.isRequired,
    selectedNodeID: PropTypes.string,
    updating: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    selectItem: PropTypes.func.isRequired,
    updateModalID: PropTypes.func.isRequired,
    updateNode: PropTypes.func.isRequired,
    updateNodeInLookup: PropTypes.func.isRequired,
  };

  onTrashClick = () => {
    this.props.updateModalID(NODE_DELETE);
  };

  onNotesClick = () => {
    this.props.selectItem(NODE_NOTES);
  };

  onResolvedClick = () => {
    const { nodesLookup, selectedNodeID, updateNode, updateNodeInLookup, updating } = this.props;

    // Escape early if we're already updating.
    if (updating) {
      return;
    }

    // Derive the node properties.
    const node = get(nodesLookup, `[${selectedNodeID}]`);
    const resolved = get(node, 'resolved');

    // Derive the updated node properties.
    const updatedNode = {
      collapsed: !resolved,
      id: selectedNodeID,
      resolved: !resolved,
    };

    // Update the node immediately in state.
    updateNodeInLookup(updatedNode);

    // Attempt to update the node on the backend.
    updateNode(updatedNode);
  };

  render() {
    const { onResolvedClick, onNotesClick, onTrashClick } = this;
    const { baseNodeID, nodesLookup, selectedNodeID, selectedItem } = this.props;

    // Derive the selected node.
    const node = get(nodesLookup, `[${selectedNodeID}]`);
    const noteIDs = get(node, 'noteIDs');
    const resolved = get(node, 'resolved');
    const nodeType = get(node, 'nodeType');

    // Escape early if there is no node.
    if (!node) {
      return <Wrapper />;
    }

    // Derive which node items to show.
    const showDeleteItem = baseNodeID !== selectedNodeID;

    // Derive the Node Icon.
    const NodeIcon = deriveNodeCircleIcon(nodeType);

    return (
      <Wrapper>
        {/* Node Icon */}
        <NodeIcon />

        <Actions>
          {/* Resolved Button */}
          <Item onClick={onResolvedClick}>
            <ResolvedIcon resolved={resolved} />
          </Item>

          {/* Node Notes Button */}
          <Item onClick={onNotesClick}>
            {!isEmpty(noteIDs) && <StyledCounter>{size(noteIDs)}</StyledCounter>}
            <NotesIcon selected={selectedItem === NODE_NOTES} />
          </Item>

          {/* Node Delete Button */}
          {showDeleteItem && (
            <Item onClick={onTrashClick}>
              <DeleteIcon selected={selectedItem === NODE_DELETE} />
            </Item>
          )}
        </Actions>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  baseNodeID: state.nodesReducer.baseNodeID,
  nodesLookup: state.nodesReducer.nodesLookup,
  selectedItem: state.dashboardReducer.selectedItem,
  selectedNodeID: state.nodesReducer.selectedNodeID,
  updating: state.nodesReducer.updating,
});

const mapDispatchToProps = (dispatch) => ({
  selectItem: (item) => dispatch(selectItemAction(item)),
  updateModalID: (id) => dispatch(updateModalIDAction(id)),
  updateNode: (node) => dispatch(updateNodeAction(node)),
  updateNodeInLookup: (node) => dispatch(updateNodeInLookupAction(node)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeActions);
