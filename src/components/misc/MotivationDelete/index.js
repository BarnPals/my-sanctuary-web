// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Externals
import { updateMotivationAction, updateMotivationInLookupAction } from 'containers/Motivations/actions';
import { updateModalIDAction } from 'containers/Modal/actions';
// Relative
import { CancelButton, DeleteButton, StyledActions, StyledTitle, Wrapper } from './styles';

class MotivationDelete extends Component {
  static propTypes = {
    // From mapStateToProps.
    selectedMotivationID: PropTypes.string.isRequired,
    updating: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    updateModalID: PropTypes.func.isRequired,
    updateMotivation: PropTypes.func.isRequired,
    updateMotivationInLookup: PropTypes.func.isRequired,
  };

  onClose = () => {
    const { updateModalID } = this.props;

    // Open the modal to confirm its deletion.
    updateModalID();
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
    const { selectedMotivationID, updateMotivation, updateMotivationInLookup } = this.props;

    // Escape early if delete is not valid.
    if (!this.isDeleteValid()) {
      return;
    }

    // Derive the updated motivation.
    const updatedMotivation = {
      deleted: true,
      id: selectedMotivationID,
    };

    // Update the motivation in our store.
    updateMotivationInLookup(updatedMotivation);

    // Attempt to update the motivation on our server.
    updateMotivation(updatedMotivation);

    // Close the modal and unselect the deleted motivation.
    this.onClose();
  };

  render() {
    const { isDeleteValid, onDelete, onClose } = this;

    return (
      <Wrapper>
        {/* Title */}
        <StyledTitle>Are you sure?</StyledTitle>

        {/* Delete Button */}
        <StyledActions>
          <DeleteButton disabled={!isDeleteValid()} onClick={onDelete}>
            Yes, delete motivation.
          </DeleteButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </StyledActions>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedMotivationID: state.motivationsReducer.selectedMotivationID,
  updating: state.motivationsReducer.updating,
});

const mapDispatchToProps = (dispatch) => ({
  updateModalID: (id) => dispatch(updateModalIDAction(id)),
  updateMotivation: (motivation) => dispatch(updateMotivationAction(motivation)),
  updateMotivationInLookup: (motivation) => dispatch(updateMotivationInLookupAction(motivation)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MotivationDelete);
