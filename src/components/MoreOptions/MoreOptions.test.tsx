import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount, ReactWrapper } from 'enzyme';
import React, { cloneElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import BrowserContext from '../../context/BrowserContext';
import { ThemeVariationsEntry } from '../../reducers/theme';
import { themeAPI } from '../../services/themeApi';
import { sel } from '../../utils/testUtil';

import { CurrentModal } from './constants';
import { MoreOptions } from './MoreOptions';

const mockProp: any = jest.fn(() => Promise.resolve({}));
const routeProps = {
    history: mockProp,
    location: mockProp,
    match: mockProp,
    staticContext: mockProp,
};
const mockLoadTheme: any = jest.fn(() => Promise.resolve({}));
const mockCreateNotification: any = jest.fn();
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
    const mockWindow = { location: { assign: jest.fn() } };

    let wrapper: ReactWrapper<any>;
    let moreOptions: any;
    let originalMoreOptions: any;

    beforeEach(() => {
        axiosMock.reset();

        wrapper = mount(
            <BrowserRouter>
                <BrowserContext.Provider value={{ _window: mockWindow }}>
                    <MoreOptions
                        activeThemeId="8900"
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
                        {...routeProps}
                    />
                </BrowserContext.Provider>
            </BrowserRouter>
        );

        moreOptions = wrapper.find(MoreOptions);
        originalMoreOptions = wrapper.props().children.props.children;
    });

    describe('when you click "Restore original theme styles"', () => {
        describe('when isChanged is true', () => {
            it('state currentModal === CurrentModal.RESET', () => {
                const moreOptionsClone = cloneElement(originalMoreOptions,
                    {...originalMoreOptions.props, isChanged: true});
                const originalBrowserContext = wrapper.props().children;
                const browserContextClone = cloneElement(originalBrowserContext,
                    {...originalBrowserContext.props}, moreOptionsClone);

                wrapper.setProps({ children: browserContextClone });
                moreOptions.find(restoreOriginalLink).hostNodes().simulate('click');
                expect(moreOptions.instance().state.currentModal).toBe(CurrentModal.RESET);
            });
        });

        describe('when isChanged is false', () => {
            it('should call loadTheme', () => {
                const moreOptionsClone = cloneElement(originalMoreOptions,
                    {...originalMoreOptions.props, isChanged: false});
                const originalBrowserContext = wrapper.props().children;
                const browserContextClone = cloneElement(originalBrowserContext,
                    {...originalBrowserContext.props}, moreOptionsClone);

                wrapper.setProps({ children: browserContextClone });
                moreOptions.find(restoreOriginalLink).hostNodes().simulate('click');

                expect(mockLoadTheme).toHaveBeenCalled();
            });
        });

        describe('when isChanged is false', () => {
            it('should call createNotification', () => {
                const moreOptionsClone = cloneElement(originalMoreOptions,
                    {...originalMoreOptions.props, isChanged: false});
                const originalBrowserContext = wrapper.props().children;
                const browserContextClone = cloneElement(originalBrowserContext,
                    {...originalBrowserContext.props}, moreOptionsClone);

                wrapper.setProps({ children: browserContextClone });
                moreOptions.find(restoreOriginalLink).hostNodes().simulate('click');

                expect(mockCreateNotification).toHaveBeenCalled();
            });
        });
    });

    describe('when you click "Edit Theme Files"', () => {
        describe('when viewing a non-private theme', () => {
            it('renders correctly', () => {
                const moreOptionsClone = cloneElement(originalMoreOptions,
                    {...originalMoreOptions.props, isPrivate: false});
                const originalBrowserContext = wrapper.props().children;
                const browserContextClone = cloneElement(originalBrowserContext,
                    {...originalBrowserContext.props}, moreOptionsClone);

                wrapper.setProps({ children: browserContextClone });
                moreOptions.find(editThemeFilesLink).hostNodes().simulate('click');

                expect(moreOptions.instance().state.currentModal).toBe(CurrentModal.COPY_THEME);
            });
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
                    const moreOptionsClone = cloneElement(originalMoreOptions,
                        {...originalMoreOptions.props, isPrivate: true});
                    const originalBrowserContext = wrapper.props().children;
                    const browserContextClone = cloneElement(originalBrowserContext,
                        {...originalBrowserContext.props}, moreOptionsClone);

                    wrapper.setProps({ children: browserContextClone });
                    moreOptions.find(editThemeFilesLink).hostNodes().simulate('click');

                    setTimeout(() => {
                        expect(moreOptions).toMatchSnapshot();
                        expect(moreOptions.instance().state.currentModal).toBe(CurrentModal.EDIT_THEME_FILES);
                        done();
                    });
                });
            });

            describe('when viewing an inactive theme', () => {
                it('renders correctly', done => {
                    const moreOptionsClone = cloneElement(originalMoreOptions,
                        {...originalMoreOptions.props, activeThemeId: 'blah' });
                    const originalBrowserContext = wrapper.props().children;
                    const browserContextClone = cloneElement(originalBrowserContext,
                        {...originalBrowserContext.props}, moreOptionsClone);

                    wrapper.setProps({ children: browserContextClone });
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
            // let mockLocation: any;

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
                it('navigates to /manage/file-editor/456/234/123', done => {
                    const moreOptionsClone = cloneElement(originalMoreOptions,
                        {...originalMoreOptions.props, activeThemeId: 'blah' });
                    const originalBrowserContext = wrapper.props().children;
                    const browserContextClone = cloneElement(originalBrowserContext,
                        {...originalBrowserContext.props}, moreOptionsClone);

                    wrapper.setProps({ children: browserContextClone });

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
                        const moreOptionsClone = cloneElement(originalMoreOptions,
                            {...originalMoreOptions.props, isChanged: false});
                        const originalBrowserContext = wrapper.props().children;
                        const browserContextClone = cloneElement(originalBrowserContext,
                            {...originalBrowserContext.props, value: { _window: mockWindow }}, moreOptionsClone);

                        wrapper.setProps({ children: browserContextClone });
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
