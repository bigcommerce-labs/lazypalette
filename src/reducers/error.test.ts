import * as errorActions from '../actions/error';

import error from './error';

describe('error handling', () => {
    it('handles an error', () => {
        const initialState = { errors: [ new Error('initial') ] };
        const newError = new Error('blah');
        const expectedState = { errors: [ ...initialState.errors, newError ] };

        expect(error(initialState, { payload: newError, error: true, type: 'any' })).toEqual(expectedState);
    });
});

describe('clearErrors', () => {
    it('clears errors', () => {
        const initialState = { errors: [ new Error('initial') ] };
        const expectedState = { errors: [] };

        const action = errorActions.clearErrors();

        expect(error(initialState, action)).toEqual(expectedState);
    });
});
