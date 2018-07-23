import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { path } from 'ramda';
import Api from '../Services/Api';
import FriendActions from '../Redux/FriendRedux';
import * as NavigationService from '../Navigation/NavigationService';

export function * FriendRequest(api,action) {
  try{

    console.log("api="+api);

    // make the call to the api
    const response = yield call(api.getReferrals, action.payload);

    console.tron.log("response ok =",response.ok);
    console.log("response from api=",response);
    console.tron.log("response status from api=",response.Status);

    if (response.ok) {
        // const resp = path(['data', 'items'], response)[0];
        console.tron.log("response data=",response.data);
        const Refferalinfo = response.data.ReferralInfo;

        console.tron.log("login access token=",token);
        // do data conversion here if needed
        yield put(FriendActions.friendSuccess(Refferalinfo));
    } else {
        yield put(FriendActions.friendFailure());
    }
}
catch(error) {
  console.tron.log("Error@login",error);
  console.log("error="+error);
}
}



