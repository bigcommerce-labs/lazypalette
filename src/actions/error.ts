import { Action } from './action';

export enum ErrorActionTypes {
    CLEAR_ERRORS = 'CLEAR_ERRORS',
}

export interface ClearErrorsAction extends Action  {
    type: ErrorActionTypes.CLEAR_ERRORS;
}

export function clearErrors(): ClearErrorsAction {
    return {
        type: ErrorActionTypes.CLEAR_ERRORS,
    };
}
