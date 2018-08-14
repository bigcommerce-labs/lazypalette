import { Store } from 'redux';

import { State } from '../reducers/reducers';

declare const window: { analytics?: any; };

interface AnalyticsConfig {
    store?: Store<State>;
}

interface EventData {
    category: string;
    element: string;
    label: string;
    text: string;
    [key: string]: string;
}

const config: AnalyticsConfig = {
};

export function init(store?: Store<State>) {
    config.store = store;
}

function track(eventName: string, data: EventData) {
    if (window.analytics && config.store) {
        const state = config.store.getState().theme;
        data = { ...data, ...{
            theme_configuration_id: state.configurationId,
            theme_id: state.themeId,
            theme_name: state.themeName,
            theme_variation: state.variationName,
            theme_variation_id: state.variationId,
            theme_version: state.displayVersion,
            theme_version_id: state.versionId,
        }};

        window.analytics.track(eventName, data);
    }
}

export function trackPublish(configurationId: string) {
    track('store-design_click', {
        category: 'store-design_publish',
        configurationId,
        element: 'button',
        label: 'store-design_header-publish',
        text: 'Publish',
    });
}

export function trackResetClick() {
    track('store-design_click', {
        category: 'store-design_reset',
        element: 'button',
        label: 'store-design_reset',
        text: 'Reset',
    });
}

export function trackResetConfirmation() {
    track('store-design_click', {
        category: 'store-design_reset',
        element: 'button',
        label: 'store-design_reset_confirmation',
        text: 'OK',
    });
}

export function trackResetCancel() {
    track('store-design_click', {
        category: 'store-design_reset',
        element: 'button',
        label: 'store-design_reset_cancel',
        text: 'Cancel',
    });
}

export function trackResetModalClose() {
    track('store-design_click', {
        category: 'store-design_reset',
        element: 'div',
        label: 'store-design_modal_close',
        text: '',
    });
}
