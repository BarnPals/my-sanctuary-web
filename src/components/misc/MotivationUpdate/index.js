// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
// Externals
import MotivationActions from 'components/misc/MotivationActions';
import { UPDATE_DELAY } from 'utils/config';
import { selectItemAction } from 'containers/Dashboard/actions';
import { updateMotivationAction, updateMotivationInLookupAction } from 'containers/Motivations/actions';
// Relative
import { Wrapper, Left, MotivationIcon, StyledField } from './styles';

class MotivationUpdate extends Component {
  static propTypes = {
    // From mapStateToProps.
    motivationsLookup: PropTypes.object.isRequired,
    selectedMotivationID: PropTypes.string,
    updating: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    updateMotivation: PropTypes.func.isRequired,
    updateMotivationInLookup: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    clearTimeout(this.updateTimeout);
  }

  onTitleEnter = (event) => {
    const { motivationsLookup, selectedMotivationID } = this.props;

    if (event.keyCode === 13) {
      event.preventDefault();

      // Derive the motivation.
      const motivaton = get(motivationsLookup, `[${selectedMotivationID}]`);

      // Attempt to update.
      this.onUpdate(motivaton);

      // Blur the field.
      document.activeElement.blur();
    }
  };

  onTitleChange = (event) => {
    const { updateMotivationInLookup, selectedMotivationID } = this.props;

    // Derive the updated motivation.
    const updatedMotivation = { id: selectedMotivationID, title: event.target.value };

    // Update the title immediately in our store.
    updateMotivationInLookup(updatedMotivation);

    // Save the update after 1s.
    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(() => this.onUpdate(updatedMotivation), UPDATE_DELAY);
  };

  isUpdateValid = (motivation) => {
    const { updating } = this.props;

    // Do not update if we are already updating.
    if (updating) {
      return false;
    }

    // Derive motivation properties.
    const title = get(motivation, 'title');

    // Do not update if we are missing properties.
    if (!title) {
      return false;
    }

    return true;
  };

  onUpdate = (motivation) => {
    // Escape early if we shouldn't update.
    if (!this.isUpdateValid(motivation)) {
      return;
    }

    // Attempt to update.
    this.props.updateMotivation(motivation);
  };

  render() {
    const { onTitleChange, onTitleEnter } = this;
    const { motivationsLookup, selectedMotivationID } = this.props;

    // Derive the motivation properties.
    const motivation = get(motivationsLookup, `[${selectedMotivationID}]`);
    const title = get(motivation, 'title');

    // Escape early if there is no motivation found (no pun intended).
    if (!motivation) {
      return <Wrapper />;
    }

    return (
      <Wrapper>
        {/* Left */}
        <Left>
          <MotivationIcon />
          <StyledField
            id="motivation-update-field"
            maxLength={100}
            onChange={onTitleChange}
            onKeyDown={onTitleEnter}
            placeholder="What would convince your future self this core idea is important?"
            type="text"
            value={title}
          />
        </Left>

        {/* Right */}
        <MotivationActions />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  motivationsLookup: state.motivationsReducer.motivationsLookup,
  selectedMotivationID: state.motivationsReducer.selectedMotivationID,
  updating: state.motivationsReducer.updating,
});

const mapDispatchToProps = (dispatch) => ({
  selectItem: (item) => dispatch(selectItemAction(item)),
  updateMotivation: (motivation) => dispatch(updateMotivationAction(motivation)),
  updateMotivationInLookup: (motivation) => dispatch(updateMotivationInLookupAction(motivation)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MotivationUpdate);
