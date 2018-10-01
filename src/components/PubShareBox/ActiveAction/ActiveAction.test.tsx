import { mount, shallow } from 'enzyme';
import React from 'react';

import { sel } from '../../../utils/testUtil';

import ActiveAction from './ActiveAction';

describe('ActiveAction', () => {

    const mockHandleSave = jest.fn();
    const mockHandlePublish = jest.fn();

    const saveButton = sel('save');
    const publishButton = sel('publish');

    const activeActionShallow = shallow(<ActiveAction
        isPrelaunchStore={false}
        loading={false}
        handleSave={mockHandleSave}
        handlePublish={mockHandlePublish}
    />);

    const activeActionMount = mount(<ActiveAction
        isPrelaunchStore={false}
        loading={false}
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
        it('should be enabled if loading is false', () => {
            activeActionMount.setProps({loading: false});
            expect(activeActionMount.find(saveButton).hostNodes().props().disabled).toBe(false);
        });

        it('should be disabled if loading is true', () => {
            activeActionMount.setProps({loading: true});
            expect(activeActionMount.find(saveButton).hostNodes().props().disabled).toBe(true);
        });

        describe('when save button is clicked', () => {
            it('should call handleSave', () => {
                activeActionMount.setProps({loading: false});
                activeActionMount.find(saveButton).hostNodes().simulate('click');
                expect(mockHandleSave).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('publish action', () => {
        it('should be enabled if loading is false', () => {
            activeActionMount.setProps({loading: false});
            expect(activeActionMount.find(publishButton).hostNodes().props().disabled).toBe(false);
        });

        it('should be disabled if loading is true', () => {
            activeActionMount.setProps({loading: true});
            expect(activeActionMount.find(publishButton).hostNodes().props().disabled).toBe(true);
        });

        describe('when canPublish is true and publish is clicked', () => {
            it('should call handlePublish', () => {
                activeActionMount.setProps({loading: false});
                activeActionMount.find(publishButton).hostNodes().simulate('click');
                expect(mockHandlePublish).toHaveBeenCalledTimes(1);
            });
        });
    });
});
