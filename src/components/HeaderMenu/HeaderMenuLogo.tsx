import React, {PureComponent} from 'react';

import BrowserContext, { Browser } from '../../context/BrowserContext';

import { HeaderMenuLinks, HeaderMenuMessages } from './constants';
import { BCLogo } from './styles';

class HeaderMenuLogo extends PureComponent {
    handleLogoClick = (_window: Window) => () => {
        _window.location.assign(
            `${_window.location.protocol}//${_window.location.hostname}/${HeaderMenuLinks.CONTROL_PANEL}`
        );
    };

    render() {
        return (
            <BrowserContext.Consumer>
                {({_window}: Browser) =>
                    <BCLogo tooltip={HeaderMenuMessages.GO_BACK} onClick={this.handleLogoClick(_window)}/>
                }
            </BrowserContext.Consumer>
        );
    }
}

export default HeaderMenuLogo;
