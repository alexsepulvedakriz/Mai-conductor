import { combineReducers } from 'redux';
import { auth } from './auth';
import { profile} from "./profile";
import { offer} from "../reducers/offer";
import { offer_driver } from "./offer-driver";
import { modal} from "./modals";
import { trip} from "./trip";
import { about} from "./about";

const rootReducer = combineReducers({
  auth,
  profile,
  offer,
  offer_driver,
  modal,
  trip,
  about
});

export default rootReducer;
