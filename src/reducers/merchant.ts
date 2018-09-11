import { Action } from '../actions/action';
import { MerchantActionTypes } from '../actions/merchant';

export const initialState = {
    isCurrent: false,
    isDownForMaintenance: false,
    isPrelaunchStore: false,
    storeHash: '',
    timezoneName: '',
    timezoneOffset: 0,
};

export interface MerchantStoreState {
    isCurrent: boolean;
    isDownForMaintenance: boolean;
    isPrelaunchStore: boolean;
    storeHash: string;
    timezoneName: string;
    timezoneOffset: number;
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
