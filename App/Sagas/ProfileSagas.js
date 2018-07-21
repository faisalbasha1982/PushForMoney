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

// Please find the Update Mobile User First Name or Last Name 

// Logic App - laMobileUserUpdateFirstAndLastName
// ---------

// https://prod-28.westeurope.logic.azure.com:443/workflows/8758d6d96f2145cbaaa86e5d032392dc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6pUlAjHE5FumdVSxpK_uevwWemeMwM9ODipl2oHvWZE

 
// Function Cloud Url
// -------------------

// https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnMobileUserUpdateFirstAndLastName?code=ST40UVbAvuYyJVYgjbq3eqhiW7C6Xntn5cKCxSDUtR8mwiez0Y6X3Q==

 

// Function Local Url
// -------------------

// http://localhost:7071/api/fnMobileUserUpdateFirstAndLastName

 

// Raw JSON
// -----------

// {             
//     "AuthenticationData": "{'Lang': 'en',  'AuthID': 'JS#236734','Data':'FormSignUp','D' : '2018-07-03 08:18:12' ,'R' : 'er3rssf3dfd'}",
//     "LoginAccessToken": "{'MobileUserEmail' : 'Balaji.sp@esteinternationalgroup.be.com','MobileUserName':'hello16','MobileUserID' : 12,'Approval':'True','LoginDate':'2018-07-03 08:18:12','LoginExpiryDate':'2018-08-02 08:18:12', 'RandomString' : 'fasdf13a'}",
//     "NewFirstName": "Kumarappan",
//     "NewLastName": "Somasundaram",
//     "TestingMode":"Testing@JobFixers#09876"
// }

// =============Succeess=============

// {

//     "StatusCode": 200,
//     "Message": "Mobile user \"First Name\" or \"Last Name\" changed successfully",
//     "ErrorDetails": "Mobile user \"First Name\" or \"Last Name\" changed successfully",   
//     "Lang": "en"

// }

 

// =============Failed================

// {

//     "StatusCode": 403,
//     "Message": "Authentification failed.",
//     "ErrorDetails": "Authentification failed. Access time is error.",
//     "Lang": "en"
// }