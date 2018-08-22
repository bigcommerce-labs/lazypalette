import React, { MouseEvent, MouseEventHandler, PureComponent } from 'react';

import { Button, Wrapper } from './styles';

interface ButtonInputProps extends Partial<{
    border: boolean;
    children: JSX.Element | string;
    classType: string;
    disabled: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
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
                    type={type}>
                    {children}
                </Button>
            </Wrapper>
        );
    }
}

export default ButtonInput;
