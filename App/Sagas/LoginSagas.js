import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage, Alert } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import LoginActions from '../Redux/LoginRedux';
import * as NavigationService from '../Navigation/NavigationService';
import localStorage from 'react-native-sync-localstorage';
import { NavigationActions } from 'react-navigation';
import API_URL from '../Services/Api_url';
import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import Api_url from '../Services/Api_url';
import LanguageSettingsPFM from '../Containers/LanguageSettingsPFM';
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';

export function * rsaRequest(api,payload) {
  try{

    const response = yield call(api.rsa, payload.payload);


    if (response.ok ) {
    }

  }catch(error)
  {

  }
}

// function fetchFacebook(payload)
// {
//   // const url = "https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnMobileUserLogin?code=zybwff3HRf2XC/mYhHJtcZOeG5vkCOJhJOsXKUgHNAYu8tiG9tH2kw==";

//   const url = `https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnMobileUserLogin?code=${API_URL.commonCode}`;

//     // console.log("newpayload=",payload);
 
//     fetch(url,{
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//     }).then((response) =>  response.json())
//       .then((responseJson) => {

//           // console.log("response=",responseJson.StatusCode);

//           if (responseJson.StatusCode === 200) {

//             Alert.alert(
//                 'Successfull',
//                 responseJson.Message,
//                 [
//                     { text: 'OK', onPress:() => console.log('user exists ask me later')}
//                 ],
//                 {
//                     cancelable: false
//                 }
//             );

//             // console.tron.log("response data=",responseJson.Message);
                
//             // output token to tron

//             // do data conversion here if needed
//             //yield put(RegisterActions.registerSuccess(mobileOTP));

//             //Navigate to OTP page
//             NavigationService.navigate('PushToEarnWelcomeComponent');
    
//         } 
//         else {
//             //yield put(RegisterActions.registerFailure())
//         }
//       }
//     )
//       .catch((error) => console.error(error));
// }

export function * newInstagramRequest(api,action)
{
  try{

    const response = yield call(fetchSocialLogin,action.payload);
    console.tron.log("response StatusCode=",response.StatusCode);

    console.tron.log("firstname="+action.firstname+ " lastname="+action.lastname);
    
    if (response.StatusCode === 201)
    {
        //   Alert.alert(
        //     'Enter Details',
        //     'Please Enter To Register Details',
        //     [                      
        //         {
        //           text: 'OK', 
        //           onPress: () => console.log('Ask me later Pressed')
        //         },                      
        //     ],
        //     {cancelable: false}
        // );

        AsyncStorage.getItem('language').then((language) => {

          if(language === 'English')
            Alert.alert(LanguageSettingsPFM.English.completeProfile);
          else
            if(language === 'Dutch')
              Alert.alert(LanguageSettingsPFM.Dutch.completeProfile);
            else
              Alert.alert(LanguageSettingsPFM.French.completeProfile);

       });

          NavigationService.navigate('PushToEarnRegisterProfile',{uname:action.username, pword:'', payload: action.payload, phone: '', pPayload:'', firstname: action.firstname, lastname: action.lastname});
          console.tron.log("201 Error");

    }
    else 
    {

      if(response.StatusCode === 200)
       {
        //   Alert.alert(
        //     'Login Successfull',
        //     'Push To Earn Money Welcome Page',
        //     [                      
        //         {
        //           text: 'OK', 
        //           onPress: () => console.log('Ask me later Pressed')
        //         },                      
        //     ],
        //     {cancelable: false}
        // );

        AsyncStorage.setItem('token',response.LoginAccessToken);

          AsyncStorage.getItem('language').then((language) => {
            //Navigate to OTP page
            NavigationService.navigate('TestPage',{language:language});
          });

       }
      else
      {

      if(response.StatusCode === 202)
      {
         // Navigate to PushToEarnOTPLogin
         NavigationService.navigate('PushToEarnOTPLogin',{accessToken: response.LoginAccessToken,});

      }

        AsyncStorage.getItem('language').then((language) => {

          if(language === 'Dutch')
                
              Alert.alert(
                  languageSettingsPFM.Dutch.loginFailed,
                  ""+response.data.Message,
                  [                      
                      {
                        text: 'OK', 
                        onPress: () => console.log('Ask me later Pressed')
                      },                      
                  ],
                  {cancelable: false}
              );
          else
            if(language === 'English')                
                  Alert.alert(
                      languageSettingsPFM.English.loginFailed,
                      ""+response.data.Message,
                      [                      
                          {
                            text: 'OK', 
                            onPress: () => console.log('Ask me later Pressed')
                          },                      
                      ],
                      {cancelable: false}
                  );
              
            else
            Alert.alert(
              languageSettingsPFM.French.loginFailed,
              ""+response.data.Message,
              [                      
                  {
                    text: 'OK', 
                    onPress: () => console.log('Ask me later Pressed')
                  },                      
              ],
              {cancelable: false}
          );

      });

      }

     //NavigationService.navigate('PushToEarnRegisterProfile');

    }  
}
catch(error)
{
console.tron.log("response issue");
}
}

