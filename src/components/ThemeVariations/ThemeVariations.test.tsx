import { mount, shallow } from 'enzyme';
import React from 'react';
import { StaticRouter } from 'react-router';

import { appRoutes } from '../Routes/Routes';

import { Item } from './styles';
import { ThemeVariations } from './ThemeVariations';

describe('ThemeVariations', () => {
    const { styles } = appRoutes;
    const mockProp: any = jest.fn();
    const routeProps = {
        history: mockProp,
        location: mockProp,
        match: mockProp,
        staticContext: mockProp,
    };

    routeProps.match.url = './';

    const testItems = [
        {
            image: 'http://meow.wow.com/123.jpg',
            isActive: true,
            name: 'light',
            variationId: '123',
        },
        {
            image: 'http://meow.wow.com/123.jpg',
            isActive: false,
            name: 'dark',
            variationId: '234',
        },
    ];

    it('renders', () => {
        const mockHandler = jest.fn();

        const themeVariations = shallow(
            <StaticRouter location={styles.path} context={{}}>
                <ThemeVariations
                    isChanged={false}
                    position={{ x: 5, y: 10}}
                    themeVariants={testItems}
                    loadTheme={mockHandler}
                    {...routeProps}
                />
            </StaticRouter>
        );

        expect(themeVariations).toMatchSnapshot();
    });

    describe('handleVariationChange', () => {
        describe('when there are no unsaved theme changes', () => {
            it('should call loadTheme', () => {
                const mockLoadTheme = jest.fn();

                const wrapper = mount(
                    <StaticRouter location={styles.path} context={{}}>
                        <ThemeVariations
                            isChanged={false} // no theme changes
                            position={{ x: 5, y: 10}}
                            themeVariants={testItems}
                            loadTheme={mockLoadTheme}
                            {...routeProps}
                        />
                    </StaticRouter>
                );

                const themeVariations = wrapper.find(ThemeVariations).instance();
                themeVariations.setState({ isConfirmOpen: false });
                wrapper.update();

                const otherThemeVariant = wrapper.find(Item).last();
                otherThemeVariant.simulate('click');

                // should directly call loadTheme
                expect(mockLoadTheme).toHaveBeenCalledTimes(1);
                expect(themeVariations.state.isConfirmOpen).toEqual(false);
            });
        });

        describe('when there are theme changes', () => {
            it('should open the confirm modal', () => {
                const mockHandler = jest.fn();

                const wrapper = mount(
                    <StaticRouter location={styles.path} context={{}}>
                        <ThemeVariations
                            isChanged={true} // theme has unsaved changes
                            position={{ x: 5, y: 10}}
                            themeVariants={testItems}
                            loadTheme={mockHandler}
                            {...routeProps}
                        />
                    </StaticRouter>
                );

                const themeVariations = wrapper.find(ThemeVariations).instance();
                themeVariations.setState({ isConfirmOpen: false });
                wrapper.update();

                const otherThemeVariant = wrapper.find(Item).last();
                otherThemeVariant.simulate('click');

                // should open confirm modal - not directly call loadTheme
                expect(mockHandler).toHaveBeenCalledTimes(0);
                expect(themeVariations.state.isConfirmOpen).toEqual(true);
            });
        });
    });
});
