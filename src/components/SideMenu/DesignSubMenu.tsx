import React, { PureComponent } from 'react';

import { appRoutes } from '../Routes/Routes';

import SubMenu from './SubMenu';

interface MenuItem {
    label: string;
    path: string;
}

interface DesignSubMenuProps {
    sections: string[];
    currentPath: string;
    themeName: string;
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

class DesignSubMenu extends PureComponent<DesignSubMenuProps> {
    render() {
        const { currentPath, themeName } = this.props;

        return (
            <SubMenu
                title={themeName}
                items={[...staticItems, ...getItems(this.props.sections)]}
                currentPath={currentPath}
                showArrows={true}
            />
        );
    }
}

export default DesignSubMenu;
