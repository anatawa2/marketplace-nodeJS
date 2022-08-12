import React from 'react'

function Messages({ messages, room }) {
    return (
        <div>
            ROOM : {room}
            {messages && messages.map((message, i) =>
                <div key={i}>
                    {message.user}: {message.message}
                </div>
            )}
        </div>
    )
}

export default Messages