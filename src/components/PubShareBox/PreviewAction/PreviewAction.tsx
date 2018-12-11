import { Button } from 'pattern-lab';
import React, { SFC } from 'react';

import { purchaseEndPoint } from '../constants';

import { trackAddTheme } from '../../../services/analytics';
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

    const handlePurchase = () => {
        trackAddTheme(variationId, actionText);
        window.location.assign(purchaseEndPoint(variationId));
    };

    return (
        <ButtonWrapper>
            <Button
                onClick={handlePurchase}
                testId={actionTestId}
            >
                {actionText}
            </Button>
        </ButtonWrapper>
    );
};

export default PreviewAction;
