import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideMessage } from '../reducers/notificationReducer'

const Notification = () => {

  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)
  const [timeoutId, setTimeoutId] = useState(null)

  useEffect(() => {
    if (message) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      const newTimeoutId = setTimeout(() => {
        dispatch(hideMessage())
      }, message.duration * 1000) // convert duration to milliseconds
      setTimeoutId(newTimeoutId)
    }
  }, [dispatch, message])

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  const style = {
    color: 'white',
    background: message && message.color ? message.color : 'green', // use the provided color if available, otherwise use green
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    display: message ? '' : 'none'
  }

  return (
    <div style={style}>
      <p>{message && message.text}</p> {/* render the message text if it's available */}
    </div>
  )
}

export default Notification