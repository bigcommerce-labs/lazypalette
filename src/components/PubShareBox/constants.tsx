export enum Modes {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PREVIEW = 'PREVIEW',
    UNKNOWN = 'UNKNOWN',
}

export const PublishModalText = {
    [Modes.ACTIVE]: {
        action: 'Publish',
        body: 'Publishing your store will make all changes publicly visible',
        title: 'Publish Changes',
    },
    [Modes.INACTIVE]: {
        action: 'Use As Active Theme',
        body: 'You are about to make this the active theme in your store.',
        title: 'Use As Active Theme',
    },
};

export const ResetModalText = {
    action: 'Undo Changes',
    body: 'This will discard any changes made since the last time you saved.',
    title: 'Undo Changes',
};

export const purchaseEndPoint = (variationId: string) =>
    `/manage/marketplace/themes/${variationId}?action=purchase`;
