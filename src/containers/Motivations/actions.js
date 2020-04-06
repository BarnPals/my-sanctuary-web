import {
  CREATE_MOTIVATION,
  CREATE_MOTIVATION_FAILURE,
  CREATE_MOTIVATION_IN_LOOKUP,
  CREATE_MOTIVATION_SUCCESS,
  GET_MOTIVATIONS,
  GET_MOTIVATIONS_FAILURE,
  GET_MOTIVATIONS_SUCCESS,
  RESET,
  SELECT_MOTIVATION,
  UPDATE_MOTIVATION,
  UPDATE_MOTIVATION_FAILURE,
  UPDATE_MOTIVATION_IN_LOOKUP,
  UPDATE_MOTIVATION_SUCCESS,
} from './constants';

// ====================
// CREATE
// ====================
export const createMotivationAction = (motivation) => ({
  motivation,
  type: CREATE_MOTIVATION,
});

export const createMotivationFailure = (error) => ({
  error,
  type: CREATE_MOTIVATION_FAILURE,
});

export const createMotivationSuccess = () => ({
  type: CREATE_MOTIVATION_SUCCESS,
});

export const createMotivationInLookupAction = (motivation) => ({
  motivation,
  type: CREATE_MOTIVATION_IN_LOOKUP,
});

// ====================
// GET INDEX (MULTIPLE)
// ====================
export const getMotivationsAction = () => ({
  type: GET_MOTIVATIONS,
});

export const getMotivationsFailure = (error) => ({
  error,
  type: GET_MOTIVATIONS_FAILURE,
});

export const getMotivationsSuccess = (motivationIDs, motivationsLookup) => ({
  motivationIDs,
  motivationsLookup,
  type: GET_MOTIVATIONS_SUCCESS,
});

// ====================
// RESET
// ====================
export const resetAction = () => ({
  type: RESET,
});

// ====================
// SELECT
// ====================
export const selectMotivationAction = (id) => ({
  id,
  type: SELECT_MOTIVATION,
});

// ====================
// UPDATE
// ====================
export const updateMotivationAction = (motivation) => ({
  motivation,
  type: UPDATE_MOTIVATION,
});

export const updateMotivationFailure = (error) => ({
  error,
  type: UPDATE_MOTIVATION_FAILURE,
});

export const updateMotivationSuccess = () => ({
  type: UPDATE_MOTIVATION_SUCCESS,
});

export const updateMotivationInLookupAction = (motivation) => ({
  motivation,
  type: UPDATE_MOTIVATION_IN_LOOKUP,
});
