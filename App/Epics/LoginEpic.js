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

export const loginEpic = (action$, { dispatch }) =>
  action$.ofType(LoginTypes.LOGIN_REQUEST).pipe(
    switchMap(({payload}) => api.login(payload)),
    mergeMap(response => {
      console.tron.log(
        `response is: ${JSON.stringify(response.Message, null, 2)}`
      );
      switch (response.StatusCode) 
      {
        case 401: 
                    Toast.show("Log in failed, check your credentials.", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true
                    });
                    break;
        case 403: 
                    Toast.show("Log in failed, check your credentials.", {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true
                        });
                        break;
        case 200: 
                    Toast.show("Log in Succeeded.", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true
                    });
                    break;

      } 
    //   else {
    //     //api.setHeaders({ Authorization: response.data.data.accessToken });
    //   }
      return of(
        response.StatusCode === 200
          ? LoginActions.loginSuccess(response.Message)
          : LoginActions.loginFailure("Response wasn't ok.")
      );
    })
  );
