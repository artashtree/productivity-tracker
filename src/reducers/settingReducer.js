import {
  FETCH_SETTINGS,
  SETTING_CHANGE,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_ERROR,
} from "../actions/types";

const initialState = {
  items: {},
  isLoading: false,
  isError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SETTINGS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FETCH_SETTINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        items: action.payload,
      };

    case FETCH_SETTINGS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case SETTING_CHANGE:
      const { max, min, step, pname } = action.payload.config;
      const act = action.payload.action;
      const settings = state.items;

      let newSettings;
      if (act === "plus" && settings[pname] < max) {
        newSettings = Object.assign({}, settings, {
          [pname]: settings[pname] + step,
        });
      } else if (act === "minus" && settings[pname] > min) {
        newSettings = Object.assign({}, settings, {
          [pname]: settings[pname] - step,
        });
      } else {
        return {
          ...state,
          items: settings,
        };
      }

      return {
        ...state,
        items: newSettings,
      };
    default:
      return state;
  }
}
