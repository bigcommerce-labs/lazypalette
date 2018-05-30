import React, {
  Component,
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  FocusEventHandler,
  SFC
} from 'react';
import uuid from 'uuid';

import { Status } from './Status';
import { Container, Label, Small, TextInput as StyledTextInput } from './styles';

interface LabelProps {
  children?: string;
  htmlFor?: string;
  note?: string;
  required?: boolean;
}

const TextInputLabel: SFC<LabelProps> = props => {
  const { children: label, htmlFor, note, required } = props;

  return (
    <Label htmlFor={htmlFor}>
      {label}
      {note &&
        <Small required={required!}>
          {note}
        </Small>
      }
    </Label>
  );
};

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
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  pattern?: string | RegExp;
  placeholder?: string;
  postfix?: string;
  prefix?: string;
  readonly?: boolean;
  required?: boolean;
  warning?: boolean;
}

export default class TextInput extends Component<TextInputProps, TextInputState> {
  static defaultProps = {
    disabled: false,
    inputId: uuid(),
    onBlur: () => undefined,
    onChange: () => undefined,
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
      <Container>
        <TextInputLabel htmlFor={inputId} note={note} required={required!}>
          {label}
        </TextInputLabel>
        <StyledTextInput
          defaultValue={defaultValue!}
          disabled={disabled!}
          id={inputId}
          onChange={this.onChange}
          onBlur={this.onBlur}
          pattern={pattern!}
          placeholder={placeholder!}
          readonly={readonly!}
          required={required!}
          status={status}
          warning={warning!}
        />
      </Container>
    );
  }

  private onBlur = (event: FocusEvent<HTMLInputElement>) => {
    this.props.onBlur!(event);

    if (this.props.pattern) {
      this.validate();
    }
  };

  private onChange = (event: ChangeEvent<HTMLInputElement>) => {
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
