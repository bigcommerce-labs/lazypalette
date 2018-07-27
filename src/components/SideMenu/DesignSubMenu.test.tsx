import { shallow } from 'enzyme';
import React from 'react';

import ButtonInput from '../ButtonInput/ButtonInput';
import ConfirmModal from '../Modal/ConfirmModal';

import DesignSubMenu from './DesignSubMenu';

describe('DesignSubMenu', () => {
    it('renders', () => {
        const mockHandleSave = jest.fn();
        const mockResetTheme = jest.fn();

        const menu = shallow(
            <DesignSubMenu
                sections={['fred', 'joe']}
                isChanged={false}
                currentPath="/design/logo"
                handleSave={mockHandleSave}
                resetTheme={mockResetTheme}
            />
        );

        expect(menu).toMatchSnapshot();
    });

    describe('save button', () => {
        describe('when the user clicks the save button', () => {
            it('should call the handler', () => {
                const mockHandleSave = jest.fn();
                const mockHandler = jest.fn();

                const menu = shallow(
                    <DesignSubMenu
                        sections={['fred', 'joe']}
                        isChanged={true} // theme has unsaved changes
                        currentPath="/design/logo"
                        handleSave={mockHandleSave}
                        resetTheme={mockHandler}
                    />
                );

                const saveButton = menu.find(ButtonInput).at(0);

                saveButton.simulate('click');
                expect(mockHandleSave).toHaveBeenCalledTimes(1);

            });
        });
    });

    describe('reset button', () => {
        describe('when the user has made theme changes', () => {
            const mockHandler = jest.fn();
            const mockResetTheme = jest.fn();

            const menu = shallow(
                <DesignSubMenu
                    sections={['fred', 'joe']}
                    isChanged={true} // theme has unsaved changes
                    currentPath="/design/logo"
                    handleSave={mockHandler}
                    resetTheme={mockResetTheme}
                />
            );

            const resetButton = menu.find(ButtonInput).at(1);

            it('should not be disabled', () => {
                expect(resetButton.props().disabled).toEqual(false);
            });

            describe('when the user clicks the reset button', () => {
                it('should open the confirmModal', () => {
                    resetButton.simulate('click');
                    expect(menu.state().isResetOpen).toEqual(true);

                    const confirmModel = menu.find(ConfirmModal);
                    expect(confirmModel.length).toEqual(1);
                });
            });
        });
    });
});
