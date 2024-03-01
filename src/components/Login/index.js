import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeHandler = event => {
    const {id, value} = event.target
    if (id === 'username') {
      setUserName(value)
    } else {
      setPassword(value)
    }
  }

  const onSuccessfullLogin = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onFailedLogin = errorMessage => {
    setErrorMsg(errorMessage)
  }

  const onSubmitLogin = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok) {
      onSuccessfullLogin(data.jwt_token)
    } else {
      onFailedLogin(data.error_msg)
    }
  }

  if (Cookies.get('jwt_token')) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={onSubmitLogin}>
        <h1 className="login-heading">Login</h1>
        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          type="text"
          onChange={onChangeHandler}
          value={username}
        />
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          onChange={onChangeHandler}
          value={password}
        />
        <button type="submit" className="login-btn">
          Login
        </button>
        {errorMsg !== '' && <p className="text-message">{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
