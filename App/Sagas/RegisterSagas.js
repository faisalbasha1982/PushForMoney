import { call, put, takeLatest, takeEvery, take } from 'redux-saga/effects';
import { AsyncStorage, Alert } from 'react-native';
import { path } from 'ramda';
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import API from '../Services/Api';
import API_URL from '../Services/Api_url';
import RegisterActions from '../Redux/RegisterRedux';
import RegisterTypes from '../Redux/RegisterRedux';
import * as NavigationService from '../Navigation/NavigationService';
import localStorage from 'react-native-sync-localstorage';

export function * RegisterRequestNew(api,payload) {

    try{
        // make the call to the api
        console.log("incoming payload="+payload.payload);

        const response = yield call(api.signUp2, payload.payload);

        console.log("response type=",response.ok);

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
            );
        }
        else      
        if (response.ok) {

          console.tron.log("response data=",response.data);
          const token = response.data.LoginAccessToken;
          const userinfo = response.data.userinfo;
          const statusCode = response.data.StatusCode;

          Alert.alert(
            'Signed in successfully',
            response.data.Message,
            [
                { text: 'OK', onPress:() => console.log('user exists ask me later')}
            ],
            {
                cancelable: false
            }
        );
      
          try {
               // output token to tron
               console.tron.log("login access token=",token);

               //Save token in Async Storage
            //    AsyncStorage.setItem('token',token);                
            localStorage.setItem('token', token);

          }
          catch(error){
            console.tron.log('error='+error);
          }
      

          // do data conversion here if needed
          //yield put(RegisterActions.registerSuccess(userinfo));      

          //Navigate to OTP page
          NavigationService.navigate('PushToEarnOTP',{payload: payload.payload});
      
        } else {
          yield put(RegisterActions.registerFailure())
        }
      }
      catch(error) {
        console.tron.log("Error@login",error);
        console.log("error="+error);
      }
}

export function * makeRegisterRequest(api,action) {

    console.log("called make Register Request payload="+action.payload+" username="+action.username+" password="+action.password);

    //yield takeEvery('REGISTER_REQUEST', RegisterRequest, api,action.payload,action.username,action.password);

    try{

        // make the call to the api
        const response = yield call(api.register, action.payload);
      
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
          catch(error)
          {
            console.tron.log('error='+error);
          }
      
          console.tron.log("login access token=",token);
          // do data conversion here if needed
          yield put(RegisterActions.registerSuccess(userinfo));
      
          if( statusCode === 200)
              NavigationService.navigate('PushToEarnRegisterProfile',{uname: action.username, pword: action.password, payload: action.payload});
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

export function * RegisterRequest(api,payload,username,password) {

    console.log("called Register Request="+payload+" username="+username+" password="+password);

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
    catch(error)
    {
      console.tron.log('error='+error);
    }

    console.tron.log("login access token=",token);
    // do data conversion here if needed
    yield put(RegisterActions.registerSuccess(userinfo));

    if( response.data.StatusCode === 200)
        NavigationService.navigate('PushToEarnRegisterProfile',{uname: username,pword: password});
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
        const response = yield call(fetchOTPFP, payload.payload);

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
                const statusCode = response.data.StatusCode;
                const message = response.data.Message;
                    
                // output token to tron
                console.tron.log("response message=",message);

                // do data conversion here if needed
                yield put(RegisterActions.registerSuccess());      

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
                const mobileUserId = response.data.MobileUserId;
                const statusCode = response.data.StatusCode;
                const message = response.data.Message;
                    
                // output token to tron
                console.tron.log("MobileOTP response=",mobileUserId);

                // do data conversion here if needed
                yield put(RegisterActions.registerSuccess(mobileUserId));      

                //Navigate to OTP page
                NavigationService.navigate('PushToEarnOTPForgetPass',{mobileId: mobileUserId});
        
            } 
            else {
                yield put(RegisterActions.registerFailure())
            }
        
        
    }catch(error){
        console.tron.log("Error@login",error);
    }
}

function fetchOTPFP(payload)
{
    console.log("calling fetchOTPFP with payload=",typeof(payload));
    // let parameters = payload.split(",");

    // console.log("parameters=",parameters);

    // let authParam = parameters[0].split(":");
    // let firstParam = authParam[1];

    // console.log("first param=",firstParam);

    // let idParam = parameters[1].split(":");
    // let secondParam = idParam[1];

    // console.log("second param=",secondParam);

    // let otpParam = parameters[2].split(":");
    // let thirdParam = otpParam[1];

    // console.log("third param=",thirdParam);

    // let newpasswordParam = parameters[3].split(":");
    // let fourthParam = newpasswordParam[1];

    // console.log("fourth param=",fourthParam);

    // let confirmpasswordParam = parameters[4].split(":");
    // let fifthParam = confirmpasswordParam[1].substring(0,confirmpasswordParam.length-1);

    // console.log("fifth param=",fifthParam);

    // let newPayload = {

    //     AuthenticationData: firstParam,
    //     MobileUserId : idParam,
    //     OTP : thirdParam,
    //     NewPassword : fourthParam,
    //     ConfirmPassword : fifthParam,

    // };

    const url = "https://prod-36.westeurope.logic.azure.com:443/workflows/64111a66520a4621a4f949f0d3a12413/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EcEqv1IaEYCat3Jx3zeQ8HLQzUiuqK8QAzP0R8cJcPw";

    console.log("newpayload=",payload);

    fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).then((response) =>  response.json())
      .then((responseJson) => {
          console.log("response=",responseJson.StatusCode);

          if (responseJson.StatusCode === 200) {

            Alert.alert(
                'Successfull',
                responseJson.Message,
                [
                    { text: 'OK', onPress:() => console.log('user exists ask me later')}
                ],
                {
                    cancelable: false
                }
            );

            console.tron.log("response data=",responseJson.Message);
                
            // output token to tron

            // do data conversion here if needed
            //yield put(RegisterActions.registerSuccess(mobileOTP));

            //Navigate to OTP page
            NavigationService.navigate('PushToEarnSignIn');
    
        } 
        else {
            //yield put(RegisterActions.registerFailure())
        }
      }
    )
      .catch((error) => console.error(error));

}

