// import firebase from "firebase";
import { getDatabase, ref, onValue} from "firebase/database";
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

  const db = getDatabase();
  const tasksRef = ref(db, 'tasks');
  onValue(tasksRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      dispatch({
        type: FETCH_TASKS_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({ type: NO_TASKS });
    }
  });
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
