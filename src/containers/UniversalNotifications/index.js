// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Externals
import theme from 'assets/theme';
// Relative
import MESSAGE_TYPES, { ERROR, SUCCESS, WARNING } from './MESSAGE_TYPES';
import { dismissUniversalNotificationAction } from './actions';
import { Action, CloseIcon, Message, Wrapper } from './styles';

class UniversalNotifications extends Component {
  static propTypes = {
    // From mapStateToProps.
    actionText: PropTypes.string,
    autoDismissAfter: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.node.isRequired,
    messageType: PropTypes.oneOf(MESSAGE_TYPES).isRequired,
    onClickAction: PropTypes.func,
    visible: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    dismiss: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { autoDismissAfter, visible } = props;

    // If we are already visible, make sure we dismiss after some time.
    if (visible) {
      this.setDismissTimeout(autoDismissAfter);
    }
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    // If we have become visible, make sure we dismiss after some time.
    if (nextProps.visible !== this.props.visible && nextProps.visible) {
      this.setDismissTimeout(nextProps.autoDismissAfter);
    }
  }

  componentWillUnmount() {
    this.clearDismissTimeout();
  }

  clearDismissTimeout = () => {
    if (this.dismissTimeout) {
      clearTimeout(this.dismissTimeout);
    }
  };

  deriveBackground = () => {
    switch (this.props.messageType) {
      case ERROR: {
        return theme.main.colors.red.shade;
      }
      case SUCCESS: {
        return theme.main.colors.green.shade;
      }
      case WARNING: {
        return `linear-gradient(180deg, ${theme.main.colors.orange.shade} 0%, ${theme.main.colors.orange.normal} 100%)`;
      }
      default: {
        return theme.main.colors.blue.shade;
      }
    }
  };

  setDismissTimeout = (autoDismissAfter) => {
    this.clearDismissTimeout();
    this.dismissTimeout = setTimeout(this.props.dismiss, autoDismissAfter);
  };

  onClickHandler = () => {
    this.clearDismissTimeout();
    this.props.dismiss();
  };

  onActionClick = () => {
    const { dispatch, onClickAction } = this.props;

    // Dispatch the onClickAction if one is provided.
    if (onClickAction) {
      dispatch(onClickAction());
    }
  };

  render() {
    const { deriveBackground, onActionClick, onClickHandler } = this;
    const { actionText, message, visible } = this.props;

    // Escape early if it's not supposed to be visible.
    if (!visible) {
      return null;
    }

    return (
      <Wrapper onClick={onClickHandler} style={{ background: deriveBackground() }}>
        {/* Message */}
        <Message data-e2e="universal-notification-message">{message}</Message>

        {/* Action Button (if provided) */}
        {actionText && <Action onClick={onActionClick}>{actionText}</Action>}

        {/* Close Icon */}
        <CloseIcon />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  actionText: state.universalNotificationsReducer.actionText,
  autoDismissAfter: state.universalNotificationsReducer.autoDismissAfter,
  message: state.universalNotificationsReducer.message,
  messageType: state.universalNotificationsReducer.messageType,
  onClickAction: state.universalNotificationsReducer.onClickAction,
  visible: state.universalNotificationsReducer.visible,
});

const mapDispatchToProps = (dispatch) => ({
  // @WARNING: Normally wouldn't give the container the `dispatch` prop,
  // but this is to dispatch the onClickAction when provided.
  dispatch,
  dismiss: () => dispatch(dismissUniversalNotificationAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UniversalNotifications);
