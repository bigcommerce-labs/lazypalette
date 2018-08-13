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
                    uiWindow.instance().handleClickOutside({ target: paragraph });

                    expect(mockCloseWindow).not.toHaveBeenCalled();
                });
            });

            describe('outside the modal', () => {
                it('does call the onClose prop', () => {
                    const paragraph = mount(<p>blah</p>).first().getDOMNode();
                    uiWindow.instance().handleClickOutside({ target: paragraph });

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
                    uiWindow.instance().handleClickOutside({ target: paragraph });

                    expect(mockCloseWindow).not.toHaveBeenCalled();
                });
            });
        });
    });
});
