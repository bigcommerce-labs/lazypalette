import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { sessionHeartbeatResponse } from '../../actions/sessionHeartbeat';
import { State } from '../../reducers/reducers';
import { throttledHeartbeat } from '../../services/sessionHeartbeat';

interface UserSessionActivityProps {
    heartbeatResponse: Dispatch<State>;
    oauthBaseUrl: string;
    children: JSX.Element;
}

/*
 * HoC which handles keeping the users session active. When used, any events which this component listens for will
 * be sent to a throttled heartbeat which will keep the users session active in the control panel.
 */
export const UserSessionActivity: SFC<UserSessionActivityProps> = ({ children, oauthBaseUrl, heartbeatResponse }) => (
    <div onClick={throttledHeartbeat(oauthBaseUrl, heartbeatResponse)}>
        {children}
    </div>
);

const mapDispatchToProps = {
    heartbeatResponse: sessionHeartbeatResponse,
};

export default connect(null, mapDispatchToProps)(UserSessionActivity);
