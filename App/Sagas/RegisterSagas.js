import { call, put, takeLatest, takeEvery, take } from 'redux-saga/effects';
import { AsyncStorage, Alert } from 'react-native';
import { path } from 'ramda';
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import API from '../Services/Api';
import API_URL from '../Services/Api_url';
import RegisterActions, { RegisterSelectors } from '../Redux/RegisterRedux';
import RegisterTypes from '../Redux/RegisterRedux';
import * as NavigationService from '../Navigation/NavigationService';
import localStorage from 'react-native-sync-localstorage';
import Icon from 'react-native-vector-icons/FontAwesome';
import LanguageSettingsPFM from '../Containers/LanguageSettingsPFM';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';

/************************************* REGISTER PROFILE SECOND PAGE *************************** */

function fetchJsonNew(url,payload) {

    // console.log("inside fetchJsonNew: with payload="+payload);
     console.tron.log("inside fetch json New ="+payload);
  
    return  fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then((response) => response.json())
    .then( response => {

        let token = response.LoginAccessToken;
        AsyncStorage.setItem('token','');

        if(response.StatusCode === 200)
        {
            // Alert.alert(
            //     'Signed in successfully',
            //     response.Message,
            //     [
            //         { text: 'OK', onPress:() => console.log('user exists ask me later')}
            //     ],
            //     {
            //         cancelable: false
            //     }
            // )

            //NavigationService.navigate('PushToEarnSignIn2');
                
            NavigationService.navigate('PushToEarnOTPRegister',{accessToken: response.LoginAccessToken, phone: '', payload: '' });

        }
        else
        {
            // Alert.alert(
            //     'User already exists',
            //     response.Message,
            //     [
            //         { text: 'Please Login', onPress:() => NavigationService.navigate('PushToEarnSignIn2')}
            //     ],
            //     {
            //         cancelable: false
            //     }
            // );

            if(response.StatusCode === 400)
            {
                console.tron.log("response 400");

                Alert.alert(
                    response.Message,
                    '',
                [
                    { text: 'Back', onPress:() => NavigationService.goBack()},
                    { text: 'Login', onPress:() => NavigationService.navigate('PushToEarnSignIn2')}
                ],
                {
                    cancelable: false
                }
              );
            }
        }
  
        return response;
    });

}

export function * fetchRegisterRequestNew(payload) {
 
     return fetchJsonNew(API_URL.production.laMobileUserSignUp,payload);
}

export function * RegisterRequestNew(api,action)
{
    try
    {
        const response = yield call(fetchRegisterRequestNew, action.payload);
        //NavigationService.navigate('PushToEarnOTP',{payload: action.payload});

    }
    catch(error) {

        yield put(RegisterActions.registerFailure());
    }
}

/************************************* END OF REGISTER PROFILE SECOND PAGE *************************** */

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

/************************************* END OF REGISTER PROFILE FIRST PAGE ****************************/

/************************************* MOBILE REGISTER PROFILE FIRST PAGE **********************************/

function fetchJsonmobileregister(url,payload,phone) {
  
    return  fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then((response) => response.json())
      .then(response => {
  
        console.tron.log("StatusCode="+response.StatusCode);

            if(response.StatusCode === 201)
            {
                let token = response.LoginAccessToken;
                AsyncStorage.setItem('token','');

                console.tron.log("StatusCode="+response.StatusCode);
                console.tron.log("phone="+phone);
                
                // Navigate to PushToEarnRegisterProfile
                NavigationService.navigate('PushToEarnRegisterProfile',{uname: '', pword: '', payload: payload, mobilephone: phone, pPayload: ''});
                
                //NavigationService.navigate('PushToEarnOTPRegister',{accessToken: response.LoginAccessToken, phone: phone, payload: payload });
            }
            else

            AsyncStorage.getItem('language').then((language) => {

                if(language === 'Dutch')
                      
                Alert.alert(
                    languageSettingsPFM.Dutch.userExists,
                    ''+response.Message,
                    [
                        { 
                            text: 'Log alstublieft in', 
                            onPress:() => { NavigationService.navigate('PushToEarnSignIn2') }
                        }
                    ],
                    {
                        cancelable: false
                    }
                );     
                else
                  if(language === 'English')                
                  Alert.alert(
                    languageSettingsPFM.English.userExists,
                    ''+response.Message,
                    [
                        { 
                            text: 'Please Login', 
                            onPress:() => { NavigationService.navigate('PushToEarnSignIn2') }
                        }
                    ],
                    {
                        cancelable: false
                    }
                );     
                    
                  else
                  Alert.alert(
                    languageSettingsPFM.French.userExists,
                    ''+response.Message,
                    [
                        { 
                            text: 'Veuillez vous connecter', 
                            onPress:() => { NavigationService.navigate('PushToEarnSignIn2') }
                        }
                    ],
                    {
                        cancelable: false
                    }
                );     
                
            });
                
  
        return response;
      });
  }

