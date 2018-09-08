import { Action } from '../actions/action';
import { MerchantActionTypes } from '../actions/merchant';

export const initialState = {
    activeThemeId: '',
    activeVariationId: '',
    isDownForMaintenance: false,
    isPrelaunchStore: false,
    previewCode: '',
    storeHash: '',
    timezoneName: '',
    timezoneOffset: 0,
};

export interface MerchantStoreState {
    activeThemeId: string;
    activeVariationId: string;
    isDownForMaintenance: boolean;
    isPrelaunchStore: boolean;
    previewCode: string;
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
        case MerchantActionTypes.UPDATE_ACTIVE_THEME:
            return { ...state,
                activeThemeId: action.payload.activeThemeId,
                activeVariationId: action.payload.activeVariationId,
            };
        default:
            return state;
    }
};

export default merchant;
