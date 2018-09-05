import { mount, shallow } from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';
import { StaticRouter } from 'react-router';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';

import PreviewPane from '../PreviewPane/PreviewPane';

import { NoMatch } from './constants';
import { Body, Heading } from './styles';
import { appRoutes, NoRoute, Routes } from './Routes';

describe('Routes', () => {
    const { home, styles } = appRoutes;
    const theme = {
        colors: {},
        elevation: {},
        layers: {},
        typography: {
            fontSize: {},
            fontWeight: {},
        },
    };
    const mockProp: any = jest.fn();
    const routeProps = {
        history: mockProp,
        location: mockProp,
        match: mockProp,
        staticContext: mockProp,
    };

    it('renders', () => {
        const routes = shallow(
            <StaticRouter location={home.path} context={{}}>
                <Routes {...routeProps} />
            </StaticRouter>
        );

        expect(routes).toMatchSnapshot();
    });

    describe('when route matches path', () => {
        it('should render the preview pane and iframe', () => {
            const store = createMockStore([thunk])({
                error: { errors: [] },
                previewPane: {
                    page: '/',
                    pageUrl: '/?stencilEditor=789@012',
                    themePreviewConfig: {
                        configurationId: '012',
                        lastCommitId: '456',
                        versionId: '789',
                    },
                    viewportType: {
                        viewportHeight: '100%',
                        viewportWidth: '90%',
                    },
                },
                theme: {
                    configurationId: '012',
                },
            });

            const mockXMLSerializer = jest.fn(() => ({
                serializeToString: () => 'meowMeows',
            }));

            const globalAll: any = global;
            globalAll.XMLSerializer = mockXMLSerializer;

            const routes = mount(
                <Provider store={store}>
                    <StaticRouter location={styles.path} context={{}}>
                        <ThemeProvider theme={theme}>
                            <Routes {...routeProps} />
                        </ThemeProvider>
                    </StaticRouter>
                </Provider>
            );
            const previewPane = routes.find(PreviewPane);

            expect(previewPane.length).toEqual(1);
            expect(previewPane.find('iframe').prop('height')).toBe('100%');
            expect(previewPane.find('iframe').prop('width')).toBe('90%');
        });
    });

    describe('when route does not match any known path', () => {
        it('should render the 404 page', () => {
            const routes = mount(
                <StaticRouter location="/catz" context={{}}>
                    <ThemeProvider theme={theme}>
                        <Routes {...routeProps} />
                    </ThemeProvider>
                </StaticRouter>
            );
            const noRoute = routes.find(NoRoute);

            expect(noRoute.find(Heading).text()).toEqual(NoMatch.Heading);
            expect(noRoute.find(Body).text()).toEqual(NoMatch.Body);
        });
    });
});
