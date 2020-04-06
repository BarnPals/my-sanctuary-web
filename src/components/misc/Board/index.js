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
// Relative
import { CreatorAccountEmail, StyledArrow, StyledImage, Title, TitleText, Wrapper } from './styles';

class Board extends Component {
  static propTypes = {
    boardID: PropTypes.string.isRequired,
    // From mapStateToProps.
    accountsLookup: PropTypes.object.isRequired,
    baseNodeID: PropTypes.string,
    boardsLookup: PropTypes.object.isRequired,
    selectedBoardID: PropTypes.string.isRequired,
    selectedItem: PropTypes.string,
    selectedNodeID: PropTypes.string,
    // From mapDispatchToProps.
    selectBoard: PropTypes.func.isRequired,
    selectNode: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired,
  };

  onBoardClick = () => {
    const {
      baseNodeID,
      boardID,
      selectBoard,
      selectItem,
      selectNode,
      selectedBoardID,
      selectedItem,
      selectedNodeID,
    } = this.props;

    // Update the account's primary boardID if the board isn't selected.
    if (boardID !== selectedBoardID) {
      selectBoard(boardID);
    }

    // If the item is not already selected, select it.
    if (NODE_ROWS !== selectedItem) {
      selectItem(NODE_ROWS);
    }

    // Select the base node if it's not already selected.
    if (baseNodeID !== selectedNodeID) {
      selectNode(baseNodeID);
    }
  };

  render() {
    const { onBoardClick } = this;
    const { accountsLookup, boardID, boardsLookup, selectedBoardID, selectedItem } = this.props;

    // Derive the board properties.
    const board = get(boardsLookup, `[${boardID}]`);
    const creatorAccountID = get(board, 'creatorAccountID');
    const name = get(board, 'name');
    const imageURL = get(board, 'imageURL');

    // Derive the creator account properties.
    const account = get(accountsLookup, `[${creatorAccountID}]`);
    const email = get(account, 'email');

    // Derive if the node should be highlighted.
    const isBoardSelected = boardID === selectedBoardID;

    return (
      <Wrapper onClick={onBoardClick} selected={selectedItem && isBoardSelected}>
        {/* Board Image */}
        <StyledImage alt={name} src={imageURL} />

        {/* Board Name */}
        <Title>
          <TitleText>{name}</TitleText>
          <CreatorAccountEmail>{email}</CreatorAccountEmail>
        </Title>

        {/* Arrow */}
        <StyledArrow />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  accountsLookup: state.accountsReducer.accountsLookup,
  baseNodeID: state.nodesReducer.baseNodeID,
  boardsLookup: state.boardsReducer.boardsLookup,
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
)(Board);
