import React, {SFC} from 'react';

import ButtonInput from '../../ButtonInput/ButtonInput';
import { ButtonWrapper } from '../styles';

interface ActiveActionProps {
    isPrelaunchStore: boolean;
    loading: boolean;
    handlePublish(): void;
    handleSave(): void;
}

const ActiveAction: SFC<ActiveActionProps> = props => {
    return (
        <>
            {props.isPrelaunchStore ?
                <>
                    <ButtonWrapper>
                        <ButtonInput
                            onClick={props.handlePublish}
                            classType="primary"
                            type="button"
                            testId="save"
                            disabled={props.loading}
                        >
                            Save
                        </ButtonInput>
                    </ButtonWrapper>
                </> :
                <>
                    <ButtonWrapper>
                        <ButtonInput
                            onClick={props.handleSave}
                            type="button"
                            testId="save"
                            disabled={props.loading}
                        >
                            Save
                        </ButtonInput>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <ButtonInput
                            onClick={props.handlePublish}
                            classType="primary"
                            disabled={props.loading}
                            testId="publish"
                        >
                            Publish
                        </ButtonInput>
                    </ButtonWrapper>
                </>
            }
        </>
    );
};

export default ActiveAction;
