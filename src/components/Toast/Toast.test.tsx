import { shallow } from 'enzyme';
import React from 'react';

import { ToastMessages, ToastType } from '../../actions/constants';

import { CloseIcon } from './styles';
import Toast from './Toast';

describe('Toast', () => {
    const mockOnClose = jest.fn();

    it('renders', () => {
        const toast = shallow(
            <Toast
                autoDismiss
                children={ToastMessages.SaveTheme}
                onClose={mockOnClose}
                type={ToastType.Success}
            />
        );

        expect(toast).toMatchSnapshot();
    });

    describe('close toast button', () => {
        const toast = shallow(
            <Toast
                autoDismiss
                children={ToastMessages.SaveTheme}
                onClose={mockOnClose}
                type={ToastType.Success}
            />
        );

        it('should call onClose prop when clicked', () => {
            const closeButton = toast.find(CloseIcon);

            closeButton.simulate('click');
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
    });
});
