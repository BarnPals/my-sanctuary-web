// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
// Externals
import Spinner from 'components/misc/Spinner';
import { sendPasswordResetEmailAction } from 'containers/Auth/actions';
// Relative
import { EmailField, LinkButton, StyledButton, Options, Title, Well, Wrapper } from './styles';

class ResetPassword extends Component {
  static propTypes = {
    // From mapStateToProps.
    sendingPasswordResetEmail: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    sendPasswordResetEmail: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.onResetPassword();
    }
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onResetPassword = () => {
    const { isValid } = this;
    const { email } = this.state;

    // Do not attempt to sendPasswordResetEmail if they are currently logging in.
    if (!isValid()) {
      return;
    }

    // Attempt to sendPasswordResetEmail with credentials.
    this.props.sendPasswordResetEmail(email);
  };

  isValid = () => {
    const { sendingPasswordResetEmail } = this.props;
    const { email } = this.state;

    // Escape early if we are already sending a password reset email.
    if (sendingPasswordResetEmail) {
      return false;
    }

    // Do not attempt sendPasswordResetEmail if they have not typed in email.
    if (!email) {
      return false;
    }

    return true;
  };

  render() {
    const { isValid, onEmailChange, onResetPassword } = this;
    const { sendingPasswordResetEmail } = this.props;
    const { email } = this.state;

    return (
      <Wrapper>
        {/* SEO */}
        <Helmet defaultTitle="Barn Pals" titleTemplate="Barn Pals | %s">
          <title>Reset Password</title>
          <meta
            name="description"
            content="Manage everything you need to operate as a farm sanctuary with Barn Pals."
          />
        </Helmet>

        <Well>
          {/* HEADER */}
          <Title>Reset Password</Title>

          {/* EMAIL */}
          <EmailField onChange={onEmailChange} placeholder="Email" type="email" value={email} />

          {/* RESET_PASSWORD */}
          <StyledButton disabled={!isValid()} onClick={onResetPassword}>
            {sendingPasswordResetEmail ? <Spinner /> : 'Reset Password'}
          </StyledButton>

          <Options>
            {/* LOGIN LINK */}
            <LinkButton to="/">Sign In</LinkButton>

            {/* REGISTER LINK */}
            <LinkButton to="/register">Sign Up</LinkButton>
          </Options>
        </Well>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  sendingPasswordResetEmail: state.authReducer.sendingPasswordResetEmail,
});

const mapDispatchToProps = (dispatch) => ({
  sendPasswordResetEmail: (customEmail) => dispatch(sendPasswordResetEmailAction(customEmail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
