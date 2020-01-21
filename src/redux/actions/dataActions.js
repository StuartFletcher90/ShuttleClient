import {
  SET_SHUTTLE,
  LOADING_DATA,
  LIKE_SHUTTLE,
  UNLIKE_SHUTTLE,
  DELETE_SHUTTLE,
  POST_SHUTTLE,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_SHUTTLEY
} from "../reducers/types";
import axios from "axios";

//! Get all shuttle posts

export const getShuttle = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/shuttle")
    .then(res => {
      dispatch({
        type: SET_SHUTTLE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_SHUTTLE,
        payload: []
      });
    });
};
export const getShuttles = shuttleYId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/shuttle/${shuttleYId}`)
    .then(res => {
      dispatch({
        type: SET_SHUTTLEY,
        padload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

//! Post a new shuttle!
export const postShuttle = newShuttle => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/shuttles", newShuttle)
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

//! Like a shuttle post

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

//! Unlike a shuttle post!

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

//! Delete a shuttle post!

export const deleteShuttle = shuttleId => dispatch => {
  axios
    .delete(`/shuttle/${shuttleId}`)
    .then(() => {
      dispatch({ type: DELETE_SHUTTLE, payload: shuttleId });
    })
    .catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
