import { shallow } from 'enzyme';
import React from 'react';

import ButtonInput from '../ButtonInput/ButtonInput';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';

import { PubShareBox } from './PubShareBox';

describe('PubShareBox', () => {
    const mockVariations = [
        {
            configurationId: '123',
            defaultConfigurationId: '234',
            id: '567',
            isCurrent: true,
            lastCommitId: '',
            screenshot: {
                largePreview: 'host://meows/123.jpg',
                largeThumb: 'host://meows/234.jpg',
                smallThumb: 'host://meows/345.jpg',
            },
            themeId: '8900',
            variationName: 'light',
        },
    ];
    const mockHandler = jest.fn();

    it('renders', () => {
        const pubBox = shallow(
            <PubShareBox
                isChanged={false}
                variations={mockVariations}
                onPublish={mockHandler}
                onReset={mockHandler}
                onSave={mockHandler}
            />
        );

        expect(pubBox).toMatchSnapshot();
    });

    describe('save button', () => {
        describe('when the user clicks the save button', () => {
            it('should call the handler', () => {
                const mockHandleSave = jest.fn();

                const pubBox = shallow(
                    <PubShareBox
                        isChanged={true}
                        variations={mockVariations}
                        onPublish={mockHandler}
                        onReset={mockHandler}
                        onSave={mockHandleSave}
                    />
                );

                const saveButton = pubBox.find(ButtonInput).find({ children: 'Save' });

                saveButton.simulate('click');
                expect(mockHandleSave).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('reset button', () => {
        describe('when the user has made theme changes', () => {
            const mockResetTheme = jest.fn();

            const pubBox = shallow(
                <PubShareBox
                    isChanged={true}
                    variations={mockVariations}
                    onPublish={mockHandler}
                    onReset={mockResetTheme}
                    onSave={mockHandler}
                />
            );

            const resetButton = pubBox.find(ButtonInput).find({ children: 'Undo Changes' });

            it('should be displayed', () => {
                expect(resetButton.length).toEqual(1);
            });

            describe('when the user clicks the reset button', () => {
                it('should open the confirmModal', () => {
                    resetButton.simulate('click');
                    expect(pubBox.state().isResetOpen).toEqual(true);

                    const confirmModel = pubBox.find(ConfirmModal);
                    expect(confirmModel.length).toEqual(1);
                });
            });
        });
    });

    describe('publish button', () => {
        describe('when the theme changes can be published', () => {
            const mockHandlePublish = jest.fn();

            const pubBox = shallow(
                <PubShareBox
                    isChanged={true}
                    variations={mockVariations}
                    onPublish={mockHandlePublish}
                    onReset={mockHandler}
                    onSave={mockHandler}
                />
            );

            it('should not be disabled', () => {
                pubBox.setState({ canPublish: true });
                const publishButton = pubBox.find(ButtonInput).find({ children: 'Publish' });
                expect(publishButton.props().disabled).toEqual(false);
            });

            describe('when the user clicks the publish button', () => {
                it('should call the handler', () => {
                    const publishButton = pubBox.find(ButtonInput).find({ children: 'Publish' });

                    publishButton.simulate('click');
                    expect(mockHandlePublish).toHaveBeenCalledTimes(1);
                });
            });
        });
    });
});
