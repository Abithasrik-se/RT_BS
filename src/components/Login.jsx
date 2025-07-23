import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    // Basic hardcoded validation
    if (email === 'user@example.com' && password === '1234') {
      setIsLoggedIn(true)
      navigate('/')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <form onSubmit={handleLogin} style={{ padding: '1rem' }}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
      <br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
      <br />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
