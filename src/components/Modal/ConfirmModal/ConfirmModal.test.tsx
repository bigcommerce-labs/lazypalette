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
                body={mockBody}
                title={mockTitle}
                primaryAction={mockHandler}
                secondaryAction={mockHandler}
            />
        );

        expect(confirmModal).toMatchSnapshot();
    });

    describe('body prop', () => {
        it('should render ConfirmBody when body prop passed', () => {
            const modal = shallow(
                <ConfirmModal
                    body={mockBody}
                    title={mockTitle}
                    primaryAction={mockHandler}
                    secondaryAction={mockHandler}
                />
            );

            expect(modal.find(ModalBody).prop('children')).toEqual(mockBody);
        });

        it('should not render ConfirmBody when body prop not set', () => {
            const modal = shallow(
                <ConfirmModal
                    body={undefined}
                    title={mockTitle}
                    primaryAction={mockHandler}
                    secondaryAction={mockHandler}
                />
            );

            expect(modal.find(ModalBody).exists()).toEqual(false);
        });
    });

    describe('cancel button', () => {
        describe('when the user clicks the cancel button', () => {
            it('should call the handler', () => {
                const mockPrimaryAction = jest.fn();

                const modal = mount(
                    <ConfirmModal
                        body={mockBody}
                        title={mockTitle}
                        primaryAction={mockPrimaryAction}
                        secondaryAction={mockHandler}
                    />
                );

                const cancelButton = modal.find(ButtonInput).find({ children: Messages.Cancel }).last();
                cancelButton.simulate('click');
                expect(mockPrimaryAction).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('ok button', () => {
        describe('when the user clicks the ok button', () => {
            it('should call the handler', () => {
                const mockSecondaryAction = jest.fn();

                const modal = mount(
                    <ConfirmModal
                        body={mockBody}
                        title={mockTitle}
                        primaryAction={mockHandler}
                        secondaryAction={mockSecondaryAction}
                    />
                );

                const okButton = modal.find(ButtonInput).find({ children: Messages.Ok }).last();
                okButton.simulate('click');
                expect(mockSecondaryAction).toHaveBeenCalledTimes(1);
            });
        });
    });
});
