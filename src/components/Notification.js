
const Notification = ({ message }) => {
    if (message === null)
        return null

    return (
        <div className={message ? (message.startsWith('a new') ? "successMessage" : "failMessage") : null}>
            {message}
        </div>
    )
}

export default Notification