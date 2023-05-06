const Login = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        username
        <input
          type="text"
          value={props.username}
          id="username"
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={props.password}
          id="password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default Login