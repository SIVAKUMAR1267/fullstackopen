import { Link } from 'react-router-dom'

const Bloguser = ({ user }) => {
  if (!user) {
    return <h3>User has no blogs</h3>
  }
  const blogs = user.blogs
  return (
    <div>
      <h2>{user.name}</h2>
      <h3> Added blogs </h3>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h3>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </h3>
        </div>
      ))}
    </div>
  )
}
export default Bloguser
