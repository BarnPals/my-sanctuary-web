// Relative
import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_WITH_PROVIDER,
  LOGIN_WITH_PROVIDER_FAILURE,
  LOGIN_WITH_PROVIDER_SUCCESS,
  LOGOUT,
  REGISTER_AUTH_STATE_CHANGE,
  SEND_EMAIL_VERIFICATION,
  SEND_EMAIL_VERIFICATION_FAILURE,
  SEND_EMAIL_VERIFICATION_SUCCESS,
  SEND_PASSWORD_RESET_EMAIL,
  SEND_PASSWORD_RESET_EMAIL_FAILURE,
  SEND_PASSWORD_RESET_EMAIL_SUCCESS,
} from './constants';

export const loginAction = (credentials) => ({
  credentials,
  type: LOGIN,
});

export const loginFailure = (error) => ({
  error,
  type: LOGIN_FAILURE,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginWithProviderAction = (providerName) => ({
  providerName,
  type: LOGIN_WITH_PROVIDER,
});

export const loginWithProviderFailure = (error) => ({
  error,
  type: LOGIN_WITH_PROVIDER_FAILURE,
});

export const loginWithProviderSuccess = () => ({
  type: LOGIN_WITH_PROVIDER_SUCCESS,
});

export const logoutAction = () => ({
  type: LOGOUT,
});

export const registerAuthStateChangeAction = () => ({
  type: REGISTER_AUTH_STATE_CHANGE,
});

// ====================
// RESET PASSWORD
// ====================
export const sendPasswordResetEmailAction = (customEmail) => ({
  customEmail,
  type: SEND_PASSWORD_RESET_EMAIL,
});

export const sendPasswordResetEmailFailure = (error) => ({
  error,
  type: SEND_PASSWORD_RESET_EMAIL_FAILURE,
});

export const sendPasswordResetEmailSuccess = () => ({
  type: SEND_PASSWORD_RESET_EMAIL_SUCCESS,
});

// ====================
// EMAIL VERIFICATION
// ====================
export const sendEmailVerificationAction = () => ({
  type: SEND_EMAIL_VERIFICATION,
});

export const sendEmailVerificationFailure = (error) => ({
  error,
  type: SEND_EMAIL_VERIFICATION_FAILURE,
});

export const sendEmailVerificationSuccess = () => ({
  type: SEND_EMAIL_VERIFICATION_SUCCESS,
});
