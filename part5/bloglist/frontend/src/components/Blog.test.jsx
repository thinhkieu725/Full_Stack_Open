import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, expect, test } from 'vitest'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test Author',
      url: 'http://test.com',
      user: {
        name: 'Test User',
      },
      likes: 10,
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders content', () => {
    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(div).toHaveTextContent(
      'Test Author'
    )
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.showWhenVisible')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const mockHandler = vi.fn()

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = component.container.querySelector('.showWhenVisible')
    expect(div).not.toHaveStyle('display: none')
  })
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://test.com',
    user: {
      name: 'Test User',
    },
    likes: 10,
  }

  const mockHandler = vi.fn()

  const component = render(
    <Blog blog={blog} handleLikeIncrease={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

describe('<BlogForm />', () => {
  test('updates parent state and calls onSubmit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm  createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('write title here')
    const inputAuthor = screen.getByPlaceholderText('write author here')
    const inputUrl = screen.getByPlaceholderText('write URL here')

    const submitButton = screen.getByText('create')

    await user.type(inputTitle, 'Some title')
    await user.type(inputAuthor, 'Some author')
    await user.type(inputUrl, 'Some URL')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls[0][0].title).toBe('Some title')
    expect(createBlog.mock.calls[0][0].author).toBe('Some author')
    expect(createBlog.mock.calls[0][0].url).toBe('Some URL')
  })
})