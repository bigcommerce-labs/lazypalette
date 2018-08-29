import { Action } from '../actions/action';
import { MerchantActionTypes } from '../actions/merchant';

export const initialState = {
    isCurrent: false,
    isDownForMaintenance: false,
    isPrelaunchStore: false,
    storeHash: '',
};

export interface MerchantStoreState {
    isCurrent: boolean;
    isDownForMaintenance: boolean;
    isPrelaunchStore: boolean;
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
