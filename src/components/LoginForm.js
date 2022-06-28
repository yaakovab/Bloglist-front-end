import { useState } from 'react'
import Notification from './Notification'


const LoginForm = ({ newLogin, message, setMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = async event => {
        event.preventDefault()
        console.log('logging in', username, password)

        try {
            await newLogin({ username, password })
            setUsername('')
            setPassword('')
        } catch (error) {
            setMessage('wrong username or password')
            setTimeout(() => setMessage(null), 5000)
        }
    }


    return (
        <div>
            <h2>
                log in to application
            </h2>
            <form onSubmit={handleLogin}>
                <Notification message={message} />
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit" id="login-button">login</button>
            </form>
        </div>
    )
}

export default LoginForm