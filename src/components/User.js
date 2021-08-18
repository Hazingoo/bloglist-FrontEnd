import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
const User = () => {
  const allUsers = useSelector(({ allUsers }) => allUsers)
  const id = useParams().id
  console.log(allUsers)
  const user = allUsers.find((item) => item.id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h1>added blogs</h1>
      <ul>
        {user.blogs.map((el) => (
          <li key={el.id}>{el.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
