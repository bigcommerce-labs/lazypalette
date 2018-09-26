import React from 'react';

import { Link, ModalParagraph } from './styles';

export const CopyThemeText = {
    action: 'Go to My Themes',
    body: `You must make a copy of your theme to edit the theme files.`,
    title: 'Edit Theme Files',
};

const designPolicyUrl = 'https://support.bigcommerce.com/articles/Public/BigCommerce-Design-Policy';

export const EditThemeFilesText = {
    action: 'Edit Theme Files',
    bodyActive:
        <>
            <ModalParagraph>
                It looks like you're about to modify your active theme by editing its theme files. Any changes you apply
                to your active theme will be made to your live store.
            </ModalParagraph>
            <ModalParagraph>
                Please note that BigCommerce is unable to offer support for any theme that has been modified with Edit
                Theme Files.&nbsp;
                <Link href={designPolicyUrl} target="_blank">
                    Learn more
                </Link>
            </ModalParagraph>
        </>,
    bodyInactive:
        <ModalParagraph>
            It looks like you're about to modify your theme by editing its theme files. Please note that BigCommerce
            is unable to offer support for any theme that has been modified with Edit Theme Files.&nbsp;
            <Link href={designPolicyUrl} target="_blank">
                Learn more
            </Link>
        </ModalParagraph>,
    title: 'Edit Theme Files',
};

export const RestoreOriginalText = {
    action: 'Restore',
    body: `All changes to this theme will be restored back to its default settings. This will not publish changes to
        your live store.`,
    title: 'Restore original theme style',
};

export enum CurrentModal {
    COPY_THEME = 'COPY_THEME',
    EDIT_THEME_FILES = 'EDIT_THEME_FILES',
    NONE = 'NONE',
    RESET = 'RESET',
}

export const FileEditorPath = (versionId: string, variationId: string, configurationId: string) =>
    `/manage/file-editor/${versionId}/${variationId}/${configurationId}`;

export const MyThemesPath = '/manage/storefront-manager/my-themes';
