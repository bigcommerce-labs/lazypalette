export const enum Messages {
    Publish = 'Publishing your store will make all changes publicly visible',
    Reset = 'This theme has unpublished changes. Do you want to proceed?',
}

export const purchaseEndPoint = (variationId: string) =>
    `/manage/marketplace/themes/${variationId}?action=purchase`;
