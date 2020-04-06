// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
// Externals
import Board from 'components/misc/Board';
import history from 'store/history';
import { collapseNavAction } from 'containers/Dashboard/actions';
// Relative
import { CollapseIcon, List, Header, Title, AddItem, Wrapper } from './styles';

class BoardsList extends Component {
  static propTypes = {
    // From mapStateToProps.
    boardIDs: PropTypes.arrayOf(PropTypes.string.isRequired),
    selectedItem: PropTypes.string,
    // From mapDispatchToProps.
    collapseNav: PropTypes.func.isRequired,
  };

  onAddBoard = () => {
    history.push('/boards/create');
  };

  onCollapse = () => {
    this.props.collapseNav();
  };

  render() {
    const { onAddBoard, onCollapse } = this;
    const { boardIDs, selectedItem } = this.props;

    return (
      <Wrapper>
        <Header>
          <CollapseIcon hidden={!selectedItem} onClick={onCollapse} />

          {/* Boards List Title */}
          <Title>All Boards</Title>

          {/* Add Board */}
          <AddItem onClick={onAddBoard} />
        </Header>

        {/* List Boards */}
        <List>
          {map(boardIDs, (id) => (
            <Board key={id} boardID={id} />
          ))}
        </List>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  boardIDs: state.boardsReducer.boardIDs,
  selectedItem: state.dashboardReducer.selectedItem,
});

const mapDispatchToProps = (dispatch) => ({
  collapseNav: () => dispatch(collapseNavAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardsList);
