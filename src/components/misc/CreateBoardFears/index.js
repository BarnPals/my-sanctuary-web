// Dependencies
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import uuidv4 from 'uuid/v4';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import size from 'lodash/size';
// Externals
import { FEAR } from 'containers/Nodes/TYPES';
import { createChildNodesAction } from 'containers/Nodes/actions';
import { updateExampleBoardFearsAction } from 'containers/CreateBoardWizard/actions';
// Relative
import {
  Fear,
  Fears,
  NextButton,
  StyledButton,
  StyledField,
  StyledPosition,
  StyledText,
  StyledTitle,
  Wrapper,
} from './styles';

// Derive the Fear elements.
const SortableItem = sortableElement(({ index, onClick, value }) => (
  <Fear onClick={onClick}>
    {index + 1 < 10 && <StyledPosition>{index + 1}</StyledPosition>}
    {get(value, 'title')}
  </Fear>
));

// Derive the Fears wrapping element.
const SortableContainer = sortableContainer(({ children }) => <Fears>{children}</Fears>);

class CreateBoardFears extends Component {
  static propTypes = {
    // From mapStateToProps.
    fears: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    nodesLookup: PropTypes.object.isRequired,
    selectedNodeID: PropTypes.string,
    // From mapDispatchToProps.
    createChildNodes: PropTypes.func.isRequired,
    updateExampleBoardFears: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onEnter);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEnter);
  }

  onEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.onCreateFear();
    }
  };

  onFearTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  isFearValid = () => {
    const { title } = this.state;

    // Escape early if the board title is not valid.
    if (!title) {
      return false;
    }

    return true;
  };

  onCreateFear = () => {
    const { fears } = this.props;
    const { title } = this.state;

    // Escape early if the board is not valid.
    if (!this.isFearValid()) {
      return;
    }

    // Add the new fear to the end of the fears list.
    const updatedFears = cloneDeep(fears);
    updatedFears.push({ title });

    // Attempt to create the board.
    this.props.updateExampleBoardFears(updatedFears);

    // Reset state.
    this.setState({ title: '' });
  };

  onSortStart = () => {
    // Make sure keyboard isn't up on mobile, otherwise it gets buggy.
    document.activeElement.blur();
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { fears, updateExampleBoardFears } = this.props;

    // Sort the fears.
    const sortedFears = arrayMove(fears, oldIndex, newIndex);

    // Update the fears.
    updateExampleBoardFears(sortedFears);
  };

  onNext = () => {
    const { fears, nodesLookup, selectedNodeID } = this.props;

    // Derive the selectedNode properties.
    const selectedNode = get(nodesLookup, `[${selectedNodeID}]`);
    const boardID = get(selectedNode, 'boardID');

    // Construct the nodes to create.
    const nodes = map(fears, (fear) => ({
      boardID,
      id: uuidv4(),
      nodeType: FEAR,
      parentID: selectedNodeID,
      title: get(fear, 'title', ''),
    }));

    // Attempt to create the new child node.
    this.props.createChildNodes(nodes, selectedNodeID);
  };

  render() {
    const { isFearValid, onCreateFear, onFearTitleChange, onNext, onSortEnd, onSortStart } = this;
    const { fears } = this.props;
    const { title } = this.state;

    return (
      <Wrapper>
        {/* Welcome */}
        <StyledTitle>Great idea!</StyledTitle>

        {/* Label */}
        <StyledText>
          {size(fears) < 3
            ? 'What are 3 parts of this idea you are most worried about?'
            : 'Drag them up and down to make sure your top concern comes first.'}
        </StyledText>

        {/* Add Fear */}
        {size(fears) < 3 && (
          <Fragment>
            {/* Field */}
            <StyledField
              autoFocus
              maxLength={100}
              onChange={onFearTitleChange}
              placeholder="What if... ?"
              type="text"
              value={title}
            />

            {/* Add Button */}
            <StyledButton disabled={!isFearValid()} onClick={onCreateFear}>
              Add
            </StyledButton>
          </Fragment>
        )}

        {/* Fears */}
        {!isEmpty(fears) && (
          <SortableContainer distance={10} lockAxis="y" onSortEnd={onSortEnd} onSortStart={onSortStart}>
            {map(fears, (fear, index) => (
              <SortableItem key={get(fear, 'title')} index={index} value={fear} />
            ))}
          </SortableContainer>
        )}

        {/* Continue to Board */}
        {size(fears) >= 3 && (
          <NextButton onClick={onNext}>I prioritized them. Let&apos;s start solving them!</NextButton>
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  fears: state.createBoardWizardReducer.fears,
  nodesLookup: state.nodesReducer.nodesLookup,
  selectedNodeID: state.nodesReducer.selectedNodeID,
});

const mapDispatchToProps = (dispatch) => ({
  createChildNodes: (nodes, parentID) => dispatch(createChildNodesAction(nodes, parentID)),
  updateExampleBoardFears: (fears) => dispatch(updateExampleBoardFearsAction(fears)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateBoardFears);
