import React from 'react'

function Messages({ messages }) {
    return (
        <div>
            ROOM :
            {messages && messages.map((message, i) =>
                <div key={i}>
                    {message.user}: {message.message}
                </div>
            )}
        </div>
    )
}

export default Messages