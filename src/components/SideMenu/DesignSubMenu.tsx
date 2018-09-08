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
    currentPath: string;
    isPreview: boolean;
    sections: string[];
}

const staticTopItems: MenuItem[] = [
    {
        label: 'Styles',
        path: appRoutes.styles.route,
    },
];

const staticBottomPreviewItems: MenuItem[] = [
    {
        divider: true,
        externalLink: true,
        label: 'Help',
        path: 'https://support.bigcommerce.com/articles/Public/Stencil-Themes/#enabling',
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
        const { currentPath, isPreview } = this.props;
        const items = [...staticTopItems, ...getItems(this.props.sections)];

        if (isPreview) {
            items.push(...staticBottomPreviewItems);
        } else {
            items.push(...staticBottomItems);
        }

        return (
            <MenuItems
                items={items}
                currentPath={currentPath}
                showArrows={true}
            />
        );
    }
}

export default DesignSubMenu;
