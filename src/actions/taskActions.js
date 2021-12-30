import firebase from "firebase";
import {
  FETCH_TASKS,
  NO_TASKS,
  SWITCH_DAILY_TASKS_VISIBILITY,
  SWITCH_GLOBAL_TASKS_VISIBILITY,
  SET_REMOVE_MODE,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_ERROR,
} from "./types";

export const fetchTasks = () => (dispatch) => {
  dispatch({ type: FETCH_TASKS });

  const db = firebase.database();
  const dbRef = db.ref("tasks");

  dbRef.on(
    "value",
    (tasks) => {
      const payload = tasks.val();
      if (payload) {
        dispatch({
          type: FETCH_TASKS_SUCCESS,
          payload,
        });
      } else {
        dispatch({ type: NO_TASKS });
      }
    },
    (err) => {
      dispatch({ FETCH_TASKS_ERROR });
      console.error(err);
    }
  );
};

export const switchDailyTasksVisibility = (visibility) => (dispatch) => {
  dispatch({
    type: SWITCH_DAILY_TASKS_VISIBILITY,
    payload: visibility,
  });
};

export const switchGlobalTasksVisibility = (visibility) => (dispatch) => {
  dispatch({
    type: SWITCH_GLOBAL_TASKS_VISIBILITY,
    payload: visibility,
  });
};

export const setRemoveMode = (mode) => (dispatch) => {
  dispatch({
    type: SET_REMOVE_MODE,
    payload: mode,
  });
};
