import React, { useState } from 'react'
import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('rendering the blog', () => {
  const mockHandler = jest.fn()
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'daniel zhang',
    url: 'kevin wang',
    likes: 0,
  }
  const blogs = [blog]
  console.log(blog)
  const component = render(
    <Blog blog={blog} blogs={blogs} setBlogs={mockHandler} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicked', async () => {
  const mockHandler = jest.fn()
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Some author',
    url: 'some url',
    likes: 0,
  }
  const blogs = [blog]
  const component = render(
    <Blog blog={blog} blogs={blogs} setBlogs={mockHandler} />
  )
  component.debug()
  const button = await component.findByText('like')
  fireEvent.click(button)
  component.debug()
  expect(component.container).toHaveTextContent(0)
})
// test('renders content', () => {
//     const note = {
//       content: 'Component testing is done with react-testing-library',
//       important: true
//     }

//     const component = render(
//       <Note note={note} />
//     )

//     expect(component.container).toHaveTextContent(
//       'Component testing is done with react-testing-library'
//     )
//   })
