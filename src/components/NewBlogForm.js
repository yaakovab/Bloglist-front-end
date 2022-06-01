import { useState } from 'react'

const NewBlogForm = ({ addNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        addNewBlog({ title, author, url })
        setAuthor('')
        setTitle('')
        setUrl('')
        console.log('new blog added', title, author, url)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title: <input
                        id="title-input"
                        type="text"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author: <input
                        id="author-input"
                        type="text"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url: <input
                        id="url-input"
                        type="url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit" >create</button>
            </form>
        </div>
    )
}

export default NewBlogForm