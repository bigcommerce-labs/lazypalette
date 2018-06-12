import React, { SFC } from 'react';
import uuid from 'uuid';

import { Input, Label, Container, HiddenLabel } from './styles';

interface CheckboxInputProps {
    inputId?: string;
    label?: string;
}

const CheckboxInput: SFC<CheckboxInputProps> = ({ inputId = uuid(), label }) => (
  <Container>
    <Input id={inputId} />
    <Label htmlFor={inputId} />
    <HiddenLabel>{label}</HiddenLabel>
  </Container>
);

export default CheckboxInput;
