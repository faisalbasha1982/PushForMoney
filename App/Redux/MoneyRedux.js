import { createReducer, createActions, Types as ReduxSauceTypes } from 'reduxsauce'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getMoneyMonth: ["payload"],
  getPersonMonth:["payload"],
  moneySuccess: ['referrals','TotalWorkedHours','TotalEarnings'],
  moneyFailure: ['error'],
  userRegistered: ['referrals'],
  logout: null
})

export const MoneyTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  referrals: null,
  fetching: false,
  error: '',
  payload: null,
  TotalWorkedHours: null,
  TotalEarnings: null,
}

/* ------------- Selectors ------------- */

export const MoneySelectors = {
  getPerson: state => state['money'].referrals,
  getTotalWorkedHours: state => state['money'].TotalWorkedHours,
  getTotalEarnings: state => state['money'].TotalEarnings,
  getFetching: state => state['money'].fetching,
  getError: state => state['money'].error
};

/* ------------- Reducers ------------- */

export const request = (state, { payload }) => {
  return { ...state, fetching: true, payload }
}

export const success = (state, {referrals,TotalWorkedHours,TotalEarnings}) => {
  return { ...state, referrals,TotalWorkedHours,TotalEarnings, fetching: false, }
}

export const failure = (state, {error}) => {
  return { ...state, fetching: false, error}
}

export const registered = (state, {referrals}) => {
  return { ...state, referrals, fetching: false }
}

export const logout = (state) => {
  return { ...INITIAL_STATE}
}

export const defaultHandler = (state) => {
  return { ...state}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MONEY_MONTH]: request,
  [Types.GET_PERSON_MONTH]: request,
  [Types.MONEY_SUCCESS]: success,
  [Types.MONEY_FAILURE]: failure,
  [Types.USER_REGISTERED]: registered,
  [Types.LOGOUT]: logout,
  [ReduxSauceTypes.DEFAULT]: defaultHandler
});
