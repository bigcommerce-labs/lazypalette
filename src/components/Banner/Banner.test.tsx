import { shallow } from 'enzyme';
import React from 'react';

import Banner from './Banner';

describe('Banner', () => {
    describe('when rendering', () => {
        it('renders correctly in live mode', () => {
            const mockNotify = jest.fn();

            const buttonInput = shallow(
                <Banner
                    createNotification={mockNotify}
                    previewCode="abcdefg"
                    isPrelaunchStore={false}
                    isDownForMaintenance={false}
                    shopPath="http://catland.bigcommerce.com"
                />
            );

            expect(buttonInput).toMatchSnapshot();
        });

        it('renders correctly in prelaunch mode', () => {
            const mockNotify = jest.fn();

            const buttonInput = shallow(
                <Banner
                    createNotification={mockNotify}
                    previewCode="abcdefg"
                    isPrelaunchStore={true}
                    isDownForMaintenance={false}
                    shopPath="http://catland.bigcommerce.com"
                />
            );

            expect(buttonInput).toMatchSnapshot();
        });

        it('renders correctly in maintenance mode', () => {
            const mockNotify = jest.fn();

            const buttonInput = shallow(
                <Banner
                    createNotification={mockNotify}
                    previewCode="abcdefg"
                    isPrelaunchStore={false}
                    isDownForMaintenance={true}
                    shopPath="http://catland.bigcommerce.com"
                />
            );

            expect(buttonInput).toMatchSnapshot();
        });
    });
});
