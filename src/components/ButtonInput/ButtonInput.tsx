import React, { MouseEvent, MouseEventHandler, PureComponent } from 'react';

import { Button, Wrapper } from './styles';

interface ButtonInputProps extends Partial<{
    children: JSX.Element | string;
    classType: string;
    disabled: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
    type: string;
}> {}

class ButtonInput extends PureComponent<ButtonInputProps> {
    handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        this.props.onClick!(e);
    };

    render() {
        const { disabled, classType, type, children } = this.props;

        return (
            <Wrapper>
                <Button
                    disabled={disabled}
                    onClick={this.handleClick}
                    classType={classType}
                    type={type}>
                    {children}
                </Button>
            </Wrapper>
        );
    }
}

export default ButtonInput;
