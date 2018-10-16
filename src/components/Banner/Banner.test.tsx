import { mount, shallow } from 'enzyme';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';
import Tooltip from '../Tooltip/Tooltip';

import { BannerLinks } from './constants';
import { StyledLink } from './styles';
import { Banner } from './Banner';

describe('Banner', () => {
    const theme = {
        colors: {},
        elevation: {},
        layers: {},
        typography: {
            fontFamily: {},
            fontSize: {},
            fontWeight: {},
        },
    };

    describe('when rendering', () => {
        it('renders correctly in live mode', () => {
            const mockNotify = jest.fn();

            const buttonInput = shallow(
                <Banner
                    createNotification={mockNotify}
                    previewCode="abcdefg"
                    isChanged={false}
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
                    isChanged={false}
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
                    isChanged={false}
                    isPrelaunchStore={false}
                    isDownForMaintenance={true}
                    shopPath="http://catland.bigcommerce.com"
                />
            );

            expect(buttonInput).toMatchSnapshot();
        });
    });

    describe('when tooltip is clicked', () => {
        describe('when message link is clicked and isChanged is true', () => {
            it('should open up the confirm dialog modal', () => {
                const mockNotify = jest.fn();

                const buttonInput = mount(
                    <ThemeProvider theme={theme}>
                        <Banner
                            createNotification={mockNotify}
                            previewCode="abcdefg"
                            isChanged={true}
                            isPrelaunchStore={true}
                            isDownForMaintenance={false}
                            shopPath="http://catland.bigcommerce.com"
                        />
                    </ThemeProvider>
                );

                expect(buttonInput.find(ConfirmModal).exists()).toEqual(false);
                buttonInput.find(Tooltip).simulate('click'); // open tooltip
                buttonInput.find(StyledLink).simulate('click'); // click message link
                expect(buttonInput.find(ConfirmModal).exists()).toEqual(true);
            });
        });

        describe('when message link is clicked and isChanged is false', () => {
            it('should invoke window.location.assign, and not confirm modal', () => {
                const mockNotify = jest.fn();

                const buttonInput = mount(
                    <ThemeProvider theme={theme}>
                        <Banner
                            createNotification={mockNotify}
                            previewCode="abcdefg"
                            isChanged={false}
                            isPrelaunchStore={true}
                            isDownForMaintenance={false}
                            shopPath="http://catland.bigcommerce.com"
                        />
                    </ThemeProvider>
                );

                const _window: any = window;
                _window.location.assign = jest.fn();

                expect(_window.location.assign).not.toBeCalled();
                buttonInput.find(Tooltip).simulate('click'); // open tooltip
                buttonInput.find(StyledLink).simulate('click'); // click message link

                expect(buttonInput.find(ConfirmModal).exists()).toEqual(false);
                expect(_window.location.assign).toBeCalledWith(
                    BannerLinks.GettingStarted
                );
            });
        });
    });
});
