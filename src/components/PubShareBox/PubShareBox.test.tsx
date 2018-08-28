import { mount, shallow } from 'enzyme';
import React from 'react';

import ButtonInput from '../ButtonInput/ButtonInput';
import ConfirmModal from '../Modal/ConfirmModal';

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

    const mockVariationHistory = [
        {
            configurationId: '123',
            displayVersion: '2.3.2-rc.1',
            downloadProcessed: false,
            downloadable: true,
            installable: true,
            revisionId: 'e61f1460-8c45-0136-d583-0242ac110010',
            themeId: '0c33c3c0-885b-0136-0e49-0242ac110013',
            themeName: 'Cornerstone (2)',
            timestamp: '2018-08-27T16:40:58Z',
            type: 'saved',
            variationId: '0c7b7230-885b-0136-0e49-0242ac110013',
            variationName: 'Bold',
            versionId: '0c5a3140-885b-0136-0e49-0242ac110013',
        },
        {
            configurationId: '111',
            displayVersion: '222',
            downloadProcessed: false,
            downloadable: true,
            installable: true,
            revisionId: '333',
            themeId: '444',
            themeName: '555',
            timestamp: '2018-08-27T16:40:58Z',
            type: 'published',
            variationId: '666',
            variationName: 'Bold',
            versionId: '777',
        },
    ];
    const mockHandler = jest.fn();

    it('renders', () => {
        const pubBox = shallow(
            <PubShareBox
                isChanged={false}
                configurationId="123"
                variationHistory={mockVariationHistory}
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
                        configurationId="123"
                        variationHistory={mockVariationHistory}
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

            it('should disable save button after', () => {
                const mockHandleSave = jest.fn();
                const pubBox = shallow(
                    <PubShareBox
                        isChanged={true}
                        configurationId="123"
                        variationHistory={mockVariationHistory}
                        variations={mockVariations}
                        onPublish={mockHandler}
                        onReset={mockHandler}
                        onSave={mockHandleSave}
                    />
                );

                const saveButton = pubBox.find(ButtonInput).find({ children: 'Save' });
                saveButton.simulate('click');
                expect(saveButton.props().disabled).toEqual(true);
            });
        });
    });

    describe('reset button', () => {
        describe('when the user has made theme changes', () => {
            const mockResetTheme = jest.fn();

            const pubBox = shallow(
                <PubShareBox
                    isChanged={true}
                    configurationId="123"
                    variationHistory={mockVariationHistory}
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

            const pubBox = mount(
                <PubShareBox
                    isChanged={false}
                    configurationId="123"
                    variationHistory={mockVariationHistory}
                    variations={mockVariations}
                    onPublish={mockHandlePublish}
                    onReset={mockHandler}
                    onSave={mockHandler}
                />
            );

            it('should not be disabled', done => {
                pubBox.setState({
                    canSave: false,
                    disabled: false,
                    isResetOpen: false,
                });
                const child = pubBox.find(ButtonInput).get(1);
                setTimeout(() => {
                    expect(child.props.disabled).toEqual(false);
                }, 0);
                done();
            });
        });

        describe('when the user clicks the publish button', () => {
            it('should call the handler', () => {
                const mockHandlePublish = jest.fn();

                const pubBox = shallow(
                    <PubShareBox
                        isChanged={true}
                        configurationId="123"
                        variationHistory={mockVariationHistory}
                        variations={mockVariations}
                        onPublish={mockHandlePublish}
                        onReset={mockHandler}
                        onSave={mockHandler}
                    />
                );

                const publishButton = pubBox.find(ButtonInput).find({ children: 'Publish' });

                publishButton.simulate('click');
                expect(mockHandlePublish).toHaveBeenCalledTimes(1);
            });

            it('should disable publish button after click', () => {
                const mockHandlePublish = jest.fn();

                const pubBox = shallow(
                    <PubShareBox
                        isChanged={true}
                        configurationId="123"
                        variationHistory={mockVariationHistory}
                        variations={mockVariations}
                        onPublish={mockHandlePublish}
                        onReset={mockHandler}
                        onSave={mockHandler}
                    />
                );

                const publishButton = pubBox.find(ButtonInput).find({ children: 'Publish' });
                publishButton.simulate('click');
                expect(publishButton.props().disabled).toEqual(true);
            });
        });
    });
});