export function * fetchRegisterMobileNumber(payload, phone) {
    return fetchJsonmobileregister(API_URL.production.laMobileLogin,payload,phone);
    //return fetchJsonmobileregister(`https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnMobileUserLoginByMobile?code=${API_URL.commonCode}`,payload, phone);
}

export function * mobileregister(action) {
    try
    {
        // make the call to the api
        const response = yield call(fetchRegisterMobileNumber, action.payload, action.mobileNumber);
        yield put(RegisterActions.mobilerequestSuccess(action.mobileNumber));
        //yield put(RegisterActions.registerSuccess(response.userinfo));

    } 
    catch(error) {
        yield put(RegisterActions.registerFailure());
    }
}

/************************************* END OF MOBILE REGISTER PROFILE FIRST PAGE **********************************/



/************************************* FORGOT PASSWORD OTP REQUEST ****************************/

function fetchOTPFP(payload)
{
    // console.log("calling fetchOTPFP with payload=",typeof(payload));

    // const url = "https://prod-36.westeurope.logic.azure.com:443/workflows/64111a66520a4621a4f949f0d3a12413/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EcEqv1IaEYCat3Jx3zeQ8HLQzUiuqK8QAzP0R8cJcPw";
    // const url = "https://prod-12.westeurope.logic.azure.com:443/workflows/d2646d57cf7d447f960d7e46684db4cd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ADncEusH2PpqjGoYT_L20L_Wxs9sUuVryh9Z5cJJsS4";

    const url = API_URL.production.laMobileSaveNewPassword;

    AsyncStorage.setItem('token',payload.LoginAccessToken);

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

          if (responseJson.StatusCode === 200) 
          {

            AsyncStorage.getItem('language').then((language) => {

                if(language === 'English')
                    Alert.alert(
                        'OTP Successfull!',
                        responseJson.Message,
                        [
                            { text: 'OK', onPress:() => console.log('user exists ask me later')}
                        ],
                        {
                            cancelable: false
                        }
                    );
                 else
                   if(language === 'Dutch')
                    Alert.alert(
                        'OTP Succesvolle!',
                        responseJson.Message,
                        [
                            { text: 'OK', onPress:() => console.log('user exists ask me later')}
                        ],
                        {
                            cancelable: false
                        }
                    );
                  else
                  Alert.alert(
                    'OTP Réussi!',
                    responseJson.Message,
                    [
                        { text: 'OK', onPress:() => console.log('user exists ask me later')}
                    ],
                    {
                        cancelable: false
                    }
                );

            });
                
            //Navigate to OTP page
            NavigationService.navigate('PushToEarnSignIn2');
    
        }
        else {    

            AsyncStorage.getItem('language').then((language) => {

                if(language === 'Dutch')                      
                    Alert.alert(
                        languageSettingsPFM.Dutch.userExists,
                        ''+response.Message,
                        [
                            { 
                                text: 'Log alstublieft in', 
                                onPress:() => { NavigationService.navigate('PushToEarnSignIn2') }
                            }
                        ],
                        {
                            cancelable: false
                        }
                    );     
                else
                  if(language === 'English')                
                        Alert.alert(
                            languageSettingsPFM.English.userExists,
                            ''+response.Message,
                            [
                                { 
                                    text: 'Please Login', 
                                    onPress:() => { NavigationService.navigate('PushToEarnSignIn2') }
                                }
                            ],
                            {
                                cancelable: false
                            }
                        );                         
                  else
                  Alert.alert(
                    languageSettingsPFM.French.userExists,
                    ''+response.Message,
                    [
                        { 
                            text: 'Veuillez vous connecter', 
                            onPress:() => { NavigationService.navigate('PushToEarnSignIn2') }
                        }
                    ],
                    {
                        cancelable: false
                    }
                );     
                
            });
        }
      }
    )
      .catch((error) => console.error(error));
}

