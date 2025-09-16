import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'


const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification) {
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <Alert severity={notification.severity}>
    {notification.message}
  </Alert>
}
export default Notification
