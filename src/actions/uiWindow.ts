import { ColorResult } from 'react-color';
import uuid from 'uuid';

export enum UIWindowActionTypes {
    OPEN_UI_WINDOW = 'OPEN_UI_WINDOW',
    CLOSE_UI_WINDOW = 'CLOSE_UI_WINDOW',
}

export enum UIWindowTypes {
    COLOR_PICKER = 'COLOR_PICKER',
}

export interface UIWindowContent {
    position: { x: number, y: number };
}

export interface ColorPickerContent extends UIWindowContent {
    color: string;
    onChange?(value: ColorResult): void;
}

export interface OpenUIWindowAction<Content> {
    payload: {
        content: Content;
        id: string;
        type: UIWindowTypes;
    };
    type: UIWindowActionTypes.OPEN_UI_WINDOW;
}

export interface CloseUIWindowAction {
    payload: {
        id: string,
    };
    type: UIWindowActionTypes.CLOSE_UI_WINDOW;
}

export interface OpenColorPickerArgs {
    color: string;
    id?: string;
    position: { x: number, y: number };
    onChange?(value: ColorResult): void;
}

export function openColorPicker(content: OpenColorPickerArgs): OpenUIWindowAction<ColorPickerContent> {
    return {
        payload: {
            content: {
                color: content.color,
                onChange: content.onChange,
                position: content.position,
            },
            id: content.id || uuid(),
            type: UIWindowTypes.COLOR_PICKER,
        },
        type: UIWindowActionTypes.OPEN_UI_WINDOW,
    };
}

export function closeUIWindow(id: string): CloseUIWindowAction {
    return {
        payload: { id },
        type: UIWindowActionTypes.CLOSE_UI_WINDOW,
    };
}
