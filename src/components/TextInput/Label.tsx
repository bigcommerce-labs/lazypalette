import React from 'react';

import StyledLabel from './styles/StyledLabel';
import StyledSmall from './styles/StyledSmall';

interface LabelProps {
    htmlFor?: string;
    note?: string;
    required?: boolean;
}

class Label extends React.PureComponent<LabelProps> {
    render() {
        const { children: label, htmlFor, note, required } = this.props;

        return (
            <StyledLabel htmlFor={htmlFor}>
                {label}
                {note &&
                    <StyledSmall required={required!}>
                        {note}
                    </StyledSmall>
                }
            </StyledLabel>
        );
    }
}

export default Label;
