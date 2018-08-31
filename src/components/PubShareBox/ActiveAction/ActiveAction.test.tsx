import { mount, shallow } from 'enzyme';
import React from 'react';

import { sel } from '../../../utils/testUtil';

import ActiveAction from './ActiveAction';

describe('ActiveAction', () => {

    const mockHandleSave = jest.fn(() => {
        activeActionMount.setProps({canSave: false});
    });
    const mockHandlePublish = jest.fn(() => {
        activeActionMount.setProps({canPublish: false});
    });

    const saveButton = sel('save');
    const publishButton = sel('publish');

    const activeActionShallow = shallow(<ActiveAction
        isPrelaunchStore={false}
        canPublish={false}
        canSave={false}
        handleSave={mockHandleSave}
        handlePublish={mockHandlePublish}
    />);

    const activeActionMount = mount(<ActiveAction
        isPrelaunchStore={false}
        canPublish={false}
        canSave={false}
        handleSave={mockHandleSave}
        handlePublish={mockHandlePublish}
    />);

    it('should render', () => {
        expect(activeActionShallow).toMatchSnapshot();
    });

    describe('when isPrelaunchStore is true', () => {
        it('should have only save button', () => {
            activeActionMount.setProps({isPrelaunchStore: true});
            expect(activeActionMount.find(saveButton).hostNodes()).toHaveLength(1);
        });
    });

    describe('when isPrelaunchStore is false', () => {
        it('should have both save and publish button', () => {
            activeActionMount.setProps({isPrelaunchStore: false});
            expect(activeActionMount.find(saveButton).hostNodes()).toHaveLength(1);
            expect(activeActionMount.find(publishButton).hostNodes()).toHaveLength(1);
        });
    });

    describe('save action', () => {
        it('should be enabled if canSave is true', () => {
            activeActionMount.setProps({canSave: true});
            expect(activeActionMount.find(saveButton).hostNodes().props().disabled).toBe(false);
        });

        it('should be disabled if canSave is false', () => {
            activeActionMount.setProps({canSave: false});
            expect(activeActionMount.find(saveButton).hostNodes().props().disabled).toBe(true);
        });

        describe('when canSave is true and save is clicked', () => {
            it('should call handleSave', () => {
                activeActionMount.setProps({canSave: true});
                activeActionMount.find(saveButton).hostNodes().simulate('click');
                expect(mockHandleSave).toHaveBeenCalledTimes(1);
            });
            it('should disable save button after', () => {
                expect(activeActionMount.find(saveButton).hostNodes().props().disabled).toBe(true);
            });
        });
    });

    describe('publish action', () => {
        it('should be enabled if canPublish is true', () => {
            activeActionMount.setProps({canPublish: true});
            expect(activeActionMount.find(publishButton).hostNodes().props().disabled).toBe(false);
        });

        it('should be disabled if canPublish is false', () => {
            activeActionMount.setProps({canPublish: false});
            expect(activeActionMount.find(publishButton).hostNodes().props().disabled).toBe(true);
        });

        describe('when canPublish is true and publish is clicked', () => {
            it('should call handlePublish', () => {
                activeActionMount.setProps({canPublish: true});
                activeActionMount.find(publishButton).hostNodes().simulate('click');
                expect(mockHandlePublish).toHaveBeenCalledTimes(1);
            });
            it('should disable publish button after', () => {
                expect(activeActionMount.find(publishButton).hostNodes().props().disabled).toBe(true);
            });
        });
    });
});
