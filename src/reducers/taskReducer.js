import {
  FETCH_TASKS,
  NO_TASKS,
  SWITCH_DAILY_TASKS_VISIBILITY,
  SWITCH_GLOBAL_TASKS_VISIBILITY
} from "../actions/types";

const initialState = {
  items: {},
  dailyTasksVisibility: "todo",
  globalTasksVisibility: "all",
  noTasks: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        items: action.payload
      };

    case NO_TASKS:
      return {
        ...state,
        noTasks: true
      };

    case SWITCH_DAILY_TASKS_VISIBILITY:
      return {
        ...state,
        dailyTasksVisibility: action.payload
      };

    case SWITCH_GLOBAL_TASKS_VISIBILITY:
      return {
        ...state,
        globalTasksVisibility: action.payload
      };

    default:
      return state;
  }
}
