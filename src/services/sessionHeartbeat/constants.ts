export const HeartbeatInterval = 10000; // milliseconds

export const enum Links {
    Route = '/session/heartbeat?last_active=',
    CPRoute = '/admin/remote.php?w=heartbeat',
}

export const Messages = {
    AliveStatus: 'ALIVE',
    LogoutCP: 'CP - Logged Out',
    LogoutSvc: 'LoginSvc - Logged Out',
};
