import React, {SFC} from 'react';

import ButtonInput from '../../ButtonInput/ButtonInput';

interface ActiveActionProps {
    canPublish: boolean;
    canSave: boolean;
    isPrelaunchStore: boolean;
    handlePublish(): void;
    handleSave(): void;
}

const ActiveAction: SFC<ActiveActionProps> = props => {
    return (
        <>
            {props.isPrelaunchStore ?
                <>
                    <ButtonInput
                        onClick={props.handlePublish}
                        classType="primary"
                        type="button"
                        testId="save"
                        disabled={!props.canSave}
                    >
                        Save
                    </ButtonInput>
                </> :
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
                        testId="publish"
                    >
                        Publish
                    </ButtonInput>
                </>
            }
        </>
    );
};

export default ActiveAction;
