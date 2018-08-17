import React, { MouseEvent, MouseEventHandler, PureComponent } from 'react';

import { Button, Wrapper } from './styles';

interface ButtonInputProps extends Partial<{
    border: boolean;
    children: JSX.Element | string;
    classType: string;
    disabled: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
    testId?: string;
    type: string;
}> {}

class ButtonInput extends PureComponent<ButtonInputProps> {
    handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    };

    render() {
        const {
            border = true,
            disabled,
            classType,
            testId,
            type,
            children,
        } = this.props;

        return (
            <Wrapper>
                <Button
                    border={border}
                    disabled={disabled}
                    onClick={this.handleClick}
                    classType={classType}
                    type={type}
                    {...(testId ? {'data-test-id': testId} : {})}
                >
                    {children}
                </Button>
            </Wrapper>
        );
    }
}

export default ButtonInput;
