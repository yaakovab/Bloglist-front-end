import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import NewBlogForm from './NewBlogForm'


test('<NewBlogForm /> calls onSubmit with right parameters', async () => {
    const addNewBlog = jest.fn()

    const { container } = render(<NewBlogForm addNewBlog={addNewBlog} />)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const submitButton = screen.getByText('create')

    const user = userEvent.setup()

    await user.type(titleInput, 'clouds in the sky')
    await user.type(authorInput, 'Jane Doe')
    await user.type(urlInput, 'https://www.clouds.co.il')

    await user.click(submitButton)

    expect(addNewBlog.mock.calls).toHaveLength(1)
    expect(addNewBlog.mock.calls[0][0].title).toBe('clouds in the sky')
    expect(addNewBlog.mock.calls[0][0].author).toBe('Jane Doe')
    expect(addNewBlog.mock.calls[0][0].url).toBe('https://www.clouds.co.il')
})