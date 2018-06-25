import React, { Component } from 'react';

import SubMenu from './SubMenu';

interface MenuItem {
    label: string;
    path: string;
}

interface DesignSubMenuProps {
    sections: string[];
    currentPath: string;
}

const staticItems: MenuItem[] = [
    {
        label: 'Logo and Store Name',
        path: 'logo',
    },
    {
        label: 'Store Theme',
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

class DesignSubMenu extends Component<DesignSubMenuProps, {}> {
    render() {
        return (
            <SubMenu
                title="Design"
                items={[...staticItems, ...getItems(this.props.sections)]}
                currentPath={this.props.currentPath}
            />
        );
    }
}

export default DesignSubMenu;
