import LoginActions, { LoginTypes } from "../Redux/LoginRedux";
import { ofType } from "redux-observable";
import Toast from "react-native-root-toast";
import {
  delay,
  mapTo,
  map,
  tap,
  switchMap,
  mergeMap,
  catchError
} from "rxjs/operators"; // rxjs v5.5+
import api from "../Services";
import { of } from "rxjs/observable/of";
import { ajax } from 'rxjs/ajax';
import Api from '../Services/Api_url';

export const loginEpic = action$ =>
  action$.ofType(LoginTypes.LOGIN_REQUEST)
         .pipe(
          switchMap(({ payload }) => {
            // console.tron.log("payload:"+payload);
             api.login(payload);
          }),
          tap(() => console.tron.log(
            `response is: ${JSON.stringify(response.Message, null, 2)}`)),
          switchMap(response => response.ok ?
            LoginActions.loginSuccess(response.Message)
            : 
            LoginActions.loginFailure("Response wasn't ok.")),
  );