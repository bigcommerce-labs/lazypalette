import React, { Component } from 'react';

import ButtonInput from '../ButtonInput/ButtonInput';

import SubMenu from './SubMenu';

interface MenuItem {
    label: string;
    path: string;
}

interface DesignSubMenuProps {
    sections: string[];
    currentPath: string;
    handleSave?(): void;
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

class DesignSubMenu extends Component<DesignSubMenuProps> {
    handleSave = () => {
        this.props.handleSave!();
    };

    render() {
        return (
            <>
                <SubMenu
                    title="Design"
                    items={[...staticItems, ...getItems(this.props.sections)]}
                    currentPath={this.props.currentPath}
                    showArrows={false}
                />
                <ButtonInput
                    onClick={this.handleSave}
                    disabled={false}
                    classType="primary"
                    type="button"
                >
                    Save
                </ButtonInput>
            </>
        );
    }
}

export default DesignSubMenu;
