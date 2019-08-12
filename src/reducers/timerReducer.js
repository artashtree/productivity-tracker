import {
  SET_TIMER
} from "../actions/types";

const initialState = {
  id: null,
  task: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TIMER:
      return {
        ...state,
        id: action.payload.id,
        task: action.payload.task
      };

    default:
      return state;
  }
}
