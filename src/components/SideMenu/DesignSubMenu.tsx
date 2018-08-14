import React, { Component } from 'react';

import ButtonInput from '../ButtonInput/ButtonInput';
import { Messages } from '../Modal/constants';
import ConfirmModal from '../Modal/ConfirmModal';
import { appRoutes } from '../Routes/Routes';

import { DesignMenuButtons } from './styles';
import SubMenu from './SubMenu';

interface MenuItem {
    label: string;
    path: string;
}

interface DesignSubMenuProps {
    sections: string[];
    currentPath: string;
    isChanged: boolean;
    themeName: string;
    handleSave(): void;
    resetTheme(): void;
}

interface DesignSubMenuState {
    isResetOpen: boolean;
}

const staticItems: MenuItem[] = [
    {
        label: 'Styles',
        path: appRoutes.styles.route,
    },
];

const getItems = (sections: string[]) => {
    return sections.map((section: string, index: number) => (
        {
            label: section,
            path: `${appRoutes.section.route}${index}`,
        }
    ));
};

class DesignSubMenu extends Component<DesignSubMenuProps, DesignSubMenuState> {
    readonly state: DesignSubMenuState = { isResetOpen: false };

    open = () => this.setState({ isResetOpen: true });

    close = () => this.setState({ isResetOpen: false });

    handleSave = () => this.props.handleSave();

    handleReset = () => {
        this.setState({ isResetOpen: false }, () => {
            this.props.resetTheme();
        });
    };

    render() {
        const { currentPath, isChanged, themeName } = this.props;
        const { isResetOpen } = this.state;

        return (
            <>
                <SubMenu
                    title={themeName}
                    items={[...staticItems, ...getItems(this.props.sections)]}
                    currentPath={currentPath}
                    showArrows={true}
                />
                <DesignMenuButtons>
                    <ButtonInput
                        onClick={this.handleSave}
                        classType="primary"
                        type="button"
                    >
                        Save
                    </ButtonInput>
                    <ButtonInput
                        onClick={this.open}
                        disabled={!isChanged}
                        type="button"
                    >
                        Reset
                    </ButtonInput>
                </DesignMenuButtons>
                {isResetOpen &&
                    <ConfirmModal
                        body={Messages.Reset}
                        primaryAction={this.close}
                        secondaryAction={this.handleReset}
                        title="Reset Warning"
                    />
                }
            </>
        );
    }
}

export default DesignSubMenu;
