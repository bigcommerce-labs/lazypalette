export enum StoreDesignSdkEvents {
    IFRAME_LOAD = 'StoreDesignSdkEvents.IFRAME_LOAD',
}

export class StoreDesignSdk {
    static getScript(doc: HTMLDocument) {
        const storeDesignSdkScript: HTMLScriptElement = doc.createElement('script');
        const storeDesignSdkScriptTextNode: Text = doc.createTextNode(this.getScriptContents());

        storeDesignSdkScript.setAttribute('type', 'text/javascript');
        storeDesignSdkScript.appendChild(storeDesignSdkScriptTextNode);

        return storeDesignSdkScript;
    }

    private static getScriptContents() {
        return `
            (function() {
                var STAPLER_PROXY_COOKIE_NAME = 'bc_upstream';
                var STAPLER_PROXY_COOKIE_VALUE = 'nodejs';
                var STENCIL_COOKIE_NAME = 'stencil_preview';
                var windowOnload = window.onload;

                window.addEventListener('load', function() {
                    window.parent.postMessage('StoreDesignSdkEvents.IFRAME_LOAD', '*');

                    if (windowOnload) {
                        windowOnload.call(window);
                    }
                });

                window.addEventListener('message', function(messageEvent) {
                    var { configurationId, sessionId, versionId } = JSON.parse(messageEvent.data);
                    var cookieValue = sessionId
                        ? versionId + '@' + configurationId + '@' + sessionId
                        : versionId + '@' + configurationId;

                    // Adding a dot because cookie set by bcapp also adds a dot
                    // setCookie(STENCIL_COOKIE_NAME, cookieValue);
                    // setCookie(STAPLER_PROXY_COOKIE_NAME, STAPLER_PROXY_COOKIE_VALUE);
                });

                function setCookie(cookieName, cookieValue) {
                    var cookieDomain = getCookieDomain(window.location.hostname);

                    document.cookie = cookieName + '=' + cookieValue + ', domain=' + cookieDomain;

                    if (cookieDomain.match(/^www\./)) {
                        // Because bcapp sets the cookie at the raw domain, we need to set the cookie without "www"
                        var cookieDomainWithoutWWW = cookieDomain.substr(3, cookieDomain.length);

                        document.cookie = cookieName + '=' + cookieValue + ', domain=' + cookieDomainWithoutWWW;
                    }
                }

                function getCookieDomain(hostname) {
                    if (!hostname) {
                        return 'localhost';
                    }

                    // Adding a dot because cookie set by bcapp also adds a dot
                    if (hostname !== 'localhost') {
                        if (hostname.substr(0, 4) !== 'www.') {
                            return '.' + hostname;
                        }
                    }

                    return hostname;
                }
            })();
        `;
    }
}
