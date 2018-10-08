import { mount, shallow } from 'enzyme';
import React from 'react';

import { Container, ModalBox } from './styles';
import Modal from './Modal';

describe('Modal', () => {
    it('renders', () => {
        const mockHandler = jest.fn();

        const TestChildren = () => (
            <div>some inner content</div>
        );

        const modal = shallow(
            <Modal
                isTransparent={false}
                title="Test Modal"
                onClose={mockHandler}
            >
                <TestChildren />
            </Modal>
        );

        expect(modal).toMatchSnapshot();
    });

    describe('Container', () => {
        describe('onClose', () => {
            it('should clear the modal when Container clicked', () => {
                const mockHandler = jest.fn();

                const TestChildren = () => (
                    <div>some inner content</div>
                );

                const modal = shallow(
                    <Modal
                        isTransparent={false}
                        title="Test Modal"
                        overlayClose={mockHandler}
                    >
                        <TestChildren />
                    </Modal>
                );

                const container = modal.find(Container);
                const event = {
                    target: {
                        value: 'testing',
                    },
                };

                container.simulate('click', event);
                expect(mockHandler).toHaveBeenCalledTimes(1);
            });

            it('should not trigger when modalBox clicked', () => {
                const mockHandler = jest.fn();

                const TestChildren = () => (
                    <div>some inner content</div>
                );

                const modal = mount(
                    <Modal
                        isTransparent={false}
                        title="Test Modal"
                        onClose={mockHandler}
                    >
                        <TestChildren />
                    </Modal>
                );

                const modalBox = modal.find(ModalBox);
                const event = {
                    target: {
                        value: 'testing',
                    },
                };

                modalBox.simulate('click', event);
                expect(mockHandler).not.toHaveBeenCalled();
            });
        });
    });

    describe('title prop', () => {
        const mockHandler = jest.fn();
        const TestChildren = () => (
            <div>some inner content</div>
        );

        it('should render Header with close button when onClose is set', () => {
            const title = 'Test Modal';
            const modal = shallow(
                <Modal
                    title={title}
                    onClose={mockHandler}
                >
                    <TestChildren />
                </Modal>
            );

            expect(modal).toMatchSnapshot();
        });

        it('should not render Header without close button when onClose is not set', () => {
            const title = undefined;

            const modal = shallow(
                <Modal
                    title={title}
                >
                    <TestChildren />
                </Modal>
            );

            expect(modal).toMatchSnapshot();
        });
    });
});
