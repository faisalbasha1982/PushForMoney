import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import ProfileActions from '../Redux/ProfileRedux';
import * as NavigationService from '../Navigation/NavigationService';

export function * ProfileRequest(api,action) {
  try{

    console.log("api="+api);

    // make the call to the api
    const response = yield call(api.getProfile, action.payload);

    console.tron.log("response from api call =",response);

    if (response.status === 200) {
        // const resp = path(['data', 'items'], response)[0];
        console.tron.log("response data=",response.data);
        const token = response.data.LoginAccessToken;
        const userinfo = response.data.userinfo;

        try {
            AsyncStorage.setItem('token',token);
        }
        catch(error){
        console.tron.log('error='+error);
        }

        console.tron.log("login access token=",token);
        // do data conversion here if needed
        yield put(ProfileActions.profileSuccess(userinfo));
        NavigationService.navigate('PushToEarnMoney');
    } else {
        yield put(ProfileActions.profileFailure());
    }
}
catch(error) {
  console.tron.log("Error@login",error);
  console.log("error="+error);
}
}

export function * firstNameUpdate(api,action) {

    try
    {
        console.log("api="+api);

        // make the call to the api
        const response = yield call(api.updateName, action.payload);
    
        console.tron.log("response from api call ="+response);
        console.log("repsonse from api call="+response);
    
        if (response.Status === 200) {
            // const resp = path(['data', 'items'], response)[0];
            console.tron.log("response data=",response.data);
            const token = response.data.LoginAccessToken;
            const userinfo = response.data.userinfo;
    
            try {
                AsyncStorage.setItem('token',token);
            }
            catch(error){
            console.tron.log('error='+error);
            }
    
            console.tron.log("login access token=",token);
            // do data conversion here if needed
            yield put(ProfileActions.profileSuccess(userinfo));
            NavigationService.navigate('PushToEarnMoney');
        } else {
            yield put(ProfileActions.profileFailure());
        }
    }
    catch(error) {
        console.tron.log("error="+error);
    }
   
} 

export function * changePassword(api,action)
{
    try
    {
        console.log("api="+api);

        // make the call to the api
        const response = yield call(api.changePassword, action.payload);
    
        console.tron.log("response from api call ="+response);
        console.log("repsonse from api call="+response);
    
        if (response.Status === 200) {
            // const resp = path(['data', 'items'], response)[0];
            console.tron.log("response data=",response.data);
            const token = response.data.LoginAccessToken;
            const userinfo = response.data.userinfo;
    
            try {
                AsyncStorage.setItem('token',token);
            }
            catch(error){
            console.tron.log('error='+error);
            }
    
            console.tron.log("login access token=",token);
            // do data conversion here if needed
            yield put(ProfileActions.profileSuccess(userinfo));
            NavigationService.navigate('PushToEarnMoney');
        } else {
            yield put(ProfileActions.profileFailure());
        }
    }
    catch(error) {
        console.tron.log("error="+error);
    }
}

export function * changeMobile(api,action)
{
    try
    {
        console.log("api="+api);

        // make the call to the api
        const response = yield call(api.changeMobile, action.payload);
    
        console.tron.log("response from api call ="+response);
        console.log("repsonse from api call="+response);
    
        if (response.Status === 200) {
            // const resp = path(['data', 'items'], response)[0];
            console.tron.log("response data=",response.data);
            const token = response.data.LoginAccessToken;
            const userinfo = response.data.userinfo;
    
            try {
                AsyncStorage.setItem('token',token);
            }
            catch(error){
            console.tron.log('error='+error);
            }
    
            console.tron.log("login access token=",token);
            // do data conversion here if needed
            yield put(ProfileActions.profileSuccess(userinfo));
            NavigationService.navigate('PushToEarnMoneyOTP');
        } else {
            yield put(ProfileActions.profileFailure());
        }
    }
    catch(error) {
        console.tron.log("error="+error);
    }
}

export function * verifyMobileOtpRequest(api,action)
{
    try
    {
        console.log("api="+api);

        // make the call to the api
        const response = yield call(api.verifyOTPMobile, action.payload);
    
        console.tron.log("response from api call ="+response);
        console.log("repsonse from api call="+response);
    
        if (response.Status === 200) {
            // const resp = path(['data', 'items'], response)[0];
            console.tron.log("response data=",response.data);
            const token = response.data.LoginAccessToken;
            const userinfo = response.data.userinfo;
    
            try {
                AsyncStorage.setItem('token',token);
            }
            catch(error){
            console.tron.log('error='+error);
            }
    
            console.tron.log("login access token=",token);
            // do data conversion here if needed
            yield put(ProfileActions.profileSuccess(userinfo));
            NavigationService.navigate('PushToEarnMoneyOTP');
        } else {
            yield put(ProfileActions.profileFailure());
        }
    }
    catch(error) {
        console.tron.log("error="+error);
    }
}