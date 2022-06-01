import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from './Blog'


describe('testing the render behavior of the Blog element', () => {
    const blog = {
        title: 'shown here',
        author: 'it is me',
        likes: 2,
        url: 'http://www.RT.ru'
    }

    test('first render of blog renders only title & author', () => {

        const { container } = render(<Blog blog={blog} />)

        const div = container.querySelector('.title-author-hide-when-visible')

        expect(div).toBeVisible()

        const hidenDiv = container.querySelector('.blog-content-show-when-visible')

        expect(hidenDiv).not.toBeVisible()

    })

    test('when clicking on the button all details are shown', async () => {
        const mockHandler = jest.fn()

        const { container } = render(<Blog blog={blog} handleViewHideButton={mockHandler} />)

        const user = userEvent.setup()
        const button = screen.getByText(/view/)
        await user.click(button)

        const div = container.querySelector('.blog-content-show-when-visible')
        expect(div).toBeVisible()
    })

    test('clicking like button calls eventHandler exactly twice', async () => {
        const likeButtonMock = jest.fn()

        render(<Blog blog={blog} likeButton={likeButtonMock} />)

        const user = userEvent.setup()
        const button = screen.getByText('like')
        for (let i = 0; i < 2; i++) {
            await user.click(button)
        }

        expect(likeButtonMock.mock.calls).toHaveLength(2)
    })
})
