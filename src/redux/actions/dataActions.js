import {
  SET_SHUTTLES,
  LOADING_DATA,
  LIKE_SHUTTLE,
  UNLIKE_SHUTTLE,
  DELETE_SHUTTLE,
  SET_ERRORS,
  POST_SHUTTLE,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SHUTTLE,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";

// Get all shuttle
export const getShuttles = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/shuttles")
    .then(res => {
      dispatch({
        type: SET_SHUTTLES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SHUTTLES,
        payload: []
      });
    });
};
export const getShuttle = shuttleId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/shuttle/${shuttleId}`)
    .then(res => {
      dispatch({
        type: SET_SHUTTLE,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};
// Post a shuttle
export const postShuttle = newShuttle => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/shuttle", newShuttle)
    .then(res => {
      dispatch({
        type: POST_SHUTTLE,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a shuttle
export const likeShuttle = shuttleId => dispatch => {
  axios
    .get(`/shuttle/${shuttleId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SHUTTLE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
// Unlike a shuttle
export const unlikeShuttle = shuttleId => dispatch => {
  axios
    .get(`/shuttle/${shuttleId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SHUTTLE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
// Submit a comment
export const submitComment = (shuttleId, commentData) => dispatch => {
  axios
    .post(`/shuttle/${shuttleId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteShuttle = shuttleId => dispatch => {
  axios
    .delete(`/shuttle/${shuttleId}`)
    .then(() => {
      dispatch({ type: DELETE_SHUTTLE, payload: shuttleId });
    })
    .catch(err => console.log(err));
};

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_SHUTTLES,
        payload: res.data.shuttles
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SHUTTLES,
        payload: null
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
