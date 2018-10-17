import { mount, shallow } from 'enzyme';
import React from 'react';

import {sel} from '../../utils/testUtil';

import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';

import { PubShareBox } from './PubShareBox';

describe('PubShareBox', () => {

    const undoChangesButton = sel('undo-changes');

    const initialSettings = {
        'font-color': '#111111',
        'font-name': 'Arial',
    };
    const settings = {
        'font-color': '#111111',
        'font-name': 'Arial',
    };

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
        {
            configurationId: 'upgradeConfig',
            displayVersion: '555',
            downloadProcessed: false,
            downloadable: true,
            installable: true,
            revisionId: '34242',
            themeId: '444',
            themeName: '444',
            timestamp: '2018-09-27T16:40:58Z',
            type: 'upgrade',
            variationId: '888',
            variationName: 'Bold',
            versionId: '65436456',
        },
    ];
    const mockHandler = jest.fn();

    const pubShareBoxElement = <PubShareBox
        activeThemeId="activeTheme"
        initialConfigurationId="111"
        initialSettings={initialSettings}
        isChanged={false}
        isPrelaunchStore={false}
        isPurchased={true}
        price={0}
        configurationId="123"
        settings={settings}
        themeId="inactiveTheme"
        variationHistory={mockVariationHistory}
        variationId="234"
        variations={mockVariations}
        onPublish={mockHandler}
        onReset={mockHandler}
        onSave={mockHandler}
        onUpdate={mockHandler}
    />;

    describe('when rendering', () => {
        let pubBoxShallow: any;

        beforeEach(() => {
            pubBoxShallow = shallow(pubShareBoxElement);
        });

        describe('when this is a purchased theme', () => {
            beforeEach(() => {
                pubBoxShallow.setProps({ isPurchased: true });
            });

            describe('when this is the active theme', () => {
                beforeEach(() => {
                    pubBoxShallow.setProps({ themeId: 'activeTheme'});
                });

                describe('when this is a prelaunch store', () => {
                    beforeEach(() => {
                        pubBoxShallow.setProps({ isPrelaunchStore: true });
                    });

                    it('renders correctly', () => {
                        expect(pubBoxShallow).toMatchSnapshot();
                    });
                });

                describe('when this is not a prelaunch store', () => {
                    beforeEach(() => {
                        pubBoxShallow.setProps({ isPrelaunchStore: false });
                    });

                    it('renders correctly', () => {
                        expect(pubBoxShallow).toMatchSnapshot();
                    });
                });

            });

            describe('when this is not the active theme', () => {
                beforeEach(() => {
                    pubBoxShallow.setProps({ themeId: 'inactiveTheme' });
                });

                it('renders correctly', () => {
                    expect(pubBoxShallow).toMatchSnapshot();
                });
            });
        });

        describe('when the theme has not been purchased', () => {
            beforeEach(() => {
                pubBoxShallow.setProps({ isPurchased: false, price: 100 });
            });

            it('renders correctly', () => {
                expect(pubBoxShallow).toMatchSnapshot();
            });
        });
    });

    describe('isPurchased', () => {
        let pubBoxMount: any;

        beforeEach(() => {
            pubBoxMount = mount(pubShareBoxElement);
        });

        describe('when isPurchased is true', () => {
            describe('when isCurrent is true', () => {
                beforeEach(() => {
                    pubBoxMount.setProps({ isPurchased: true });
                    pubBoxMount.setProps({ themeId: 'activeTheme' });
                });

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
                    pubBoxMount.setProps({ isChanged: true });
                    expect(pubBoxMount.find(undoChangesButton).hostNodes().length).toBe(1);
                });

                describe('when "Undo changes" button is clicked', () => {
                    it('opens ConfirmModal', () => {
                        pubBoxMount.setProps({ isChanged: true });
                        pubBoxMount.find(undoChangesButton).hostNodes().simulate('click');
                        expect(pubBoxMount.find(ConfirmModal).length).toBe(1);
                    });

                    describe('when there is one change', () => {
                        it('has "Undo 1 Change" on the ConfirmModal button', () => {
                            pubBoxMount.setProps({ settings: {'font-color': '#222222'} });
                            pubBoxMount.setProps({ isChanged: true });
                            pubBoxMount.find(undoChangesButton).hostNodes().simulate('click');
                            expect(pubBoxMount.find(ConfirmModal).find(undoChangesButton).hostNodes().length).toBe(1);
                            expect(pubBoxMount
                                .find(ConfirmModal)
                                .find(undoChangesButton)
                                .hostNodes()
                                .text()
                            ).toBe('Undo 1 Change');
                        });
                    });

                    describe('when there is more than one change', () => {
                        it('has "Undo 2 Changes" on the ConfirmModal button', () => {
                            pubBoxMount.setProps({ settings: {
                                'font-color': '#222222',
                                'font-name': 'Times',
                            }});
                            pubBoxMount.setProps({ isChanged: true });
                            pubBoxMount.find(undoChangesButton).hostNodes().simulate('click');
                            expect(pubBoxMount.find(ConfirmModal).find(undoChangesButton).hostNodes().length).toBe(1);
                            expect(pubBoxMount
                                .find(ConfirmModal)
                                .find(undoChangesButton)
                                .hostNodes()
                                .text()
                            ).toBe('Undo 2 Changes');
                        });
                    });
                });
            });
            describe('is false', () => {
                it('should not display "Undo changes" button', () => {
                    const pubBoxMountUndoChangeFalse = mount(pubShareBoxElement);
                    pubBoxMountUndoChangeFalse.setProps({isChanged: false});
                    expect(pubBoxMountUndoChangeFalse.find(undoChangesButton).hostNodes().length).toBe(0);
                });
            });
        });

        describe('when initialConfigurationId', () => {
            describe('is an upgrade configuration', () => {
                it('should render UpdateAction', done => {
                    pubBoxMount.setProps({ initialConfigurationId: 'upgradeConfig' });
                    pubBoxMount.setState({}, () => {
                        expect(pubBoxMount.find('UpdateAction').length).toBe(1);
                        done();
                    });
                });
            });

            describe('is not an upgrade configuration', () => {
                it('should not render UpdateAction', done => {
                    pubBoxMount.setProps({ initialConfigurationId: '111' });
                    pubBoxMount.setState({}, () => {
                        expect(pubBoxMount.find('UpdateAction').length).toBe(0);
                        done();
                    });
                });
            });
        });
    });
});
