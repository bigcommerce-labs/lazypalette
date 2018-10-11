import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';

import { HeaderMenuLinks } from './constants';
import { BCLogoInline } from './styles';
import HeaderMenuLogo from './HeaderMenuLogo';

describe('HeaderMenuLogo', () => {
    describe('when rendering', () => {
        it('renders the component', () => {
            const headerMenu = shallow(<HeaderMenuLogo isChanged={false} />);

            expect(toJson(headerMenu)).toMatchSnapshot();
        });
    });

    describe('when handleLogo is clicked', () => {
        describe('when there are no theme changes', () => {
            it('invokes window.location.assign with control panel address', () => {
                const component = mount(
                    <HeaderMenuLogo isChanged={false} />
                );

                const _window: any = window;
                _window.location.assign = jest.fn();

                expect(_window.location.assign).not.toBeCalled();
                component.find(BCLogoInline).simulate('click');
                expect(_window.location.assign).toBeCalledWith(
                    `/${HeaderMenuLinks.ControlPanel}`
                );
            });
        });

        describe('when there are unsaved theme changes', () => {
            it('should open up the confirm dialog modal', () => {
                const component = mount(
                    <HeaderMenuLogo isChanged={true} />
                );

                expect(component.find(ConfirmModal).exists()).toEqual(false);
                component.find(BCLogoInline).simulate('click');
                expect(component.find(ConfirmModal).exists()).toEqual(true);
            });
        });
    });
});
