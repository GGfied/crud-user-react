import { combineReducers } from 'redux';
import user from './userReducer';
import { connectRouter } from 'connected-react-router';
import { REHYDRATE } from 'redux-persist/lib/constants';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  userPages: user,
  isRehydrated: (state = false, action) => action.type === REHYDRATE ? true : state,
});

export default rootReducer;
