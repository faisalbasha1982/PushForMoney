import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage,Alert } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import FriendActions from '../Redux/FriendRedux';
import * as NavigationService from '../Navigation/NavigationService';
import  API_URL  from '../Services/Api_url';

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

    // console.log("inside fetchJson from save referrals:");
    // console.tron.log("inside fetch json with payload save referrals="+payload);
    // console.tron.log("url="+url);

    return  fetch(url,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(responseJson => {
          
        return responseJson;
      });
  }
  
  function fetchFriend(payload) {
      
    // console.log("inside fetch friend");
    // console.tron.log("inside fetch friend with payload="+payload);

    // development
    // return fetchJson('https://prod-07.westeurope.logic.azure.com:443/workflows/0604ad5d855444be85a5137166c67d25/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Lh0jJoxB6xqbZCq_j9xMONuPuBOMOl_F_oZrwIEBckY',payload);

    // staging
    return fetchJson(API_URL.production.laMobileGetUserReferralsWithStatus,payload);
    // return fetchJson('https://prod-31.westeurope.logic.azure.com:443/workflows/40dac089a8e04e9f9593c6a5d2c2f792/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3fzTiTB9UtL85SYxL6nONm81gx5VvmmgDEVNcBMJffo',payload);

} 

export function * FriendRequest(api,action)
{
    console.tron.log("friend request new:");
    
    try{
        //   console.tron.log("friend request new:");
            const responseJson = yield call(fetchFriend,action.payload);
        //   console.tron.log("friend request responseJson:"+responseJson);
            yield put(FriendActions.friendSuccess(responseJson.ReferralInfo));
        }
    catch(error)
    {
        yield put(FriendActions.friendFailure(error));
    }
}

function fetchArchive(payload)
{
    // console.log("archive request new:");

    // dev
    // return fetchJson('https://famobileutilityapiinterfacedev.azurewebsites.net/api/fnMobileReferralsUpdateArchiveStatus?code=rXOBL7dodL54/WdfdVv11/xuBVN2WH9afB/9ODmHuc4xCKscIMQs8Q==',payload);

    // staging
    return fetchJson(`https://famobileutilityapiinterface${API_URL.slot}.azurewebsites.net/api/fnMobileReferralsUpdateArchiveStatus?code=${API_URL.commonCode}`,payload);

}

export function * archiveRequest(api,action)
{
    try{
        const responseJson = yield call(fetchArchive,action.payload);
        yield put(FriendActions.friendSuccess());
    }
    catch(error)
    {
        yield put(FriendActions.friendFailure(error));
    }
}

function fetchReferral(payload)
{
    // console.log("in fetch Referrals ");

    // dev
    // return fetchJson('https://prod-10.westeurope.logic.azure.com:443/workflows/a23a19abad104ab1854363c6536802aa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=eLy-zN-st8ISnuzhGMyvqK7zKNKFqt0myhDf14achPw',payload);

    // staging
    //return fetchJson('https://prod-11.westeurope.logic.azure.com:443/workflows/26cd76a2f9624eb4b0edacd9a8bbeb58/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ujtBhMzB55RiT8g2X3lkG3eTuMDX5dpegXHaq6MXGrs',payload);

    // production
    return fetchJson('https://prod-44.westeurope.logic.azure.com:443/workflows/fe6b7f85abef48e7ae9c1a6107319c24/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=v7QaOeK1VKNvfVX6IM4QdKjMufgq_62a7JIaX2z5vcw',payload);

}

export function * saveReferrals(api,action)
{
    try{
        const responseJson = yield call(fetchReferral,action.payload);

         if(responseJson.StatusCode === 200)
         {
            yield put(FriendActions.saveSuccess(responseJson.MobileReferrals));
            Alert.alert(responseJson.Message);
         }

    }
    catch(error)
    {
      Alert.alert(error);
      yield put(FriendActions.saveFailure(error));
    }
}