import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import createMockStore from 'redux-mock-store';

import { VIEWPORT_TYPES } from '../PreviewPane/constants';

import PreviewPane from './PreviewPane';

describe('<PreviewPane />', () => {
    describe('render()', () => {
        it('renders the component', () => {
            const store = createMockStore([])({
                error: {errors: []},
                previewPane: {},
                theme: {
                    configurationId: '',
                },
            });
            const headerMenu = shallow(<PreviewPane/>, { context: { store } });

            expect(toJson(headerMenu)).toMatchSnapshot();
        });
    });

    describe('<iframe />', () => {
        const viewportTypes = [
            VIEWPORT_TYPES.DESKTOP,
            VIEWPORT_TYPES.TABLET,
            VIEWPORT_TYPES.MOBILE,
        ];

        for (const viewportType of viewportTypes) {
            describe(`when the viewport type is set to ${viewportType.glyphName.toUpperCase()}`, () => {
                it('updates the viewportType correctly', () => {
                    const store = createMockStore([])({
                        error: { errors: [] },
                        previewPane: {
                            viewportType,
                        },
                        theme: {
                            configurationId: '012',
                        },
                    });
                    const iframe = render(<PreviewPane/>, { context: { store } }).find('iframe');

                    expect(iframe.attr('height')).toBe(viewportType.viewportHeight);
                    expect(iframe.attr('width')).toBe(viewportType.viewportWidth);
                    expect(toJson(iframe)).toMatchSnapshot();
                });

                it('updates the rotated viewportType correctly', () => {
                    const store = createMockStore([])({
                        error: { errors: [] },
                        previewPane: {
                            isRotated: true,
                            viewportType,
                        },
                        theme: {
                            configurationId: '012',
                        },
                    });
                    const iframe = render(<PreviewPane/>, { context: { store } }).find('iframe');

                    expect(iframe.attr('height')).toBe(viewportType.viewportWidth);
                    expect(iframe.attr('width')).toBe(viewportType.viewportHeight);
                    expect(toJson(iframe)).toMatchSnapshot();
                });
            });
        }
    });
});
