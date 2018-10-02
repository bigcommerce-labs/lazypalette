import { shallow } from 'enzyme';
import React from 'react';

import { HistoryEntry } from './styles';
import { ThemeHistory } from './ThemeHistory';

describe('ThemeHistory', () => {
    const history = [{
        configurationId: 'config123',
        displayVersion: 'Version 1.0',
        themeId: 'meow1',
        themeName: 'Meowcat Theme',
        timestamp: '2018-08-17T18:13:42Z',
        type: 'installed',
        variationId: 'variation123',
        variationName: 'Variation Meow',
        versionId: 'version123',
    },
    {
        configurationId: 'config456',
        displayVersion: 'Version 2.0',
        themeId: 'woof1',
        themeName: 'Doge Theme',
        timestamp: '2015-08-13T12:13:42Z',
        type: 'saved',
        variationId: 'variation456',
        variationName: 'Variation Woof',
        versionId: 'version456',
    },
    {
        configurationId: 'congig789',
        displayVersion: 'Version 0.0',
        themeId: 'hiss1',
        themeName: 'Snake Theme',
        timestamp: '2015-08-10T12:13:42Z',
        type: 'default',
        variationId: 'variation789',
        variationName: 'Variation Hiss',
        versionId: 'version789',
    }];

    const mockProp: any = jest.fn();
    const routeProps = {
        history: mockProp,
        location: mockProp,
        match: mockProp,
        staticContext: mockProp,
    };

    let mockCreateNotification: any;
    let mockLoadTheme: any;

    beforeEach(() => {
        mockCreateNotification = jest.fn();
        mockLoadTheme = jest.fn().mockResolvedValue(true);
    });

    describe('when rendering', () => {
        describe('when it has history items', () => {
            describe('when an item is currently active', () => {
                it('renders correctly', () => {
                    const themeHistory = shallow(
                        <ThemeHistory
                            configurationId={history[0].configurationId}
                            isChanged={false}
                            isPrelaunchStore={false}
                            position={{ x: 5, y: 10 }}
                            createNotification={mockCreateNotification}
                            loadTheme={mockLoadTheme}
                            timeZone="UTC"
                            variationHistory={history}
                            {...routeProps}/>);

                    expect(themeHistory).toMatchSnapshot();
                });
            });

            describe('when in prelaunch mode', () => {
                it('renders correctly', () => {
                    const themeHistory = shallow(
                        <ThemeHistory
                            configurationId={history[0].configurationId}
                            isChanged={false}
                            isPrelaunchStore={true}
                            position={{ x: 5, y: 10 }}
                            createNotification={mockCreateNotification}
                            loadTheme={mockLoadTheme}
                            timeZone="UTC"
                            variationHistory={history}
                            {...routeProps}/>);

                    expect(themeHistory).toMatchSnapshot();
                });
            });

            describe('when no items are currently active', () => {
                it('renders correctly', () => {
                    const themeHistory = shallow(
                        <ThemeHistory
                            configurationId={'blaaaah'}
                            isChanged={false}
                            isPrelaunchStore={false}
                            position={{ x: 5, y: 10 }}
                            createNotification={mockCreateNotification}
                            loadTheme={mockLoadTheme}
                            timeZone="UTC"
                            variationHistory={history}
                            {...routeProps}/>);

                    expect(themeHistory).toMatchSnapshot();
                });
            });
        });

        describe('when it has no history items', () => {
            it('renders correctly', () => {
                const themeHistory = shallow(
                    <ThemeHistory
                        configurationId={history[0].configurationId}
                        isChanged={false}
                        isPrelaunchStore={false}
                        position={{ x: 5, y: 10 }}
                        createNotification={mockCreateNotification}
                        loadTheme={mockLoadTheme}
                        timeZone="UTC"
                        variationHistory={[]}
                        {...routeProps}/>);

                expect(themeHistory).toMatchSnapshot();
            });
        });

        describe('when the modal is open', () => {
            it('renders correctly', () => {
                const themeHistory = shallow(
                    <ThemeHistory
                        configurationId={history[0].configurationId}
                        isChanged={true}
                        isPrelaunchStore={false}
                        position={{ x: 5, y: 10 }}
                        createNotification={mockCreateNotification}
                        loadTheme={mockLoadTheme}
                        timeZone="UTC"
                        variationHistory={history}
                        {...routeProps}/>);

                themeHistory.setState({
                    confirmData: {
                        configurationId: history[0].configurationId,
                        variationId: history[0].variationId,
                    },
                    isConfirmOpen: true,
                });
                expect(themeHistory).toMatchSnapshot();
            });
        });
    });

    describe('when an entry is clicked', () => {
        describe('when there are no unsaved changes', () => {
            describe('when loadTheme succeeds', () => {
                it('calls loadTheme', () => {
                    const themeHistory = shallow(
                        <ThemeHistory
                            configurationId={'blaaaah'}
                            isChanged={false}
                            isPrelaunchStore={false}
                            position={{ x: 5, y: 10 }}
                            createNotification={mockCreateNotification}
                            loadTheme={mockLoadTheme}
                            variationHistory={history}
                            {...routeProps}/>);

                    themeHistory.find(HistoryEntry).first().simulate('click');

                    expect(mockLoadTheme).toHaveBeenCalled();
                });
            });

            describe('when loadTheme fails', () => {
                it('creates a notification', done => {
                    mockLoadTheme.mockReset();
                    mockLoadTheme.mockResolvedValue({ error: true });

                    const themeHistory = shallow(
                        <ThemeHistory
                            configurationId={'blaaaah'}
                            isChanged={false}
                            isPrelaunchStore={false}
                            position={{ x: 5, y: 10 }}
                            createNotification={mockCreateNotification}
                            loadTheme={mockLoadTheme}
                            variationHistory={history}
                            {...routeProps}/>);

                    themeHistory.find(HistoryEntry).first().simulate('click');

                    expect(mockLoadTheme).toHaveBeenCalled();
                    setTimeout(() => {
                        expect(mockCreateNotification).toHaveBeenCalled();
                        done();
                    });
                });
            });
        });

        describe('when unsaved changes exist', () => {
            it('does not call loadTheme and opens a modal', () => {
                const themeHistory = shallow(
                    <ThemeHistory
                        configurationId={'blaaaah'}
                        isChanged={true}
                        isPrelaunchStore={false}
                        position={{ x: 5, y: 10 }}
                        createNotification={mockCreateNotification}
                        loadTheme={mockLoadTheme}
                        variationHistory={history}
                        {...routeProps}/>);

                themeHistory.find(HistoryEntry).first().simulate('click');

                expect(mockLoadTheme).not.toHaveBeenCalled();
                expect(themeHistory.state()).toEqual({
                    confirmData: {
                        configurationId: history[0].configurationId,
                        variationId: history[0].variationId,
                    },
                    isConfirmOpen: true,
                });
            });
        });
    });

    describe('when the modal is open', () => {
        let themeHistory: any;

        beforeEach(() => {
            themeHistory = shallow(
                <ThemeHistory
                    configurationId={'blaaaah'}
                    isChanged={true}
                    isPrelaunchStore={false}
                    position={{ x: 5, y: 10 }}
                    createNotification={mockCreateNotification}
                    loadTheme={mockLoadTheme}
                    variationHistory={history}
                    {...routeProps}/>);

            themeHistory.setState({
                confirmData: {
                    configurationId: history[0].configurationId,
                    variationId: history[0].variationId,
                },
                isConfirmOpen: true,
            });
        });

        describe('when the cancel handler is called', () => {
            it('closes the modal and does not call loadTheme', () => {
                themeHistory.instance().handleModalCancel();

                expect(mockLoadTheme).not.toHaveBeenCalled();
            });
        });

        describe('when the confirmation handler is called', () => {
            it('closes the modal and calls loadTheme', () => {
                themeHistory.instance().handleModalConfirm();

                expect(mockLoadTheme).toHaveBeenCalledWith(history[0].variationId, history[0].configurationId);
            });
        });
    });
});
