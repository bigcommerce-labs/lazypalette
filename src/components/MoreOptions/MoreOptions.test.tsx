import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount, ReactWrapper } from 'enzyme';
import React, {cloneElement} from 'react';
import {BrowserRouter} from 'react-router-dom';

import { ThemeVariationsEntry } from '../../reducers/theme';
import { themeAPI } from '../../services/themeApi';
import { sel } from '../../utils/testUtil';

import { CurrentModal } from './constants';
import { MoreOptions } from './MoreOptions';

const mockProp: any = jest.fn(() => Promise.resolve({}));
const routeProps = {
    history: mockProp,
    location: mockProp,
    match: {
        isExact: true,
        params: '',
        path: '/',
        url: '/',
    },
    staticContext: mockProp,
};

const mockLoadTheme: any = jest.fn(() => Promise.resolve({}));
const mockCreateNotification: any = jest.fn();
const mockUpdateMenuPosition: any = jest.fn();
const mockNotification = {
    autoDismiss: true,
    message: 'hello',
    type: 'Success',
};

const variationEntry: ThemeVariationsEntry = {
    configurationId: '123',
    defaultConfigurationId: '234',
    id: '567',
    isCurrent: true,
    screenshot: {
        largePreview: 'host://meows/123.jpg',
        largeThumb: 'host://meows/234.jpg',
        smallThumb: 'host://meows/345.jpg',
    },
    themeId: '8900',
    variationName: 'light',
};

const restoreOriginalLink = sel('restore-original');
const editThemeFilesLink = sel('edit-theme-files');
const gotoThemeEditorLink = sel('switch-to-theme-editor');

