import { mount, shallow } from 'enzyme';
import React from 'react';

import {sel} from '../../utils/testUtil';

import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';

import { PubShareBox } from './PubShareBox';

describe('PubShareBox', () => {

    const undoChangesButton = sel('undo-changes');

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

    const pubShareBoxElement = <PubShareBox
        isChanged={false}
        isCurrent={true}
        isPrelaunchStore={false}
        isPurchased={true}
        price={0}
        configurationId="123"
        variationHistory={mockVariationHistory}
        variationId="234"
        variations={mockVariations}
        onPublish={mockHandler}
        onReset={mockHandler}
        onSave={mockHandler}
    />;

    const pubBoxShallow = shallow(pubShareBoxElement);

    it('renders', () => {
        expect(pubBoxShallow).toMatchSnapshot();
    });

    const pubBoxMount = mount(pubShareBoxElement);

    describe('isPurchased', () => {
        describe('when isPurchased is true', () => {
            describe('when isCurrent is true', () => {
                pubBoxMount.setProps({isPurchased: true});
                pubBoxMount.setProps({isCurrent: true});

                it('should render ActiveAction', () => {
                    expect(pubBoxMount.find('ActiveAction').length).toBe(1);
                });
                it('should not render InActiveAction', () => {
                    expect(pubBoxMount.find('InActiveAction').length).toBe(0);
                });
            });
        });

        describe('when isPurchased is false', () => {
            describe('when price is undefined', () => {
                it('should not render PreviewAction', () => {
                    pubBoxMount.setProps({isPurchased: false, price: undefined});
                    expect(pubBoxMount.find('PreviewAction').length).toBe(0);
                });
            });

            describe('when price is >= 0', () => {
                it('should render PreviewAction', () => {
                    pubBoxMount.setProps({isPurchased: false, price: 100});
                    expect(pubBoxMount.find('PreviewAction').length).toBe(1);
                });
            });
        });

        describe('isChange', () => {
            describe('is true', () => {
                it('should display "Undo changes" button', () => {
                    pubBoxMount.setProps({isChanged: true});
                    expect(pubBoxMount.find(undoChangesButton).hostNodes().length).toBe(1);
                });

                describe('when "Undo changes" button is clicked', () => {
                    it('opens ConfirmModal', () => {
                        pubBoxMount.find(undoChangesButton).hostNodes().simulate('click');
                        expect(pubBoxMount.find(ConfirmModal).length).toBe(1);
                    });
                });
            });
            describe('is false', () => {
                it('should not display "Undo changes" button', () => {
                    pubBoxMount.setProps({isChanged: false});
                    expect(pubBoxMount.find(undoChangesButton).hostNodes().length).toBe(0);
                });
            });
        });
    });
});
