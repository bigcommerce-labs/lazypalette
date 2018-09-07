import { mount, shallow } from 'enzyme';
import React from 'react';

import { sel } from '../../../utils/testUtil';

import InactiveAction from './InactiveAction';

describe('InactiveAction', () => {

    const publishButton = sel('publish');
    const useAsActiveButton = sel('use-as-active');

    const mockHandlePublish = jest.fn();
    const mockHandleSave = jest.fn();

    const InactiveActionElement = <InactiveAction
        canPublish={false}
        canSave={false}
        isPrelaunchStore={false}
        handlePublish={mockHandlePublish}
        handleSave={mockHandleSave}
    />;

    const inactiveActionShallow = shallow(InactiveActionElement);
    const inactiveActionMount = mount(InactiveActionElement);

    it('renders', () => {
        expect(inactiveActionShallow).toMatchSnapshot();
    });

    describe('when isPrelaunchStore is true', () => {
        it('should render "Use as Active" button', () => {
            inactiveActionMount.setProps({isPrelaunchStore: true});
            expect(inactiveActionMount.find(useAsActiveButton).hostNodes().length).toBe(1);
            expect(inactiveActionMount.find(publishButton).hostNodes().length).toBe(0);
        });
    });

    describe('when isPrelaunchStore is false', () => {
        it('should render Publish button', () => {
            inactiveActionMount.setProps({isPrelaunchStore: false});
            expect(inactiveActionMount.find(useAsActiveButton).hostNodes().length).toBe(0);
            expect(inactiveActionMount.find(publishButton).hostNodes().length).toBe(1);
        });
    });
});
