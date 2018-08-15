import { mount, shallow } from 'enzyme';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Container, Header, ModalBox, NavItem } from './styles';
import Modal from './Modal';

describe('Modal', () => {
    const theme = {
        colors: {
            background: '#f0f',
            empty: '#FFFFFF',
        },
        elevation: {
            raised: '0 1px 6px rgba(48, 53, 64, 0.2)',
        },
        layers: {
            high: '50',
        },
        typography: {
            fontWeight: {
                bold: '600',
            },
        },
    };

    it('renders', () => {
        const mockHandler = jest.fn();

        const TestChildren = () => (
            <div>some inner content</div>
        );

        const modal = shallow(
            <Modal
                backLink=""
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
            it('should clear the uiWindow when Container clicked', () => {
                const mockHandler = jest.fn();

                const TestChildren = () => (
                    <div>some inner content</div>
                );

                const modal = shallow(
                    <Modal
                        backLink=""
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
                    <ThemeProvider theme={theme}>
                        <Modal
                            backLink=""
                            isTransparent={false}
                            title="Test Modal"
                            onClose={mockHandler}
                        >
                            <TestChildren />
                        </Modal>
                    </ThemeProvider>
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

        it('should render Header styled-component when prop set', () => {
            const title = 'Test Modal';
            const modal = shallow(
                <Modal
                    title={title}
                    onClose={mockHandler}
                >
                    <TestChildren />
                </Modal>
            );

            expect(modal.find(Header).prop('children')).toEqual(title);
        });

        it('should not render Header when not set', () => {
            const title = undefined;

            const modal = shallow(
                <Modal
                    title={title}
                    onClose={mockHandler}
                >
                    <TestChildren />
                </Modal>
            );

            expect(modal.find(Header).exists()).toEqual(false);
        });
    });

    describe('backLink prop', () => {
        const mockHandler = jest.fn();
        const TestChildren = () => (
            <div>some inner content</div>
        );

        it('should render NavItem styled-component when prop set', () => {
            const backLink = '/design';
            const modal = shallow(
                <Modal
                    backLink={backLink}
                    onClose={mockHandler}
                >
                    <TestChildren />
                </Modal>
            );

            expect(modal.find(NavItem).prop('to')).toEqual(backLink);
        });

        it('should not render NavItem when not set', () => {
            const backLink = undefined;
            const modal = shallow(
                <Modal
                    backLink={backLink}
                    onClose={mockHandler}
                >
                    <TestChildren />
                </Modal>
            );

            expect(modal.find(NavItem).exists()).toEqual(false);
        });
    });
});
