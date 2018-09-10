import React, {SFC} from 'react';

import ButtonInput from '../../ButtonInput/ButtonInput';
import { ButtonWrapper } from '../styles';

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
            <ButtonWrapper>
                <ButtonInput
                    onClick={props.handleSave}
                    type="button"
                    testId="save"
                    disabled={!props.canSave}
                >
                    Save
                </ButtonInput>
            </ButtonWrapper>
            <ButtonWrapper>
                <ButtonInput
                    onClick={props.handlePublish}
                    classType="primary"
                    disabled={!props.canPublish}
                    testId={publishTestId}
                >
                    {publishActionText}
                </ButtonInput>
            </ButtonWrapper>
        </>
    );
};

export default InactiveAction;