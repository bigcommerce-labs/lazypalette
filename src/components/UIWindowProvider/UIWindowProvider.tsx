import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    closeUIWindow,
    CloseUIWindowAction,
    ColorPickerContent,
    UIWindowTypes } from '../../actions/uiWindow';
import { State } from '../../reducers/reducers';
import { UIWindowData } from '../../reducers/uiWindow';
import ColorPicker from '../ColorPicker/ColorPicker';
import Draggable from '../Draggable/Draggable';
import UIWindow from '../UIWindow/UIWindow';

interface UIWindowProviderProps {
    children: JSX.Element;
    uiWindows: UIWindowData[];
    closeUIWindow(id: string): CloseUIWindowAction;
}

export class UIWindowProvider extends Component<UIWindowProviderProps, {}> {
    close = (id: string, uiWindowData: UIWindowData) => {
        const content = uiWindowData.content as ColorPickerContent;
        this.props.closeUIWindow(id);

        return content.onClose ? content.onClose() : null;
    };

    getUIWindowContents = (uiWindowData: UIWindowData) => {
        switch (uiWindowData.type) {
            case UIWindowTypes.COLOR_PICKER: {
                const content = uiWindowData.content as ColorPickerContent;

                return (
                    <ColorPicker
                        color={content.color}
                        key={uiWindowData.id}
                        onChangeComplete={content.onChange}
                    />);
            }
            default:
                return;
        }
    };

    render() {
        const { children, uiWindows } = this.props;

        return (
            <>
                {children}
                {uiWindows.map((uiWindowData: UIWindowData, index: number) => {

                    const topmost = uiWindows.length - 1 === index;

                    return (
                        <Draggable
                            position={uiWindowData.content.position}
                            key={uiWindowData.id}
                        >
                            <UIWindow
                                id={uiWindowData.id}
                                onClose={() => this.close(uiWindowData.id, uiWindowData)}
                                topmost={topmost}
                            >
                                {this.getUIWindowContents(uiWindowData)}
                            </UIWindow>
                        </Draggable>
                    );
                })}
            </>
        );
    }

}

const mapStateToProps = ({ uiWindow }: State) => ({
    uiWindows: uiWindow.uiWindows,
});

const mapDispatchToProps = {
    closeUIWindow,
};

export default connect(mapStateToProps, mapDispatchToProps)(UIWindowProvider);
