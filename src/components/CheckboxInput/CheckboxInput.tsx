import React, { ChangeEvent, PureComponent } from 'react';
import uuid from 'uuid';

import { Container, HiddenLabel, Input, Label } from './styles';

interface CheckboxInputProps {
    inputId?: string;
    label?: string;
    name: string;
    checked: boolean;
    onChange?(configChange: {[key: string]: boolean}): void;
}

interface CheckboxInputState {
    inputId: string;
}

class CheckboxInput extends PureComponent<CheckboxInputProps, CheckboxInputState, {}> {
 readonly state: CheckboxInputState = {
     inputId: this.props.inputId || uuid(),
 };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      this.props.onChange!({[this.props.name]: e.target.checked});
  };

  render() {
      const { inputId } = this.state;
      const { label, checked } = this.props;

      return (
          <Container>
              <Input
                  id={inputId}
                  checked={checked}
                  onChange={this.handleChange}
              />
              <Label htmlFor={inputId} />
              <HiddenLabel>{label}</HiddenLabel>
          </Container>
      );
  }
}

export default CheckboxInput;
