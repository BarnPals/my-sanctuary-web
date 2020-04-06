// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import trim from 'lodash/trim';
// Externals
import { createMotivationAction } from 'containers/Motivations/actions';
// Relative
import { Wrapper, MotivationIcon, StyledField, StyledButton } from './styles';

class MotivationCreate extends Component {
  static propTypes = {
    // From mapStateToProps.
    creating: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    createMotivation: PropTypes.func.isRequired,
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
    const { title } = this.state;

    // Escape early if the form is not valid.
    if (!isCreateValid()) {
      return;
    }

    // Attempt to create the motivation.
    this.props.createMotivation({
      title: trim(title),
    });

    // Reset state and blur field.
    this.setState({ title: '' });
    document.activeElement.blur();
  };

  render() {
    const { isCreateValid, onCreate, onTitleChange, onTitleEnter } = this;
    const { title } = this.state;

    return (
      <Wrapper>
        <MotivationIcon />
        <StyledField
          id="motivation-create-field"
          maxLength={100}
          onChange={onTitleChange}
          onKeyDown={onTitleEnter}
          placeholder="What would convince your future self to work on this idea?"
          type="text"
          value={title}
        />

        {/* Create Motivation Button */}
        <StyledButton disabled={!isCreateValid()} onClick={onCreate} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  creating: state.motivationsReducer.creating,
});

const mapDispatchToProps = (dispatch) => ({
  createMotivation: (motivation) => dispatch(createMotivationAction(motivation)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MotivationCreate);
