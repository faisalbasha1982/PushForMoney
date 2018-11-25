import { createReducer, createActions, Types as ReduxSauceTypes } from 'reduxsauce';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getProfileRequest: ["payload"],
  getProfile:["payload"],
  getProfileRequestNew: ["payload"],
  updateFirstName:["payload"],
  updateFirstNameSuccess:["firstname"],
  updateLastNameSuccess:["lastname"],
  updateEmail:['payload'],
  updateEmailSuccess:['email'],
  changePassword:["payload"],
  changeMobile:["payload"],
  verifyOtpMobile:["payload"],
  verifyOtpMobileSuccess:['StatusCode'],
  profileSuccess: ['bankinfo','firstname','lastname','email','mobileno'],
  profileFailure: ['error'],
  userRegistered: ['bankinfo'],
  logout: null
});

export const ProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  bankinfo: null,
  firstname: null,
  lastname: null,
  email: null,
  mobileno: null,
  user: null,
  StatusCode: null,
  fetching: false,
  error: '',
  payload: null
}

/* ------------- Selectors ------------- */

export const ProfileSelectors = {
  getBankInfo: state => state['profile'].bankinfo,
  getUser: state => state['profile'].user,
  getFetching: state => state['profile'].fetching,
  getError: state => state['profile'].error,
  getMobileNo: state => state['profile'].mobileno,
  getFirstName: state => state['profile'].firstname,
  getLastName: state => state['profile'].lastname,
  getEmail: state => state['profile'].email,
  getStatusCode: state => state['profile'].StatusCode
};

/* ------------- Reducers ------------- */

export const request = (state, { payload }) => {
  return { ...state, fetching: true, payload }
}

export const newrequest = (state, { payload }) => {
    return { ...state, fetching: true, payload }
}

export const updateSuccessFirstName = (state,{ firstname }) => {
    return { ...state, firstname, fetching: true, }
}

export const updateSuccessLastName = (state,{ lastname }) => {
  return { ...state, lastname, fetching: true, }
}

export const updateSuccessEmail = (state, { email }) => {
  return { ...state, email, fetching: true, }
}

export const changePassword = (state, {payload}) => {
    return { ...state, fetching: true, payload }
}

export const cMobile = (state, {payload}) => {
    return { ...state, fetching:true, payload }
}

export const verifyOtpMobileSuccess = (state, {payload}) => {
    return { ...state, fetching:true, payload }
}

export const verifyOtpMobileSuccessCall = (state, {StatusCode}) =>{
    return { ...state, fetching:false, StatusCode }
}

export const success = (state, {bankinfo,firstname,lastname,email,mobileno}) => {
  return { ...state, bankinfo, firstname, lastname, email, mobileno, fetching: false, }
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
  [Types.GET_PROFILE_REQUEST]: request,
  [Types.GET_PROFILE]: request,
  [Types.GET_PROFILE_REQUEST_NEW]: request,
  [Types.UPDATE_FIRST_NAME]: newrequest,
  [Types.UPDATE_FIRST_NAME_SUCCESS]: updateSuccessFirstName,
  [Types.UPDATE_LAST_NAME_SUCCESS]: updateSuccessLastName,
  [Types.UPDATE_EMAIL]: request,
  [Types.UPDATE_EMAIL_SUCCESS]: updateSuccessEmail,
  [Types.CHANGE_PASSWORD]: changePassword,
  [Types.CHANGE_MOBILE]: cMobile,
  [Types.VERIFY_OTP_MOBILE]: verifyOtpMobileSuccess,
  [Types.VERIFY_OTP_MOBILE_SUCCESS]: verifyOtpMobileSuccessCall,
  [Types.PROFILE_SUCCESS]: success,
  [Types.PROFILE_FAILURE]: failure,
  [Types.USER_REGISTERED]: registered,
  [Types.LOGOUT]: logout,
  [ReduxSauceTypes.DEFAULT]: defaultHandler
});
