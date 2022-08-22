import React from 'react'
import {
    Box, Avatar
} from '@mui/material';

function Messages({ messages, myName, urUser }) {
    return (
        <>
            {messages && messages.map((message, i) =>
                message?.user === myName
                    ?
                    <Box className='sendContainer' key={i}>
                        <Box className='send'>
                            {message?.message}
                        </Box>
                    </Box>
                    :
                    message?.user === urUser?.name &&
                    <Box className='receiveContainer' key={i}>
                        <Avatar alt='pic' src={urUser.avatar}
                            sx={{ width: 40, height: 40, mr: 1 }} />
                        <Box className='receive'>
                            {message.message}
                        </Box>
                    </Box>

            )}
        </>
    )
}

export default Messages