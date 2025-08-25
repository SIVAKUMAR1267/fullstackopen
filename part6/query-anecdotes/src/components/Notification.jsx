import { useContext } from 'react'
import Notificationcontext from '../reducers/Notification'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const [notification,notificationdispatch]= useContext(Notificationcontext)
  if (notification === '') {
    return null
  }

  return (
    <div style={style}>
    {notification}
    </div>
  )
}

export default Notification
