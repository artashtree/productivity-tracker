import firebase from "firebase";
import {
  FETCH_TASKS,
  NO_TASKS,
  SWITCH_DAILY_TASKS_VISIBILITY,
  SWITCH_GLOBAL_TASKS_VISIBILITY,
} from "./types";

export const fetchTasks = () => (dispatch) => {
  const db = firebase.database();
  const dbRef = db.ref("tasks");
  dbRef.on(
    "value",
    (tasks) => {
      const payload = tasks.val();
      if (payload) {
        dispatch({
          type: FETCH_TASKS,
          payload,
        });
      } else {
        dispatch({ type: NO_TASKS });
      }
    },
    (err) => console.error(err)
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
