import firebase from "firebase";
import { FETCH_SETTINGS, SETTING_CHANGE, SAVE_SETTINGS } from "./types";

export const fetchSettings = () => dispatch => {
  const db = firebase.database();
  const dbRef = db.ref("settings");
  dbRef.on(
    "value",
    settings => {
      dispatch({
        type: FETCH_SETTINGS,
        payload: settings.val()
      });
    },
    err => console.error(err)
  );
};

export const settingChange = (action, config) => dispatch => {
  dispatch({
    type: SETTING_CHANGE,
    payload: {
      action,
      config
    }
  });
};

export const saveSettings = (settings) => dispatch => {
    const db = firebase.database();
    const dbRef = db.ref('settings');
    dbRef.set(settings);
    dbRef.on('value',
        data => {
            const payload = data.val();
            if (payload) {
                dispatch({
                    type: SAVE_SETTINGS,
                    payload
                })
            }
        },
        err => console.error(err));
}
