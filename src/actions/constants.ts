export const enum ConfigUpdateAction {
    PREVIEW = 'PREVIEW',
    SAVE = 'SAVE',
    PUBLISH =  'PUBLISH',
    UPDATE = 'UPDATE',
}

export const enum ToastMessages {
    ErrorSwitchToThemeEditor = 'There was an error switching to the old Theme Editor.',
    ErrorHistory = 'There was an error switching to the selected Theme History entry.',
    ErrorPreview = 'There was an error previewing your changes.',
    ErrorPublish = 'There was an error publishing your changes.',
    ErrorReset = 'There was an error restoring the original theme styles.',
    ErrorSave = 'There was an error saving your changes.',
    ErrorUpdate = 'There was an error applying your update.',
    ErrorVariation = 'There was an error switching styles.',
    Publish = 'Changes have been published.',
    Reset = 'Original theme styles restored.',
    Save = 'Changes have been saved.',
    Undo = 'Changes have been undone.',
    Update = 'Theme has been updated.',
}

export const enum ToastType {
    Success = 'Success',
    Error = 'Error',
}

export const enum ToastTimeout {
    Duration = 6000,
}
