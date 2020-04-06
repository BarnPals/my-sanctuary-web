// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import trim from 'lodash/trim';
// Externals
import { IDEA, FEAR } from 'containers/Nodes/TYPES';
import { deriveCreateNodeQuestion, deriveNodeCircleIcon } from 'utils/helpers/nodes';
import { createNodeAction } from 'containers/Nodes/actions';
// Relative
import { Wrapper, StyledField, StyledButton } from './styles';

class NodeCreate extends Component {
  static propTypes = {
    // From mapStateToProps.
    creating: PropTypes.bool.isRequired,
    nodesLookup: PropTypes.object.isRequired,
    selectedNodeID: PropTypes.string.isRequired,
    // From mapDispatchToProps.
    createNode: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  onTitleEnter = (event) => {
    if (event.keyCode === 13) {
      this.onCreate();
    }
  };

  isCreateValid = () => {
    const { title } = this.state;
    const { creating } = this.props;

    // Escape early if we are already creating.
    if (creating) {
      return false;
    }

    // Escape early if the form is not filled out.
    if (!title) {
      return false;
    }

    return true;
  };

  onCreate = () => {
    const { isCreateValid } = this;
    const { nodesLookup, selectedNodeID } = this.props;
    const { title } = this.state;

    // Escape early if the form is not valid.
    if (!isCreateValid()) {
      return;
    }

    // Derive the parent node properties.
    const node = get(nodesLookup, `[${selectedNodeID}]`);
    const nodeType = get(node, 'nodeType');

    // Derive the opposite node type.
    const oppositeNodeType = nodeType === IDEA ? FEAR : IDEA;

    // Attempt to create the node.
    this.props.createNode({ nodeType: oppositeNodeType, parentID: selectedNodeID, title: trim(title) });

    // Reset state and blur field.
    this.setState({ title: '' });
    document.activeElement.blur();
  };

  render() {
    const { isCreateValid, onCreate, onTitleChange, onTitleEnter } = this;
    const { nodesLookup, selectedNodeID } = this.props;
    const { title } = this.state;

    // Derive the selected node.
    const node = get(nodesLookup, `[${selectedNodeID}]`);
    const nodeType = get(node, 'nodeType');

    // Derive the Node Icon.
    const NodeIcon = deriveNodeCircleIcon(nodeType);

    return (
      <Wrapper>
        <NodeIcon />
        <StyledField
          id="node-create-field"
          maxLength={100}
          onChange={onTitleChange}
          onKeyDown={onTitleEnter}
          placeholder={deriveCreateNodeQuestion(nodeType)}
          type="text"
          value={title}
        />

        {/* Create Node Button */}
        <StyledButton disabled={!isCreateValid()} onClick={onCreate} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  creating: state.nodesReducer.creating,
  nodesLookup: state.nodesReducer.nodesLookup,
  selectedNodeID: state.nodesReducer.selectedNodeID,
});

const mapDispatchToProps = (dispatch) => ({
  createNode: (node) => dispatch(createNodeAction(node)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeCreate);