export function* forgotPasswordOTPRequest(api,payload)
{
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

    const url = API_URL.production.laMobileSendForgotPasswordOTP;

    fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).then((response) =>  response.json())
      .then((responseJson) => {

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

export function* forgotPasswordRequest(api,action) 
{
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

function fetchOTP(payload,phone,pPayload)
{
 
    // const url = "https://prod-49.westeurope.logic.azure.com:443/workflows/19bdce4bb7d740f586a5f86bf9014efa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LU6WJJr0yUTzSFLdH9TXCBdYPVh6x3SMGegOPX0OTfA";
    // const url = "https://prod-21.westeurope.logic.azure.com:443/workflows/fc0efd237ccb46268c5353e97d791a7e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z2LNFPTtuCNVTEq9jcpwaKsLGgOjYaQOuiwoJFZenbY";

    const url = API_URL.production.laMobileOtpVerification;

    fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).then((response) =>  response.json())
      .then((responseJson) => {

          if (responseJson.StatusCode === 200) {

            // Alert.alert(
            //     'Sign up Successfull',
            //     responseJson.Message,
            //     [
            //         { text: 'OK', onPress:() => console.log('user exists ask me later')}
            //     ],
            //     {
            //         cancelable: false
            //     }
            // );

            const mobileOTP = responseJson.mobileOTP;
            const statusCode = responseJson.StatusCode;

            console.tron.log("phone in otp request="+phone);

            AsyncStorage.setItem('token',payload.LoginAccessToken);

            //Navigate to profile page
            //NavigationService.navigate('PushToEarnRegisterProfile',{uname: '', pword: '', payload: payload, phone: phone, pPayload: pPayload});
            AsyncStorage.getItem('language').then((language) => {
                //Navigate to OTP page
                NavigationService.navigate('TestPage',{language:language});
              });    
        } 
        else {

            // Alert.alert(
            //     'User already exists',
            //     responseJson.Message,
            //     [
            //         { text: 'Please Login', onPress:() => {
            //               NavigationService.navigate('PushToEarnSignIn2');
            //         } }
            //     ],
            //     {
            //         cancelable: false
            //     }
            // )        
        }
      }
    )
      .catch((error) => console.error(error));

}

/************************************* OTP REQUEST ****************************/

export function * OtpRequest(api,action) {

    try {
        
        console.tron.log("phone in otp request="+action.phone);
        const response = yield call(fetchOTP, action.payload,action.phone,action.pPayload);
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

    const url = API_URL.production.laMobileUserResendSignupOTP;

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

            // Alert.alert(
            //     'OTP Resent Successfull',
            //     responseJson.Message,
            //     [
            //         { text: 'OK', onPress:() => console.log('user exists ask me later')}
            //     ],
            //     { 
            //         cancelable: false
            //     }
            // );

            const mobileOTP = responseJson.mobileOTP;
            const statusCode = responseJson.StatusCode;
                
            //Navigate to OTP page
            NavigationService.navigate('PushToEarnSignIn2');
    
        } 
        else 
        {


            // Alert.alert(
            //     'User already exists',
            //     responseJson.Message,
            //     [
            //         { text: 'Please Login', onPress:() => NavigationService.navigate('PushToEarnSignIn')}
            //     ],
            //     {
            //         cancelable: false
            //     }
            // );
        }
      }
    )
      .catch((error) => console.error(error));
}

/************************************* OTP REQUEST RESEND ****************************/

export function * OtpRequestResend(api,payload) {

    try {


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
