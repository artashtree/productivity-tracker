import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import settingReducer from "./settingReducer";
import modalReducer from "./modalReducer";
import timerReducer from "./timerReducer";

export default combineReducers({
  tasks: taskReducer,
  settings: settingReducer,
  modals: modalReducer,
  timer: timerReducer
});