describe('<MoreOptions />', () => {
    const axiosMock = new MockAdapter(Axios);

    const mockWindow: any = window;
    mockWindow.location.assign = jest.fn();

    let wrapper: ReactWrapper<any>;
    let moreOptions: any;
    let originalMoreOptions: any;

    beforeEach(() => {
        axiosMock.reset();

        wrapper = mount(
            <BrowserRouter>
                <MoreOptions
                    activeThemeId="8900"
                    canOptOut={true}
                    configurationId="123"
                    position={{ x: 10, y: 10 }}
                    storeHash="abc"
                    variationId="234"
                    versionId="456"
                    currentVariationEntry={variationEntry}
                    isChanged={false}
                    isPrivate={true}
                    notifications={mockNotification}
                    createNotification={mockCreateNotification}
                    loadTheme={mockLoadTheme}
                    themeId="8900"
                    updateExpandableMenuPosition={mockUpdateMenuPosition}
                    {...routeProps}
                />
            </BrowserRouter>
        );

        moreOptions = wrapper.find(MoreOptions);
        originalMoreOptions = wrapper.props().children;
    });

    describe('opt out link', () => {
        describe('when canOptOut is true', () => {
            it('display the opt out link', () => {
                const optOutLink = moreOptions.find(gotoThemeEditorLink);
                expect(optOutLink.hostNodes().length).toEqual(1);
            });
        });

        describe('when canOptOut is false', () => {
            it('does not display the opt out link', () => {
                wrapper = mount(
                    <BrowserRouter>
                        <MoreOptions
                            activeThemeId="8900"
                            canOptOut={false}
                            configurationId="123"
                            position={{ x: 10, y: 10 }}
                            storeHash="abc"
                            variationId="234"
                            versionId="456"
                            currentVariationEntry={variationEntry}
                            isChanged={false}
                            isPrivate={true}
                            notifications={mockNotification}
                            createNotification={mockCreateNotification}
                            loadTheme={mockLoadTheme}
                            themeId="8900"
                            updateExpandableMenuPosition={mockUpdateMenuPosition}
                            {...routeProps}
                        />
                    </BrowserRouter>
                );

                moreOptions = wrapper.find(MoreOptions);

                const optOutLink = moreOptions.find(gotoThemeEditorLink);
                expect(optOutLink.hostNodes().length).toEqual(0);
            });
        });
    });

    describe('when you click "Restore original theme styles"', () => {
        describe('when isChanged is true', () => {
            beforeEach(() => {
                const moreOptionsClone = cloneElement(originalMoreOptions,
                    {...originalMoreOptions.props, isChanged: true});
                wrapper.setProps({ children: moreOptionsClone });
            });

            it('state currentModal === CurrentModal.RESET', () => {
                moreOptions.find(restoreOriginalLink).hostNodes().simulate('click');
                expect(moreOptions.instance().state.currentModal).toBe(CurrentModal.RESET);
            });
        });

        describe('when isChanged is false', () => {
            beforeEach(() => {
                const moreOptionsClone = cloneElement(originalMoreOptions,
                    {...originalMoreOptions.props, isChanged: false});
                wrapper.setProps({ children: moreOptionsClone });
            });

            it('should call loadTheme', () => {
                moreOptions.find(restoreOriginalLink).hostNodes().simulate('click');
                expect(mockLoadTheme).toHaveBeenCalled();
            });

            it('should call createNotification', () => {
                moreOptions.find(restoreOriginalLink).hostNodes().simulate('click');
                expect(mockCreateNotification).toHaveBeenCalled();
            });
        });
    });

    describe('when you click "Edit Theme Files"', () => {
        describe('when viewing a marketplace (non-private) theme', () => {
            beforeEach(() => {
                const moreOptionsClone = cloneElement(originalMoreOptions,
                    {...originalMoreOptions.props, isPrivate: false});
                wrapper.setProps({ children: moreOptionsClone });
            });

            it('renders correctly', () => {
                moreOptions.find(editThemeFilesLink).hostNodes().simulate('click');
                expect(moreOptions.instance().state.currentModal).toBe(CurrentModal.COPY_THEME);
            });
        });

        describe('when viewing a private theme', () => {
            beforeEach(() => {
                const moreOptionsClone = cloneElement(originalMoreOptions,
                    {...originalMoreOptions.props, isPrivate: true});
                wrapper.setProps({ children: moreOptionsClone });
            });

            describe('when the design policy has not been acknowledged', () => {
                beforeEach(() => {
                    axiosMock.onGet(themeAPI.designPolicyAckAPI)
                        .reply(200, {
                            data: {
                                designPolicyAck: false,
                            }});

                    axiosMock.onPost(themeAPI.designPolicyAckAPI).reply(204);
                });

                describe('when viewing the active theme', () => {
                    it('renders correctly', done => {
                        moreOptions.find(editThemeFilesLink).hostNodes().simulate('click');

                        setTimeout(() => {
                            expect(moreOptions).toMatchSnapshot();
                            expect(moreOptions.instance().state.currentModal).toBe(CurrentModal.EDIT_THEME_FILES);
                            done();
                        });
                    });
                });

                describe('when viewing an inactive theme', () => {
                    beforeEach(() => {
                        const moreOptionsClone = cloneElement(originalMoreOptions,
                            {...originalMoreOptions.props, activeThemeId: 'blah'});
                        wrapper.setProps({ children: moreOptionsClone });
                    });

                    it('renders correctly', done => {
                        moreOptions.find(editThemeFilesLink).hostNodes().simulate('click');

                        setTimeout(() => {
                            expect(moreOptions).toMatchSnapshot();
                            expect(moreOptions.instance().state.currentModal).toBe(CurrentModal.EDIT_THEME_FILES);
                            done();
                        });
                    });
                });
            });

            describe('when the design policy has been acknowledged', () => {
                beforeEach(() => {
                    axiosMock.onGet(themeAPI.designPolicyAckAPI)
                        .reply(200, {
                            data: {
                                designPolicyAck: true,
                            }});

                    axiosMock.onPost(themeAPI.designPolicyAckAPI).reply(204, { data: undefined });
                });

                describe('when viewing the active theme', () => {
                    it('navigates to /manage/file-editor/456/234/123', done => {
                        moreOptions.find(editThemeFilesLink).hostNodes().simulate('click');

                        setTimeout(() => {
                            expect(moreOptions.instance().state.currentModal).toBe(CurrentModal.NONE);
                            expect(mockWindow.location.assign).toHaveBeenCalledWith('/manage/file-editor/456/234/123');
                            done();
                        });
                    });
                });

                describe('when viewing an inactive theme', () => {
                    beforeEach(() => {
                        const moreOptionsClone = cloneElement(originalMoreOptions,
                            {...originalMoreOptions.props, activeThemeId: 'blah'});
                        wrapper.setProps({ children: moreOptionsClone });
                    });

                    it('navigates to /manage/file-editor/456/234/123', done => {
                        moreOptions.find(editThemeFilesLink).hostNodes().simulate('click');

                        setTimeout(() => {
                            expect(moreOptions.instance().state.currentModal).toBe(CurrentModal.NONE);
                            expect(mockWindow.location.assign)
                                .toHaveBeenCalledWith('/manage/file-editor/456/234/123');
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('when you click on "Goto Theme Editor"', () => {
        describe('when the PUT call succeeds', () => {
            beforeEach(() => {
                axiosMock.onPut(themeAPI.storeDesignSettings('abc'))
                    .reply(200, {
                        data: {
                            success: true,
                        }});
            });

            describe('when you click on Go to Old Theme Editor link', () => {
                it('should set CurrentModal to NONE', done => {
                    moreOptions.find(gotoThemeEditorLink).hostNodes().simulate('click');

                    setTimeout(() => {
                        expect(mockWindow.location.assign).toHaveBeenCalled();
                        done();
                    });
                });
            });
        });

        describe('when the PUT call fails', () => {
            beforeEach(() => {
                axiosMock.onPut(themeAPI.storeDesignSettings('abc'))
                    .reply(503, {
                        data: {
                            success: false,
                        },
                    });
            });

            describe('when isChanged is false', () => {
                describe('when you click on Go to Old Theme Editor link', () => {
                    it('should call createNotification', done => {
                        moreOptions.find(gotoThemeEditorLink).hostNodes().simulate('click');

                        setTimeout(() => {
                            expect(moreOptions.instance().state.currentModal)
                                .toBe(CurrentModal.NONE);
                            expect(mockCreateNotification).toHaveBeenCalled();
                            done();
                        });
                    });
                });
            });
        });
    });
});
