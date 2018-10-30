import React, { Component } from 'react';
import PageVisibility from 'react-page-visibility';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { sessionHeartbeatResponse } from '../../actions/sessionHeartbeat';
import BrowserContext, { Browser } from '../../context/BrowserContext';
import { State } from '../../reducers/reducers';
import { throttledHeartbeat } from '../../services/sessionHeartbeat/sessionHeartbeat';

import AlertModal from '../Modal/AlertModal/AlertModal';

import { Messages, SessionLinks } from './constants';

interface UserSessionActivityProps {
    heartbeatResponse: Dispatch<State>;
    oauthBaseUrl: string;
    children: JSX.Element;
    isLoggedIn: boolean;
    queryParams?: string;
}

/*
 * HoC which handles keeping the users session active. When used, any events which this component listens for will
 * be sent to a throttled heartbeat which will keep the users session active in the control panel.
 */
export class UserSessionActivity extends Component<UserSessionActivityProps> {
    componentDidMount() {
        this.handleHeartbeat();
    }

    handleChange = (isVisible: boolean) => {
        if (isVisible) {
            this.handleHeartbeat();
        }
    };

    handleHeartbeat = () => {
        const { heartbeatResponse, oauthBaseUrl } = this.props;

        throttledHeartbeat(oauthBaseUrl, heartbeatResponse);
    };

    handleClose = (_window: Window) => {
        const { oauthBaseUrl, queryParams = '' } = this.props;

        _window.location.assign(`${oauthBaseUrl}${SessionLinks.StoreDesign}${queryParams}`);
    };

    render() {
        const { children, isLoggedIn } = this.props;

        return (
            <PageVisibility onChange={this.handleChange}>
                <div onClick={this.handleHeartbeat}>
                    {!isLoggedIn &&
                        <BrowserContext.Consumer>
                            {({ _window }: Browser) =>
                                <AlertModal
                                    title={Messages.LogoutAlertHeading}
                                    body={Messages.LogoutAlertBody}
                                    primaryAction={() => this.handleClose(_window)}
                                />
                            }
                        </BrowserContext.Consumer>
                    }
                    {children}
                </div>
            </PageVisibility>
        );
    }
}

const mapDispatchToProps = {
    heartbeatResponse: sessionHeartbeatResponse,
};

const mapStateToProps = (state: State) => ({
    isLoggedIn: state.session.isLoggedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSessionActivity);
