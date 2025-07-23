import { Link, useNavigate } from 'react-router-dom'

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#ddd' }}>
      {isLoggedIn ? (
        <>
          <Link to="/">Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  )
}

export default Navbar
