import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'
const UserList = () => {
  const allUsers = useSelector(({ allUsers }) => allUsers)

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <th></th>
          <th>blogs created</th>
        </thead>
        <tbody>
          {allUsers.map((user) => {
            return (
              <tr key={user.id}>
                <Link to={`/users/${user.id}`}>
                  {' '}
                  <td>{user.name}</td>{' '}
                </Link>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
