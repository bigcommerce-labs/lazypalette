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
        title: 'Publish Changes',
    },
    [Modes.INACTIVE]: {
        action: 'Publish',
        body: 'Publishing your store will make all changes publicly visible.',
        title: 'Publish Changes',
    },
    [Modes.UPDATE]: {
        action: 'Apply Update',
        body: 'You are about to apply an update to this theme.',
        title: 'Apply Update',
    },
};

export const ResetModalText = {
    action: 'Undo Changes',
    body: 'This will discard any changes made since the last time you saved.',
    title: 'Undo Changes',
};

export const purchaseEndPoint = (variationId: string) =>
    `/manage/marketplace/themes/${variationId}?action=purchase`;
