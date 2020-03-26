import {
    SIGNIN_USER_SUCCESS,
    SIGNOUT_USER_SUCCESS,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER,
    SIGNIN_USER,
    SIGNIN_USER_FAILED,
    SIGNUP_USER_FAILED,
    SIGNOUT_USER, RESETTING_PASSWORD, RESETTING_PASSWORD_SUCCESS, RESETTING_PASSWORD_FAILED
} from "../redux/actionTypes";

const initialState = {
    data: {
        loading: false,
        loaded: false,
        error: false,
        allRegData:"",
        messageSuccessResetting: false,
        errorResetting: false
    }
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_USER: {return {...state, loading: true, loaded: false, error: false}
        }
        case SIGNUP_USER_SUCCESS: {return {...state, loading: false, loaded: true, error: false}
        }
        case SIGNIN_USER_SUCCESS: {return {...state, loading: false, loaded: true, authUser: action.payload, error: false}
        }
        case SIGNIN_USER: {return {...state, loading: true, loaded: false, error: false}
        }
        case SIGNIN_USER_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case SIGNUP_USER_FAILED: {return {...state, loading: false, loaded: false, error: true}
        }
        case SIGNOUT_USER: {return {...state, loading: false, loaded: false, error: false}
        }
        case SIGNOUT_USER_SUCCESS: {return {... initialState}
        }
        case RESETTING_PASSWORD: {return {...state, errorResetting: false, messageSuccessResetting: false}
        }
        case RESETTING_PASSWORD_SUCCESS: {return {...state, errorResetting: false, messageSuccessResetting: true}
        }
        case RESETTING_PASSWORD_FAILED: {return {...state, errorResetting: false, messageSuccessResetting: false}
        }
        default:
            return state;
    }
}
