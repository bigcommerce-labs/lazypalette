import { theme } from 'pattern-lab';

import { AppConfig } from '../../components/App/App';
import { disableStoreDesign } from '../themeApi';

import { UnsupportedBrowserEndpoint, UnsupportedBrowserText } from './constants';

const handleOptOut = (storeHash: string) => {
    return (event: Event) => {
        disableStoreDesign(storeHash)
            .then(() => {
                // TODO: Should send user to specific variation and/or configuration
                window.location.assign(UnsupportedBrowserEndpoint.themeEditor);
            })
            .catch(() => {
                // TODO: Finalize copy
                alert(UnsupportedBrowserText.optOutFailureAlert);
            });
    };
};

export const renderUnsupportedBrowserPage = (config: AppConfig) => {
    const unsupportedBrowserView = document.createElement('div');
    unsupportedBrowserView.className = 'unsupportedBrowser';
    unsupportedBrowserView.innerHTML = `
        <style>
            body {
                background: ${theme.colors.background};
            }

            * {
                padding: 0;
                margin: 0;
            }

            .unsupportedBrowser {
                text-align: center;
                padding: 3rem;
                margin: 0 auto;
            }

            .unsupportedBrowser-inner {
                border-radius: 4px;
                padding: 2rem;
                margin: auto;
                background-color: ${theme.colors.empty};
                box-shadow: ${theme.elevation.raised};
            }

            .unsupportedBrowser-inner h1 {
                margin-bottom: 1rem;
            }

            .unsupportedBrowser-inner p {
                margin-bottom: 0.5rem;
            }

            button {
                height: 2rem;
                border-radius: 2px;
                box-sizing: border-box;
                border: 1px solid;
                border-color: ${theme.colors.primary};
                padding: 0 1rem;
                font-family: ${theme.typography.fontFamily};
                font-size: 1rem;
                cursor: pointer;
                background-color: ${theme.colors.primary};
                color: ${theme.colors.empty};
            }

            button:hover {
               background-color: ${theme.colors.primaryHover};
               text-decoration: none;
               border-color: ${theme.colors.brandPrimary};
            }
        </style>
        <div class="unsupportedBrowser-inner">
            <h1>${UnsupportedBrowserText.heading}</h1>
            <p>${UnsupportedBrowserText.unsupportedMessage}</p>
            <p>${UnsupportedBrowserText.contactMessage}</p>
            <br>

        ${config.canOptOut
        ? `<p><button id="unsupportedBrowser-optOut">${UnsupportedBrowserText.optOut}</button></p>`
        : ``}

            <p><a href="${UnsupportedBrowserEndpoint.cpDashboard}">${UnsupportedBrowserText.back}</a></p>
        </div>
    `;

    // Attach the unsupportedBrowser view into the dom
    const root = document.getElementById('root');
    root!.appendChild(unsupportedBrowserView);

    // Set up the button click handler for the optOut
    const optOut = document.getElementById('unsupportedBrowser-optOut');
    optOut!.onclick = handleOptOut(config.storeHash);
};
