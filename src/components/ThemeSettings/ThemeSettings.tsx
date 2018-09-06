import { CheckboxInput, InputField, SelectBox } from 'pattern-lab';
import React, { ChangeEvent, Component, SFC } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { updateThemeConfigChange, SettingsType, ThemeConfigChange } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { ThemeSchemaEntry, ThemeSchemaEntrySetting } from '../../reducers/theme';

import CheckoutImageUpload from '../CheckoutImageUpload/CheckoutImageUpload';
import ColorPicker from '../ColorSetting/ColorSetting';
import Draggable from '../Draggable/Draggable';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import ImageSize from '../ImageSize/ImageSize';
import { appRoutes } from '../Routes/Routes';

import { Heading, Item, List } from './styles';

export interface ThemeSettingsProps extends RouteComponentProps<{}> {
    position: { x: number, y: number };
    settings: SettingsType;
    settingsIndex: number;
    themeSettings: ThemeSchemaEntry;
    updateThemeConfigChange(
        configChange: ThemeConfigChange
    ): (dispatch: Dispatch<State>, getState: () => State) => void;
}

function formatOptionValue(value: string | number | boolean) {
    return typeof value === 'number'
        ? `integer:${value}`
        : value ? value.toString() : '';
}

function parseOptionValue(optionValue: string) {
    return optionValue.startsWith('integer:')
        ? parseInt(optionValue.split(':')[1], 10)
        : optionValue;
}

function transformOptions(setting: ThemeSchemaEntrySetting) {
    return setting.options ? setting.options.map(({ label, value }) => {
        return {
            label,
            value: formatOptionValue(value),
        };
    }) : [];
}

export function getEditor(
    setting: ThemeSchemaEntrySetting,
    preSetValue: SettingsType,
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    broadcastConfigChange: (
        configChange: ThemeConfigChange
    ) => (dispatch: Dispatch<State>, getState: () => State) => void
) {
    const testId = `${setting.type}.${setting.id}`;
    switch (setting.type) {
        case 'color':
            return <ColorPicker
                color={preSetValue[`${setting.id}`] as string}
                label={setting.label}
                name={setting.id!}
                onChange={broadcastConfigChange}
                testId={testId}
            />;
        case 'checkbox':
            return <CheckboxInput
                checked={preSetValue[`${setting.id}`] as boolean}
                label={setting.label}
                onChange={handleChange}
                testId={testId}
            />;
        case 'font':
            return <SelectBox
                selected={preSetValue[`${setting.id}`] as string}
                label={setting.label}
                onChange={handleChange}
                options={transformOptions(setting)}
                testId={testId}
            />;
        case 'imageDimension':
            return <ImageSize
                selected={preSetValue[`${setting.id}`] as string}
                label={setting.label || ''}
                onChange={handleChange}
                options={transformOptions(setting)}
                testId={testId}
            />;
        case 'optimizedCheckout-image':
            return <CheckoutImageUpload
                label={setting.label || ''}
                name={setting.id!}
                onChange={broadcastConfigChange}
                imageURL={preSetValue[`${setting.id}`] as string}
                testId={testId}
            />;
        case 'select':
            return <SelectBox
                selected={formatOptionValue(preSetValue[`${setting.id}`])}
                label={setting.label}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    return broadcastConfigChange({
                        setting: {
                            id: setting.id,
                            type: 'select',
                        },
                        value: parseOptionValue(event.target.value),
                    });
                }}
                options={transformOptions(setting)}
                testId={testId}
            />;
        case 'text':
            return <InputField
                value={preSetValue[`${setting.id}`] as string}
                label={setting.label}
                onChange={handleChange}
                testId={testId}
            />;
        case 'heading':
            return <Heading>{setting.content}</Heading>;
        default:
            return null;
    }
}

export class ThemeSettings extends Component<ThemeSettingsProps, {}> {
    handleChange = (setting: ThemeSchemaEntrySetting) =>
        ({target}: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

            const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;

            this.props.updateThemeConfigChange({ setting, value });
        };

    render() {
        const { match, position, settings, themeSettings } = this.props;

        return (
            <Draggable position={position} >
                <ExpandableMenu
                    back={match.url}
                    title={themeSettings ? themeSettings.name : ''}
                >
                    <List>
                        {themeSettings.settings.map((setting, index) => {
                            const { reference, reference_default } = setting;
                            if (reference && settings[reference] === reference_default) {
                                return null;
                            } else {

                                return (
                                    <Item key={index}>
                                        {
                                            getEditor(
                                                setting,
                                                settings,
                                                this.handleChange(setting),
                                                this.props.updateThemeConfigChange
                                            )
                                        }
                                    </Item>
                                );
                            }
                        })}
                    </List>
                </ExpandableMenu>
            </Draggable>
        );
    }
}

const mapStateToProps = (state: State, ownProps: ThemeSettingsProps) => ({
    settings: state.theme.settings,
    themeSettings: state.theme.schema[ownProps.settingsIndex],
});

interface StateFromProps {
    settings: SettingsType;
    themeSettings: ThemeSchemaEntry;
}

interface ActionFromProps {
    updateThemeConfigChange(
        configChange: ThemeConfigChange
    ): (dispatch: Dispatch<State>, getState: () => State) => void;
}

const mapDispatchToProps = {
    updateThemeConfigChange,
};

const RoutedThemeSettings: SFC<ThemeSettingsProps> = props => (
    <Route
        path={`/${appRoutes.section.route}${props.settingsIndex}`}
        exact
        render={() => <ThemeSettings {...props}/>}
    />
);

export default withRouter(
    connect<StateFromProps, ActionFromProps, { settingsIndex: number }>(mapStateToProps,
        mapDispatchToProps)(RoutedThemeSettings));