export function * newGoogleRequest(api, action)
{
  console.tron.log("google request......");

  try{

      const response = yield call(fetchSocialLogin,action.payload);
      console.tron.log("response StatusCode=",response.StatusCode);
    
      if (response.StatusCode === 201)
      {
        //   Alert.alert(
        //     'Enter Details',
        //     'Please Enter To Register Details',
        //     [                      
        //         {
        //           text: 'OK', 
        //           onPress: () => console.log('Ask me later Pressed')
        //         },                      
        //     ],
        //     {cancelable: false}
        // );

        AsyncStorage.getItem('language').then((language) => {

          if(language === 'English')
            Alert.alert(LanguageSettingsPFM.English.completeProfile);
          else
            if(language === 'Dutch')
              Alert.alert(LanguageSettingsPFM.Dutch.completeProfile);
            else
              Alert.alert(LanguageSettingsPFM.French.completeProfile);

       });

       console.tron.log("201 Error");

       NavigationService.navigate('PushToEarnRegisterProfile',{firstname: action.firstname, lastname: action.lastname, uname: action.email,pword:'', mobilephone:'' ,payload: action.payload});
       //NavigationService.navigate('PushToEarnRegisterProfile',{uname:'', pword:'', payload: payload.payload, phone: '', pPayload:''});

    }
    else 
    {

      if(response.StatusCode === 200)
       {
        //   Alert.alert(
        //     'Login Successfull',
        //     'Push To Earn Money Welcome Page',
        //     [                      
        //         {
        //           text: 'OK', 
        //           onPress: () => console.log('Ask me later Pressed')
        //         },                      
        //     ],
        //     {cancelable: false}
        // );
        AsyncStorage.setItem('token',response.LoginAccessToken);

          AsyncStorage.getItem('language').then((language) => {
            //Navigate to OTP page
            NavigationService.navigate('TestPage',{language:language});
          });
       }
      else
      {
      //   Alert.alert(
      //     'Login Failed',
      //     ""+response.data.Message,
      //     [                      
      //         {
      //           text: 'OK', 
      //           onPress: () => console.log('Ask me later Pressed')
      //         },                      
      //     ],
      //     {cancelable: false}
      // );

         if(response.StatusCode === 202)
         {
            // Navigate to PushToEarnOTPLogin
            NavigationService.navigate('PushToEarnOTPLogin',{accessToken: response.LoginAccessToken,});

         }

        // yield put(LoginActions.loginFailure());

        // //NavigationService.navigate('PushToEarnRegisterProfile',{uname: payload.email,pword:'', payload: payloadNew.payload});           
        // NavigationService.navigate('PushToEarnRegisterProfile',{uname: action.email,pword:'', payload: action.payload});

      }

     //NavigationService.navigate('PushToEarnRegisterProfile');

    }  
}
catch(error)
{
console.tron.log("response issue");
}
}

