import { mount, shallow } from 'enzyme';
import { Button } from 'pattern-lab';
import React from 'react';

import { Messages } from '../constants';
import { ModalBody } from '../styles';

import AlertModal from './AlertModal';

describe('AlertModal', () => {
    const mockHandler = jest.fn();
    const mockBody = 'You have been automatically logged out due to $REASONS';
    const mockTitle = 'Alert!';

    it('renders', () => {
        const alertModal = shallow(
            <AlertModal
                body={mockBody}
                title={mockTitle}
                primaryAction={mockHandler}
            />
        );

        expect(alertModal).toMatchSnapshot();
    });

    describe('body prop', () => {
        it('should render body text when body prop passed', () => {
            const modal = shallow(
                <AlertModal
                    body={mockBody}
                    title={mockTitle}
                    primaryAction={mockHandler}
                />
            );

            expect(modal.find(ModalBody).prop('children')).toEqual(mockBody);
        });

        it('should not render body when body prop not set', () => {
            const modal = shallow(
                <AlertModal
                    body={undefined}
                    title={mockTitle}
                    primaryAction={mockHandler}
                />
            );

            expect(modal.find(ModalBody).exists()).toEqual(false);
        });
    });

    describe('ok button', () => {
        describe('when the user clicks the ok button', () => {
            it('should call the handler', () => {
                const modal = mount(
                    <AlertModal
                        body={mockBody}
                        title={mockTitle}
                        primaryAction={mockHandler}
                    />
                );

                const okButton = modal.find(Button).find({ children: Messages.Ok }).last();
                okButton.simulate('click');
                expect(mockHandler).toHaveBeenCalledTimes(1);
            });
        });
    });
});
