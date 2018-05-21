import * as React from 'react';
import uuid from 'uuid';

import Label from './Label';
import { Status } from './Status';

import StyledDiv from './styles/StyledDiv';
import StyledDivContainer from './styles/StyledDivContainer';
import StyledTextInput from './styles/StyledTextInput';

export interface TextInputState {
  status: Status;
  value: string | undefined;
}

export interface TextInputProps {
  defaultValue?: string | undefined;
  disabled?: boolean;
  inputId?: string;
  inset?: string;
  label?: string;
  note?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  pattern?: string | RegExp;
  placeholder?: string;
  postfix?: string;
  prefix?: string;
  readonly?: boolean;
  required?: boolean;
  warning?: boolean;
}

export default class TextInput extends React.Component<TextInputProps, TextInputState> {
  static defaultProps = {
    defaultValue: undefined,
    disabled: false,
    inputId: uuid(),
    inset: undefined,
    label: undefined,
    note: undefined,
    onBlur: () => undefined,
    onChange: () => undefined,
    pattern: undefined,
    placeholder: undefined,
    postfix: undefined,
    prefix: undefined,
    readonly: false,
    required: false,
    warning: false,
  };

  readonly state: TextInputState = {
    status: Status.Undefined,
    value: '',
  };

  constructor(props: TextInputProps) {
    super(props);
    this.state = {
      status: Status.Undefined,
      value: props.defaultValue,
    };
  }

  componentWillMount() {
    if (this.props.pattern) {
      this.validate();
    }
  }

  render() {
    const {
      status,
    } = this.state;
    const {
      defaultValue,
      disabled,
      inputId,
      label,
      note = this.prepareNote(),
      pattern,
      placeholder,
      readonly,
      required,
      warning,
    } = this.props;

    return (
      <StyledDivContainer>
        <Label htmlFor={inputId} note={note} required={required!}>
          {label}
        </Label>
        <StyledDiv>
          <StyledTextInput
            defaultValue={defaultValue!}
            disabled={disabled!}
            id={inputId!}
            onChange={this.onChange}
            onBlur={this.onBlur}
            pattern={pattern!}
            placeholder={placeholder!}
            readonly={readonly!}
            required={required!}
            status={status}
            warning={warning!}
          />
        </StyledDiv>
      </StyledDivContainer>
    );
  }

  private onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.props.onBlur!(event);

    if (this.props.pattern) {
      this.validate();
    }
  };

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });

    this.props.onChange!(event);
  };

  private prepareNote() {
    if (this.props.note) {
      return this.props.note;
    } else if (this.props.required) {
      return 'Required*';
    } else {
      return undefined;
    }
  }

  private validate = () => {
    this.setState((prevState: Readonly<TextInputState>, props: TextInputProps) => {
      const regExp = props.pattern instanceof RegExp ? props.pattern : new RegExp(props.pattern!, 'u');

      return {
        status: regExp.test(prevState.value!) ? Status.Valid : Status.Invalid,
      };
    });
  };
}
