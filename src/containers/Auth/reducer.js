// Relative
import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SEND_EMAIL_VERIFICATION,
  SEND_EMAIL_VERIFICATION_FAILURE,
  SEND_EMAIL_VERIFICATION_SUCCESS,
  SEND_PASSWORD_RESET_EMAIL,
  SEND_PASSWORD_RESET_EMAIL_FAILURE,
  SEND_PASSWORD_RESET_EMAIL_SUCCESS,
} from './constants';

const initialState = {
  // Error.
  error: '',
  // In flight.
  loggingIn: false,
  sendingEmailVerification: false,
  sendingPasswordResetEmail: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return { ...state, loggingIn: true, error: '' };
    }
    case LOGIN_FAILURE: {
      return { ...state, loggingIn: false, error: action.error };
    }
    case LOGIN_SUCCESS: {
      return { ...state, loggingIn: false, error: '' };
    }
    case SEND_EMAIL_VERIFICATION: {
      return { ...state, sendingEmailVerification: true, error: '' };
    }
    case SEND_EMAIL_VERIFICATION_FAILURE: {
      return { ...state, sendingEmailVerification: false, error: action.error };
    }
    case SEND_EMAIL_VERIFICATION_SUCCESS: {
      return { ...state, sendingEmailVerification: false };
    }
    case SEND_PASSWORD_RESET_EMAIL: {
      return { ...state, sendingPasswordResetEmail: true, error: '' };
    }
    case SEND_PASSWORD_RESET_EMAIL_FAILURE: {
      return { ...state, sendingPasswordResetEmail: false, error: action.error };
    }
    case SEND_PASSWORD_RESET_EMAIL_SUCCESS: {
      return { ...state, sendingPasswordResetEmail: false };
    }
    default: {
      return { ...state };
    }
  }
};
