import { LocationDescriptor } from 'history';
import debounce from 'lodash/debounce';
import { CheckboxInput, InputField, SelectBox } from 'pattern-lab';
import React, { Component, SFC } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import unescape from 'unescape';

import { StoreFeatures } from '../../actions/merchant';
import { updateThemeConfigChange, SettingsType, ThemeConfigChange } from '../../actions/theme';
import { State } from '../../reducers/reducers';
import { ThemeSchemaEntry, ThemeSchemaEntrySetting } from '../../reducers/theme';
import {
    trackCheckboxChange,
    trackImageDimensionChange,
    trackSelectChange,
    trackTextChange,
} from '../../services/analytics';

import CheckoutImageUpload from '../CheckoutImageUpload/CheckoutImageUpload';
import ColorPicker from '../ColorSetting/ColorSetting';
import Draggable from '../Draggable/Draggable';
import ExpandableMenu from '../ExpandableMenu/ExpandableMenu';
import ImageSize from '../ImageSize/ImageSize';
import { appRoutes } from '../Routes/Routes';

import { DebounceTimeMs, SettingType } from './constants';
import { Heading, Item, List, Paragraph } from './styles';

export interface ThemeSettingsProps extends RouteComponentProps<{}> {
    debounceTime?: number;
    features: StoreFeatures;
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

function trackChange(configChange: ThemeConfigChange) {
    switch (configChange.setting.type) {
        case SettingType.CHECKBOX:
            return trackCheckboxChange(configChange.setting.id, configChange.value as boolean);
        case SettingType.FONT:
            return trackSelectChange(configChange.setting.id, configChange.value as string);
        case SettingType.IMAGE_DIMENSION:
            return trackImageDimensionChange(configChange.setting.id, configChange.value as string);
        case SettingType.SELECT:
            return trackSelectChange(configChange.setting.id, configChange.value as string);
        case SettingType.TEXT:
            return trackTextChange(configChange.setting.id, configChange.value as string);
    }
}

export function getEditor(
    setting: ThemeSchemaEntrySetting,
    value: string | number | boolean | null,
    handleChange: (configChange: ThemeConfigChange) => void
) {
    const testId = `${setting.type}.${setting.id}`;
    const prettyLabel = unescape(setting.label, 'all');
    switch (setting.type) {
        case SettingType.COLOR:
            return <ColorPicker
                color={value as string}
                label={prettyLabel}
                name={setting.id!}
                onChange={handleChange}
                testId={testId}
            />;
        case SettingType.CHECKBOX:
            return <CheckboxInput
                checked={value as boolean}
                label={prettyLabel}
                onChange={({ target }) => handleChange({setting, value: target.checked})}
                testId={testId}
            />;
        case SettingType.FONT:
            return <SelectBox
                selected={value as string}
                label={prettyLabel}
                onChange={({ target }) => handleChange({setting, value: target.value})}
                options={transformOptions(setting)}
                testId={testId}
            />;
        case SettingType.IMAGE_DIMENSION:
            return <ImageSize
                selected={value as string}
                label={prettyLabel || ''}
                onChange={({ target }) => handleChange({setting, value: target.value})}
                options={transformOptions(setting)}
                testId={testId}
            />;
        case SettingType.OPTIMIZED_CHECKOUT_IMAGE:
            return <CheckoutImageUpload
                label={prettyLabel || ''}
                name={setting.id!}
                onChange={handleChange}
                imageURL={value as string}
                testId={testId}
            />;
        case SettingType.SELECT:
            return <SelectBox
                selected={formatOptionValue(value as string | number | boolean)}
                label={prettyLabel}
                onChange={({ target }) => handleChange({setting, value: parseOptionValue(target.value)})}
                options={transformOptions(setting)}
                testId={testId}
            />;
        case SettingType.TEXT:
            return <InputField
                value={value as string}
                label={prettyLabel}
                onChange={({ target }) => handleChange({setting, value: target.value})}
                testId={testId}
            />;
        case SettingType.HEADING:
            return <Heading>{setting.content}</Heading>;
        case SettingType.PARAGRAPH:
            return <Paragraph>{setting.content}</Paragraph>;
        default:
            return null;
    }
}

export class ThemeSettings extends Component<ThemeSettingsProps, {}> {
    static defaultProps = {
        debounceTime: DebounceTimeMs,
    };

    private static debouncedFunctions: { [id: string]: (config: ThemeConfigChange) => void } = {};

    render() {
        const { match, position, settings, themeSettings } = this.props;
        const locationDescriptor: LocationDescriptor = {
            pathname: match.url,
            search: this.props.location.search,
        };

        return (
            <Draggable position={position} >
                <ExpandableMenu
                    back={locationDescriptor}
                    title={themeSettings ? themeSettings.name : ''}
                >
                    <List>
                        {themeSettings.settings.map((setting, index) => {
                            const { id } = setting;
                            if (!this.isSettingVisible(setting)) {
                                return null;
                            } else {
                                return (
                                    <Item key={index}>
                                        {
                                            getEditor(
                                                setting,
                                                id ? settings[id] : null,
                                                id ? this.debouncedUpdateThemeConfig(id) : this.updateThemeConfig
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

    private isSettingVisible(setting: ThemeSchemaEntrySetting) {
        const { enable, reference, reference_default } = setting;
        const { features, settings } = this.props;

        if (reference && settings[reference] === reference_default) {
            return false;
        }

        if (enable && features && enable in features) {
            return features[enable];
        }

        return true;
    }

    private debouncedUpdateThemeConfig = (id: string) => {
        return ThemeSettings.debouncedFunctions[id] ||
            (ThemeSettings.debouncedFunctions[id] = debounce(this.updateThemeConfig, this.props.debounceTime));
    };

    private updateThemeConfig = (configChange: ThemeConfigChange) => {
        trackChange(configChange);
        this.props.updateThemeConfigChange(configChange);
    };
}

const mapStateToProps = (state: State, ownProps: ThemeSettingsProps) => ({
    features: state.merchant.features,
    settings: state.theme.settings,
    themeSettings: state.theme.schema[ownProps.settingsIndex],
});

interface StateFromProps {
    features: StoreFeatures;
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
