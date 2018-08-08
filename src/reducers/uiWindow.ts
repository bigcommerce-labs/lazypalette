import { Action } from '../actions/action';
import { UIWindowActionTypes, UIWindowContent, UIWindowTypes } from '../actions/uiWindow';

export interface UIWindowData {
    content: UIWindowContent;
    id: string;
    type: UIWindowTypes;
}

export interface UIWindowState {
    uiWindows: UIWindowData[];
}

const initialState: UIWindowState = {
    uiWindows: [],
};

function uiWindow(state: UIWindowState = initialState, action: Action): UIWindowState {
    if (action.error) {
        return state;
    }

    switch (action.type) {
        case UIWindowActionTypes.OPEN_UI_WINDOW:
            return { ...state,
                uiWindows: [...state.uiWindows,
                    {
                        content: action.payload.content,
                        id: action.payload.id,
                        type: action.payload.type,
                    }],
            };
        case UIWindowActionTypes.CLOSE_UI_WINDOW:
            return { ...state, uiWindows: state.uiWindows.filter(m => m.id !== action.payload.id) };
        default:
            return state;
    }
}

export default uiWindow;
