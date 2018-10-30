import { mount, shallow } from 'enzyme';
import React from 'react';
import PageVisibility from 'react-page-visibility';

import ButtonInput from '../ButtonInput/ButtonInput';

import BrowserContext from '../../context/BrowserContext';

import { Messages, SessionLinks } from './constants';
import { UserSessionActivity } from './UserSessionActivity';

jest.mock('../../services/sessionHeartbeat/sessionHeartbeat');

describe('UserSessionActivity', () => {
    const oauthBaseUrl = 'https://login.service.bcdev';

    it('renders consistently', () => {
        const mockCallBack = jest.fn();
        const component = shallow(
            <UserSessionActivity
                oauthBaseUrl={oauthBaseUrl}
                heartbeatResponse={mockCallBack}
                isLoggedIn={true}
            >
                <p>
                    Ok!
                </p>
            </UserSessionActivity>
        );
        expect(component).toMatchSnapshot();
    });

    describe('pageActivityHandler', () => {
        describe('componentDidMount', () => {
            it('should trigger sessionHeartbeat', () => {
                const mockHandler = jest.fn();
                const component = shallow(
                    <UserSessionActivity
                        oauthBaseUrl={oauthBaseUrl}
                        heartbeatResponse={mockHandler}
                        isLoggedIn={true}
                    >
                        <p>meow meow</p>
                    </UserSessionActivity>
                );

                expect(mockHandler).toHaveBeenCalledTimes(1);
                expect(component).toMatchSnapshot();
            });
        });

        describe('onChange', () => {
            beforeEach(() => {
                UserSessionActivity.prototype.componentDidMount = () => null;
            });

            describe('when the user switches tab, away from Store Design', () => {
                it('does not trigger sessionHeartbeat', () => {
                    const mockHandler = jest.fn();
                    const component = shallow(
                        <UserSessionActivity
                            oauthBaseUrl={oauthBaseUrl}
                            heartbeatResponse={mockHandler}
                            isLoggedIn={true}
                        >
                            <p>meow meow</p>
                        </UserSessionActivity>
                    );

                    const mockIsVisible = false; // another tab active

                    const pageVis = component.find(PageVisibility);
                    pageVis.simulate('change', mockIsVisible);
                    expect(mockHandler).not.toBeCalled();
                });
            });

            describe('when the user changes tab back to Store Design', () => {
                it('triggers the sessionHeartbeat', () => {
                    const mockHandler = jest.fn();
                    const component = shallow(
                        <UserSessionActivity
                            oauthBaseUrl={oauthBaseUrl}
                            heartbeatResponse={mockHandler}
                            isLoggedIn={true}
                        >
                            <p>meow meow</p>
                        </UserSessionActivity>
                    );

                    const mockIsVisible = true; // store design active

                    const pageVis = component.find(PageVisibility);
                    pageVis.simulate('change', mockIsVisible);
                    expect(mockHandler).toHaveBeenCalledTimes(1);
                });
            });
        });

        describe('onClick', () => {
            it('triggers the sessionHeartbeat', () => {
                const mockHandler = jest.fn();
                const component = shallow(
                    <UserSessionActivity
                        oauthBaseUrl={oauthBaseUrl}
                        heartbeatResponse={mockHandler}
                        isLoggedIn={true}
                    >
                        <p>meow meow</p>
                    </UserSessionActivity>
                );

                const div = component.find('div');
                div.simulate('click');
                expect(mockHandler.mock.calls.length).toEqual(1);
            });
        });
    });

    describe('when the user is logged out', () => {
        it('renders an AlertModal', () => {
            const mockHandler = jest.fn();
            const component = mount(
                <UserSessionActivity
                    oauthBaseUrl={oauthBaseUrl}
                    heartbeatResponse={mockHandler}
                    isLoggedIn={false}
                >
                    <p>meow meow</p>
                </UserSessionActivity>
            );
            expect(component).toMatchSnapshot();
        });

        describe('when the user clicks the Ok button', () => {
            describe('when the theme variation matches the active theme', () => {
                it('redirects the user to the login page using the basic deep-link url', () => {
                    const mockWindow = { location: { assign: jest.fn() } };
                    const component = mount(
                        <BrowserContext.Provider value={{ _window: mockWindow }}>
                            <UserSessionActivity
                                oauthBaseUrl={oauthBaseUrl}
                                heartbeatResponse={jest.fn()}
                                isLoggedIn={false}
                            >
                                <p>meow meow</p>
                            </UserSessionActivity>
                        </BrowserContext.Provider>
                    );
                    const okButton = component.find(ButtonInput).find({ children: Messages.Ok }).last();
                    okButton.simulate('click');
                    expect(mockWindow.location.assign).toBeCalledWith(`${oauthBaseUrl}${SessionLinks.StoreDesign}`);
                });
            });

            describe('when the theme variation has changed', () => {
                it('redirects the user to the login page using deep-link with query params', () => {
                    const mockWindow = { location: { assign: jest.fn() } };
                    const variationId = '1234-5678-0000-abcd';
                    const queryParams = `?variationId=${variationId}`;

                    const component = mount(
                        <BrowserContext.Provider value={{ _window: mockWindow }}>
                            <UserSessionActivity
                                oauthBaseUrl={oauthBaseUrl}
                                heartbeatResponse={jest.fn()}
                                isLoggedIn={false}
                                queryParams={queryParams}
                            >
                                <p>meow meows</p>
                            </UserSessionActivity>
                        </BrowserContext.Provider>
                    );

                    const okButton = component.find(ButtonInput).find({ children: Messages.Ok }).last();
                    okButton.simulate('click');
                    expect(mockWindow.location.assign).toBeCalledWith(
                        `${oauthBaseUrl}${SessionLinks.StoreDesign}${queryParams}`
                    );
                });
            });
        });
    });
});
