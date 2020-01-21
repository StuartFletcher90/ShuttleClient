import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SHUTTLE,
  UNLIKE_SHUTTLE
} from "../reducers/types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_SHUTTLE:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            shuttleId: action.payload.shuttleId
          }
        ]
      };
    case UNLIKE_SHUTTLE:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.shuttleId !== action.payload.shuttleId
        )
      };
    default:
      return state;
  }
}
