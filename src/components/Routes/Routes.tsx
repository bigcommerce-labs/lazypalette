import React, { PureComponent } from 'react';
import { withRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';

import PreviewPane from '../PreviewPane/PreviewPane';

import { NoMatch } from './constants';
import { Body, Container, Heading } from './styles';

export const appRoutes = {
    history: {
        path: '/history',
        route: 'history',
    },
    home: {
        path: '/',
        route: '/',
    },
    options: {
        path: '/options',
        route: 'options',
    },
    section: {
        path: '/section/:id(\\d+)',
        route: 'section/',
    },
    styles: {
        path: '/styles',
        route: 'styles',
    },
};

export const NoRoute = () => (
    <Container>
        <Heading>{NoMatch.Heading}</Heading>
        <Body>{NoMatch.Body}</Body>
    </Container>
);

interface RoutesProps extends RouteComponentProps<{}> {}

export class Routes extends PureComponent<RoutesProps> {
    render() {
        const { history, home, options, styles, section  } = appRoutes;

        return (
            <Switch>
                <Route path={history.path} exact component={PreviewPane} />
                <Route path={home.path} exact component={PreviewPane} />
                <Route path={options.path} exact component={PreviewPane} />
                <Route path={styles.path} exact component={PreviewPane} />
                <Route path={section.path} exact component={PreviewPane} />
                <Route component={NoRoute} />
            </Switch>
        );
    }
}

export default withRouter(Routes);