export function * newTwitterRequest(api,action)
{
  //Alert.alert("twitter request api call to server.....");

  try{

      const response = yield call(fetchSocialLogin,action.payload);
      console.tron.log("response StatusCode=",response.StatusCode);
      console.log("response status="+response.StatusCode);

    if(response.StatusCode === 201)
    {
        //   Alert.alert(
        //     'Enter Details',
        //     'Please Enter To Register Details',
        //     [                      
        //         {
        //           text: 'OK', 
        //           onPress: () => console.log('Ask me later Pressed')
        //         },                      
        //     ],
        //     {cancelable: false}
        // );

        AsyncStorage.getItem('language').then((language) => {

          if(language === 'English')
            Alert.alert(LanguageSettingsPFM.English.completeProfile);
          else
            if(language === 'Dutch')
              Alert.alert(LanguageSettingsPFM.Dutch.completeProfile);
            else
              Alert.alert(LanguageSettingsPFM.French.completeProfile);

       });

          NavigationService.navigate('PushToEarnRegisterProfile',{uname:'', pword:'', payload: action.payload, phone: '', pPayload:''});
          console.tron.log("201 Error");
    }
    else 
    {

      if(response.StatusCode === 200)
       {
        //   Alert.alert(
        //     'Login Successfull',
        //     'Push To Earn Money Welcome Page',
        //     [                      
        //         {
        //           text: 'OK', 
        //           onPress: () => console.log('Ask me later Pressed')
        //         },                      
        //     ],
        //     {cancelable: false}
        // );
        AsyncStorage.setItem('token',response.LoginAccessToken);

          AsyncStorage.getItem('language').then((language) => {
            //Navigate to OTP page
            NavigationService.navigate('TestPage',{language:language});
          });
       }
      else
      {
      //   Alert.alert(
      //     'Login Failed',
      //     ""+response.data.Message,
      //     [                      
      //         {
      //           text: 'OK', 
      //           onPress: () => console.log('Ask me later Pressed')
      //         },                      
      //     ],
      //     {cancelable: false}
      // );

      if(response.StatusCode === 202)
      {
         // Navigate to PushToEarnOTPLogin
         NavigationService.navigate('PushToEarnOTPLogin',{accessToken: response.LoginAccessToken,});

      }

      }

     //NavigationService.navigate('PushToEarnRegisterProfile');

    }  
}
catch(error)
{
console.tron.log("response issue");
}
}

export function * googleRequest(api,payload)
{

  try {
    const response = yield call(api.mediaLogin, payload.payload);
    
    // console.tron.log("response from api call =",response);
    // console.tron.log("response ok=",response.ok);
    // console.tron.log("response StatusCode=",response.data.StatusCode);

    if (response.ok && response.data.StatusCode === 200)
    {

        //   Alert.alert(
        //     'Google Login Successfull',
        //     'Push To Earn Money Welcome Page',
        //     [                      
        //         {
        //           text: 'OK', 
        //           onPress: () => console.log('Ask me later Pressed')
        //         },                      
        //     ],
        //     {cancelable: false}
        // );
        AsyncStorage.setItem('token',response.LoginAccessToken);

        NavigationService.navigate('PushToEarnWelcomeScreen');
    }
    else 
    {
      yield put(LoginActions.loginFailure());    

      NavigationService.navigate('PushToEarnRegisterProfile',{uname: '',pword:'', payload: payload.payload});

      // Alert.alert(
      //   'Login Failed',
      //   ""+response.data.Message,
      //   [                      
      //       {
      //         text: 'OK', 
      //         onPress: () => console.log('Ask me later Pressed')
      //       },                      
      //   ],
      //   {cancelable: false}
      // );
        //NavigationService.navigate('PushToEarnRegisterProfile');

      }
  }
catch(error){
//console.log("error="+error);
}

}

export function * twitterRequest(api,payload,userName)
{

  // Alert.alert("twitter request api call to server.....");
  // console.log("twitter request api call to server..... with userName="+typeof(userName));  

  try {
          const response = yield call(api.mediaLogin, payload.payload);
          
          // console.tron.log("response from api call =",response);
          // console.tron.log("response ok=",response.ok);
          // console.tron.log("response StatusCode=",response.data.StatusCode);
          // console.tron.log("response username=",userName);
          // console.log("username=",userName);

          if (response.ok && response.data.StatusCode === 200)
          {

              //   Alert.alert(
              //     'Login Successfull',
              //     'Push To Earn Money Welcome Page',
              //     [                      
              //         {
              //           text: 'OK', 
              //           onPress: () => console.log('Ask me later Pressed')
              //         },                      
              //     ],
              //     {cancelable: false}
              // );
              AsyncStorage.setItem('token',response.LoginAccessToken);

              NavigationService.navigate('PushToEarnWelcomeScreen');
          }
          else 
          {
            yield put(LoginActions.loginFailure());    

            // console.log("going to pass userName="+userName);

            NavigationService.navigate('PushToEarnRegisterProfile',{uname: userName,pword:'', payload: payload.payload});

            // Alert.alert(
            //   'Login Failed',
            //   ""+response.data.Message,
            //   [                      
            //       {
            //         text: 'OK', 
            //         onPress: () => console.log('Ask me later Pressed')
            //       },                      
            //   ],
            //   {cancelable: false}
            // );
              //NavigationService.navigate('PushToEarnRegisterProfile');

            }
        }
  catch(error){
      // console.log("error="+error);
  }
  
}

