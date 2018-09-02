import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import createMockStore from 'redux-mock-store';

import { VIEWPORT_TYPES } from '../PreviewPane/constants';

import { StyledPreviewItem } from './styles';
import HeaderMenu from './HeaderMenu';

describe('<HeaderMenu />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            const store = createMockStore([])({
                error: {},
                notifications: {
                    autoDismiss: true,
                    message: '',
                    type: '',
                },
                previewPane: {},
                theme: {
                    configurationId: '012',
                    variations: [],
                },
            });
            const headerMenu = shallow(<HeaderMenu/>, { context: { store } }).dive();

            expect(toJson(headerMenu)).toMatchSnapshot();
        });
    });

    describe('<StyledPreviewItem />', () => {
        describe('onClick()', () => {
            test('updates the viewportType', () => {
                const store = createMockStore([])({
                    displayVersion: '1.2.1',
                    error: {},
                    notifications: {
                        autoDismiss: true,
                        message: '',
                        type: '',
                    },
                    postThemeConfigData: jest.fn(),
                    previewPane: {},
                    theme: {
                        configurationId: '012',
                        variations: [],
                    },
                    themeName: 'Cornerstone',
                    variationName: 'Bold',
                });
                const styledIcons = shallow(<HeaderMenu/>, { context: { store } }).find(StyledPreviewItem);
                const viewportTypes = [
                    VIEWPORT_TYPES.DESKTOP,
                    VIEWPORT_TYPES.TABLET,
                    VIEWPORT_TYPES.MOBILE,
                ];

                styledIcons.forEach((styledIcon, i) => {
                    styledIcon.simulate('click');
                    expect(store.getActions()[i].payload.viewportType).toBe(viewportTypes[i]);
                });
            });
        });
    });
});
