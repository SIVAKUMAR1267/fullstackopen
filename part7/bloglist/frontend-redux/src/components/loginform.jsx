import { loginuser } from '../reducers/userreducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.Password.value
    dispatch(loginuser(username, password))
    event.target.Username.value = ''
    event.target.Password.value = ''
    navigate('/')
  }

  return (
    <div>
      <h2>Login</h2>

      <form className="loginform" onSubmit={handleSubmit}>
        <div>
          Username
          <input name="Username" placeholder="username" />
        </div>
        <div>
          password
          <input type="password" name="Password" placeholder="password" />
        </div>
        <button className="button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
