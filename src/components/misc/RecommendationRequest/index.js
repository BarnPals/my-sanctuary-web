// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
// Externals
import { NODE_ROWS } from 'containers/Dashboard/ITEMS';
import { selectBoardAction } from 'containers/Boards/actions';
import { selectItemAction } from 'containers/Dashboard/actions';
import { selectNodeAction } from 'containers/Nodes/actions';
import { deriveTimestamp } from 'utils/helpers/time';
// Relative
import { CreatorAccountEmail, StyledArrow, Timestamp, Title, TitleText, Wrapper } from './styles';

class RecommendationRequest extends Component {
  static propTypes = {
    recommendationID: PropTypes.string.isRequired,
    // From mapStateToProps.
    accountsLookup: PropTypes.object.isRequired,
    boardsLookup: PropTypes.object.isRequired,
    recommendationsLookup: PropTypes.object.isRequired,
    selectedBoardID: PropTypes.string.isRequired,
    selectedItem: PropTypes.string,
    selectedNodeID: PropTypes.string,
    // From mapDispatchToProps.
    selectBoard: PropTypes.func.isRequired,
    selectNode: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
  };

  onClick = () => {
    const {
      recommendationID,
      recommendationsLookup,
      selectBoard,
      selectItem,
      selectNode,
      selectedBoardID,
      selectedItem,
      selectedNodeID,
    } = this.props;

    // Derive the recommendation properties.
    const recommendation = get(recommendationsLookup, `[${recommendationID}]`);
    const boardID = get(recommendation, 'boardID');
    const parentNodeID = get(recommendation, 'parentNodeID');

    // Update the account's primary boardID if the board isn't selected.
    if (boardID !== selectedBoardID) {
      selectBoard(boardID);
    }

    // If the item is not already selected, select it.
    if (NODE_ROWS !== selectedItem) {
      selectItem(NODE_ROWS);
    }

    // Select the node.
    if (selectedNodeID !== parentNodeID) {
      setTimeout(() => selectNode(parentNodeID), 1000);
    }
  };

  render() {
    const { onClick } = this;
    const {
      accountsLookup,
      boardsLookup,
      recommendationID,
      recommendationsLookup,
      selectedBoardID,
      selectedNodeID,
      selectedItem,
    } = this.props;

    // Derive the recommendation properties.
    const recommendation = get(recommendationsLookup, `[${recommendationID}]`);
    const boardID = get(recommendation, 'boardID');
    const creatorAccountID = get(recommendation, 'creatorAccountID');
    const parentNodeID = get(recommendation, 'parentNodeID');

    // Derive the creator account properties.
    const account = get(accountsLookup, `[${creatorAccountID}]`);
    const email = get(account, 'email');

    // Derive the board name.
    const board = get(boardsLookup, `[${boardID}]`);
    const name = get(board, 'name');

    // Derive time.
    const createdAt = get(recommendation, 'createdAt.seconds') * 1000;
    const updatedAt = get(recommendation, 'updatedAt.seconds') * 1000;

    // Determine if the row is selected.
    const isItemSelected = selectedItem === NODE_ROWS;
    const isBoardSelected = selectedBoardID === boardID;
    const isNodeSelected = selectedNodeID === parentNodeID;
    const selected = isItemSelected && isBoardSelected && isNodeSelected;

    return (
      <Wrapper onClick={onClick} selected={selected}>
        {/* RecommendationRequest Name */}
        <Title>
          <TitleText>Board: {name}</TitleText>
          <TitleText>NodeID: {parentNodeID}</TitleText>
          <CreatorAccountEmail>{email}</CreatorAccountEmail>
          <Timestamp>{deriveTimestamp(createdAt, updatedAt)}</Timestamp>
        </Title>

        {/* Arrow */}
        <StyledArrow />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  accountsLookup: state.accountsReducer.accountsLookup,
  boardsLookup: state.boardsReducer.boardsLookup,
  recommendationsLookup: state.recommendationsReducer.recommendationsLookup,
  selectedBoardID: state.boardsReducer.selectedBoardID,
  selectedNodeID: state.nodesReducer.selectedNodeID,
  selectedItem: state.dashboardReducer.selectedItem,
});

const mapDispatchToProps = (dispatch) => ({
  selectBoard: (id) => dispatch(selectBoardAction(id)),
  selectItem: (id) => dispatch(selectItemAction(id)),
  selectNode: (id) => dispatch(selectNodeAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecommendationRequest);
