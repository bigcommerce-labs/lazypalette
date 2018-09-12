import React, {SFC} from 'react';

import BrowserContext, {Browser} from '../../../context/BrowserContext';
import { purchaseEndPoint } from '../constants';

import ButtonInput from '../../ButtonInput/ButtonInput';
import { ButtonWrapper } from '../styles';

interface PreviewActionProps {
    price: number;
    variationId: string;
}

const PreviewAction: SFC<PreviewActionProps> = props => {
    const { price, variationId } = props;
    const themePrice = price > 0 ? (price / 10).toFixed(2) : price;
    const actionText = price > 0 ? `Buy $${themePrice}` : 'Add Theme';
    const actionTestId = price > 0 ? 'buy' : 'add-theme';

    return (
        <>
            <BrowserContext.Consumer>
                {({ _window }: Browser) =>
                    <ButtonWrapper>
                        <ButtonInput
                            classType="primary"
                            onClick={() => _window.location.assign(purchaseEndPoint(variationId))}
                            type="button"
                            testId={actionTestId}
                            disabled={false}
                        >
                            {actionText}
                        </ButtonInput>
                    </ButtonWrapper>
                }
            </BrowserContext.Consumer>
        </>
    );
};

export default PreviewAction;
