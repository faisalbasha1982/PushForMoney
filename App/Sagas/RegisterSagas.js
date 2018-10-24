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

/************************************* REGISTER PROFILE SECOND PAGE *************************** */

function fetchJsonNew(url,payload) {

    // console.log("inside fetchJsonNew: with payload="+payload);
    // console.tron.log("inside fetch json New ="+payload);
  
    return  fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: payload,
    })
    .then((response) => response.json())
    .then( response => {

        // console.log("response code=="+response.StatusCode);

        let token = response.LoginAccessToken;
        AsyncStorage.setItem('token',token);

        // console.tron.log("storing token="+token);

        if(response.StatusCode === 200)
        {
            Alert.alert(
                'Signed in successfully',
                response.Message,
                [
                    { text: 'OK', onPress:() => console.log('user exists ask me later')}
                ],
                {
                    cancelable: false
                }
            );


            NavigationService.navigate('PushToEarnOTP');

        }
        else
        {
            Alert.alert(
                'User already exists',
                response.Message,
                [
                    { text: 'Please Login', onPress:() => NavigationService.navigate('PushToEarnSignIn')}
                ],
                {
                    cancelable: false
                }
            );
        }
  
        return response;
    });

}

export function * fetchRegisterRequestNew(payload) {
 
     return fetchJsonNew(API_URL.staging.laMobileUserSignUp,payload);
}

export function * RegisterRequestNew(api,action)
{
    try
    {
        const response = yield call(fetchRegisterRequestNew, action.payload);
        NavigationService.navigate('PushToEarnOTP',{payload: action.payload});

    }
    catch(error) {
        yield put(RegisterActions.registerFailure());
    }
}

/************************************* REGISTER PROFILE FIRST PAGE *************************** */


function fetchJson(url,payload,username,password) {

    // console.log("inside fetchJson: with payload="+payload);
    // console.tron.log("inside fetch json="+payload);
  
    return  fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: payload,
    })
    .then((response) => response.json())
      .then(response => {
  
            if(response.StatusCode === 200)
            {
                let token = response.LoginAccessToken;
                AsyncStorage.setItem('token',token);
                NavigationService.navigate('PushToEarnRegisterProfile',{uname: username, pword: password, payload: payload});
            }
            else
                Alert.alert(
                'User already exists',
                ''+response.Message,
                [
                    { 
                        text: 'Please Login', 
                        onPress:() => console.log('user exists ask me later')
                    }
                ],
                {
                    cancelable: false
                }
            );     
  
        return response;
      });
  }

export function * fetchRegisterRequest(payload,username,password) {
 
    return fetchJson(`https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnMobileUserLogin?code=${API_URL.commonCode}`,payload,username,password);

}

export function * register(api,action) {
    try
    {
        // make the call to the api
        const response = yield call(fetchRegisterRequest, action.payload,action.username,action.password);
        yield put(RegisterActions.registerSuccess(response.userinfo));
    } 
    catch(error) {
        yield put(RegisterActions.registerFailure());
    }
}

/************************************* REGISTER PROFILE FIRST PAGE ****************************/

/************************************* FORGOT PASSWORD OTP REQUEST ****************************/

function fetchOTPFP(payload)
{
    // console.log("calling fetchOTPFP with payload=",typeof(payload));

    // const url = "https://prod-36.westeurope.logic.azure.com:443/workflows/64111a66520a4621a4f949f0d3a12413/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EcEqv1IaEYCat3Jx3zeQ8HLQzUiuqK8QAzP0R8cJcPw";
    // const url = "https://prod-12.westeurope.logic.azure.com:443/workflows/d2646d57cf7d447f960d7e46684db4cd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ADncEusH2PpqjGoYT_L20L_Wxs9sUuVryh9Z5cJJsS4";

    const url = API_URL.staging.laMobileSaveNewPassword;

    // console.log("newpayload=",payload);

    fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
      .then((response) =>  response.json())
      .then((responseJson) => {

        //   console.log("response=",responseJson.StatusCode);

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

            // console.tron.log("response data=",responseJson.Message);
                
            //Navigate to OTP page
            NavigationService.navigate('PushToEarnSignIn');
    
        }
        else {

            // console.tron.log("response status="+responseJson.StatusCode);
            // console.tron.log("response status="+responseJson.Message);
            // console.tron.log("response status="+responseJson.ErrorDetails);
    

                Alert.alert(
                    'User already exists',
                    responseJson.Message,
                    [
                        { text: 'Please Login', onPress:() => NavigationService.navigate('PushToEarnSignIn')}
                    ],
                    {
                        cancelable: false
                    }
                )        
        }
      }
    )
      .catch((error) => console.error(error));
}

export function* forgotPasswordOTPRequest(api,payload){

    try
    {
        const response = yield call(fetchOTPFP, payload.payload);
        yield put(RegisterActions.registerSuccess());
    }
    catch(error)
    {
        yield put(RegisterActions.registerFailure());
    }
}
/************************************* FORGOT PASSWORD OTP REQUEST ****************************/

/************************************* FORGOT PASSWORD REQUEST *******************************/

