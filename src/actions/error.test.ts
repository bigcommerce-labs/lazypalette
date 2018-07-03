import * as errorActions from './error';

describe('error actions', () => {
    it('should create a ClearErrors action', () => {
        const expectedAction = {
            type: errorActions.ErrorActionTypes.CLEAR_ERRORS,
        };

        expect(errorActions.clearErrors()).toEqual(expectedAction);
    });
});
