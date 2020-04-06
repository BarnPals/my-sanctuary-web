// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
// Externals
import { selectNodeAction, updatePreviousSelectedNodeIDAction } from 'containers/Nodes/actions';
// Relative
import ITEMS, { NODE_CREATE, NODE_UPDATE } from './ITEMS';
import { NoContent, NextButton, PreviousButton, Wrapper } from './styles';

class BottomBar extends Component {
  static propTypes = {
    // From mapStateToProps.
    nodesLookup: PropTypes.object.isRequired,
    selectedBottomBarItem: PropTypes.string,
    selectedNodeID: PropTypes.string,
    // From mapDispatchToProps.
    selectNode: PropTypes.func.isRequired,
    updatePreviousSelectedNodeID: PropTypes.func.isRequired,
  };

  onPreviousClick = () => {
    const { nodesLookup, selectNode, selectedNodeID } = this.props;

    // Derive node properties.
    const node = get(nodesLookup, `[${selectedNodeID}]`);
    const parentID = get(node, 'parentID');

    if (parentID) {
      // Select the parent node.
      selectNode(parentID);
    }
  };

  onNextClick = () => {
    const { nodesLookup, selectedNodeID, updatePreviousSelectedNodeID, selectNode } = this.props;

    // Derive the selected node properties.
    const node = get(nodesLookup, `[${selectedNodeID}]`);
    const childrenIDs = get(node, 'childrenIDs');

    // Escape early if there are no children to select.
    if (isEmpty(childrenIDs)) {
      return;
    }

    // Update the previous node ID to the current selected node ID.
    updatePreviousSelectedNodeID(selectedNodeID);

    // Select the first child.
    selectNode(get(childrenIDs, '[0]'));
  };

  render() {
    const { onPreviousClick, onNextClick } = this;
    const { nodesLookup, selectedNodeID, selectedBottomBarItem } = this.props;

    // Derive the selected node.
    const node = get(nodesLookup, `[${selectedNodeID}]`);
    const childrenIDs = get(node, 'childrenIDs');
    const parentID = get(node, 'parentID');

    // Derive which selected bar to show (e.g. NodeBar, MotivationBar).
    const Item = ITEMS[selectedBottomBarItem];

    // Derive if we show the previous and next buttons.
    const showPrevNextButtons = selectedBottomBarItem === NODE_UPDATE || selectedBottomBarItem === NODE_CREATE;

    return (
      <Wrapper>
        {/* Previous Button */}
        <PreviousButton hidden={!showPrevNextButtons} disabled={!parentID} onClick={onPreviousClick}>
          Previous
        </PreviousButton>

        {/* Next Button */}
        <NextButton hidden={!showPrevNextButtons} disabled={isEmpty(childrenIDs)} onClick={onNextClick}>
          Next
        </NextButton>

        {/* Selected Bar */}
        {Item ? <Item /> : <NoContent />}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  nodesLookup: state.nodesReducer.nodesLookup,
  selectedBottomBarItem: state.bottomBarReducer.selectedBottomBarItem,
  selectedNodeID: state.nodesReducer.selectedNodeID,
});

const mapDispatchToProps = (dispatch) => ({
  selectNode: (id) => dispatch(selectNodeAction(id)),
  updatePreviousSelectedNodeID: (id) => dispatch(updatePreviousSelectedNodeIDAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomBar);
