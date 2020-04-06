// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
// Externals
import NodeActions from 'components/misc/NodeActions';
import { UPDATE_DELAY } from 'utils/config';
import { selectItemAction } from 'containers/Dashboard/actions';
import { updateNodeAction, updateNodeInLookupAction } from 'containers/Nodes/actions';
// Relative
import { Wrapper, StyledField } from './styles';

class NodeUpdate extends Component {
  static propTypes = {
    // From mapStateToProps.
    nodesLookup: PropTypes.object.isRequired,
    selectedNodeID: PropTypes.string,
    updating: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    updateNode: PropTypes.func.isRequired,
    updateNodeInLookup: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    clearTimeout(this.updateTimeout);
  }

  onTitleEnter = (event) => {
    const { nodesLookup, selectedNodeID } = this.props;

    if (event.keyCode === 13) {
      event.preventDefault();

      // Derive the node.
      const motivaton = get(nodesLookup, `[${selectedNodeID}]`);

      // Attempt to update.
      this.onUpdate(motivaton);

      // Blur the field.
      document.activeElement.blur();
    }
  };

  onTitleChange = (event) => {
    const { updateNodeInLookup, selectedNodeID } = this.props;

    // Derive the updated node.
    const updatedNode = { id: selectedNodeID, title: event.target.value };

    // Update the title immediately in our store.
    updateNodeInLookup(updatedNode);

    // Save the update after 1s.
    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(() => this.onUpdate(updatedNode), UPDATE_DELAY);
  };

  isUpdateValid = (node) => {
    const { updating } = this.props;

    // Do not update if we are already updating.
    if (updating) {
      return false;
    }

    // Derive node properties.
    const title = get(node, 'title');

    // Do not update if we are missing properties.
    if (!title) {
      return false;
    }

    return true;
  };

  onUpdate = (node) => {
    // Escape early if we shouldn't update.
    if (!this.isUpdateValid(node)) {
      return;
    }

    // Attempt to update.
    this.props.updateNode(node);
  };

  render() {
    const { onTitleChange, onTitleEnter } = this;
    const { nodesLookup, selectedNodeID } = this.props;

    // Derive the node properties.
    const node = get(nodesLookup, `[${selectedNodeID}]`);
    const title = get(node, 'title');

    // Escape early if there is no node found.
    if (!node) {
      return <Wrapper />;
    }

    return (
      <Wrapper>
        {/* Top */}
        <NodeActions />

        {/* Bottom */}
        <StyledField
          id="node-update-field"
          maxLength={100}
          onChange={onTitleChange}
          onKeyDown={onTitleEnter}
          placeholder="What would convince your future self this core idea is important?"
          type="text"
          value={title}
        />
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
  selectItem: (item) => dispatch(selectItemAction(item)),
  updateNode: (node) => dispatch(updateNodeAction(node)),
  updateNodeInLookup: (node) => dispatch(updateNodeInLookupAction(node)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeUpdate);
