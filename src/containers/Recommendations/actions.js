import {
  CREATE_RECOMMENDATION,
  CREATE_RECOMMENDATION_FAILURE,
  CREATE_RECOMMENDATION_SUCCESS,
  GET_RECOMMENDATIONS,
  GET_RECOMMENDATIONS_FAILURE,
  GET_RECOMMENDATIONS_SUCCESS,
  RESET,
  UPDATE_RECOMMENDATION,
  UPDATE_RECOMMENDATION_FAILURE,
  UPDATE_RECOMMENDATION_SUCCESS,
  UPDATE_RECOMMENDATION_IN_LOOKUP,
} from './constants';

// ====================
// CREATE
// ====================
export const createRecommendationAction = (recommendation) => ({
  recommendation,
  type: CREATE_RECOMMENDATION,
});

export const createRecommendationFailure = (error) => ({
  error,
  type: CREATE_RECOMMENDATION_FAILURE,
});

export const createRecommendationSuccess = (recommendation) => ({
  recommendation,
  type: CREATE_RECOMMENDATION_SUCCESS,
});

// ====================
// GET INDEX (MULTIPLE)
// ====================
export const getRecommendationsAction = () => ({
  type: GET_RECOMMENDATIONS,
});

export const getRecommendationsFailure = (error) => ({
  error,
  type: GET_RECOMMENDATIONS_FAILURE,
});

export const getRecommendationsSuccess = (recommendationIDs, recommendationsLookup) => ({
  recommendationIDs,
  recommendationsLookup,
  type: GET_RECOMMENDATIONS_SUCCESS,
});

// ====================
// RESET
// ====================
export const resetAction = () => ({
  type: RESET,
});

// ====================
// UPDATE (with API call)
// ====================
export const updateRecommendationAction = (recommendation) => ({
  recommendation,
  type: UPDATE_RECOMMENDATION,
});

export const updateRecommendationFailure = (error) => ({
  error,
  type: UPDATE_RECOMMENDATION_FAILURE,
});

export const updateRecommendationSuccess = (recommendation) => ({
  recommendation,
  type: UPDATE_RECOMMENDATION_SUCCESS,
});

export const updateRecommendationInLookupAction = (recommendation) => ({
  recommendation,
  type: UPDATE_RECOMMENDATION_IN_LOOKUP,
});
