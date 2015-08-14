import {
    IMAGE_LOAD,
    IMAGE_LOAD_SUCCESS,
    IMAGE_LOAD_FAIL
} from '../actions/actionTypes';


const initialState = {
    loaded: false
};

export default function image(state = initialState, action = {}) {
    switch (action.type) {
        case IMAGE_LOAD:
            return {
                ...state,
                loading: true
            };
        case IMAGE_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.result
            };
        case IMAGE_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            };
        default:
            return state;
    }
}
