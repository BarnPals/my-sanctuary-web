// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
// Externals
import Spinner from 'components/misc/Spinner';
import { GOOGLE_AUTH_PROVIDER } from 'containers/Auth/AUTH_PROVIDERS';
import { loginAction, loginWithProviderAction } from 'containers/Auth/actions';
// Relative
import {
  EmailField,
  LinkButton,
  Options,
  PasswordField,
  StyledButton,
  StyledGoogleButton,
  StyledGoogleIcon,
  Title,
  Well,
  Wrapper,
} from './styles';

class Login extends Component {
  static propTypes = {
    // From mapStateToProps.
    loggingIn: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    login: PropTypes.func.isRequired,
    loginWithProvider: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);

    // @WARNING: On Chrome iOS autofill often does not fire off onChange handlers.
    // https://github.com/facebook/react/issues/1159
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.onLogin();
    }
  };

  onStateChange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  onLogin = () => {
    const { isValid } = this;
    const { email, password } = this.state;

    // Escape early if form is not valid.
    if (!isValid()) {
      return;
    }

    // Attempt to login.
    this.props.login({ email, password });
  };

  onLoginWithProvider = (providerName) => () => {
    this.props.loginWithProvider(providerName);
  };

  isValid = () => {
    const { loggingIn } = this.props;
    const { email, password } = this.state;

    // Escape early if they are currently logging in.
    if (loggingIn) {
      return false;
    }

    // Escape early if they have not typed in email.
    if (!email) {
      return false;
    }

    // Escape early if they have not typed in password.
    if (!password) {
      return false;
    }

    return true;
  };

  render() {
    const { isValid, onStateChange, onLogin, onLoginWithProvider, toResetPassword } = this;
    const { email, password } = this.state;
    const { loggingIn } = this.props;

    return (
      <Wrapper>
        {/* SEO */}
        <Helmet defaultTitle="Barn Pals" titleTemplate="Barn Pals | %s">
          <title>Sign In</title>
          <meta
            name="description"
            content="For entrepreneurs, thinkers, and product managers, Barn Pals's product management software helps you achieve your goals."
          />
        </Helmet>

        <Well>
          <Title>Sign In</Title>

          {/* EMAIL */}
          <EmailField onChange={onStateChange('email')} placeholder="Email" type="email" value={email} />

          {/* PASSWORD */}
          <PasswordField onChange={onStateChange('password')} placeholder="Password" type="password" value={password} />

          {/* LOGIN */}
          <StyledButton disabled={!isValid()} onClick={onLogin}>
            {loggingIn ? <Spinner /> : 'Sign In'}
          </StyledButton>

          {/* REGISTER WITH GOOGLE */}
          <StyledGoogleButton onClick={onLoginWithProvider(GOOGLE_AUTH_PROVIDER)}>
            <StyledGoogleIcon />
            Sign in with Google
          </StyledGoogleButton>

          <Options>
            {/* REGISTER LINK */}
            <LinkButton onClick={toResetPassword} to="/register">
              Sign Up
            </LinkButton>

            {/* FORGOT PASSWORD */}
            <LinkButton onClick={toResetPassword} to="/reset-password">
              Forgot Password
            </LinkButton>
          </Options>
        </Well>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  loggingIn: state.authReducer.loggingIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(loginAction(credentials)),
  loginWithProvider: (providerName) => dispatch(loginWithProviderAction(providerName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
