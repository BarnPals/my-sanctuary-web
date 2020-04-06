// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import get from 'lodash/get';
// Externals
import { updateModalIDAction } from 'containers/Modal/actions';
import { selectNodeAction, updateNodeAction, updateNodeInLookupAction } from 'containers/Nodes/actions';
// Relative
import { CancelButton, DeleteButton, StyledActions, StyledTitle, Wrapper } from './styles';

class NodeDelete extends Component {
  static propTypes = {
    // From mapStateToProps.
    nodesLookup: PropTypes.object.isRequired,
    selectedNodeID: PropTypes.string,
    updating: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    selectNode: PropTypes.func.isRequired,
    updateModalID: PropTypes.func.isRequired,
    updateNode: PropTypes.func.isRequired,
    updateNodeInLookup: PropTypes.func.isRequired,
  };

  onCancel = () => {
    this.props.updateModalID();
  };

  isDeleteValid = () => {
    const { updating } = this.props;

    // Escape early if we're updating.
    if (updating) {
      return false;
    }

    return true;
  };

  onDelete = () => {
    const { nodesLookup, selectNode, updateModalID, selectedNodeID, updateNode, updateNodeInLookup } = this.props;

    // Escape early if delete is not valid.
    if (!this.isDeleteValid()) {
      return;
    }

    // Derive the node properties.
    const node = get(nodesLookup, `[${selectedNodeID}]`);
    const parentID = get(node, 'parentID');

    // Derive the updated node.
    const updatedNode = {
      deleted: true,
      id: selectedNodeID,
    };

    // Derive the parent node properties.
    const parentNode = get(nodesLookup, `[${parentID}]`);
    const childrenIDs = get(parentNode, 'childrenIDs');
    const updatedChildrenIDs = filter(childrenIDs, (id) => id !== selectedNodeID);

    // Derive the updated parent node.
    const updatedParentNode = {
      id: parentID,
      childrenIDs: updatedChildrenIDs,
    };

    // Update the node in our store.
    updateNodeInLookup(updatedNode);
    updateNodeInLookup(updatedParentNode);

    // Attempt to update the node on our server.
    updateNode(updatedNode);
    updateNode(updatedParentNode);

    // Select the parent node and navigate to its NODE_NOTES item.
    selectNode(parentID);

    updateModalID();
  };

  render() {
    const { isDeleteValid, onCancel, onDelete } = this;

    return (
      <Wrapper>
        {/* Title */}
        <StyledTitle>Are you sure?</StyledTitle>

        {/* DELETE BUTTON */}
        <StyledActions>
          <DeleteButton disabled={!isDeleteValid()} onClick={onDelete}>
            Yes, delete it and related cards.
          </DeleteButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </StyledActions>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  nodesLookup: state.nodesReducer.nodesLookup,
  selectedNodeID: state.nodesReducer.selectedNodeID,
  updating: state.nodesReducer.updating,
});

const mapDispatchToProps = (dispatch) => ({
  selectNode: (id) => dispatch(selectNodeAction(id)),
  updateModalID: (id) => dispatch(updateModalIDAction(id)),
  updateNode: (node) => dispatch(updateNodeAction(node)),
  updateNodeInLookup: (node) => dispatch(updateNodeInLookupAction(node)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeDelete);
