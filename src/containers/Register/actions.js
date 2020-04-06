// Relative
import { REGISTER, REGISTER_FAILURE, REGISTER_SUCCESS } from './constants';

export const registerAction = (user) => ({
  user,
  type: REGISTER,
});

export const registerFailure = (error) => ({
  error,
  type: REGISTER_FAILURE,
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});
