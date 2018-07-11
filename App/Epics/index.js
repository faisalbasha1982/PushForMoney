import { combineEpics, createEpicMiddleware } from "redux-observable";
import { loginSuccessEpic, registerSuccessEpic } from "./NavigationEpic";
import { registerEpic } from "./RegisterEpic";

export default createEpicMiddleware(
  combineEpics(loginEpic, loginSuccessEpic, registerEpic, registerSuccessEpic)
);