function fetchJsonForgotPasswordRequest(payload) {

    const url = API_URL.staging.laMobileSendForgotPasswordOTP;

    fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).then((response) =>  response.json())
      .then((responseJson) => {

        //   console.log("response=",responseJson.StatusCode);

          if (responseJson.StatusCode === 200) 
          {

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

            // console.log("response mobileUserId="+responseJson.MobileUserId);

            //Navigate to OTP page
            NavigationService.navigate('PushToEarnOTPForgetPass',{mobileId: responseJson.MobileUserId});
        }
        else {

            console.tron.log("response status="+responseJson.StatusCode);
            console.tron.log("response status="+responseJson.Message);
            console.tron.log("response status="+responseJson.ErrorDetails);

            Alert.alert(
                'User already exists',
                responseJson.Message,
                [
                    { text: 'Please Login', onPress:() => NavigationService.navigate('PushToEarnSignIn')}
                ],
                {
                    cancelable: false
                }
            )        
        }
      });

}

export function* forgotPasswordRequest(api,action) {

    try {
            let response = yield call(fetchJsonForgotPasswordRequest,action.payload);
            yield put(RegisterActions.registerSuccess());
    }
    catch(error)
    {
        yield put(RegisterActions.registerFailure());
    }
   
}

/************************************* FORGOT PASSWORD REQUEST ****************************/


/************************************* Fetch OTP VERIFICATION ****************************/

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

    // console.log("firstParam=",firstParam.substring(1,firstParam.length-1));
    // console.log("secondParam=",secondParam.substring(1,secondParam.length-1));
    // console.log("thirdParam=",thirdParam.substring(1,thirdParam.length-1));
    // console.log("fourthParam=",fourthParam.substring(1,fourthParam.length-1));

    // const url = "https://prod-49.westeurope.logic.azure.com:443/workflows/19bdce4bb7d740f586a5f86bf9014efa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LU6WJJr0yUTzSFLdH9TXCBdYPVh6x3SMGegOPX0OTfA";
    // const url = "https://prod-21.westeurope.logic.azure.com:443/workflows/fc0efd237ccb46268c5353e97d791a7e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z2LNFPTtuCNVTEq9jcpwaKsLGgOjYaQOuiwoJFZenbY";

    const url = API_URL.staging.laMobileOtpVerification;

    let newPayload = {
        AuthenticationData: firstParam.substring(1,firstParam.length-1),
        LoginAccessToken: secondParam.substring(1,secondParam.length-1),
        OTP: thirdParam.substring(1,thirdParam.length-1),
        OTPType: fourthParam.substring(1,fourthParam.length-1)
    };

    // console.log("newpayload=",newPayload);

    fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPayload),
    }).then((response) =>  response.json())
      .then((responseJson) => {

        //   console.log("response=",responseJson.StatusCode);

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

            // console.tron.log("response data=",responseJson.data);
            const mobileOTP = responseJson.mobileOTP;
            const statusCode = responseJson.StatusCode;            
                
            //Navigate to OTP page
            NavigationService.navigate('PushToEarnSignIn');
    
        } 
        else {

            // console.tron.log("response status="+responseJson.StatusCode);
            // console.tron.log("response status="+responseJson.Message);
            // console.tron.log("response status="+responseJson.ErrorDetails);

            Alert.alert(
                'User already exists',
                responseJson.Message,
                [
                    { text: 'Please Login', onPress:() => console.log('user exists ask me later')}
                ],
                {
                    cancelable: false
                }
            )        
        }
      }
    )
      .catch((error) => console.error(error));
      
}

/************************************* OTP REQUEST ****************************/

export function * OtpRequest(api,action) {

    try {

        const response = yield call(fetchOTP, action.payload);
        yield put(RegisterActions.registerSuccess());

    }catch(error)
    {
        console.tron.log("Error@login",error);
        yield put(RegisterActions.registerFailure());
    }
}

/************************************* OTP RESEND *****************************/
function fetchOtpResend(payload)
{
    // const url = "https://prod-56.westeurope.logic.azure.com:443/workflows/9834ab95eb784c9b87f174acdd1f87b0/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LenubOpJgzckOgeOAbq12BS9_0JFjtGUYogtgKYRlRE";
    // const url = "https://prod-27.westeurope.logic.azure.com:443/workflows/75cdda7a4d1e412f8b6fbb00f099cdbc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FY6KovQIbuksZrM6Eh00bISPC1oUTrSxFKKhCbyRwpY";

    const url = API_URL.staging.laMobileUserResendSignupOTP;

    fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).then((response) =>  response.json())
      .then((responseJson) => {

        //   console.log("response=",responseJson.StatusCode);

          if (responseJson.StatusCode === 200)
          {

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

            const mobileOTP = responseJson.mobileOTP;
            const statusCode = responseJson.StatusCode;
                
            //Navigate to OTP page
            NavigationService.navigate('PushToEarnSignIn');
    
        } 
        else 
        {

            // console.tron.log("response status="+responseJson.StatusCode);
            // console.tron.log("response status="+responseJson.Message);
            // console.tron.log("response status="+responseJson.ErrorDetails);

            Alert.alert(
                'User already exists',
                responseJson.Message,
                [
                    { text: 'Please Login', onPress:() => NavigationService.navigate('PushToEarnSignIn')}
                ],
                {
                    cancelable: false
                }
            );
        }
      }
    )
      .catch((error) => console.error(error));
}

/************************************* OTP REQUEST RESEND ****************************/

export function * OtpRequestResend(api,payload) {

    try {

            // console.log("calling api from otp resend request saga ="+api);
            // console.log("incoming payload for otp resend request=",payload.payload);

            const response = yield call(fetchOtpResend, payload.payload);

            // do data conversion here if needed
            yield put(RegisterActions.registerSuccess());      
        
        }
    catch(error)
    {
        // console.tron.log("Error@login",error);
        yield put(RegisterActions.registerFailure())
    }


}
