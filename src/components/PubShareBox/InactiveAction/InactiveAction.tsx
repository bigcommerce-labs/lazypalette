import React, {SFC} from 'react';

import ButtonInput from '../../ButtonInput/ButtonInput';

interface InactiveActionProps {
    canPublish: boolean;
    canSave: boolean;
    isPrelaunchStore: boolean;
    handlePublish(): void;
    handleSave(): void;
}

const InactiveAction: SFC<InactiveActionProps> = props => {
    const publishTestId = props.isPrelaunchStore ? 'use-as-active' : 'publish';
    const publishActionText = props.isPrelaunchStore ? 'Use as Active Theme' : 'Publish';

    return (
        <>
            <ButtonInput
                onClick={props.handleSave}
                type="button"
                testId="save"
                disabled={!props.canSave}
            >
                Save
            </ButtonInput>
            <ButtonInput
                onClick={props.handlePublish}
                classType="primary"
                disabled={!props.canPublish}
                testId={publishTestId}
            >
                {publishActionText}
            </ButtonInput>
        </>
    );
};

export default InactiveAction;
