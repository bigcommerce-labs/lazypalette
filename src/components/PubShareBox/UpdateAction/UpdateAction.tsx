import { Button } from 'pattern-lab';
import React, {SFC} from 'react';

import { ButtonWrapper } from '../styles';

interface PreviewActionProps {
    handlePublish(): void;
}

const UpdateAction: SFC<PreviewActionProps> = props => {
    return (
        <ButtonWrapper>
            <Button
                onClick={props.handlePublish}
                testId="apply-update"
            >
                Apply Update
            </Button>
        </ButtonWrapper>
    );
};

export default UpdateAction;
