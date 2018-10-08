import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import NEWAPI from '../Services/NewApi'
import API_URL from '../Services/Api_url'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { ProfileTypes, verifyOtpMobileSuccessCall } from '../Redux/ProfileRedux'
import { FriendTypes } from '../Redux/FriendRedux'
import { CardDetailsTypes } from '../Redux/CardDetailsRedux'
import { MoneyTypes } from '../Redux/MoneyRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { LoginRequest,rsaRequest, facebookRequest, 
         twitterRequest, googleRequest,
         notificationRequest
        } from './LoginSagas'
import { RegisterRequest, RegisterRequestNew, OtpRequest,
         forgotPasswordRequest, forgotPasswordOTPRequest,
         makeRegisterRequest, OtpRequestResend, register } 
from './RegisterSagas'
import { firstNameUpdate,changePassword, changeMobile, verifyMobileOtpRequest, ProfileRequestNew } from './ProfileSagas'
import { cardDetailsRequest } from './CardDetailsSagas'
import { FriendRequest, archiveRequest, saveReferrals } from './FriendSagas'
import { getMoneyMonth, getPersonMonth } from './MoneySagas';
import { take } from 'rxjs-compat/operator/take';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();
const apiSignUp2 = DebugConfig.useFixtures ? FixtureAPI : NEWAPI.create();

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    // Login sagas
    takeLatest(LoginTypes.LOGIN_REQUEST, LoginRequest, api),

    // Facebook login
    takeLatest(LoginTypes.FACEBOOK_DATA,facebookRequest,api),

    // Twitter login
    takeLatest(LoginTypes.TWITTER_REQUEST, twitterRequest, api),

    // Google Login
    takeLatest(LoginTypes.GOOGLE_REQUEST, googleRequest, api),

    // Notification Sagas
    takeLatest(LoginTypes.NOTIFICATION_REQUEST, notificationRequest, api),

    // Register sagas
    takeLatest(RegisterTypes.MAKE_REGISTER_REQUEST, register, api),

    // Register sagas
    takeLatest(RegisterTypes.REGISTER_REQUEST_NEW, RegisterRequestNew,apiSignUp2),

    //Register saga for verfiy OTP
    takeLatest(RegisterTypes.VERIFY_OTP, OtpRequest ,apiSignUp2),

    //Register saga for verfiy OTP
    takeLatest(RegisterTypes.VERIFY_OTP_FP, forgotPasswordOTPRequest ,api),

    //Register saga for verfiy OTP resend
    takeLatest(RegisterTypes.VERIFY_OTP_RESEND, OtpRequestResend, api),

    //Register Saga for forgotPass
    takeLatest(RegisterTypes.FORGET_PASSWORD,forgotPasswordRequest,apiSignUp2),

    //Profile Saga from
    // takeLatest(ProfileTypes.GET_PROFILE_REQUEST,ProfileRequest,api),

    //Profile Saga from
    // takeLatest(ProfileTypes.GET_PROFILE,getProfile),

    //Profile Saga from Profile Request New
    takeLatest(ProfileTypes.GET_PROFILE_REQUEST_NEW, ProfileRequestNew,api),

    //Profile Saga Name update
    takeLatest(ProfileTypes.UPDATE_FIRST_NAME,firstNameUpdate,api),

    //Card Details Saga
    takeLatest(CardDetailsTypes.CARD_DETAILS_REQUEST,cardDetailsRequest,api),

    //Change Password
    takeLatest(ProfileTypes.CHANGE_PASSWORD,changePassword,api),

    //Change Mobile Number
    takeLatest(ProfileTypes.CHANGE_MOBILE,changeMobile,api),

    //Mobile 
    takeLatest(ProfileTypes.VERIFY_OTP_MOBILE,verifyMobileOtpRequest,api),

    //Friend Request
    takeLatest(FriendTypes.GET_FRIEND_REQUEST,FriendRequest,api),

    takeLatest(LoginTypes.RSA_REQUEST,rsaRequest,api),

    takeLatest(CardDetailsTypes.CARD_DETAILS_REQUEST,cardDetailsRequest,api),

    takeLatest(FriendTypes.GET_ARCHIVE,archiveRequest,api),

    takeLatest(FriendTypes.SAVE_REFERRALS,saveReferrals,api),

    takeLatest(MoneyTypes.GET_MONEY_MONTH,getMoneyMonth,api),

    takeLatest(MoneyTypes.GET_PERSON_MONTH,getPersonMonth,api),
   ])
}
