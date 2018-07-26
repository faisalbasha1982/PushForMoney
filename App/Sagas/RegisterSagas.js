import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage, Alert } from 'react-native';
import { path } from 'ramda';
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import API from '../Services/Api';
import API_URL from '../Services/Api_url';
import RegisterActions from '../Redux/RegisterRedux';
import * as NavigationService from '../Navigation/NavigationService';

export function * RegisterRequestNew(api,payload) {

    try{
        // make the call to the api
        console.log("api="+api);
        const response = yield call(api.registerNew, payload.payload);

        console.tron.log("response="+response.ok);

        if(!response.ok)
        {
            console.tron.log("response status="+response.status);
            console.tron.log("response status="+response.data.StatusCode);
            console.tron.log("response status="+response.data.Message);
            console.tron.log("response status="+response.data.ErrorDetails);

            Alert.alert(
                'User already exists',
                response.data.Message,
                [
                    { text: 'Please Login', onPress:() => console.log('user exists ask me later')}
                ],
                {
                    cancelable: false
                }
            )        
        }
        else      
        if (response.data.StatusCode === 200) {

          console.tron.log("response data=",response.data);
          const token = response.data.LoginAccessToken;
          const userinfo = response.data.userinfo;
          const statusCode = response.data.StatusCode;
      
          try {
               //Save token in Async Storage
                AsyncStorage.setItem('token',token);
          }
          catch(error){
            console.tron.log('error='+error);
          }
      
          // output token to tron
          console.tron.log("login access token=",token);

          // do data conversion here if needed
          yield put(RegisterActions.registerSuccess(userinfo));      

          //Navigate to OTP page
          NavigationService.navigate('PushToEarnOTP');
      
        } else {
          yield put(RegisterActions.registerFailure())
        }
      }
      catch(error) {
        console.tron.log("Error@login",error);
        console.log("error="+error);
      }
}

export function * RegisterRequest(api,payload) {
  try{

  // make the call to the api
  const response = yield call(api.register, payload.payload);

  console.tron.log("response from api call =",response);

  if (response.ok) {
    // const resp = path(['data', 'items'], response)[0];
    console.tron.log("response data=",response.data);
    const token = response.data.LoginAccessToken;
    const userinfo = response.data.userinfo;
    const statusCode = response.data.StatusCode;

    try {
          AsyncStorage.setItem('token',token);
    }
    catch(error){
      console.tron.log('error='+error);
    }

    console.tron.log("login access token=",token);
    // do data conversion here if needed
    yield put(RegisterActions.registerSuccess(userinfo));

    if( response.data.StatusCode === 200)
        NavigationService.navigate('PushToEarnRegisterProfile');
    else
        Alert.alert(
            'User already exists',
            ''+response.data.Message,
            [
                { 
                    text: 'Please Login', 
                    onPress:() => console.log('user exists ask me later')
                }
            ],
            {
                cancelable: false
            }
        )        

  } 
  else 
  {
        yield put(RegisterActions.registerFailure())
  }
}
catch(error) {
  console.tron.log("Error@login",error);
  console.log("error="+error);
}
}

export function* forgotPasswordOTPRequest(api,payload){
    try
    {
        console.log("api="+api);
        const response = yield call(api.verifyOTPFP, payload.payload);

        console.tron.log("response="+response.ok);
        console.log("response=",response);

        if(!response.ok)
        {
            console.tron.log("response status="+response.status);
            console.tron.log("response status="+response.data.StatusCode);
            console.tron.log("response status="+response.data.Message);
            console.tron.log("response status="+response.data.ErrorDetails);

            Alert.alert(
                'User already exists',
                response.data.Message,
                [
                    { text: 'Please Login', onPress:() => console.log('user exists ask me later')}
                ],
                {
                    cancelable: false
                }
            )        
        }
        else      
            if (response.data.StatusCode === 200) {

                console.tron.log("response data=",response.data);
                const mobileOTP = response.data.mobileOTP;
                const statusCode = response.data.StatusCode;
                const message = response.data.Message;
                    
                // output token to tron
                console.tron.log("MobileOTP response=",mobileOTP);

                // do data conversion here if needed
                yield put(RegisterActions.registerSuccess(mobileOTP));      

                //Navigate to OTP page
                NavigationService.navigate('PushToEarnSignIn');
        
            } 
            else {
                yield put(RegisterActions.registerFailure())
            }
        
        
    }catch(error){
        console.tron.log("Error@login",error);
    }
}


export function* forgotPasswordRequest(api,payload) {
    try
    {
        console.log("api="+api);
        const response = yield call(api.forgotPass, payload.payload);

        console.tron.log("response="+response.ok);
        console.log("response=",response);

        if(!response.ok)
        {
            console.tron.log("response status="+response.status);
            console.tron.log("response status="+response.data.StatusCode);
            console.tron.log("response status="+response.data.Message);
            console.tron.log("response status="+response.data.ErrorDetails);

            Alert.alert(
                'User already exists',
                response.data.Message,
                [
                    { text: 'Please Login', onPress:() => console.log('user exists ask me later')}
                ],
                {
                    cancelable: false
                }
            )        
        }
        else      
            if (response.data.StatusCode === 200) {

                console.tron.log("response data=",response.data);
                const mobileOTP = response.data.mobileOTP;
                const statusCode = response.data.StatusCode;
                const message = response.data.Message;
                    
                // output token to tron
                console.tron.log("MobileOTP response=",mobileOTP);

                // do data conversion here if needed
                yield put(RegisterActions.registerSuccess(mobileOTP));      

                //Navigate to OTP page
                NavigationService.navigate('PushToEarnOTP');
        
            } 
            else {
                yield put(RegisterActions.registerFailure())
            }
        
        
    }catch(error){
        console.tron.log("Error@login",error);
    }
}

export function* OtpRequest(api,payload) {

    try {
        console.log("api="+api);
        const response = yield call(api.verifyOTP, payload.payload);

        console.tron.log("response="+response.ok);
        console.log("response=",response);

        if(!response.ok)
        {
            console.tron.log("response status="+response.status);
            console.tron.log("response status="+response.data.StatusCode);
            console.tron.log("response status="+response.data.Message);
            console.tron.log("response status="+response.data.ErrorDetails);

            Alert.alert(
                'User already exists',
                response.data.Message,
                [
                    { text: 'Please Login', onPress:() => console.log('user exists ask me later')}
                ],
                {
                    cancelable: false
                }
            )        
        }
        else      
            if (response.data.StatusCode === 200) {

                console.tron.log("response data=",response.data);
                const mobileOTP = response.data.mobileOTP;
                const statusCode = response.data.StatusCode;
                    
                // output token to tron
                console.tron.log("MobileOTP response=",mobileOTP);

                // do data conversion here if needed
                yield put(RegisterActions.registerSuccess(userinfo));      

                //Navigate to OTP page
                NavigationService.navigate('PushToEarnSignIn');
        
            } 
            else {
                yield put(RegisterActions.registerFailure())
            }
    }catch(error)
    {
        console.tron.log("Error@login",error);
    }
}
