import { combineReducers } from 'redux';
import { auth } from '../reducers/auth';
import { profile} from "../reducers/perfil";

const rootReducer = combineReducers({
  auth,
  profile
});

export default rootReducer;
