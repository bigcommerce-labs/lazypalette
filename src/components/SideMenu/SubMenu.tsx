import React from 'react';

import { Title } from './styles';
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
        <Title>
            {title}
        </Title>
        <MenuItems items={items} currentPath={currentPath} showArrows={showArrows}/>
    </div>
);

export default SubMenu;
