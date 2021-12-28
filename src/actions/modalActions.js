import { SHOW_MODAL, HIDE_MODAL } from "./types";

export const showModal = (name, id) => (dispatch) => {
  const visible = true;

  dispatch({
    type: SHOW_MODAL,
    payload: { name, id, visible },
  });
};

export const hideModal = () => (dispatch) => dispatch({ type: HIDE_MODAL });
