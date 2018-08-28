import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { sessionHeartbeatResponse } from '../../actions/sessionHeartbeat';
import BrowserContext, { Browser } from '../../context/BrowserContext';
import { State } from '../../reducers/reducers';
import { throttledHeartbeat } from '../../services/sessionHeartbeat';

import AlertModal from '../Modal/AlertModal/AlertModal';

import { Messages } from './constants';

interface UserSessionActivityProps {
    heartbeatResponse: Dispatch<State>;
    oauthBaseUrl: string;
    children: JSX.Element;
    isLoggedIn: boolean;
}

/*
 * HoC which handles keeping the users session active. When used, any events which this component listens for will
 * be sent to a throttled heartbeat which will keep the users session active in the control panel.
 */
export const UserSessionActivity: SFC<UserSessionActivityProps> = ({
    children,
    oauthBaseUrl,
    heartbeatResponse,
    isLoggedIn,
}) => {
    const close = (_window: any) => {
        _window.location.href = `${oauthBaseUrl}/deep-links/store-design`;
    };

    return (
        <div onClick={throttledHeartbeat(oauthBaseUrl, heartbeatResponse)}>
            {!isLoggedIn &&
                <BrowserContext.Consumer>
                    {({ _window }: Browser) =>
                        <AlertModal
                            title={Messages.LogoutAlertHeading}
                            body={Messages.LogoutAlertBody}
                            primaryAction={() => close(_window)}
                        />
                    }
                </BrowserContext.Consumer>
            }
            {children}
        </div>
    );
};

const mapDispatchToProps = {
    heartbeatResponse: sessionHeartbeatResponse,
};

const mapStateToProps = (state: State) => ({
    isLoggedIn: state.session.isLoggedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSessionActivity);
