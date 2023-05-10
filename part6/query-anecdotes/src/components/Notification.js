import React, { useContext, useEffect } from 'react';
import { NotificationContext } from './NotificationContext';

const Notification = () => {
  const { state, dispatch } = useContext(NotificationContext);

  useEffect(() => {
    if (state.message) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: state.message, timeoutId } });
    }
  }, [state.message]);

  useEffect(() => {
    const unsubscribe = () => {
      const { message, timeoutId } = state;
      if (message) {
        return () => clearTimeout(timeoutId);
      }
    };
    return unsubscribe();
  }, [state]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return <div style={style}>{state.message}</div>;
};

export default Notification;
