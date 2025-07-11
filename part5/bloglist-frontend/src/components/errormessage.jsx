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
export default Errormessage