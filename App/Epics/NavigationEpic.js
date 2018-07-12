import { NavigationActions } from "react-navigation";
import { ofType } from "redux-observable";
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
import { fromPromise } from "rxjs/observable/fromPromise";
import { of } from "rxjs/observable/of";
import { LoginTypes } from "../Redux/LoginRedux";
import { RegisterTypes } from "../Redux/RegisterRedux";

export const loginSuccessEpic = action$ =>
  action$
    .ofType(LoginTypes.LOGIN_SUCCESS)
    .pipe(mapTo(NavigationActions.navigate({ routeName: "PushToEarnMoney" })));

export const registerSuccessEpic = action$ =>
  action$
    .ofType(RegisterTypes.REGISTER_SUCCESS)
    .pipe(mapTo(NavigationActions.navigate({ routeName: "PushToEarnOTP" })));
