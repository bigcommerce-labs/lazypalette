import React, { PureComponent } from 'react';

import { appRoutes } from '../Routes/Routes';

import MenuItems from './MenuItems';

interface MenuItem {
    divider?: boolean;
    label: string;
    path: string;
    externalLink?: boolean;
}

interface DesignSubMenuProps {
    sections: string[];
    currentPath: string;
}

const staticTopItems: MenuItem[] = [
    {
        label: 'Styles',
        path: appRoutes.styles.route,
    },
];

const staticBottomItems: MenuItem[] = [
    {
        divider: true,
        label: 'History',
        path: appRoutes.history.route,
    },
    {
        label: 'More Options',
        path: appRoutes.options.route,
    },
    {
        externalLink: true,
        label: 'Help',
        path: 'https://support.bigcommerce.com/articles/Public/Stencil-Themes/#enabling',
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
        const { currentPath } = this.props;

        return (
            <MenuItems
                items={[...staticTopItems, ...getItems(this.props.sections), ...staticBottomItems]}
                currentPath={currentPath}
                showArrows={true}
            />
        );
    }
}

export default DesignSubMenu;
