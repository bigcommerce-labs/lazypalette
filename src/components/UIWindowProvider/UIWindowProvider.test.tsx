import { shallow } from 'enzyme';
import React from 'react';

import { UIWindowTypes } from '../../actions/uiWindow';

import { UIWindowProvider } from './UIWindowProvider';

const initialWindows = [
    {
        content: {
            position: { x: 15, y: 20 },
        },
        id: '1235',
        type: UIWindowTypes.COLOR_PICKER,
    },
    {
        content: {
            position: { x: 45, y: 70 },
        },
        id: '9876',
        type: UIWindowTypes.COLOR_PICKER,
    },
];

const mockCloseWindow = jest.fn();

describe('UIWindowProvider', () => {
    describe('when given some windows to render', () => {
        it('renders correctly', () => {
            const provider = shallow(<UIWindowProvider uiWindows={initialWindows} closeUIWindow={mockCloseWindow}>
                <p>blah</p>
            </UIWindowProvider>);

            expect(provider).toMatchSnapshot();
        });
    });

    describe('when a window fires a close event', () => {
        it('calls its onClose prop', () => {
            const provider = shallow(<UIWindowProvider uiWindows={initialWindows} closeUIWindow={mockCloseWindow}>
                <p>blah</p>
            </UIWindowProvider>);

            const uiWindow = provider.find('UIWindow').first();
            uiWindow.simulate('close');
            expect(mockCloseWindow).toHaveBeenCalled();
        });
    });
});
