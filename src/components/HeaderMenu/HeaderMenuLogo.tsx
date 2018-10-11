import React, {PureComponent} from 'react';

import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';

import { HeaderMenuLinks, HeaderMenuMessages } from './constants';
import { BCLogo } from './styles';

interface HeaderMenuLogoProps {
    isChanged?: boolean;
}

interface HeaderMenuLogoState {
    isUnsavedOpen: boolean;
}

class HeaderMenuLogo extends PureComponent<HeaderMenuLogoProps> {
    readonly state: HeaderMenuLogoState = {
        isUnsavedOpen: false,
    };

    handleLogoClick = () => {
        const { isChanged } = this.props;

        if (isChanged) {
            this.setState({ isUnsavedOpen: true });
        } else {
            this.handleLogoLink();
        }
    };

    handleLogoLink = () => window.location.assign(`/${HeaderMenuLinks.ControlPanel}`);

    handleModalCancel = () => this.setState({ isUnsavedOpen: false });

    render() {
        const { isUnsavedOpen } = this.state;

        return (
            <>
                <BCLogo tooltip={HeaderMenuMessages.GoBack} onClick={this.handleLogoClick} />
                {isUnsavedOpen &&
                    <ConfirmModal
                        primaryAction={this.handleLogoLink}
                        primaryActionText={HeaderMenuMessages.ModalAction}
                        secondaryAction={this.handleModalCancel}
                        overlayClose={this.handleModalCancel}
                        title={HeaderMenuMessages.ModalTitle}
                    >
                        {HeaderMenuMessages.UnsavedModalBody}
                    </ConfirmModal>
                }
            </>
        );
    }
}

export default HeaderMenuLogo;
