import { CheckboxInput, InputField, SelectBox } from 'pattern-lab';
import React, { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { updateThemeConfigChange, SettingsType, ThemeConfigChange } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { ThemeSchemaEntry, ThemeSchemaEntrySetting } from '../../reducers/theme';
import CheckoutImageUpload from '../CheckoutImageUpload/CheckoutImageUpload';
import ColorPicker from '../ColorPicker/ColorPicker';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import ImageSize from '../ImageSize/ImageSize';

import { Heading, Item, List } from './styles';

export interface ThemeSettingsProps extends RouteComponentProps<{}> {
    settings: SettingsType;
    settingsIndex: number;
    themeSettings: ThemeSchemaEntry;
    updateThemeConfigChange(configChange: ThemeConfigChange): (dispatch: Dispatch<State>) => void;
}

function transformOptions(setting: ThemeSchemaEntrySetting) {
    return setting.options ? setting.options.map(({label, value}) => ({
        label,
        value: value.toString(),
    })) : [];
}

function getEditor(
    setting: ThemeSchemaEntrySetting,
    preSetValue: SettingsType,
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    broadcastConfigChange: (configChange: ThemeConfigChange) => (dispatch: Dispatch<State>) => void
) {
    switch (setting.type) {
        case 'color':
            return <ColorPicker
                color={preSetValue[`${setting.id}`] as string}
                label={setting.label}
                onChange={handleChange}
            />;
        case 'checkbox':
            return <CheckboxInput
                checked={preSetValue[`${setting.id}`] as boolean}
                label={setting.label}
                onChange={handleChange}
            />;
        case 'font':
            return <SelectBox
                selected={preSetValue[`${setting.id}`] as string}
                label={setting.label}
                onChange={handleChange}
                options={transformOptions(setting)}
            />;
        case 'imageDimension':
            return <ImageSize
                selected={preSetValue[`${setting.id}`] as string}
                label={setting.label || ''}
                onChange={handleChange}
                options={transformOptions(setting)}
            />;
        case 'optimizedCheckout-image':
            return <CheckoutImageUpload
                label={setting.label || ''}
                name={setting.id!}
                onChange={broadcastConfigChange}
                imageURL={preSetValue[`${setting.id}`] as string}
            />;
        case 'select':
            return <SelectBox
                selected={preSetValue[`${setting.id}`] as string}
                label={setting.label}
                onChange={handleChange}
                options={transformOptions(setting)}
            />;
        case 'text':
            return <InputField
                value={preSetValue[`${setting.id}`] as string}
                label={setting.label}
                onChange={handleChange}
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
        const { match, settings, settingsIndex, themeSettings } = this.props;

        return (
            <Route
                path={`/section/${settingsIndex}`}
                exact
                render={() => (
                    <ExpandableMenu
                        title={themeSettings ? themeSettings.name : ''}
                        back={match.url}>
                        <List>
                            {themeSettings.settings.map((setting, index) => (
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
                            ))}
                        </List>
                    </ExpandableMenu>
                )}
            />
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
    updateThemeConfigChange(configChange: ThemeConfigChange): (dispatch: Dispatch<State>) => void;
}

const mapDispatchToProps = {
    updateThemeConfigChange,
};

export default withRouter(
    connect<StateFromProps, ActionFromProps, { settingsIndex: number }>(mapStateToProps,
        mapDispatchToProps)(ThemeSettings));
