import React, { PureComponent, SFC } from 'react';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';

import Draggable from '../Draggable/Draggable';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import { appRoutes } from '../Routes/Routes';

import { Item, List } from './styles';

interface MoreOptionsProps extends RouteComponentProps<{}> {
    position: { x: number, y: number };
}

export class MoreOptions extends PureComponent<MoreOptionsProps> {
    render() {
        const { position, match } = this.props;

        return (
            <Draggable position={position}>
                <ExpandableMenu title="More Options" back={match.url}>
                    <List>
                        <Item>Go to old Theme Editor</Item>
                        <Item>Edit Theme Files</Item>
                        <Item>Restore original theme styles</Item>
                    </List>
                </ExpandableMenu>
            </Draggable>
        );
    }
}

const RoutedThemeHistory: SFC<MoreOptionsProps> = props => (
    <Route
        path={appRoutes.options.path}
        exact
        render={() => <MoreOptions {...props}/>}
    />
);

export default withRouter(RoutedThemeHistory);
