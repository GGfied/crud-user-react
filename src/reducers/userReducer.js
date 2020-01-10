import initialState from './initialState';
import {
  CREATE_USER_ATTEMPT, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
  GET_USER_ATTEMPT, GET_USER_SUCCESS, GET_USER_FAILURE,
  UPDATE_USER_ATTEMPT, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
  DELETE_USER_ATTEMPT, DELETE_USER_SUCCESS, DELETE_USER_FAILURE,
  LIST_USERS_ATTEMPT, LIST_USERS_SUCCESS, LIST_USERS_FAILURE,
} from '../constants/actionTypes';

export default function userReducer(state = initialState.userPages, action) {

  switch (action.type) {
    case CREATE_USER_ATTEMPT:
      return {
        ...state,
        isCreatingUser: true,
        createUserError: '',
        user: {},
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isCreatingUser: false,
        createUserError: '',
        user: action.data,
      };

    case CREATE_USER_FAILURE:
      return {
        ...state,
        isCreatingUser: false,
        createUserError: action.errorMsg,
        user: {},
      };


    case GET_USER_ATTEMPT:
      return {
        ...state,
        isGettingUser: true,
        getUserError: '',
        user: {},
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isGettingUser: false,
        getUserError: '',
        user: action.data,
      };

    case GET_USER_FAILURE:
      return {
        ...state,
        isGettingUser: false,
        getUserError: action.errorMsg,
        user: {},
      };

    
    case UPDATE_USER_ATTEMPT:
      return {
        ...state,
        isUpdatingUser: true,
        updateUserError: '',
        user: {},
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isUpdatingUser: false,
        updateUserError: '',
        user: action.data,
      };

    case UPDATE_USER_FAILURE:
      return {
        ...state,
        isUpdatingUser: false,
        updateUserError: action.errorMsg,
        user: {},
      };

    
    case DELETE_USER_ATTEMPT:
      return {
        ...state,
        isDeletingUser: true,
        deleteUserError: '',
        user: {},
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isDeletingUser: false,
        deleteUserError: '',
        user: {},
        users: action.data,
      };

    case DELETE_USER_FAILURE:
      return {
        ...state,
        isDeletingUser: false,
        deleteUserError: action.errorMsg,
      };

    
    case LIST_USERS_ATTEMPT:
      return {
        ...state,
        isGettingUsers: true,
        listUsersError: '',
        users: [],
      };

    case LIST_USERS_SUCCESS:
      return {
        ...state,
        isGettingUsers: false,
        listUsersError: '',
        users: action.data,
      };

    case LIST_USERS_FAILURE:
      return {
        ...state,
        isGettingUsers: false,
        listUsersError: action.errorMsg,
        users: [],
      };
    default:
      return state;
  }

}
