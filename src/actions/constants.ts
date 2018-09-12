export const enum ConfigUpdateAction {
    PREVIEW = 'PREVIEW',
    SAVE = 'SAVE',
    PUBLISH =  'PUBLISH',
}

export const enum ToastMessages {
    ErrorPreview = 'There was an error previewing your changes.',
    ErrorPublish = 'There was an error publishing your changes.',
    ErrorSave = 'There was an error saving your changes.',
    Publish = 'Changes have been published.',
    Save = 'Changes have been saved.',
    Undo = 'Changes have been undone.',
}

export const enum ToastType {
    Success = 'Success',
    Invalid = 'Invalid',
}

export const enum ToastTimeout {
    Duration = 6000,
}
