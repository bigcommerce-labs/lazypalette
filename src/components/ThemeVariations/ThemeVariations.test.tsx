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
                    queryParams=""
                    themeVariants={testItems}
                    createNotification={mockHandler}
                    loadTheme={mockHandler}
                    setQueryParams={mockHandler}
                    {...routeProps}
                />
            </StaticRouter>
        );

        expect(themeVariations).toMatchSnapshot();
    });

    describe('handleVariationChange', () => {
        const mockLoadTheme = jest.fn();
        const mockCreateNotification = jest.fn();
        const mockSetQueryParams = jest.fn();

        beforeEach(() => {
            mockLoadTheme.mockReset();
            mockCreateNotification.mockReset();

            mockLoadTheme.mockReturnValue(Promise.resolve(true));
        });
        describe('when there are no unsaved theme changes', () => {
            it('should call loadTheme', () => {

                const wrapper = mount(
                    <StaticRouter location={styles.path} context={{}}>
                        <ThemeVariations
                            isChanged={false} // no theme changes
                            position={{ x: 5, y: 10}}
                            queryParams=""
                            themeVariants={testItems}
                            createNotification={mockCreateNotification}
                            loadTheme={mockLoadTheme}
                            setQueryParams={mockSetQueryParams}
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

        describe('when there are no unsaved theme changes', () => {
            describe('when loadTheme succeeds', () => {
                it('should call loadTheme', () => {
                    const wrapper = mount(
                        <StaticRouter location={styles.path} context={{}}>
                            <ThemeVariations
                                isChanged={false} // no theme changes
                                position={{ x: 5, y: 10 }}
                                queryParams=""
                                themeVariants={testItems}
                                createNotification={mockCreateNotification}
                                loadTheme={mockLoadTheme}
                                setQueryParams={mockSetQueryParams}
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
                    expect(mockCreateNotification).toHaveBeenCalledTimes(0);
                });
            });

            describe('when loadTheme fails', () => {
                it('should create a notification', done => {
                    mockLoadTheme.mockReset();
                    mockLoadTheme.mockResolvedValue({ error: true });

                    const wrapper = mount(
                        <StaticRouter location={styles.path} context={{}}>
                            <ThemeVariations
                                isChanged={false} // no theme changes
                                position={{ x: 5, y: 10 }}
                                queryParams=""
                                themeVariants={testItems}
                                createNotification={mockCreateNotification}
                                loadTheme={mockLoadTheme}
                                setQueryParams={mockSetQueryParams}
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
                    setTimeout(() => {
                        expect(mockCreateNotification).toHaveBeenCalledTimes(1);
                        done();
                    });
                });
            });
        });

        describe('when there are theme changes', () => {
            it('should open the confirm modal', () => {
                const wrapper = mount(
                    <StaticRouter location={styles.path} context={{}}>
                        <ThemeVariations
                            isChanged={true} // theme has unsaved changes
                            position={{ x: 5, y: 10}}
                            queryParams=""
                            themeVariants={testItems}
                            createNotification={mockCreateNotification}
                            loadTheme={mockLoadTheme}
                            setQueryParams={mockSetQueryParams}
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
                expect(mockLoadTheme).toHaveBeenCalledTimes(0);
                expect(themeVariations.state.isConfirmOpen).toEqual(true);
            });
        });
    });
});
