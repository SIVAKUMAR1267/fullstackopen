import propTypes from 'prop-types'

const Errormessage = ({ errormessage }) => {
  if (errormessage === null) {
    return null
  }
  else{
    return (
      <div className='error'>
        {errormessage}
      </div>
    )
  }}

Errormessage.propTypes = {
  errormessage: propTypes.string
}

export default Errormessage