// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Externals
import { createBoardAction } from 'containers/Boards/actions';
import { updateExampleBoardNameAction } from 'containers/CreateBoardWizard/actions';
// Relative
import { NameField, NextButton, StyledText, StyledTitle, Wrapper } from './styles';

class CreateBoardTitle extends Component {
  static propTypes = {
    // From mapStateToProps.
    creating: PropTypes.bool.isRequired,
    showWelcome: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    createBoard: PropTypes.func.isRequired,
    updateExampleBoardName: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
      this.onNext();
    }
  };

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
    this.props.updateExampleBoardName(event.target.value);
  };

  isBoardValid = () => {
    const { creating } = this.props;
    const { name } = this.state;

    // Escape early if we're already creating a board.
    if (creating) {
      return false;
    }

    // Escape early if the board name is not valid.
    if (!name) {
      return false;
    }

    return true;
  };

  onNext = () => {
    const { name } = this.state;

    // Escape early if the board is not valid.
    if (!this.isBoardValid()) {
      return;
    }

    // Attempt to create the board.
    this.props.createBoard({ name });
  };

  render() {
    const { isBoardValid, onNext, onNameChange } = this;
    const { showWelcome } = this.props;
    const { name } = this.state;

    return (
      <Wrapper>
        {/* Welcome */}
        <StyledTitle>{showWelcome ? 'Welcome to Barn Pals!' : 'Another big idea! Nice.'}</StyledTitle>

        {/* Label */}
        <StyledText>In a few words, what is your big idea?</StyledText>

        {/* NAME FIELD */}
        <NameField
          autoFocus
          maxLength={100}
          onChange={onNameChange}
          placeholder="An app that helps people achieve their goals."
          type="text"
          value={name}
        />

        {/* Next Button */}
        <NextButton disabled={!isBoardValid()} onClick={onNext}>
          Create Big Idea
        </NextButton>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  creating: state.boardsReducer.creating,
  showWelcome: state.createBoardWizardReducer.showWelcome,
});

const mapDispatchToProps = (dispatch) => ({
  createBoard: (board) => dispatch(createBoardAction(board)),
  updateExampleBoardName: (name) => dispatch(updateExampleBoardNameAction(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateBoardTitle);
