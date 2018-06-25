import React, {
    ChangeEvent,
    ChangeEventHandler,
    Component,
    FocusEvent,
    FocusEventHandler,
    SFC,
} from 'react';
import uuid from 'uuid';

import { Container, InputField as StyledInputField, Label, Small } from './styles';
import { Notes, Status } from './Constants';

interface LabelProps {
    children?: string;
    htmlFor?: string;
    note?: string;
    required?: boolean;
}

const InputFieldLabel: SFC<LabelProps> = props => {
    const { children: label, htmlFor } = props;

    return (
        <Label htmlFor={htmlFor}>
            {label}
        </Label>
    );
};

export interface InputFieldState {
    status: Status;
    value: string | undefined;
}

export interface InputFieldProps {
    defaultValue?: any;
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
    type?: string | undefined;
    warning?: boolean;
}

export default class InputField extends Component<InputFieldProps, InputFieldState> {
    static defaultProps = {
        disabled: false,
        inputId: uuid(),
        onBlur: () => undefined,
        onChange: () => undefined,
        readonly: false,
        required: false,
        warning: false,
    };

    readonly state: InputFieldState = {
        status: Status.Undefined,
        value: '',
    };

    constructor(props: InputFieldProps) {
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
        const { status } = this.state;
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
            type,
            warning,
        } = this.props;

        return (
            <Container>
                <InputFieldLabel htmlFor={inputId}>
                    {label}
                </InputFieldLabel>
                <StyledInputField
                    defaultValue={defaultValue}
                    disabled={disabled!}
                    id={inputId}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    pattern={pattern!}
                    placeholder={placeholder!}
                    readonly={readonly!}
                    required={required!}
                    status={status}
                    type={type}
                    warning={warning!}
                />
                {note &&
                    <Small required={required!}>
                        {note}
                    </Small>
                }
            </Container>
        );
    }

    private onBlur = (event: FocusEvent<HTMLInputElement>) => {
        this.props.onBlur!(event);

        if (this.props.required && !this.state.value) {
            return this.setState({ status: Status.Invalid });
        }

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
        } else if (this.props.required && !this.state.value) {
            return Notes.Required;
        } else {
            return undefined;
        }
    }

    private validate = () => {
        this.setState((prevState: Readonly<InputFieldState>, props: InputFieldProps) => {
            const regExp = props.pattern instanceof RegExp ? props.pattern : new RegExp(props.pattern!, 'u');

            return {
                status: regExp.test(prevState.value!) ? Status.Valid : Status.Invalid,
            };
        });
    };
}
