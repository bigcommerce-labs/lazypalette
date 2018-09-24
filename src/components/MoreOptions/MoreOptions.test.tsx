import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallow } from 'enzyme';
import React from 'react';

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

declare const global: any;

describe('<MoreOptions />', () => {
    const axiosMock = new MockAdapter(Axios);

    let moreOptions: any;

    beforeEach(() => {
        axiosMock.reset();

        moreOptions = shallow(
            <MoreOptions
                activeThemeId="8900"
                configurationId="123"
                position={{ x: 10, y: 10 }}
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
        );
    });

    describe('render()', () => {
        it('renders the component', () => {
            expect(moreOptions).toMatchSnapshot();
        });
    });

    describe('when you click "Restore original theme styles"', () => {
        describe('when isChanged is true', () => {
            it('isResetOpen state should be true', () => {
                moreOptions.setProps({isChanged: true});
                moreOptions.find(restoreOriginalLink).simulate('click');
                expect(moreOptions.state().currentModal).toBe(CurrentModal.RESET);
            });
        });

        describe('when isChanged is false', () => {
            it('should call loadTheme', () => {
                moreOptions.setProps({isChanged: false});
                moreOptions.find(restoreOriginalLink).simulate('click');
                expect(mockLoadTheme).toHaveBeenCalled();
            });
        });

        describe('when isChanged is false', () => {
            it('should call createNotification', () => {
                moreOptions.setProps({isChanged: false});
                moreOptions.find(restoreOriginalLink).simulate('click');
                expect(mockCreateNotification).toHaveBeenCalled();
            });
        });
    });

    describe('when you click "Edit Theme Files"', () => {
        describe('when viewing a non-private theme', () => {
            it('renders correctly', () => {
                moreOptions.setProps({ isPrivate: false });
                moreOptions.find(editThemeFilesLink).simulate('click');
                expect(moreOptions.state().currentModal).toBe(CurrentModal.COPY_THEME);
                expect(moreOptions).toMatchSnapshot();
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
                    moreOptions.find(editThemeFilesLink).simulate('click');
                    setTimeout(() => {
                        expect(moreOptions).toMatchSnapshot();
                        expect(moreOptions.state().currentModal).toBe(CurrentModal.EDIT_THEME_FILES);
                        done();
                    });
                });
            });

            describe('when viewing an inactive theme', () => {
                it('renders correctly', done => {
                    moreOptions.setProps({ activeThemeId: 'blah' });
                    moreOptions.find(editThemeFilesLink).simulate('click');
                    setTimeout(() => {
                        expect(moreOptions).toMatchSnapshot();
                        expect(moreOptions.state().currentModal).toBe(CurrentModal.EDIT_THEME_FILES);
                        done();
                    });
                });
            });
        });

        describe('when the design policy has been acknowledged', () => {
            let mockLocation: any;

            beforeEach(() => {
                axiosMock.onGet(themeAPI.designPolicyAckAPI)
                    .reply(200, {
                        data: {
                            designPolicyAck: true,
                        }});

                axiosMock.onPost(themeAPI.designPolicyAckAPI).reply(204, { data: undefined });

                mockLocation = jest.fn();
                global.location.assign = mockLocation;
            });

            describe('when viewing the active theme', () => {
                it('renders correctly', done => {
                    moreOptions.find(editThemeFilesLink).simulate('click');
                    setTimeout(() => {
                        expect(moreOptions).toMatchSnapshot();
                        expect(moreOptions.state().currentModal).toBe(CurrentModal.NONE);
                        expect(mockLocation).toHaveBeenCalledWith('/manage/file-editor/456/234/123');
                        done();
                    });
                });
            });

            describe('when viewing an inactive theme', () => {
                it('renders correctly', done => {
                    moreOptions.setProps({ activeThemeId: 'blah' });
                    moreOptions.find(editThemeFilesLink).simulate('click');
                    setTimeout(() => {
                        expect(moreOptions).toMatchSnapshot();
                        expect(moreOptions.state().currentModal).toBe(CurrentModal.NONE);
                        expect(mockLocation).toHaveBeenCalledWith('/manage/file-editor/456/234/123');
                        done();
                    });
                });
            });
        });
    });
});