function fetchOTP(payload)
{
    let parameters = payload.split(",");

    let authParam = parameters[0].split(":");
    let firstParam = authParam[1];

    let tokenParam = parameters[1].split(":");
    let secondParam = tokenParam[1];

    let otpParam = parameters[2].split(":");
    let thirdParam = otpParam[1];

    let otpTypeParam = parameters[3].split(":");
    let fourthParam = otpTypeParam[1].substring(0,otpTypeParam[1].length-1);

    console.log("firstParam=",firstParam.substring(1,firstParam.length-1));
    console.log("secondParam=",secondParam.substring(1,secondParam.length-1));
    console.log("thirdParam=",thirdParam.substring(1,thirdParam.length-1));
    console.log("fourthParam=",fourthParam.substring(1,fourthParam.length-1));

    const url = "https://prod-49.westeurope.logic.azure.com:443/workflows/19bdce4bb7d740f586a5f86bf9014efa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LU6WJJr0yUTzSFLdH9TXCBdYPVh6x3SMGegOPX0OTfA";

    let newPayload = {
        AuthenticationData: firstParam.substring(1,firstParam.length-1),
        LoginAccessToken: secondParam.substring(1,secondParam.length-1),
        OTP: thirdParam.substring(1,thirdParam.length-1),
        OTPType: fourthParam.substring(1,fourthParam.length-1)
    };

    console.log("newpayload=",newPayload);

    fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPayload),
    }).then((response) =>  response.json())
      .then((responseJson) => {
          console.log("response=",responseJson.StatusCode);

          if (responseJson.StatusCode === 200) {

            Alert.alert(
                'Sign up Successfull',
                responseJson.Message,
                [
                    { text: 'OK', onPress:() => console.log('user exists ask me later')}
                ],
                {
                    cancelable: false
                }
            );

            console.tron.log("response data=",responseJson.Message);
            const mobileOTP = responseJson.mobileOTP;
                
            // output token to tron
            console.tron.log("MobileOTP response=",mobileOTP);

            // do data conversion here if needed
            //yield put(RegisterActions.registerSuccess(mobileOTP));

            //Navigate to OTP page
            NavigationService.navigate('PushToEarnSignIn');
    
        } 
        else {
            //yield put(RegisterActions.registerFailure())
        }
      }
    )
      .catch((error) => console.error(error));
      
}

export function * OtpRequest(api,payload) {

    try {
        console.log("calling api from otp request saga ="+api);
        console.log("incoming payload for otp request=",payload.payload);
        const response = yield call(fetchOTP, payload.payload);

        console.tron.log("response="+response.ok);
        console.log("response=",response);
        console.log("response Status=",response.status);

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

function fetchOtpResend(payload)
{
    const url = "https://prod-56.westeurope.logic.azure.com:443/workflows/9834ab95eb784c9b87f174acdd1f87b0/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LenubOpJgzckOgeOAbq12BS9_0JFjtGUYogtgKYRlRE";

    fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).then((response) =>  response.json())
      .then((responseJson) => {
          console.log("response=",responseJson.StatusCode);

          if (responseJson.StatusCode === 200) {

            Alert.alert(
                'OTP Resent Successfull',
                responseJson.Message,
                [
                    { text: 'OK', onPress:() => console.log('user exists ask me later')}
                ],
                {
                    cancelable: false
                }
            );

            console.tron.log("response data=",responseJson.Message);
                
            // output token to tron

            // do data conversion here if needed
            //yield put(RegisterActions.registerSuccess(mobileOTP));

            //Navigate to OTP page
            NavigationService.navigate('PushToEarnSignIn');
    
        } 
        else {
            //yield put(RegisterActions.registerFailure())
        }
      }
    )
      .catch((error) => console.error(error));

}

export function * OtpRequestResend(api,payload) {

    try {
        console.log("calling api from otp resend request saga ="+api);
        console.log("incoming payload for otp resend request=",payload.payload);
        const response = yield call(fetchOtpResend, payload.payload);

        console.tron.log("response="+response.ok);
        console.log("response=",response);
        console.log("response Status=",response.status);

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

                console.tron.log("response data=",response.data);                const mobileOTP = response.data.mobileOTP;
                const statusCode = response.data.StatusCode;
                    
                // output token to tron
                console.tron.log("statusCode =",statusCode);

                // do data conversion here if needed
                yield put(RegisterActions.registerSuccess());      

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
