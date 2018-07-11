import { shallow } from 'enzyme';
import React from 'react';

import { UserSessionActivity } from './UserSessionActivity';

jest.mock('../../services/sessionHeartbeat');

describe('UserSessionActivity', () => {
    const oauthBaseUrl = 'https://login.service.bcdev';

    it('renders consistently', () => {
        const mockCallBack = jest.fn();
        const component = shallow(
            <UserSessionActivity oauthBaseUrl={oauthBaseUrl} heartbeatResponse={mockCallBack}>
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
                    <UserSessionActivity oauthBaseUrl={oauthBaseUrl} heartbeatResponse={mockHandler}>
                        <p>meow meow</p>
                    </UserSessionActivity>
                );

                const div = component.find('div');
                div.simulate('click');
                expect(mockHandler.mock.calls.length).toEqual(1);
            });
        });
    });
});
