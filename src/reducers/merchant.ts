import { Action } from '../actions/action';
import { MerchantActionTypes } from '../actions/merchant';

export const initialState = {
    storeHash: '',
};

export interface MerchantStoreState {
    storeHash: string;
}

const merchant = (
    state: MerchantStoreState = initialState,
    action: Action
): MerchantStoreState => {
    if (action.error) {
        return state;
    }

    switch (action.type) {
        case MerchantActionTypes.SET_STORE_DEFAULTS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default merchant;
