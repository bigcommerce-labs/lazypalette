export enum Modes {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PREVIEW = 'PREVIEW',
    UNKNOWN = 'UNKNOWN',
    UPDATE = 'UPDATE',
}

export const PublishModalText = {
    [Modes.ACTIVE]: {
        action: 'Publish',
        body: 'Publishing your store will make all changes publicly visible.',
        title: 'Publish Theme',
    },
    [Modes.INACTIVE]: {
        launched: {
            action: 'Publish',
            body: 'Publishing your store will make all changes publicly visible.',
            title: 'Publish Theme',
        },
        prelaunch: {
            action: 'Use As Active Theme',
            body: 'You are about to make this the active theme in your store.',
            title: 'Use As Active Theme',
        },
    },
    [Modes.UPDATE]: {
        action: 'Apply Update',
        body: 'You are about to apply an update to this theme.',
        title: 'Apply Update',
    },
};

export const ResetModalText = {
    action: (changes: number) => `Undo ${changes} Change${changes > 1 ? 's' : ''}`,
    actionTestId: 'undo-changes',
    body: 'This will discard any changes made since the last time you saved.',
    title: 'Undo Changes',
};

export const purchaseEndPoint = (variationId: string) =>
    `/manage/marketplace/themes/${variationId}?action=purchase`;
