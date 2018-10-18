declare const window: { analytics?: any; };

const trackBrowser = (eventName: string) => {
    window.analytics.track(eventName, {
        store_design_version: 2,
    });
};

export function trackUnsupportedBrowser() {
    trackBrowser('store-design_unsupported_browser');
}
