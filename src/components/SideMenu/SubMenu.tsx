import React from 'react';

import { activeClassName, BackLink, NavItem } from './styles';
import MenuItems from './MenuItems';

interface SubMenuItem {
  label: string;
  path: string;
}

interface SubMenuProps {
  title: string;
  items?: SubMenuItem[];
  currentPath: string;
}

const SubMenu = ({currentPath, items = [], title}: SubMenuProps) => (
  <div>
    <BackLink>
      <NavItem to="/" exact activeClassName={activeClassName}>&lt; {title}</NavItem>
    </BackLink>
    <MenuItems items={items} currentPath={currentPath}/>
  </div>
);

export default SubMenu;
