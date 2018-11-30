import { Button, ButtonStyles} from 'pattern-lab';
import React, {SFC} from 'react';

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
                        <Button
                            onClick={props.handlePublish}
                            testId="save"
                            disabled={props.loading}
                        >
                            Save
                        </Button>
                    </ButtonWrapper>
                </> :
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
                            testId="publish"
                        >
                            Publish
                        </Button>
                    </ButtonWrapper>
                </>
            }
        </>
    );
};

export default ActiveAction;
