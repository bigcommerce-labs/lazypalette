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
        const state = config.store.getState();
        data = { ...data, ...{
            is_active_theme: (state.theme.themeId === state.merchant.activeThemeId).toString(),
            is_maintenance: state.merchant.isDownForMaintenance.toString(),
            is_prelaunch: state.merchant.isPrelaunchStore.toString(),
            is_purchased: state.theme.isPurchased.toString(),
            side_menu_collapsed: (!!state.sideMenu.collapsed).toString(),
            storefront_page: state.previewPane.page,
            theme_configuration_id: state.theme.configurationId,
            theme_id: state.theme.themeId,
            theme_name: state.theme.themeName,
            theme_variation: state.theme.variationName,
            theme_variation_id: state.theme.variationId,
            theme_version: state.theme.displayVersion,
            theme_version_id: state.theme.versionId,
            viewport: state.previewPane.viewportType.glyphName,
        },
        };

        window.analytics.track(eventName, data);
    }
}

function getChangedSettings() {
    const changedSettings = {};

    if (config.store) {
        const { initialSettings, settings } = config.store.getState().theme;

        for (const setting in settings) {
            if (initialSettings[setting] !== settings[setting]) {
                changedSettings[setting] = settings[setting];
            }
        }
    }

    return JSON.stringify(changedSettings);
}

export function trackPublish(configurationId: string) {
    track('store-design_click', {
        category: 'store-design_publish',
        changedSettings: getChangedSettings(),
        configurationId,
        element: 'button',
        label: 'store-design_header-publish',
        text: 'Publish',
    });
}

export function trackSave() {
    track('store-design_click', {
        category: 'store-design_save',
        changedSettings: getChangedSettings(),
        element: 'button',
        label: 'store-design_save',
        text: 'Save',
    });
}

export function trackUpdate() {
    track('store-design_click', {
        category: 'store-design-update',
        changedSettings: getChangedSettings(),
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

export function trackCollapseSideMenu(collapsed: boolean) {
    track('store-design_click', {
        category: 'store-design_side-menu',
        collapsed: collapsed.toString(),
        element: 'button',
        label: 'store-design_side-menu-collapse',
        text: '',
    });
}

export function trackViewLiveStore() {
    track('store-design_click', {
        category: 'store-design_view-store',
        element: 'a',
        label: 'store-design_view-store',
        text: 'View live store',
    });
}

export function trackViewportChange(view: string, isRotated: boolean) {
    track('store-design_click', {
        category: 'store-design_viewport-change',
        element: 'span',
        isRotated: isRotated.toString(),
        label: 'store-design_viewport-change',
        text: '',
        view,
    });
}

export function trackEditThemeFiles(resultModal?: string) {
    track('store-design_click', {
        category: 'store-design_edit-theme-files',
        element: 'span',
        label: 'store-design_edit-theme-files',
        resultModal: resultModal || 'none',
        text: 'Edit Theme Files',
    });
}

export function trackEditThemeFilesCancel() {
    track('store-design_click', {
        category: 'store-design_edit-theme-files',
        element: 'button',
        label: 'store-design_edit-theme-files-cancel',
        text: 'Cancel',
    });
}
export function trackEditThemeFilesConfirm() {
    track('store-design_click', {
        category: 'store-design_edit-theme-files',
        element: 'button',
        label: 'store-design_edit-theme-files-confirm',
        text: 'Edit Theme Files',
    });
}

export function trackCopyThemeCancel() {
    track('store-design_click', {
        category: 'store-design_copy-theme',
        element: 'button',
        label: 'store-design_copy-theme-cancel',
        text: 'Cancel',
    });
}
export function trackCopyThemeConfirm() {
    track('store-design_click', {
        category: 'store-design_copy-theme',
        element: 'button',
        label: 'store-design_copy-theme-confirm',
        text: 'Go To My Themes',
    });
}

export function trackRestoreOriginalSettings(resultModal?: string) {
    track('store-design_click', {
        category: 'store-design_restore-original-settings',
        element: 'span',
        label: 'store-design_restore-original-settings',
        resultModal: resultModal || 'none',
        text: 'Restore Original Theme Styles',
    });
}

export function trackRestoreOriginalSettingsCancel() {
    track('store-design_click', {
        category: 'store-design_restore-original-settings',
        element: 'button',
        label: 'store-design_restore-original-settings-cancel',
        text: 'Cancel',
    });
}
export function trackRestoreOriginalSettingsConfirm() {
    track('store-design_click', {
        category: 'store-design_restore-original-settings',
        element: 'button',
        label: 'store-design_restore-original-settings-confirm',
        text: 'Restore',
    });
}
