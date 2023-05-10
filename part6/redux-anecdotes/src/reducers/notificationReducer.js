import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showMessage: (state, action) => action.payload,
    hideMessage: () => null,
  },
})

export const selectNotification = state => state.notification
export const showMessage = (text, duration, color) => ({ type: 'notification/showMessage', payload: { text, duration, color } })
export const hideMessage = () => ({ type: 'notification/hideMessage' })
export default notificationSlice.reducer