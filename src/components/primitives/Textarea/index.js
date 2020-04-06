// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import size from 'lodash/size';
import subtract from 'lodash/subtract';
import trimStart from 'lodash/trimStart';
// Externals
import theme from 'assets/theme';
// Relative
import { CharCounter, StyledTextarea, Wrapper } from './styles';

class Textarea extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    maxLength: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  deriveLengthColor = () => {
    const { maxLength, value } = this.props;

    // Derive the current characters.
    const currentChars = size(value);

    // Make the color red when at the max length.
    if (maxLength === currentChars) {
      return theme.main.colors.red.shade;
    }

    // Make the color more visible when near 3 characters away from max value.
    if (subtract(maxLength, currentChars) < 3) {
      return theme.main.colors.greys.shade;
    }

    return theme.main.colors.greys.normal;
  };

  onBlurHandler = (event) => {
    // Invoke the onBlur callback if they provided one.
    this.props.onBlur(event);

    // Update our focused state.
    this.setState({ focused: false });
  };

  onChangeHandler = (event) => {
    const { value } = event.target;
    const { maxLength } = this.props;

    // Prevent updating if it's over the max-length.
    if (maxLength && size(value) > maxLength) {
      event.preventDefault();
      return;
    }

    // Sanitize the value.
    event.target.value = trimStart(event.target.value);

    // Otherwise, handle the event normally.
    this.props.onChange(event);
  };

  onFocusHandler = (event) => {
    // Invoke the onFocus callback if they provided one.
    this.props.onFocus(event);

    // Update our focused state.
    this.setState({ focused: true });
  };

  render() {
    const { deriveLengthColor, onBlurHandler, onChangeHandler, onFocusHandler } = this;
    const { autoFocus, className, id, maxLength, onKeyDown, placeholder, style, type, value } = this.props;
    const { focused } = this.state;

    return (
      <Wrapper className={className}>
        {/* Textarea */}
        <StyledTextarea
          async
          autoFocus={autoFocus}
          id={id}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          style={style}
          type={type}
          value={value}
        />

        {/* CharCounter Counter */}
        <CharCounter className="character-counter" color={deriveLengthColor()} hidden={!focused || !maxLength}>
          {size(value)} / {maxLength}
        </CharCounter>
      </Wrapper>
    );
  }
}

export default Textarea;
