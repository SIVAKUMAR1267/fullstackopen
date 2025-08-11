import propTypes from 'prop-types'

const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (message === null) {
    return null
  }
  else{
    return (
      <div style={style}>
        {message}
      </div>
    )
  }}

Notification.propTypes = {
  message: propTypes.string
}

export default Notification