function fetchSocialLogin(payload) {

    return fetchJson(Api_url.production.laMobileLogin,payload);
    //return fetchJson(Api_url.mobileSignUpLoginUrlNewStag,payload);

}

function fetchFacebookLogin(payload){

    //return fetchJson(`https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnMobileUserLoginByMobile?code=${API_URL.commonCode}`,payload);

    return fetchJson(API_URL.production.laMobileLogin,payload);

}

export function * newFacebookRequest(api,action)
{

  console.tron.log("facebook request....");

  try {

        let response = yield call(fetchFacebookLogin,action.payload);
        console.tron.log("response status code= "+response.StatusCode);

        if(response.StatusCode === 201)
         {
            AsyncStorage.getItem('language').then((language) => {
              if(language === 'English')
                Alert.alert(LanguageSettingsPFM.English.completeProfile);
              else
                if(language === 'Dutch')
                  Alert.alert(LanguageSettingsPFM.Dutch.completeProfile);
                else
                  Alert.alert(LanguageSettingsPFM.French.completeProfile);   
           });

           NavigationService.navigate('PushToEarnRegisterProfile',{firstname: action.firstname, lastname: action.lastname, uname: action.email,pword:'', mobilephone:'' ,payload: action.payload});
           console.tron.log("201 Error");

        }
        else
          if(response.StatusCode === 200)
          {
            AsyncStorage.setItem('token',response.LoginAccessToken);

              AsyncStorage.getItem('language').then((language) => {
                //Navigate to OTP page
                NavigationService.navigate('TestPage',{language:language});
              });

          }
          else
          {
            if(response.StatusCode === 202)
              {
                   // Navigate to PushToEarnOTPLogin
                   NavigationService.navigate('PushToEarnOTPLogin',{accessToken: response.LoginAccessToken,});
              }
              // yield put(LoginActions.loginFailure());
              // NavigationService.navigate('PushToEarnRegisterProfile',{firstname: '', lastname: '' , uname:'', pword:'', payload: action.payload, mobilephone: '', pPayload:''});   
          }

  }catch(error){

  }

  // Alert.alert("facebook request api call to server.....");

  // try{
  //       const response = yield call(fetchFacebookLogin,payload.payload);
  //       console.tron.log("response="+response);
        
  //       if (response.StatusCode === 201)
  //       {
  //           //   Alert.alert(
  //           //     'Enter Details',
  //           //     'Please Enter To Register Details',
  //           //     [                      
  //           //         {
  //           //           text: 'OK', 
  //           //           onPress: () => console.log('Ask me later Pressed')
  //           //         },                      
  //           //     ],
  //           //     {cancelable: false}
  //           // );

  //           AsyncStorage.getItem('language').then((language) => {

  //             if(language === 'English')
  //               Alert.alert(LanguageSettingsPFM.English.completeProfile);
  //             else
  //               if(language === 'Dutch')
  //                 Alert.alert(LanguageSettingsPFM.Dutch.completeProfile);
  //               else
  //                 Alert.alert(LanguageSettingsPFM.French.completeProfile);
   
  //          });
   
  //             NavigationService.navigate('PushToEarnRegisterProfile',{uname:'', pword:'', payload: payload.payload, phone: '', pPayload:''});
  //             console.tron.log("201 Error");

  //       }
  //       else 
  //       {

  //         if(response.StatusCode === 200)
  //          {
  //           //   Alert.alert(
  //           //     'Login Successfull',
  //           //     'Push To Earn Money Welcome Page',
  //           //     [                      
  //           //         {
  //           //           text: 'OK', 
  //           //           onPress: () => console.log('Ask me later Pressed')
  //           //         },                      
  //           //     ],
  //           //     {cancelable: false}
  //           // );

  //           console.tron.log("access token="+response.LoginAccessToken);

  //           AsyncStorage.setItem('token',response.LoginAccessToken);

  //             AsyncStorage.getItem('language').then((language) => {
  //               //Navigate to OTP page
  //               NavigationService.navigate('TestPage',{language:language});
  //             });

  //             AsyncStorage.setItem('')
  //          }
  //         else
  //         {
  //         //   Alert.alert(
  //         //     'Login Failed',
  //         //     ""+response.data.Message,
  //         //     [                      
  //         //         {
  //         //           text: 'OK', 
  //         //           onPress: () => console.log('Ask me later Pressed')
  //         //         },                      
  //         //     ],
  //         //     {cancelable: false}
  //         // );

  //           yield put(LoginActions.loginFailure());

  //           NavigationService.navigate('PushToEarnRegisterProfile',{uname: payloadNew.email,pword:'', payload: payloadNew.payload});           
  
  //         }

  //        //NavigationService.navigate('PushToEarnRegisterProfile');

  //       }  
  // }
  // catch(error)
  // {
  //   console.tron.log("response issue");
  // }

}

