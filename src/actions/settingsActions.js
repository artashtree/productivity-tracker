import firebase from "firebase";
import { FETCH_SETTINGS, SETTING_CHANGE, SAVE_SETTINGS } from "./types";

export const fetchSettings = () => (dispatch) => {
  const db = firebase.database();
  const dbRef = db.ref("settings");
  dbRef.on(
    "value",
    (settings) => {
      dispatch({
        type: FETCH_SETTINGS,
        payload: settings.val(),
      });
    },
    (err) => console.error(err)
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

