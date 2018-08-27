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
    }];

    const mockProp: any = jest.fn();
    const routeProps = {
        history: mockProp,
        location: mockProp,
        match: mockProp,
        staticContext: mockProp,
    };

    let mockLoadTheme: any;

    beforeEach(() => {
        mockLoadTheme = jest.fn();
    });

    describe('when rendering', () => {
        describe('when it has history items', () => {
            describe('when an item is currently active', () => {
                it('renders correctly', () => {
                    const themeHistory = shallow(
                        <ThemeHistory
                            configurationId={history[0].configurationId}
                            isChanged={false}
                            position={{ x: 5, y: 10 }}
                            loadTheme={mockLoadTheme}
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
                            position={{ x: 5, y: 10 }}
                            loadTheme={mockLoadTheme}
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
                        position={{ x: 5, y: 10 }}
                        loadTheme={mockLoadTheme}
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
                        position={{ x: 5, y: 10 }}
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
                expect(themeHistory).toMatchSnapshot();
            });
        });
    });

    describe('when an entry is clicked', () => {
        describe('when there are no unsaved changes', () => {
            it('calls loadTheme', () => {
                const themeHistory = shallow(
                    <ThemeHistory
                        configurationId={'blaaaah'}
                        isChanged={false}
                        position={{ x: 5, y: 10 }}
                        loadTheme={mockLoadTheme}
                        variationHistory={history}
                        {...routeProps}/>);

                themeHistory.find(HistoryEntry).first().simulate('click');

                expect(mockLoadTheme).toHaveBeenCalled();
            });
        });

        describe('when unsaved changes exist', () => {
            it('does not call loadTheme and opens a modal', () => {
                const themeHistory = shallow(
                    <ThemeHistory
                        configurationId={'blaaaah'}
                        isChanged={true}
                        position={{ x: 5, y: 10 }}
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
                    position={{ x: 5, y: 10 }}
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