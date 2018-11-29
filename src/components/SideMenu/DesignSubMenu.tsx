import React, { PureComponent } from 'react';

import { appRoutes } from '../Routes/Routes';

import { Links } from './constants';
import MenuItems from './MenuItems';

interface MenuItem {
    divider?: boolean;
    label: string;
    path: string;
    externalLink?: boolean;
}

interface Section {
    name: string;
    index: number;
}

interface DesignSubMenuProps {
    currentPath: string;
    isPreview: boolean;
    sections: Section[];
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
        path: Links.Help,
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
        path: Links.Help,
    },
];

const getItems = (sections: Section[]) => {
    return sections.map((section: Section) => (
        {
            label: section.name,
            path: `${appRoutes.section.route}${section.index}`,
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
