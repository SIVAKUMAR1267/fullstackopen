import propTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  else{
    return (
      <div className='message'>
        {message}
      </div>
    )
  }}

Notification.propTypes = {
  message: propTypes.string
}

export default Notification