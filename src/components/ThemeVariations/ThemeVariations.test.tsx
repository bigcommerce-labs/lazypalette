import { mount, shallow } from 'enzyme';
import React from 'react';
import { StaticRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';

import { Item } from './styles';
import { ThemeVariations } from './ThemeVariations';

describe('ThemeVariations', () => {
    const theme = {
        colors: {},
        elevation: {},
        layers: {},
        typography: {
            fontWeight: {},
        },
    };
    const mockProp: any = jest.fn();
    const routeProps = {
        history: mockProp,
        location: mockProp,
        match: mockProp,
        staticContext: mockProp,
    };
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
            <StaticRouter location="/design/theme" context={{}}>
                <ThemeVariations
                    isChanged={false}
                    themeVariants={testItems}
                    changeThemeVariation={mockHandler}
                    {...routeProps}
                />
            </StaticRouter>
        );

        expect(themeVariations).toMatchSnapshot();
    });

    describe('handleVariationChange', () => {
        describe('when there are no unsaved theme changes', () => {
            it('should call changeThemeVariation', () => {
                const mockChangeVariation = jest.fn();

                const wrapper = mount(
                    <StaticRouter location="/design/theme" context={{}}>
                        <ThemeProvider theme={theme}>
                            <ThemeVariations
                                isChanged={false} // no theme changes
                                themeVariants={testItems}
                                changeThemeVariation={mockChangeVariation}
                                {...routeProps}
                            />
                        </ThemeProvider>
                    </StaticRouter>
                );

                const themeVariations = wrapper.find(ThemeVariations).instance();
                themeVariations.setState({ isConfirmOpen: false });
                wrapper.update();

                const otherThemeVariant = wrapper.find(Item).last();
                otherThemeVariant.simulate('click');

                // should directly call changeThemeVariation
                expect(mockChangeVariation).toHaveBeenCalledTimes(1);
                expect(themeVariations.state.isConfirmOpen).toEqual(false);
            });
        });

        describe('when there are theme changes', () => {
            it('should open the confirm modal', () => {
                const mockHandler = jest.fn();

                const wrapper = mount(
                    <StaticRouter location="/design/theme" context={{}}>
                        <ThemeProvider theme={theme}>
                            <ThemeVariations
                                isChanged={true} // theme has unsaved changes
                                themeVariants={testItems}
                                changeThemeVariation={mockHandler}
                                {...routeProps}
                            />
                        </ThemeProvider>
                    </StaticRouter>
                );

                const themeVariations = wrapper.find(ThemeVariations).instance();
                themeVariations.setState({ isConfirmOpen: false });
                wrapper.update();

                const otherThemeVariant = wrapper.find(Item).last();
                otherThemeVariant.simulate('click');

                // should open confirm modal - not directly call changeThemeVariation
                expect(mockHandler).toHaveBeenCalledTimes(0);
                expect(themeVariations.state.isConfirmOpen).toEqual(true);
            });
        });
    });
});
