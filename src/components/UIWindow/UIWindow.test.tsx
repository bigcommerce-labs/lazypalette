import { mount, shallow } from 'enzyme';
import React from 'react';

import UIWindow from './UIWindow';

const mockCloseWindow = jest.fn();
const addEventListener = jest.fn();
const removeEventListener = jest.fn();

document.addEventListener = addEventListener;
document.removeEventListener = removeEventListener;

describe('UIWindow', () => {
    beforeEach(() => {
        mockCloseWindow.mockReset();
        addEventListener.mockReset(); //tslint:disable-line
        removeEventListener.mockReset(); //tslint:disable-line
    });

    describe('when given a window', () => {
        it('renders correctly', () => {
            const uiWindow = shallow(<UIWindow
                id="1234"
                position={{ x: 5, y: 10}}
                title="hello"
                topmost={true}
                onClose={mockCloseWindow}>
                <p>blah</p>
            </UIWindow>);

            expect(uiWindow).toMatchSnapshot();
        });
    });

    describe('when mounting', () => {
        it('adds an event listener', () => {
            shallow(<UIWindow
                id="1234"
                position={{ x: 5, y: 10}}
                title="hello"
                topmost={true}
                onClose={mockCloseWindow}>
                <p>blah</p>
            </UIWindow>);

            expect(addEventListener).toHaveBeenCalled();
            expect(removeEventListener).not.toHaveBeenCalled();
        });
    });

    describe('when unmounting', () => {
        it('removes an event listener', () => {
            const uiWindow = shallow(<UIWindow
                id="1234"
                position={{ x: 5, y: 10}}
                title="hello"
                topmost={true}
                onClose={mockCloseWindow}>
                <p>blah</p>
            </UIWindow>);

            removeEventListener.mockReset();
            addEventListener.mockReset();
            uiWindow.unmount();
            expect(removeEventListener).toHaveBeenCalled();
            expect(addEventListener).not.toHaveBeenCalled();
        });
    });

    describe('when a click occurs', () => {
        describe('when the window is topmost', () => {
            let uiWindow: any;

            beforeEach(() => {
                uiWindow = mount(<UIWindow
                    id="1234"
                    position={{ x: 5, y: 10 }}
                    title="hello"
                    topmost={true}
                    onClose={mockCloseWindow}>
                    <p id="blah">blah</p>
                </UIWindow>);
            });

            describe('inside the modal', () => {
                it('does not call the onClose prop', () => {
                    const paragraph = uiWindow.find('#blah').first().getDOMNode();
                    uiWindow.instance().handleDocumentClick({ target: paragraph });

                    expect(mockCloseWindow).not.toHaveBeenCalled();
                });
            });

            describe('outside the modal', () => {
                it('does call the onClose prop', () => {
                    const paragraph = mount(<p>blah</p>).first().getDOMNode();
                    uiWindow.instance().handleDocumentClick({ target: paragraph, button: 0 });

                    expect(mockCloseWindow).toHaveBeenCalledWith('1234');
                });

            });
        });

        describe('when the window is not topmost', () => {
            let uiWindow: any;

            beforeEach(() => {
                uiWindow = mount(<UIWindow
                    id="1234"
                    position={{ x: 5, y: 10 }}
                    title="hello"
                    topmost={false}
                    onClose={mockCloseWindow}>
                    <p id="blah">blah</p>
                </UIWindow>);
            });

            describe('outside the modal', () => {
                it('does not call the onClose prop', () => {
                    const paragraph = mount(<p>blah</p>).first().getDOMNode();
                    uiWindow.instance().handleDocumentClick({ target: paragraph });

                    expect(mockCloseWindow).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe('when dragging', () => {
        let uiWindow: any;

        beforeEach(() => {
            uiWindow = mount(<UIWindow
                id="1234"
                position={{ x: 5, y: 10 }}
                title="hello"
                topmost={false}
                onClose={mockCloseWindow}>
                <p id="blah">blah</p>
            </UIWindow>);
        });

        describe('when a mousedown occurs on the header', () => {
            describe('when the left button was pressed', () => {
                it('begins dragging', () => {
                    const header = uiWindow.find('Header');
                    header.simulate('mousedown', { button: 0, pageX: 50, pageY: 50 });

                    expect(uiWindow.state().dragging).toEqual(true);
                    expect(uiWindow.state().dragStartPos).toEqual({ x: 45, y: 40 });
                });
            });

            describe('when another button was pressed', () => {
                it('does nothing', () => {
                    const header = uiWindow.find('Header');
                    header.simulate('mousedown', { button: 1 }); // right click

                    expect(uiWindow.state().dragging).toEqual(false);
                });
            });
        });

        describe('when a mousemove occurs', () => {
            describe('when currently dragging', () => {
                it('updates position correctly', done => {
                    uiWindow.setState({
                        dragStartPos: { x: 10, y: 10 },
                        dragging: true,
                    }, () => {
                        const event = { pageX: 100, pageY: 50, stopPropagation: jest.fn(), preventDefault: jest.fn() };
                        uiWindow.instance().drag(event);

                        expect(event.stopPropagation).toHaveBeenCalled();
                        expect(event.preventDefault).toHaveBeenCalled();

                        setTimeout(() => {
                            expect(uiWindow.state().position).toEqual({ x: 90, y: 40 });
                            done();
                        });
                    });
                });
            });

            describe('when not dragging', () => {
                it('does not update position', done => {
                    uiWindow.setState({
                        dragStartPos: { x: 10, y: 10 },
                        dragging: false,
                    }, () => {

                        const event = { pageX: 100, pageY: 50, stopPropagation: jest.fn(), preventDefault: jest.fn() };
                        uiWindow.instance().drag(event);

                        expect(event.stopPropagation).not.toHaveBeenCalled();
                        expect(event.preventDefault).not.toHaveBeenCalled();

                        // to allow uiWindow to perform an async state update.
                        setTimeout(() => {
                            expect(uiWindow.state().position).toEqual({ x: 5, y: 10 });
                            done();
                        });
                    });
                });
            });
        });

        describe('when a mouseup occurs', () => {
            describe('when dragging', () => {
                it('ends the dragging state', done => {
                    uiWindow.setState({
                        dragging: true,
                    }, () => {

                        const event = { pageX: 100, pageY: 50, stopPropagation: jest.fn(), preventDefault: jest.fn() };
                        uiWindow.instance().stopDrag(event);

                        expect(event.stopPropagation).toHaveBeenCalled();
                        expect(event.preventDefault).toHaveBeenCalled();

                        setTimeout(() => {
                            expect(uiWindow.state().dragging).toEqual(false);
                            done();
                        });
                    });
                });
            });
        });
    });
});
