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

export function trackSave() {
    track('store-design_click', {
        category: 'store-design_save',
        element: 'button',
        label: 'store-design_save',
        text: 'Save',
    });
}

export function trackUpdate() {
    track('store-design_click', {
        category: 'store-design-update',
        element: 'button',
        label: 'store-design_header-update',
        text: 'Apply Update',
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

export function trackSectionOpen(label: string) {
    track('store-design_click', {
        category: 'store-design_section',
        element: 'a',
        label: 'store-design_section_open',
        text: label,
    });
}

export function trackSectionClose(title: string) {
    track('store-design_click', {
        category: 'store-design_section',
        element: 'a',
        label: 'store-design_section_close',
        text: 'x',
        title,
    });
}

export function trackCheckboxChange(id: any, checked: boolean) {
    track('store-design_change', {
        category: 'store-design_change',
        checked: checked ? 'true' : 'false',
        element: 'input',
        id,
        label: 'store-design_checkbox_change',
        text: '',
    });
}

export function trackImageDimensionChange(id: any, dimension: string) {
    track('store-design_change', {
        category: 'store-design_change',
        dimension,
        element: 'input',
        id,
        label: 'store-design_image_dimension_change',
        text: '',
    });
}

export function trackSelectChange(id: any, selected: string) {
    track('store-design_change', {
        category: 'store-design_change',
        element: 'select',
        id,
        label: 'store-design_select_change',
        selected,
        text: selected,
    });
}

export function trackTextChange(id: any, text: string) {
    track('store-design_change', {
        category: 'store-design_change',
        element: 'input',
        id,
        label: 'store-design_text_change',
        text,
    });
}

export function trackImageUpload(id: any, imageName: string) {
    track('store-design_change', {
        category: 'store-design_change',
        element: 'div',
        id,
        imageName,
        label: 'store-design_image_upload',
        text: 'Upload image',
    });
}
