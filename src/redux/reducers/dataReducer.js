import {
  SET_SHUTTLE,
  LIKE_SHUTTLE,
  UNLIKE_SHUTTLE,
  LOADING_DATA,
  SET_SHUTTLEY,
  DELETE_SHUTTLE,
  POST_SHUTTLE
} from "./types";

const initialState = {
  shuttle: [],
  shuttleY: {},
  loading: false
};

//? Shuttle is the array which holds all screams on a home page or the users page, keeping with the server - shuttle

//? ShuttleY is the singular just the details of one shuttle

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SHUTTLE:
      return {
        ...state,
        shuttle: action.payload,
        loading: false
      };
    case SET_SHUTTLEY:
      return {
        ...state,
        shuttleY: action.payload
      };
    case LIKE_SHUTTLE:
    case UNLIKE_SHUTTLE:
      let index = state.shuttle.findIndex(
        shuttleY => shuttleY.shuttleYId === action.payload.shuttleYId
      );
      state.shuttle[index] = action.payload;
      if (state.shuttleY.shuttleYId === action.payload.shuttleYId) {
        state.shuttleY = action.payload;
      }
      return {
        ...state
      };
    case DELETE_SHUTTLE:
      index = state.shuttle.findIndex(
        shuttleY => shuttleY.shuttleYId === action.payload
      );
      state.shuttle.splice(index, 1);
      return {
        ...state
      };
    case POST_SHUTTLE:
      return {
        ...state,
        shuttle: [action.payload, ...state.shuttle]
      };
    default:
      return state;
  }
}
