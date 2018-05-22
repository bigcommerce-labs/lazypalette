import React, { SFC } from 'react';

import { Container, Label, Select } from './styles';

interface SelectBoxOption {
    label: string;
    value: string;
}

interface SelectBoxProps {
    label?: string;
    options: SelectBoxOption[];
}

const SelectBox: SFC<SelectBoxProps> = ({ label, options }) => {
    const StyleOptions = options.map((option: SelectBoxOption, index: number) => (
        <option key={index} label={option.label} value={option.value}>
            {option.value}
        </option>
    ));

    return (
        <Container>
            <Label>{label}</Label>
            <Select>{StyleOptions}</Select>
        </Container>
    );
};

export default SelectBox;
