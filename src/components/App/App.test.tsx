import { shallow } from 'enzyme';
import React from 'react';
import { withRouter } from 'react-router';

import { App } from './App';

const WrappedApp = withRouter(App);

it('renders', () => {
    const mockFetch = jest.fn();
    const config = {
        assetPath: 'https://example.com/build/',
        canOptOut: false,
        features: { awesomeFeature: true },
        guestPassword: 'k4k4t9q44d',
        isDownForMaintenance: true,
        isPrelaunchStore: false,
        oauthBaseUrl: 'https://login.service.bcdev',
        seedActiveTheme: { id: 'blah', themeId: 'blah2' },
        shopPath: 'http://catland.bigcommerce.com',
        storeHash: 'abcdefg',
    };

    const app = shallow(
        <WrappedApp
            config={config}
            createNotification={mockFetch}
            fetchInitialState={mockFetch}
            setPreviewPaneData={mockFetch}
            setQueryParams={mockFetch}
            setStoreData={mockFetch}
        />
    );

    expect(app).toMatchSnapshot();
});
