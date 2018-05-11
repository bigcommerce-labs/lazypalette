import React, { Component } from 'react';
import styled from 'styled-components';

import { activeClassName, NavItem } from './styles';
import MenuItems from './MenuItems';

const BackLink = styled.div`
  color: #34343B;
  font-size: 24px;
  margin-bottom: 30px;
  margin-left: 28px;
`;

interface SubMenuItem {
  label: string;
  path: string;
}

interface SubMenuProps {
  title: string;
  items?: SubMenuItem[];
  match: any;
}

class SubMenu extends Component<SubMenuProps, any> {
  static defaultProps: Partial<SubMenuProps> = {
    items: [],
  };

  constructor(props: SubMenuProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <BackLink>
          <NavItem to="/" exact activeClassName={activeClassName}>&lt; {this.props.title}</NavItem>
        </BackLink>
        <MenuItems items={this.props.items!} match={this.props.match}/>
      </div>
    );
  }
}

export default SubMenu;
