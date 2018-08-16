import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import FriendActions from '../Redux/FriendRedux';
import * as NavigationService from '../Navigation/NavigationService';

// export function * FriendRequest(api,action) {
//   try{

//     console.log("api="+api);

//     // make the call to the api
//     const response = yield call(api.getReferrals, JSON.stringify(action.payload));

//     console.tron.log("response ok =",response.ok);
//     console.log("response from api=",response);
//     console.tron.log("response status from api=",response.Status);

//     if (response.ok) {
//         // const resp = path(['data', 'items'], response)[0];
//         console.tron.log("response data=",response.data);
//         const Refferalinfo = response.data.ReferralInfo;

//         console.tron.log("login access token=",token);
//         // do data conversion here if needed
//         yield put(FriendActions.friendSuccess(Refferalinfo));
//     } else {
//         yield put(FriendActions.friendFailure());
//     }
// }
// catch(error) {
//   console.tron.log("Error@login",error);
//   console.log("error="+error);
// }
// }

function fetchJson(url,payload) {

    console.log("inside fetchJson:");
    console.tron.log("inside fetch json");

    return  fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
      .then(response => {

        if (!response.ok) {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
  
        return response.json();
      });
  }
  
  function fetchFriend(payload) {
      
    console.log("inside fetch friend");
    console.tron.log("inside fetch friend");

    return fetchJson('https://prod-07.westeurope.logic.azure.com:443/workflows/0604ad5d855444be85a5137166c67d25/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Lh0jJoxB6xqbZCq_j9xMONuPuBOMOl_F_oZrwIEBckY',payload);
  }
  

export function * FriendRequest(api,action)
{
    
    try{
          console.log("friend request new:");
            const responseJson = yield call(fetchFriend,action.payload);
            yield put(FriendActions.friendSuccess(responseJson.ReferralInfo));
        }
    catch(error)
    {
        yield put(FriendActions.friendFailure(error));
    }
}
