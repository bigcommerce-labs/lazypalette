import { shallow } from 'enzyme';
import React from 'react';

import { Collapsed } from './constants';
import { CollapseButton } from './styles';
import { SideMenu } from './SideMenu';

describe('SideMenu', () => {
    const mockpostThemeConfig = jest.fn();
    const mockSettings = {
        'alert-color': '#fff',
        'body-font': 'Google_Karla_400',
        brandpage_products_per_page: 12,
        show_accept_amex: true,
    };
    const mockProp: any = jest.fn();
    const routeProps = {
        history: mockProp,
        location: mockProp,
        match: mockProp,
        staticContext: mockProp,
    };

    const features = { enabledFeature: true, disabledFeature: false };

    const themeDesignSections = [
        { enable: 'enabledFeature', name: 'should render', settings: [] },
        { enable: 'disabledFeature', name: 'should not render', settings: [] },
        { enable: 'unknownFeature', name: 'should also render', settings: [] },
        { name: 'also absolutely one of the ones that renders', settings: [] },
    ];

    it('renders', () => {
        const sideMenu = shallow(
            <SideMenu
                activeThemeId="1234567-1223-011123-111111"
                features={features}
                isPurchased={true}
                themeDesignSections={themeDesignSections}
                settings={mockSettings}
                themeId="1234567-1223-011123-111111"
                themeName="Caterstone"
                configurationId="4444-55555-77777-00000"
                variationId="2222-11111-0000-44444"
                versionId="2221-211111-0111-41111"
                postThemeConfigData={mockpostThemeConfig}
                {...routeProps}
            />
        );

        expect(sideMenu).toMatchSnapshot();
    });

    describe('Collapse Menu Button', () => {
        const sideMenu = shallow(
            <SideMenu
                activeThemeId="7777-9999-1111-0000"
                features={features}
                isPurchased={true}
                themeDesignSections={themeDesignSections}
                settings={mockSettings}
                themeId="7777-9999-1111-0000"
                themeName="Catstone Box"
                configurationId="3333-2222-111111-00000"
                variationId="2222-11111-0000-44444"
                versionId="2221-211111-0111-41111"
                postThemeConfigData={mockpostThemeConfig}
                {...routeProps}
            />
        );

        describe('when the page is first loaded', () => {
            it('should have a state of initial', () => {
                sideMenu.setState({ collapsed: Collapsed.Initial });
                expect(sideMenu.state().collapsed).toEqual(Collapsed.Initial);
            });
        });

        describe('when the user first clicks the collapse button', () => {
            it('should set collapsed state to yes', () => {
                const collapseBtn = sideMenu.find(CollapseButton);

                sideMenu.setState({ collapsed: Collapsed.Initial });
                collapseBtn.simulate('click');
                expect(sideMenu.state().collapsed).toEqual(Collapsed.Yes);
            });
        });

        describe('when the user clicks the collapse button again to re-open menu', () => {
            it('should set collapsed state to no', () => {
                const collapseBtn = sideMenu.find(CollapseButton);

                sideMenu.setState({ collapsed: Collapsed.Initial });
                collapseBtn.simulate('click'); // collapse menu
                collapseBtn.simulate('click'); // open menu
                expect(sideMenu.state().collapsed).toEqual(Collapsed.No);
            });
        });
    });

    describe('Theme status label', () => {
        describe('when active theme is not the current theme and isPurchased is true', () => {
            it('renders correctly', () => {
                const sideMenu = shallow(
                    <SideMenu
                        activeThemeId="blahblahblah"
                        features={features}
                        isPurchased={true}
                        themeDesignSections={themeDesignSections}
                        settings={mockSettings}
                        themeId="7777-9999-1111-0000"
                        themeName="Catstone Box"
                        configurationId="3333-2222-111111-00000"
                        variationId="2222-11111-0000-44444"
                        versionId="2221-211111-0111-41111"
                        postThemeConfigData={mockpostThemeConfig}
                        {...routeProps}
                    />
                );

                expect(sideMenu).toMatchSnapshot();
            });
        });

        describe('when activeTheme is the current theme and isPurchased is true', () => {
            it('renders correctly', () => {
                const sideMenu = shallow(
                    <SideMenu
                        activeThemeId="7777-9999-1111-0000"
                        features={features}
                        isPurchased={true}
                        themeDesignSections={themeDesignSections}
                        settings={mockSettings}
                        themeId="7777-9999-1111-0000"
                        themeName="Catstone Box"
                        configurationId="3333-2222-111111-00000"
                        variationId="2222-11111-0000-44444"
                        versionId="2221-211111-0111-41111"
                        postThemeConfigData={mockpostThemeConfig}
                        {...routeProps}
                    />
                );

                expect(sideMenu).toMatchSnapshot();
            });
        });

        describe('when isPurchased is false', () => {
            it('renders correctly', () => {
                const sideMenu = shallow(
                    <SideMenu
                        activeThemeId="7777-9999-1111-0000"
                        features={features}
                        isPurchased={false}
                        themeDesignSections={themeDesignSections}
                        settings={mockSettings}
                        themeId="7777-9999-1111-0000"
                        themeName="Catstone Box"
                        configurationId="3333-2222-111111-00000"
                        variationId="2222-11111-0000-44444"
                        versionId="2221-211111-0111-41111"
                        postThemeConfigData={mockpostThemeConfig}
                        {...routeProps}
                    />
                );

                expect(sideMenu).toMatchSnapshot();
            });
        });
    });
});
