import React, { createContext, useReducer } from 'react';

export const NotificationContext = createContext();

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return { message: action.payload.message, timeoutId: action.payload.timeoutId };
        case 'CLEAR_NOTIFICATION':
            clearTimeout(state.timeoutId);
            return { message: null, timeoutId: null };
        default:
            return state;
    }
};

export const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, { message: null, timeoutId: null });
    return <NotificationContext.Provider value={{ state, dispatch }}>{children}</NotificationContext.Provider>;
};
