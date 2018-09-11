import { shallow } from 'enzyme';
import React from 'react';

import {ThemeVariationsEntry} from '../../reducers/theme';
import {sel} from '../../utils/testUtil';

import { MoreOptions } from './MoreOptions';

const mockProp: any = jest.fn();
const routeProps = {
    history: mockProp,
    location: mockProp,
    match: mockProp,
    staticContext: mockProp,
};
const loadTheme: any = jest.fn();

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

describe('<MoreOptions />', () => {
    const moreOptions = shallow(
        <MoreOptions
            position={{ x: 10, y: 10 }}
            variationId="234"
            currentVariationEntry={variationEntry}
            isChanged={false}
            loadTheme={loadTheme}
            {...routeProps}
        />
    );
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
                expect(moreOptions.state().isResetOpen).toBe(true);
            });
        });

        describe('when isChanged is false', () => {
            it('should call loadTheme', () => {
                moreOptions.setProps({isChanged: false});
                moreOptions.find(restoreOriginalLink).simulate('click');
                expect(loadTheme).toHaveBeenCalled();
            });
        });
    });
});
