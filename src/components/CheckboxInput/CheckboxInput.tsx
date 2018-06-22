import React, { PureComponent, ChangeEvent } from 'react';
import uuid from 'uuid';

import { Input, Label, Container, HiddenLabel } from './styles';
import { ThemeConfigChange } from '../../actions/theme';

interface CheckboxInputProps {
    inputId?: string;
    label?: string;
    name: string;
    checked: boolean;
    onChange?(configChange: ThemeConfigChange): void;
}

interface CheckboxInputState {
  checked: boolean;
  inputId: string;
}

class CheckboxInput extends PureComponent<CheckboxInputProps, CheckboxInputState, {}> {
 readonly state: CheckboxInputState = {
    checked: this.props.checked,
    inputId: this.props.inputId || uuid(),
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ checked: e.target.checked });
    this.props.onChange!({[this.props.name]: e.target.checked});
  };

  render() {
    const { checked, inputId } = this.state;
    const { label } = this.props;

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
