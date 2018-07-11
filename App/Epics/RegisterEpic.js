import RegisterActions, { RegisterTypes } from "../Redux/RegisterRedux";
import LoginActions, { LoginTypes } from "../Redux/LoginRedux";
import { ofType } from "redux-observable";
import Toast from "react-native-root-toast";
import { tap, switchMap, mergeMap, flatMap } from "rxjs/operators"; // rxjs v5.5+
import api from "../Services";
import { NavigationActions } from "react-navigation";
import { of } from "rxjs/observable/of";

export const registerEpic = action$ =>
  action$.ofType(RegisterTypes.REGISTER_REQUEST).pipe(
    switchMap(({ payload }) => api.register(payload)),
    flatMap(response => {
      console.tron.log(
        `response is: ${JSON.stringify(response.data, null, 2)}`
      );
      if (!response.ok) {
        Toast.show("Failed to register.", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true
        });
      } else {
        api.setHeaders({Authorization: response.data.accessToken});
      }
      return response.ok
        ? [
            RegisterActions.registerSuccess(),
            //LoginActions.userRegistered(response.data.data.data)
          ]
        : RegisterActions.registerFailure();
    })
  );

export const otpEpic = action$ =>
  action$.ofType(RegisterTypes.VERIFY_OTP).pipe(
    switchMap(({ payload }) => api.verifyOTP(payload)),
    flatMap(response => {
      console.tron.log(
        `response is: ${JSON.stringify(response.data, null, 2)}`
      );
      if (!response.ok) {
        Toast.show("Failed to verify Otp.", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true
        });
      }
      return response.ok
        ? of(RegisterActions.registerFailure())
        : [
            RegisterActions.registerSuccess(),
            NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: "SignedIn"
                })
              ],
              key: null
            })
          ];
    })
  );
