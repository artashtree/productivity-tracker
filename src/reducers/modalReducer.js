import {
  SHOW_MODAL,
  HIDE_MODAL
} from "../actions/types";

const initialState = {
  dialog: {
    name: null,
    id: null,
    visible: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      action.payload.visible = true;
      return {
        ...state,
        dialog: action.payload
      };

    case HIDE_MODAL:
      return {
        ...state,
        dialog: initialState
      };

    default:
      return state;
  }
}
