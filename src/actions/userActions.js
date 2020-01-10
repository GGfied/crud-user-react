import axios from 'axios';
import { push } from 'connected-react-router';
import {
  CREATE_USER_ATTEMPT, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
  GET_USER_ATTEMPT, GET_USER_SUCCESS, GET_USER_FAILURE,
  UPDATE_USER_ATTEMPT, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
  DELETE_USER_ATTEMPT, DELETE_USER_SUCCESS, DELETE_USER_FAILURE,
  LIST_USERS_ATTEMPT, LIST_USERS_SUCCESS, LIST_USERS_FAILURE,
} from '../constants/actionTypes';
import {
  BASE_URL,
} from '../constants/config';

const createUserAttempt = dispatch => dispatch({
  type: CREATE_USER_ATTEMPT,
});

const createUserSuccess = (dispatch, data) => dispatch({
  type: CREATE_USER_SUCCESS,
  data,
});

const createUserFailure = (dispatch, errorMsg) => dispatch({
  type: CREATE_USER_FAILURE,
  errorMsg,
});

const getUserAttempt = dispatch => dispatch({
  type: GET_USER_ATTEMPT,
});

const getUserSuccess = (dispatch, data) => dispatch({
  type: GET_USER_SUCCESS,
  data,
});

const getUserFailure = (dispatch, errorMsg) => dispatch({
  type: GET_USER_FAILURE,
  errorMsg,
});

const updateUserAttempt = dispatch => dispatch({
  type: UPDATE_USER_ATTEMPT,
});

const updateUserSuccess = (dispatch, data) => dispatch({
  type: UPDATE_USER_SUCCESS,
  data,
});

const updateUserFailure = (dispatch, errorMsg) => dispatch({
  type: UPDATE_USER_FAILURE,
  errorMsg,
});

const deleteUserAttempt = dispatch => dispatch({
  type: DELETE_USER_ATTEMPT,
});

const deleteUserSuccess = (dispatch, data) => dispatch({
  type: DELETE_USER_SUCCESS,
  data,
});

const deleteUserFailure = (dispatch, errorMsg) => dispatch({
  type: DELETE_USER_FAILURE,
  errorMsg,
});

const listUsersAttempt = dispatch => dispatch({
  type: LIST_USERS_ATTEMPT,
});

const listUsersSuccess = (dispatch, data) => dispatch({
  type: LIST_USERS_SUCCESS,
  data,
});

const listUsersFailure = (dispatch, errorMsg) => dispatch({
  type: LIST_USERS_FAILURE,
  errorMsg,
});

export const createUser = (username, name) => dispatch => {
  createUserAttempt(dispatch);

  const headers = {
    'Content-Type': 'application/json',
  };
  const data = {
    username,
    name,
  };

  return axios
    .post(BASE_URL + '/user', data, {
      headers,
    })
    .then(res => {
      createUserSuccess(dispatch, res.data);

      return dispatch(push('/'));
    })
    .catch(err =>
      createUserFailure(dispatch, JSON.stringify(err.response.data))
    );
};

export const getUser = userId => dispatch => {
  getUserAttempt(dispatch);

  return axios
    .get(BASE_URL + '/user/' + userId)
    .then(res =>
      getUserSuccess(dispatch, res.data)
    )
    .catch(err =>
      getUserFailure(dispatch, JSON.stringify(err.response.data))
    );
};

export const updateUser = (userId, username, name) => dispatch => {
  updateUserAttempt(dispatch);

  const headers = {
    'Content-Type': 'application/json',
  };
  const data = {
    username,
    name,
  };

  return axios
    .put(BASE_URL + '/user/' + userId, data, {
      headers,
    })
    .then(res =>
      updateUserSuccess(dispatch, res.data)
    )
    .catch(err =>
      updateUserFailure(dispatch, JSON.stringify(err.response.data))
    );
};

export const deleteUser = (userIdx, userId) => (dispatch, getState) => {
  deleteUserAttempt(dispatch);

  return axios
    .delete(BASE_URL + '/user/' + userId)
    .then(() => {
      const newUsers = [...getState().userPages.users];

      newUsers.splice(userIdx, 1);

      return deleteUserSuccess(dispatch, newUsers);
    })
    .catch(err =>
      deleteUserFailure(dispatch, JSON.stringify(err.response.data))
    );
};

export const listUsers = () => dispatch => {
  listUsersAttempt(dispatch);

  return axios
    .get(BASE_URL + '/user/list')
    .then(res =>
      listUsersSuccess(dispatch, res.data)
    )
    .catch(err =>
      listUsersFailure(dispatch, JSON.stringify(err.response.data))
    );
};

export const goToUserUpdatePage = (userIdx, userId) => dispatch => dispatch(push('/user-info/' + userId));
