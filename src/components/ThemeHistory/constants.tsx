export const enum Messages {
    Reset = 'This theme has unpublished changes. Do you want to proceed?',
    Restore = 'You have unsaved changes that will be lost if you decide to continue. ' +
        'Are you sure you want to restore this version?',
}

export const enum MessagesActionText {
    Restore = 'Restore version',
}

export const enum MessagesTitle {
    Restore = 'Restore previous version?',
}

export const PostLaunchTypeLabels = {
    default: 'Default Settings',
    installed: 'Published',
    saved: 'Saved',
    upgrade: 'Update',
};

export const PreLaunchTypeLabels = {
    default: 'Default Settings',
    installed: 'Saved',
    saved: 'Saved',
    upgrade: 'Update',
};
