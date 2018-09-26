import { mount, shallow } from 'enzyme';
import React from 'react';

import ButtonInput from '../../ButtonInput/ButtonInput';

import { Messages } from '../constants';
import { ModalBody } from '../styles';

import ConfirmModal from './ConfirmModal';

describe('ConfirmModal', () => {
    const mockHandler = jest.fn();
    const mockBody = 'This theme will self-destruct in T-minus';
    const mockTitle = 'Please Confirm:';

    it('renders', () => {
        const confirmModal = shallow(
            <ConfirmModal
                title={mockTitle}
                primaryAction={mockHandler}
                secondaryAction={mockHandler}
            />
        );

        expect(confirmModal).toMatchSnapshot();
    });

    describe('children prop', () => {
        it('should render ConfirmBody when children passed', () => {
            const modal = shallow(
                <ConfirmModal
                    title={mockTitle}
                    primaryAction={mockHandler}
                    secondaryAction={mockHandler}
                >
                    {mockBody}
                </ConfirmModal>
            );

            expect(modal.find(ModalBody).prop('children')).toEqual(mockBody);
        });
    });

    describe('cancel button', () => {
        describe('when the user clicks the cancel button', () => {
            it('should call the handler', () => {
                const mockSecondaryAction = jest.fn();

                const modal = mount(
                    <ConfirmModal
                        title={mockTitle}
                        primaryAction={mockHandler}
                        secondaryAction={mockSecondaryAction}
                    />
                );

                const cancelButton = modal.find(ButtonInput).find({ children: Messages.Cancel }).last();
                cancelButton.simulate('click');
                expect(mockSecondaryAction).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('ok button', () => {
        describe('when the user clicks the ok button', () => {
            it('should call the handler', () => {
                const mockPrimaryAction = jest.fn();

                const modal = mount(
                    <ConfirmModal
                        title={mockTitle}
                        primaryAction={mockPrimaryAction}
                        secondaryAction={mockHandler}
                    />
                );

                const okButton = modal.find(ButtonInput).find({ children: Messages.Ok }).last();
                okButton.simulate('click');
                expect(mockPrimaryAction).toHaveBeenCalledTimes(1);
            });
        });
    });
});
