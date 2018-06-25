export class StoreDesignSdk {
    static getScript(doc: HTMLDocument) {
        const storeDesignSdkScript: HTMLScriptElement = doc.createElement('script');
        const storeDesignSdkScriptTextNode: Text = doc.createTextNode(`(${this.getScriptContents()})();`);

        storeDesignSdkScript.appendChild(storeDesignSdkScriptTextNode);

        return storeDesignSdkScript;
    }

    private static getScriptContents() {
        return () => {
            const windowOnload = window.onload;

            window.addEventListener('load', () => {
                window.parent.postMessage('ping', '*');

                if (windowOnload) {
                    windowOnload.call(window);
                }
            });
        };
    }
}
