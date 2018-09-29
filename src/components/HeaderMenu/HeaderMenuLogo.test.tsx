import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

import BrowserContext from '../../context/BrowserContext';

import {HeaderMenuLinks} from './constants';
import { BCLogoInline } from './styles';
import HeaderMenuLogo from './HeaderMenuLogo';

describe('<HeaderMenuLogo />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            const headerMenu = shallow(<HeaderMenuLogo/>);

            expect(toJson(headerMenu)).toMatchSnapshot();
        });
    });

    describe('handleLogoClick', () => {
        test('invokes window.location.assign with control panel address', () => {
            const mockWindow = {
                location: {
                    assign: jest.fn(),
                    hostname: 'predators/cats/meow',
                    protocol: 'gopher:',
                },
            };
            const component = mount(
                <BrowserContext.Provider value={{ _window: mockWindow }}>
                    <HeaderMenuLogo />
                </BrowserContext.Provider>
            );

            expect(mockWindow.location.assign).not.toBeCalled();
            component.find(BCLogoInline).simulate('click');
            expect(mockWindow.location.assign).toBeCalledWith(
                `${mockWindow.location.protocol}//${mockWindow.location.hostname}/${HeaderMenuLinks.CONTROL_PANEL}`
            );
        });
    });
});
