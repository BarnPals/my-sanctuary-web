// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import toUpper from 'lodash/toUpper';
// Externals
import { SUCCESS, ERROR } from 'containers/UniversalNotifications/MESSAGE_TYPES';
import { showUniversalNotificationAction } from 'containers/UniversalNotifications/actions';
// Relative
import {
  FeedbackBubble,
  FeedbackCloseIcon,
  FeedbackField,
  FeedbackShowIcon,
  FeedbackWindow,
  FieldWrapper,
  SendButton,
  StyledLabel,
  Wrapper,
} from './styles';

const SLACK_URL = 'https://hooks.slack.com/services/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';

class Feedback extends Component {
  static propTypes = {
    // From mapStateToProps.
    account: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
    // From mapDispatchToProps.
    showUniversalNotification: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      show: false,
      text: '',
    };
  }

  onShowToggle = () => {
    this.setState({ show: !this.state.show });
  };

  onStateChange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  onSend = () => {
    const { isFormValid } = this;
    const { account } = this.props;
    const { text } = this.state;

    // Escape early if form is not valid.
    if (!isFormValid()) {
      return;
    }

    // Derive the account properties.
    const displayName = get(account, 'displayName');
    const email = get(account, 'email');
    const env = toUpper(process.env.REACT_APP_ENV);

    // Derive the current session URL. https://help.fullstory.com/develop-js/getcurrentsessionurl
    const currentSessionURL = window.FS ? window.FS.getCurrentSessionURL(true) : '';

    // Format the text.
    const formattedText = `${displayName} (${email}) on *${env}* just sent some feedback:\n\n\`\`\`${text}\`\`\`${currentSessionURL}`;

    // Set sending state.
    this.setState({ sending: true });

    // Notify slack via the webhook.
    fetch(SLACK_URL, {
      method: 'POST',
      body: JSON.stringify({
        text: formattedText,
      }),
    })
      .then(() => {
        // Show a success notification.
        this.props.showUniversalNotification({
          message: 'Thanks! Our team was just notified with your feedback.',
          messageType: SUCCESS,
        });

        // Reset state.
        this.setState({ sending: false, show: false, text: '' });
      })
      .catch(() => {
        // Show a success notification.
        this.props.showUniversalNotification({
          message: 'Unable to send feedback at this time. Please reach out to team@barnpals.org directly.',
          messageType: ERROR,
        });

        this.setState({ sending: false });
      });
  };

  isFormValid = () => {
    const { sending, text } = this.state;

    // Escape early if we're already sending the feedback.
    if (sending) {
      return false;
    }

    // Escape early if there is no text.
    if (!text) {
      return false;
    }

    return true;
  };

  render() {
    const { isFormValid, onSend, onStateChange, onShowToggle } = this;
    const { show, text } = this.state;

    return (
      <Wrapper>
        {/* Feedback Content */}
        {show && (
          <FeedbackWindow>
            <StyledLabel>
              Please share any feedback you&apos;d like! We will use it to make the platform better!
            </StyledLabel>

            <FieldWrapper>
              <FeedbackField
                onChange={onStateChange('text')}
                placeholder="Write your feedback here..."
                rows={12}
                value={text}
              />
            </FieldWrapper>

            <SendButton disabled={!isFormValid()} onClick={onSend}>
              Send Feedback
            </SendButton>
          </FeedbackWindow>
        )}

        {/* Feedback Toggle */}
        <FeedbackBubble onClick={onShowToggle}>{show ? <FeedbackCloseIcon /> : <FeedbackShowIcon />}</FeedbackBubble>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.accountsReducer.account,
});

const mapDispatchToProps = (dispatch) => ({
  showUniversalNotification: (options) => dispatch(showUniversalNotificationAction(options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feedback);
