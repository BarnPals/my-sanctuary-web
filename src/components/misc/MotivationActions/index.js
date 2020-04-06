// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Externals
import { MOTIVATION_DELETE } from 'containers/Modal/MODALS';
import { updateModalIDAction } from 'containers/Modal/actions';
// Relative
import { DeleteIcon, Item, Wrapper } from './styles';

class MotivationActions extends Component {
  static propTypes = {
    // From mapStateToProps.
    selectedItem: PropTypes.string.isRequired,
    // From mapDispatchToProps.
    updateModalID: PropTypes.func.isRequired,
  };

  onTrashClick = () => {
    this.props.updateModalID(MOTIVATION_DELETE);
  };

  render() {
    const { onTrashClick } = this;
    const { selectedItem } = this.props;

    return (
      <Wrapper>
        {/* Delete Button */}
        <Item onClick={onTrashClick}>
          <DeleteIcon selected={selectedItem === MOTIVATION_DELETE} />
        </Item>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedItem: state.dashboardReducer.selectedItem,
});

const mapDispatchToProps = (dispatch) => ({
  updateModalID: (id) => dispatch(updateModalIDAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MotivationActions);
