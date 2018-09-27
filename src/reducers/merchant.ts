import { Action } from '../actions/action';
import { MerchantActionTypes, StoreFeatures } from '../actions/merchant';

export const initialState = {
    activeThemeId: '',
    activeVariationId: '',
    features: {},
    isDownForMaintenance: false,
    isPrelaunchStore: false,
    previewCode: '',
    storeHash: '',
};

export interface MerchantStoreState {
    activeThemeId: string;
    activeVariationId: string;
    features: StoreFeatures;
    isDownForMaintenance: boolean;
    isPrelaunchStore: boolean;
    previewCode: string;
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
