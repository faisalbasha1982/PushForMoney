import { combineEpics, createEpicMiddleware } from "redux-observable";
import { loginSuccessEpic, registerSuccessEpic } from "./NavigationEpic";
import { registerEpic } from "./RegisterEpic";
import { loginEpic } from "./LoginEpic";

export default rootEpic = combineEpics(loginEpic, loginSuccessEpic, registerEpic, registerSuccessEpic);