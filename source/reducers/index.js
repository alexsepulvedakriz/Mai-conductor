import { combineReducers } from 'redux';
import { auth } from './auth';
import { profile} from "./profile";
import { offer} from "../reducers/offer";
import { offer_driver } from "./offer-driver";
import { modal} from "./modals";
import { trip} from "./trip";
import { about} from "./about";
import { card} from "./cards";

const rootReducer = combineReducers({
  auth,
  profile,
  offer,
  offer_driver,
  modal,
  trip,
  about,
  card
});

export default rootReducer;
