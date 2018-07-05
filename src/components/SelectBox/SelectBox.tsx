import React, { ChangeEvent, Component } from 'react';

import { ThemeConfigChange } from '../../actions/theme';

import { Container, Label, Select } from './styles';

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

class SelectBox extends Component<SelectBoxProps> {

  handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange!({[this.props.name]: e.target.value});
  };

  render() {
      const { label, options } = this.props;

      return (
          <Container>
              <Label>{label}</Label>
              <Select value={this.props.selected} onChange={this.handleChange}>
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
