import React, { Component } from 'react';

import ButtonInput from '../ButtonInput/ButtonInput';
import { Messages } from '../Modal/constants';
import ConfirmModal from '../Modal/ConfirmModal';

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
    handleSave(): void;
    resetTheme(): void;
}

interface DesignSubMenuState {
    isResetOpen: boolean;
}

const staticItems: MenuItem[] = [
    {
        label: 'Logo and name',
        path: 'logo',
    },
    {
        label: 'Store theme',
        path: 'theme',
    },
];

const getItems = (sections: string[]) => {
    return sections.map((section: string, index: number) => (
        {
            label: section,
            path: `style/${index}`,
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
        const { currentPath, isChanged } = this.props;
        const { isResetOpen } = this.state;

        return (
            <>
                <SubMenu
                    title="Design"
                    items={[...staticItems, ...getItems(this.props.sections)]}
                    currentPath={currentPath}
                    showArrows={false}
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
                        onClose={this.close}
                        secondaryAction={this.handleReset}
                        title="Reset Warning"
                    />
                }
            </>
        );
    }
}

export default DesignSubMenu;
