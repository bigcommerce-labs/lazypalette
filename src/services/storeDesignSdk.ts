import Cookies from 'js-cookie';
import uuid from 'uuid';

export enum StoreDesignSdkEvents {
    STORE_DESIGN_SDK_LOAD = 'StoreDesignSdkEvents.STORE_DESIGN_SDK_LOAD',
    STORE_DESIGN_UPDATE_COOKIES = 'StoreDesignSdkEvents.STORE_DESIGN_UPDATE_COOKIES',
    STORE_DESIGN_REMOVE_COOKIES = 'StoreDesignSdkEvents.STORE_DESIGN_REMOVE_COOKIES',
}

export class StoreDesignSdk {
    static getScripts(doc: HTMLDocument) {
        const jsCookieScript: HTMLScriptElement = doc.createElement('script');
        const storeDesignSdkScript: HTMLScriptElement = doc.createElement('script');
        const jsCookieScriptId = uuid();

        jsCookieScript.setAttribute('id', jsCookieScriptId);
        jsCookieScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.js');
        jsCookieScript.setAttribute('type', 'text/javascript');
        storeDesignSdkScript.setAttribute('type', 'text/javascript');
        storeDesignSdkScript.text = `(${init.toString()})('${jsCookieScriptId}', ${getCookieDomain});`;

        function init(jsCookieScriptId: string, getCookieDomain: (hostname: string) => string) { // tslint:disable-line
            const STENCIL_COOKIE_NAME = 'stencil_preview';
            const data = { type: 'StoreDesignSdkEvents.STORE_DESIGN_SDK_LOAD' };
            const jsCookieScript = document.getElementById(jsCookieScriptId); // tslint:disable-line

            window.addEventListener('message', (messageEvent: MessageEvent) => {
                if (!messageEvent.data) {
                    return;
                }

                let messageData;

                try {
                    messageData = JSON.parse(messageEvent.data);
                } catch (error) {
                    if (window.Raven && window.Raven.isSetup()) {
                        window.Raven.captureException(error);
                    }

                    return;
                }

                if (messageData.type === 'StoreDesignSdkEvents.STORE_DESIGN_UPDATE_COOKIES') {
                    const { lastCommitId, versionId, configurationId } = messageData.payload;
                    const cookieValue = lastCommitId
                        ? versionId + '@' + configurationId + '@' + lastCommitId
                        : versionId + '@' + configurationId;

                    // Adding a dot because cookie set by bcapp also adds a dot
                    setCookie(STENCIL_COOKIE_NAME, cookieValue);
                }
            });

            if (jsCookieScript) {
                jsCookieScript.onload = () => {
                    window.parent.postMessage(JSON.stringify(data), '*');
                };
            }

            function setCookie(cookieName: string, cookieValue: string) {
                const jsCookie = window['Cookies']; // tslint:disable-line

                if (!jsCookie) {
                    return;
                }

                let domain = getCookieDomain(window.location.hostname);

                jsCookie.set(cookieName, cookieValue, { domain });

                if (domain.match(/^www\./)) {
                    // Because bcapp sets the cookie at the raw domain, we need to set the cookie without "www"
                    domain = domain.substr(3, domain.length);
                    jsCookie.set(cookieName, cookieValue, { domain });
                }
            }
        }

        return [jsCookieScript, storeDesignSdkScript];
    }

    static removeCookie(cookieName: string) {
        let domain = getCookieDomain(window.location.hostname);

        Cookies.remove(cookieName, { domain });

        if (domain.match(/^www\./)) {
            // Because bcapp sets the cookie at the raw domain, we need to remove the cookie without "www"
            domain = domain.substr(3, domain.length);
            Cookies.remove(cookieName, { domain });
        }
    }
}

function getCookieDomain(hostname: string) {
    if (!hostname) {
        return 'localhost';
    }

    // Adding a dot because cookie set by bcapp also adds a dot
    if (hostname !== 'localhost' && hostname.substr(0, 4) !== 'www.') {
        return '.' + hostname;
    }

    return hostname;
}
