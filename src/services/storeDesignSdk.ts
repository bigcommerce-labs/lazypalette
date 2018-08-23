import Cookies from 'js-cookie';
import uuid from 'uuid';

export enum StoreDesignSdkEvents {
    STORE_DESIGN_SDK_LOAD = 'StoreDesignSdkEvents.STORE_DESIGN_SDK_LOAD',
    STORE_DESIGN_UPDATE_COOKIES = 'StoreDesignSdkEvents.STORE_DESIGN_UPDATE_COOKIES',
    STORE_DESIGN_UPDATED_COOKIES = 'StoreDesignSdkEvents.STORE_DESIGN_UPDATED_COOKIES',
    STORE_DESIGN_REMOVE_COOKIES = 'StoreDesignSdkEvents.STORE_DESIGN_REMOVE_COOKIES',
}

export class StoreDesignSdk {
    static getScripts(doc: HTMLDocument) {
        const jsCookieScriptElem: HTMLScriptElement = doc.createElement('script');
        const storeDesignSdkScriptElem: HTMLScriptElement = doc.createElement('script');
        const jsCookieScriptUuId = uuid();

        jsCookieScriptElem.setAttribute('id', jsCookieScriptUuId);
        jsCookieScriptElem.setAttribute('src', 'https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js');
        jsCookieScriptElem.setAttribute('type', 'text/javascript');
        storeDesignSdkScriptElem.setAttribute('type', 'text/javascript');
        storeDesignSdkScriptElem.text = `(${init.toString()})(
            '${jsCookieScriptUuId}',
            ${getCookieDomain},
            '${JSON.stringify(StoreDesignSdkEvents)}',
        );`;

        function init(
            jsCookieScriptId: string,
            getCookieDomainFn: (hostname: string) => string,
            eventTypesString: string
        ) {
            const STENCIL_COOKIE_NAME = 'stencil_preview';
            const eventTypes = JSON.parse(eventTypesString);
            const cookiesUpdatedEvent = { type: eventTypes.STORE_DESIGN_UPDATED_COOKIES };
            const dataLoadedEvent = { type: eventTypes.STORE_DESIGN_SDK_LOAD };
            const jsCookieScript = document.getElementById(jsCookieScriptId);

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

                if (messageData.type === eventTypes.STORE_DESIGN_UPDATE_COOKIES) {
                    const { lastCommitId, versionId, configurationId } = messageData.payload;
                    const cookieValue = lastCommitId
                        ? versionId + '@' + configurationId + '@' + lastCommitId
                        : versionId + '@' + configurationId;

                    // Adding a dot because cookie set by bcapp also adds a dot
                    setCookie(STENCIL_COOKIE_NAME, cookieValue);
                    window.parent.postMessage(JSON.stringify(cookiesUpdatedEvent), '*');
                }
            });

            if (jsCookieScript) {
                jsCookieScript.onload = () => {
                    window.parent.postMessage(JSON.stringify(dataLoadedEvent), '*');
                };
            }

            function setCookie(cookieName: string, cookieValue: string) {
                const jsCookie = window['Cookies']; // tslint:disable-line

                if (!jsCookie) {
                    return;
                }

                let domain = getCookieDomainFn(window.location.hostname);

                jsCookie.set(cookieName, cookieValue, { domain });

                if (domain.match(/^www\./)) {
                    // Because bcapp sets the cookie at the raw domain, we need to set the cookie without "www"
                    domain = domain.substr(3, domain.length);
                    jsCookie.set(cookieName, cookieValue, { domain });
                }
            }
        }

        return [jsCookieScriptElem, storeDesignSdkScriptElem];
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
