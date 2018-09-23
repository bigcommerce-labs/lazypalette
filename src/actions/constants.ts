export const enum ConfigUpdateAction {
    PREVIEW = 'PREVIEW',
    SAVE = 'SAVE',
    PUBLISH =  'PUBLISH',
    UPDATE = 'UPDATE',
}

export const enum ToastMessages {
    ErrorSwitchToThemeEditor = 'There was an error switching to old Theme Editor',
    ErrorPreview = 'There was an error previewing your changes.',
    ErrorPublish = 'There was an error publishing your changes.',
    ErrorSave = 'There was an error saving your changes.',
    Publish = 'Changes have been published.',
    Reset = 'Changes have been reset.',
    Save = 'Changes have been saved.',
    Undo = 'Changes have been undone.',
    Update = 'Theme has been updated',
}

export const enum ToastType {
    Success = 'Success',
    Invalid = 'Invalid',
}

export const enum ToastTimeout {
    Duration = 6000,
}
