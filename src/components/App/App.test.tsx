import { shallow } from 'enzyme';
import React from 'react';
import { withRouter } from 'react-router';

import { App } from './App';

const WrappedApp = withRouter(App);

it('renders', () => {
    const mockFetch = jest.fn();
    const config = {
        assetPath: 'https://example.com/build/',
        oauthBaseUrl: 'https://login.service.bcdev',
        storeHash: 'abcdefg',
    };

    const app = shallow(
        <WrappedApp
            config={config}
            fetchInitialState={mockFetch}
            setStoreData={mockFetch}
        />
    );

    expect(app).toMatchSnapshot();
});
