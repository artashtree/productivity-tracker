import { FETCH_SETTINGS, SETTING_CHANGE, SAVE_SETTINGS } from "../actions/types";

const initialState = {
  items: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SETTINGS:
      return {
        ...state,
        items: action.payload,
      };
    // case SAVE_SETTINGS:
    //     return {
    //         ...state,
    //         items: action.payload
    //     }

    // case SETTING_CHANGE:
    //     const { max, min, step, pname } = action.payload.config;
    //     const act = action.payload.action;
    //     const settings = state.items;

    //     let newSettings;
    //     if (act === 'plus' && settings[pname] < max) {
    //         newSettings = Object.assign({}, settings, {
    //             [pname]: settings[pname] + step
    //         })
    //     } else if (act === 'minus' && settings[pname] > min) {
    //         newSettings = Object.assign({}, settings, {
    //             [pname]: settings[pname] - step
    //         })
    //     } else {
    //         return {
    //             ...state,
    //             items: settings
    //         }
    //     }

    //     return {
    //         ...state,
    //         items: newSettings
    //     }
    default:
      return state;
  }
}
