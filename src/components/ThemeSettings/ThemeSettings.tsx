import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import { updateThemeConfigChange, SettingsType, ThemeConfigChange } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { ThemeSchemaEntry, ThemeSchemaEntrySetting } from '../../reducers/theme';
import CheckboxInput from '../CheckboxInput/CheckboxInput';
import ColorPicker from '../ColorPicker/ColorPicker';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import ImageSize from '../ImageSize/ImageSize';
import SelectBox from '../SelectBox/SelectBox';

import { Heading, Item, List } from './styles';

export interface ThemeSettingsProps extends RouteComponentProps<{}> {
    settings: SettingsType;
    settingsIndex: number;
    themeSettings: ThemeSchemaEntry;
    updateThemeConfigChange(configChange: ThemeConfigChange): Dispatch<State>;
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
    handleChange: (configChange: ThemeConfigChange) => void
) {

    switch (setting.type) {
        case 'color':
            return <ColorPicker
                color={preSetValue[`${setting.id}`] as string}
                label={setting.label}
                onChange={handleChange}
                name={setting.id!}
            />;
        case 'checkbox':
            return <CheckboxInput
                checked={preSetValue[`${setting.id}`] as boolean}
                label={setting.label}
                onChange={handleChange}
                name={setting.id!}
            />;
        case 'font':
            return <SelectBox
                selected={preSetValue[`${setting.id}`] as string}
                label={setting.label}
                onChange={handleChange}
                name={setting.id!}
                options={transformOptions(setting)}
            />;
        case 'imageDimension':
            return <ImageSize
                selected={preSetValue[`${setting.id}`] as string}
                label={setting.label || ''}
                onChange={handleChange}
                name={setting.id!}
                options={transformOptions(setting)}
            />;
        case 'select':
            return <SelectBox
                selected={preSetValue[`${setting.id}`] as string}
                label={setting.label}
                onChange={handleChange}
                name={setting.id!}
                options={transformOptions(setting)}
            />;
        case 'heading':
            return <Heading>{setting.content}</Heading>;
        default:
            return null;
    }
}

export class ThemeSettings extends Component<ThemeSettingsProps, {}> {
    handleChange = (configChange: ThemeConfigChange) => {
        this.props.updateThemeConfigChange(configChange);
    };
    render() {
        return (
            <Route
                path={`/design/style/${this.props.settingsIndex}`}
                exact
                render={() => (
                    <ExpandableMenu
                        title={this.props.themeSettings ? this.props.themeSettings.name : ''}
                        back={this.props.match.url}>
                        <List>
                            {this.props.themeSettings.settings.map((setting, index) => (
                                <Item key={index}>
                                    {getEditor(setting, this.props.settings, this.handleChange)}
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
    updateThemeConfigChange(configChange: ThemeConfigChange): Dispatch<State>;
}

const mapDispatchToProps = {
    updateThemeConfigChange,
};

export default withRouter(
    connect<StateFromProps, ActionFromProps, { settingsIndex: number }>(mapStateToProps,
        mapDispatchToProps)(ThemeSettings));
