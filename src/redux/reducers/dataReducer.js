import {
  SET_SHUTTLES,
  LIKE_SHUTTLE,
  UNLIKE_SHUTTLE,
  LOADING_DATA,
  DELETE_SHUTTLE,
  POST_SHUTTLE,
  SET_SHUTTLE,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  shuttles: [],
  shuttle: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SHUTTLES:
      return {
        ...state,
        shuttles: action.payload,
        loading: false
      };
    case SET_SHUTTLE:
      return {
        ...state,
        shuttle: action.payload
      };
    case LIKE_SHUTTLE:
    case UNLIKE_SHUTTLE:
      let index = state.shuttles.findIndex(
        shuttle => shuttle.shuttleId === action.payload.shuttleId
      );
      state.shuttles[index] = action.payload;
      if (state.shuttle.shuttleId === action.payload.shuttleId) {
        state.shuttle = action.payload;
      }
      return {
        ...state
      };
    case DELETE_SHUTTLE:
      index = state.shuttles.findIndex(
        shuttle => shuttle.shuttleId === action.payload
      );
      state.shuttles.splice(index, 1);
      return {
        ...state
      };
    case POST_SHUTTLE:
      return {
        ...state,
        shuttles: [action.payload, ...state.shuttles]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        shuttle: {
          ...state.shuttle,
          comments: [action.payload, ...state.shuttle.comments]
        }
      };
    default:
      return state;
  }
}
