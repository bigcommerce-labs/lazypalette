import React, { Component, ChangeEvent } from 'react';

import { Container, Label, Select } from './styles';
import { ThemeConfigChange } from '../../actions/theme';

interface SelectBoxOption {
    label: string;
    value: string;
}

interface SelectBoxProps {
    label?: string;
    options: SelectBoxOption[];
    selected?: string;
    name: string;
    onChange?(configChange: ThemeConfigChange): void;
}

interface SelectBoxState {
  selected: string | undefined;
}

class SelectBox extends Component<SelectBoxProps, SelectBoxState, {}> {
  readonly state: SelectBoxState = { selected: this.props.selected };

  handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selected: e.target.value });
    this.props.onChange!({[this.props.name]: e.target.value});
  };

  render() {
    const { label, options } = this.props;

    return (
      <Container>
        <Label>{label}</Label>
        <Select value={this.state.selected} onChange={this.handleChange}>
          {options.map(({ value, label: optionLabel }) => (
            <option key={value} label={optionLabel} value={value}>
              {optionLabel}
            </option>
          ))}
        </Select>
      </Container>
    );
  }
}

export default SelectBox;
