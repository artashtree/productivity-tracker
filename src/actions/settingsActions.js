// import firebase from "firebase";
import { getDatabase, ref, onValue} from "firebase/database";
import {
  FETCH_SETTINGS,
  SETTING_CHANGE,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_ERROR,
} from "./types";

export const fetchSettings = () => (dispatch) => {
  dispatch({ type: FETCH_SETTINGS });

  const db = getDatabase();
  const settingssRef = ref(db, 'settings');
  onValue(settingssRef, (snapshot) => {
    const data = snapshot.val();
    dispatch({
      type: FETCH_SETTINGS_SUCCESS,
      payload: data,
    });
  });
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
