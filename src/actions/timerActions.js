import { SET_TIMER } from "./types";

export const setTimer = (id, task) => (dispatch) => {
  dispatch({
    type: SET_TIMER,
    payload: { id, task },
  });
};
