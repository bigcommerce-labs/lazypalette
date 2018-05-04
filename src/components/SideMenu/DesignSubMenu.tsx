import React, { Component } from 'react';

import SubMenu from './SubMenu';

const staticItems = [
  {
    label: 'Logo and Store Name',
    path: 'logo',
  },
  {
    label: 'Store Theme',
    path: 'theme',
  },
];

interface MenuItem {
  label: string;
  path: string;
}

interface DesignSubMenuProps {
  items: MenuItem[];
  match: any;
}

class DesignSubMenu extends Component<DesignSubMenuProps, any> {
  render() {
    return (
      <SubMenu
        title="Design"
        items={[...staticItems, ...this.props.items]}
        match={this.props.match}
      />
    );
  }
}

export default DesignSubMenu;
