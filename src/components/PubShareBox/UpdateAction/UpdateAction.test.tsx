import { mount, shallow } from 'enzyme';
import React from 'react';

import { sel } from '../../../utils/testUtil';

import UpdateAction from './UpdateAction';

describe('UpdateAction', () => {

    const applyUpdateButton = sel('apply-update');

    const mockHandlePublish = jest.fn();

    const UpdateActionElement = <UpdateAction
        handlePublish={mockHandlePublish}
    />;

    it('renders', () => {
        const inactiveAction = shallow(UpdateActionElement);

        expect(inactiveAction).toMatchSnapshot();
    });

    it('should render "Apply Update" button', () => {
        const inactiveAction = mount(UpdateActionElement);

        expect(inactiveAction.find(applyUpdateButton).hostNodes().length).toBe(1);
    });
});
