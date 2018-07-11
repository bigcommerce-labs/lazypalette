import { Action } from '../actions/action';
import { ErrorActionTypes } from '../actions/error';

export interface ErrorState {
    errors: Error[];
}

const initialState: ErrorState = {
    errors: [],
};

function error(state: ErrorState = initialState, action: Action): ErrorState {
    if (action.error) {
        return { ...state, errors: [...state.errors, action.payload as Error] };
    }

    switch (action.type) {
        case ErrorActionTypes.CLEAR_ERRORS:
            return { ...state, errors: [] };
        default:
            return state;
    }
}

export default error;
