import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector((state) => state.blogusers)
  if (!users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <h3>
            <Link to={`/users/${user.id}`}>
              {' '}
              {user.name} blogs created {user.blogs.length}{' '}
            </Link>
          </h3>
        </div>
      ))}
    </div>
  )
}
export default Users
