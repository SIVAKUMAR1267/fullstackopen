import { loginuser } from '../reducers/userreducer'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import { Stack, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.Password.value
    dispatch(loginuser(username, password)).then(navigate('/'))
    event.target.Username.value = ''
    event.target.Password.value = ''
  }

  return (
    <Container>
      <h2>Login</h2>
      <Stack
        component="form"
        sx={{ width: '25ch' }}
        spacing={2}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="filled-hidden-label-normal"
          label="User Name"
          type="username"
          name="Username"
          variant="standard"
        />

        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          name="Password"
          variant="standard"
        />

        <Button variant="contained" type="submit">
          Login
        </Button>
      </Stack>
    </Container>
  )
}

export default LoginForm
