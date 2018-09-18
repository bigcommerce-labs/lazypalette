import React, {SFC} from 'react';

import ButtonInput from '../../ButtonInput/ButtonInput';
import { ButtonWrapper } from '../styles';

interface PreviewActionProps {
    handlePublish(): void;
}

const UpdateAction: SFC<PreviewActionProps> = props => {
    return (
        <ButtonWrapper>
            <ButtonInput
                onClick={props.handlePublish}
                classType="primary"
                testId="apply-update"
            >
                Apply Update
            </ButtonInput>
        </ButtonWrapper>
    );
};

export default UpdateAction;