function fetchJson(url,payload)
{
  console.tron.log("payload="+typeof(payload));
  console.tron.log("fetch url="+url);
  console.tron.log(" payload authentication data="+payload.AuthenticationData+" loginData:"+payload.LoginData+" SignupMode:"+payload.SignupMode);
  
  return fetch(url,{
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(response => {
      // Alert.alert("response ="+response.Message);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });

}

function fetchNotification(payload) {

  //console.log(`url = https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnGetMobileNotificationwithUpdate?code=${API.commonCode}`);
  //console.tron.log('url='+`https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnGetMobileNotificationwithUpdate?code=${API.commonCode}`);

  return fetchJson(`https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnGetMobileNotificationWithUpdate?code=${API_URL.commonCode}`,payload);

  // return fetchJson('https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnGetMobileNotificationWithUpdate?code=191modix7w8x/GF4bOY2PMAeOS8KmAr338nwwQqpVCYT4CKUfdP2Ig==',payload);

}

export function * notificationRequest(api,action) {

  try{
      // console.log("notification new:");
      const responseJson = yield call(fetchNotification,action.payload);
      //yield put(MoneyActions.moneyEarningsSuccess(responseJson.monthlyEarningDetailsByReferrals,responseJson.ReferredPersonName,responseJson.TotalWorkedHours,responseJson.TotalEarnings));
      yield put(LoginActions.notificationSuccess(responseJson.MobileNotifications,responseJson.LastViewedNotificationID));

  }
  catch(error)
  {
      yield put(LoginActions.notificationFailure(error));
  }

}

function fetchJsonNew(url,payload,phoneNumber) {

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

      if (response.StatusCode === 200) 
      {
        AsyncStorage.setItem('token',response.LoginAccessToken);        
      }

      return response;
    });
}

function fetchJsonNewOTP(url,payload) {

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

      if (response.StatusCode === 200) {

        AsyncStorage.getItem('language').then((language) => {

          if(language === 'English')
            Alert.alert(LanguageSettingsPFM.English.otpSent);
          else
            if(language === 'Dutch')
              Alert.alert(LanguageSettingsPFM.Dutch.otpSent);
            else
              Alert.alert(LanguageSettingsPFM.French.otpSent);

       });
      }
      else
      {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;

      }

      return response;
    });
}

function fetchLoginOTP(payload) {
  return fetchJsonNewOTP(API_URL.mobileUserLoginOTP,payload); // fnMobileUserLoginOtp
}

function fetchLogin(payload,url) {
  console.tron.log("payload="+url);
  url = API_URL.production.laMobileLogin;
  return fetchJsonNew(API_URL.production.laMobileLogin,payload);
}

