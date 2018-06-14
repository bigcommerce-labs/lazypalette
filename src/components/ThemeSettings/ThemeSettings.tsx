import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';

import { State } from '../../reducers/reducers';
import { ThemeSchemaEntry, ThemeSchemaEntrySetting } from '../../reducers/theme';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import CheckboxInput from '../CheckboxInput/CheckboxInput';
import ColorPicker from '../ColorPicker/ColorPicker';
import ImageSize from '../ImageSize/ImageSize';
import SelectBox from '../SelectBox/SelectBox';

import { List, Item, Heading } from './styles';

export interface ThemeSettingsProps extends RouteComponentProps<{}> {
    settingsIndex: number;
    themeSettings: ThemeSchemaEntry;
}

function transformOptions(setting: ThemeSchemaEntrySetting) {
    return setting.options ? setting.options.map(({label, value}) => ({
        label,
        value: value.toString(),
    })) : [];
}

function getEditor(setting: ThemeSchemaEntrySetting) {
    switch (setting.type) {
        case 'color':
            return <ColorPicker label={setting.label}/>;
        case 'checkbox':
            return <CheckboxInput label={setting.label}/>;
        case 'font':
            return <SelectBox label={setting.label} options={transformOptions(setting)}/>;
        case 'imageDimension':
            return <ImageSize
                label={setting.label || ''}
                options={transformOptions(setting)}
                selectedValue={setting.options![0].value.toString()}
            />;
        case 'select':
            return <SelectBox label={setting.label} options={transformOptions(setting)}/>;
        case 'heading':
            return <Heading>{setting.content}</Heading>;
        default:
            return null;
    }
}

export class ThemeSettings extends Component<ThemeSettingsProps, {}> {
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
                                    {getEditor(setting)}
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
    themeSettings: state.theme.schema[ownProps.settingsIndex],
});

interface StateFromProps {
    themeSettings: ThemeSchemaEntry;
}

export default withRouter(connect<StateFromProps, {}, { settingsIndex: number }>(mapStateToProps)(ThemeSettings));
