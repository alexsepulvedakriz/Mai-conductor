import { combineReducers } from 'redux';
import { auth } from './auth';
import { profile} from "./profile";
import { offer} from "../reducers/offer";
import { offer_driver } from "./offer-driver";
import { modal} from "./modals";
import { trip} from "./trip";
import { about} from "./about";
import { accident} from './accident';
import { penalties} from "./penalties";
import { vehicles} from "./vehicles";
import { complaints} from './complaint';
import { position} from './position';

const rootReducer = combineReducers({
  auth,
  profile,
  offer,
  offer_driver,
  modal,
  trip,
  about,
  accident,
  penalties,
  vehicles,
  complaints,
  position
});

export default rootReducer;