export function * LoginRequest(api,action) {
  try
  {

    // make the call to the api
    const response = yield call(fetchLogin, action.payload, `https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnMobileUserLoginByMobile?code=${API_URL.commonCode}`);
    let phoneNumber = action.phoneNumber;
    let payload = action.payload;

    console.tron.log("phonenumber received in loginRequest="+phoneNumber);

    if(response.StatusCode === 200)
    {      
      console.tron.log("response="+response.StatusCode);
      console.tron.log("response="+response.userinfo.MobileUserId);

      let phone = action.phoneNumber;

        if(response.userinfo.MobileUserId === 0)
          {

            console.tron.log("response="+response.StatusCode);

            // do data conversion here if needed
            yield put(LoginActions.loginFailure(response.userinfo));
            NavigationService.navigate('PushToEarnSignUp2',{ phone: action.phoneNumber});

          }
         else
         {
            // do data conversion here if needed
            yield put(LoginActions.loginSuccess(response.userinfo));
            //AsyncStorage.setItem('token',response.LoginAccessToken);
            AsyncStorage.setItem('token','');

            let languageCode = '';

            AsyncStorage.getItem('language').then((language) => {

              language === 'English'?languageCode = 'en'
              : 
              language === 'French'?languageCode  = 'fr'
              :
              languageCode = 'nl';

            });

            let authData = AuthComponent.authenticationData(languageCode);
            let encryptedData = AesComponent.aesCallback(authData);

            let npayload = {

              "AuthenticationData": encryptedData,
              "LoginAccessToken": response.LoginAccessToken,
              "NewMobileNumber":response.userinfo.Mobile,

            };

            console.tron.log("access Token="+response.LoginAccessToken);

            // Navigate to PushToEarnOTPLogin
            NavigationService.navigate('PushToEarnOTPLogin',{accessToken: response.LoginAccessToken,});

            //yield call(fetchLoginOTP, npayload);

            // AsyncStorage.getItem('language').then((language) => {
            //         //NavigationService.navigate('TestPage',{language: language});      
            //         NavigationService.navigate('PushToEarnOTPLogin');

            // });

         }
    }
    else
    {

      if(response.StatusCode === 201)
      {
        AsyncStorage.getItem('language').then((language) => {

           if(language === 'English')
             Alert.alert(LanguageSettingsPFM.English.completeProfile);
           else
             if(language === 'Dutch')
               Alert.alert(LanguageSettingsPFM.Dutch.completeProfile);
             else
               Alert.alert(LanguageSettingsPFM.French.completeProfile);

        });

           NavigationService.navigate('PushToEarnRegisterProfile',{uname:'', pword:'', payload: payload, mobilephone: action.phoneNumber, pPayload:''});
           console.tron.log("201 Error with phone number="+action.phoneNumber);
      }
      else
      {
        AsyncStorage.getItem('language').then((language) => {

        if(language === 'English')
          Alert.alert(LanguageSettingsPFM.English.signUpText);
        else
         if(language === 'Dutch')
          Alert.alert(LanguageSettingsPFM.Dutch.signUpText);
         else
           Alert.alert(LanguageSettingsPFM.French.signUpText);
           
        });

        NavigationService.navigate('PushToEarnSignUp2', { phone: action.phoneNumber});
      }

    }
  }
  catch(error) 
  {
    // console.tron.log("Error@login",error);
    // console.log("error="+error);
    yield put(LoginActions.loginFailure());
    NavigationService.navigate('PushToEarnSignUp2', {phone: action.phoneNumber});

  }

}

/************************************* Fetch OTP VERIFICATION ****************************/

function fetchOTP(payload)
{
    // const url = "https://prod-49.westeurope.logic.azure.com:443/workflows/19bdce4bb7d740f586a5f86bf9014efa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LU6WJJr0yUTzSFLdH9TXCBdYPVh6x3SMGegOPX0OTfA";
    // const url = "https://prod-21.westeurope.logic.azure.com:443/workflows/fc0efd237ccb46268c5353e97d791a7e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z2LNFPTtuCNVTEq9jcpwaKsLGgOjYaQOuiwoJFZenbY";

    let languageCode = '';
    
    AsyncStorage.getItem('language').then((language) => {

      language === 'English'?languageCode = 'en'
      : language === 'French'?
      languageCode  = 'fr'
      :
      languageCode = 'nl'

    });

    AsyncStorage.setItem('token',payload.LoginAccessToken);

    let authData = AuthComponent.authenticationData(languageCode);
    let encryptedData = AesComponent.aesCallback(authData);

    const url = API_URL.production.laMobileOtpVerification;

    AsyncStorage.getItem('token').then((token) => 
    {

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
            //     ''+responseJson.Message,
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
                
            AsyncStorage.getItem('language').then((language) => {
              //Navigate to OTP page
              NavigationService.navigate('TestPage',{language:language});
            });
        } 
        else {

            // Alert.alert(
            //     'User Does not Exist',
            //     responseJson.Message,
            //     [
            //         { text: 'Please Register', onPress:() => {NavigationService.navigate('PushToEarnSignUp2', { phone: ''})} }
            //     ],
            //     {
            //         cancelable: false
            //     }
            // )        
        }
      }
    )
      .catch((error) => console.error(error));
  
    });      
}

/************************************* OTP REQUEST ****************************/

export function * otpLoginRequest(api,action) {

  try {

      const response = yield call(fetchOTP, action.payload);
      yield put(LoginActions.loginSuccess());

  }catch(error)
  {
      console.tron.log("Error@login",error);
      yield put(LoginActions.loginFailure());
  }
}

