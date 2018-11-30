import { Button, ButtonStyles } from 'pattern-lab';
import React, {SFC} from 'react';

import { ButtonWrapper } from '../styles';

interface InactiveActionProps {
    isPrelaunchStore: boolean;
    loading: boolean;
    handlePublish(): void;
    handleSave(): void;
}

const InactiveAction: SFC<InactiveActionProps> = props => {
    const publishTestId = props.isPrelaunchStore ? 'use-as-active' : 'publish';
    const publishActionText = props.isPrelaunchStore ? 'Use as Active Theme' : 'Publish';

    return (
        <>
            <ButtonWrapper>
                <Button
                    buttonStyle={ButtonStyles.Outlined}
                    onClick={props.handleSave}
                    testId="save"
                    disabled={props.loading}
                >
                    Save
                </Button>
            </ButtonWrapper>
            <ButtonWrapper>
                <Button
                    onClick={props.handlePublish}
                    disabled={props.loading}
                    testId={publishTestId}
                >
                    {publishActionText}
                </Button>
            </ButtonWrapper>
        </>
    );
};

export default InactiveAction;
