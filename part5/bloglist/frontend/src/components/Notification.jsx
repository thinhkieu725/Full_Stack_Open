const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const SuccessMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='successMessage'>
      {message}
    </div>
  )
}

const Notification = ({ errorMessage, successMessage }) => {
  return (
    <div>
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage} />
    </div>
  )
}

export default Notification