import { createReducer, createActions, Types as ReduxSauceTypes } from 'reduxsauce'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    cardDetailsRequest: ["payload"],
    cardDetailsSuccess: ['user'],
    cardDetailsFailure: ['error'],
    userRegistered: ['user'],
    logout: null
});

export const CardDetailsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  user: null,
  fetching: false,
  error: '',
  payload: null
}

/* ------------- Selectors ------------- */

export const CardDetailsSelectors = {
  getUser: state => state['cardDetails'].user,
  getFetching: state => state['cardDetails'].fetching,
  getError: state => state['cardDetails'].error
};

/* ------------- Reducers ------------- */

export const request = (state, { payload }) => {
  return { ...state, fetching: true, payload }
}

export const success = (state, {user}) => {
  return { ...state, user, fetching: false, }
}

export const failure = (state, {error}) => {
  return { ...state, fetching: false, error}
}

export const registered = (state, {user}) => {
  return { ...state, user, fetching: false }
}

export const logout = (state) => {
  return { ...INITIAL_STATE}
}

export const defaultHandler = (state) => {
  return { ...state}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CARD_DETAILS_REQUEST]: request,
  [Types.CARD_DETAILS_SUCCESS]: success,
  [Types.CARD_DETAILS_FAILURE]: failure,
  [Types.USER_REGISTERED]: registered,
  [Types.LOGOUT]: logout,
  [ReduxSauceTypes.DEFAULT]: defaultHandler
});
