import { Icon } from 'pattern-lab';
import React from 'react';

import { activeClassName, BackLink, BackLinkIcon, NavItem } from './styles';
import MenuItems from './MenuItems';

interface SubMenuItem {
    label: string;
    path: string;
}

interface SubMenuProps {
    title: string;
    items?: SubMenuItem[];
    showArrows?: boolean;
    currentPath: string;
}

const SubMenu = ({ currentPath, items = [], title, showArrows }: SubMenuProps) => (
    <div>
        <BackLink>
            <NavItem to="/" exact activeClassName={activeClassName}>
                <BackLinkIcon>
                    <Icon glyph="chevronLeft" size="larger" />
                </BackLinkIcon>
                {title}
            </NavItem>
        </BackLink>
        <MenuItems items={items} currentPath={currentPath} showArrows={showArrows}/>
    </div>
);

export default SubMenu;
