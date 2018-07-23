import React from 'react';

import ButtonInput from '../ButtonInput/ButtonInput';

import { Publish } from './styles';

interface PubShareBoxProps extends Partial<{
    canPublish: boolean;
    onPublish(): void;
}> {}

const PubShareBox = ({ onPublish, canPublish }: PubShareBoxProps ) => {
    return (
        <Publish>
            <ButtonInput
                onClick={onPublish}
                classType="primary"
                disabled={!canPublish}
            >
                Publish
            </ButtonInput>
        </Publish>
    );
};

export default PubShareBox;
