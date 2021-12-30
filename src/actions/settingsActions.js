import firebase from "firebase";
import {
  FETCH_SETTINGS,
  SETTING_CHANGE,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_ERROR,
} from "./types";

export const fetchSettings = () => (dispatch) => {
  dispatch({ type: FETCH_SETTINGS });

  const db = firebase.database();
  const dbRef = db.ref("settings");

  dbRef.on(
    "value",
    (settings) => {
      dispatch({
        type: FETCH_SETTINGS_SUCCESS,
        payload: settings.val(),
      });
    },
    (err) => {
      console.error(err);
      dispatch({ type: FETCH_SETTINGS_ERROR });
    }
  );
};

export const settingChange = (action, config) => (dispatch) => {
  dispatch({
    type: SETTING_CHANGE,
    payload: {
      action,
      config,
    },
  });
};
