import React from 'react';

import StyledDiv from './styles/StyledDiv';
import StyledLabel from './styles/StyledLabel';
import StyleOption from './styles/StyledOption';
import StyleSelect from './styles/StyledSelect';

interface SelectBoxProps {
    label?: string;
    options: string[];
}

class SelectBox extends React.Component<SelectBoxProps, {}> {
    static defaultProps = {
        label: undefined,
        options: undefined,
    };

    render() {
        const { label, options } = this.props;
        const StyleOptions = options.map((option: string) => (
            <StyleOption key={window.btoa(option)}>
                { option }
            </StyleOption>
        ));

        return (
            <StyledDiv>
                <StyledLabel>
                    { label }
                </StyledLabel>
                <StyleSelect>
                    { StyleOptions }
                </StyleSelect>
            </StyledDiv>
        );
    }
}

export default SelectBox;
