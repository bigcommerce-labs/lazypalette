import { mount, shallow } from 'enzyme';
import React from 'react';

import ButtonInput from '../ButtonInput/ButtonInput';

import BrowserContext from '../../context/BrowserContext';

import { Messages } from './constants';
import { UserSessionActivity } from './UserSessionActivity';

jest.mock('../../services/sessionHeartbeat');

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
            it('redirects the user to the login page using the deep-link url', () => {
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
                expect(mockWindow.location.assign).toBeCalledWith(`${oauthBaseUrl}/deep-links/store-design`);
            });
        });
    });
});
