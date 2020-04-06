// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
// Externals
import Spinner from 'components/misc/Spinner';
import { GOOGLE_AUTH_PROVIDER } from 'containers/Auth/AUTH_PROVIDERS';
import { loginWithProviderAction } from 'containers/Auth/actions';
import { registerAction } from 'containers/Register/actions';
// Relative
import {
  EmailField,
  LinkButton,
  NameField,
  Options,
  PasswordField,
  StyledButton,
  StyledGoogleButton,
  StyledGoogleIcon,
  Title,
  Well,
  Wrapper,
} from './styles';

class Register extends Component {
  static propTypes = {
    // From mapStateToProps.
    registering: PropTypes.bool.isRequired,
    // From mapDispatchToProps.
    loginWithProvider: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      displayName: '',
      password: '',
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
      this.onRegister();
    }
  };

  onStateChange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  isValid = () => {
    const { registering } = this.props;
    const { displayName, email, password } = this.state;

    // Do not attempt to register if they are currently registering in.
    if (registering) {
      return false;
    }

    // Do not attempt register if all form fields are not filled out.
    if (!email || !password || !displayName) {
      return false;
    }

    return true;
  };

  onRegister = () => {
    const { isValid } = this;
    const { displayName, email, password } = this.state;

    // Escape early if form is not valid.
    if (!isValid()) {
      return;
    }

    // Attempt to register with newUser.
    this.props.register({ displayName, email, password });
  };

  onRegisterWithProvider = (providerName) => () => {
    this.props.loginWithProvider(providerName);
  };

  render() {
    const { isValid, nameField, onRegister, onRegisterWithProvider, onStateChange } = this;
    const { email, password, displayName } = this.state;
    const { registering } = this.props;

    return (
      <Wrapper>
        {/* SEO */}
        <Helmet defaultTitle="Barn Pals" titleTemplate="Barn Pals | %s">
          <title>Sign Up</title>
          <meta
            name="description"
            content="For entrepreneurs, thinkers, and product managers, Barn Pals's product management software helps you achieve your goals."
          />
        </Helmet>

        <Well>
          {/* HEADER */}
          <Title>Sign Up</Title>

          {/* NAME FIELD */}
          <NameField
            name="displayName"
            onChange={onStateChange('displayName')}
            placeholder="Name"
            ref={nameField}
            type="text"
            value={displayName}
          />

          {/* EMAIL */}
          <EmailField name="email" onChange={onStateChange('email')} placeholder="Email" type="email" value={email} />

          {/* PASSWORD */}
          <PasswordField
            name="password"
            onChange={onStateChange('password')}
            placeholder="Password"
            type="password"
            value={password}
          />

          {/* REGISTER */}
          <StyledButton disabled={!isValid()} onClick={onRegister}>
            {registering ? <Spinner /> : 'Sign Up'}
          </StyledButton>

          {/* REGISTER WITH GOOGLE */}
          <StyledGoogleButton onClick={onRegisterWithProvider(GOOGLE_AUTH_PROVIDER)}>
            <StyledGoogleIcon />
            Sign Up with Google
          </StyledGoogleButton>

          <Options>
            <LinkButton to="/">I already have an account.</LinkButton>
          </Options>
        </Well>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  registering: state.registerReducer.registering,
});

const mapDispatchToProps = (dispatch) => ({
  loginWithProvider: (providerName) => dispatch(loginWithProviderAction(providerName)),
  register: (user) => dispatch(registerAction(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
